import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import {
  getAccountsByUserId,
  getAccountById,
  getAccountByNumber,
  createAccount,
  updateAccountBalance,
  getTransactionsByAccountId,
  createTransaction,
  updateTransactionStatus,
  createNotification,
  createAuditLog,
} from "../banking";
import {
  generateAccountNumber,
  generateTransactionReference,
  maskAccountNumber,
  formatCurrency,
  getExchangeRate,
  convertCurrency,
  isValidSwiftCode,
} from "../utils";

export const bankingRouter = router({
  // Get user's accounts
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    const accounts = await getAccountsByUserId(ctx.user.id);
    return accounts.map(acc => ({
      ...acc,
      maskedNumber: maskAccountNumber(acc.accountNumber),
      formattedBalance: formatCurrency(acc.balance, acc.currency),
    }));
  }),

  // Create new account
  createAccount: protectedProcedure
    .input(z.object({
      accountType: z.enum(["checking", "savings"]),
      currency: z.string().default("USD"),
    }))
    .mutation(async ({ ctx, input }) => {
      const accountNumber = generateAccountNumber();
      
      await createAccount({
        userId: ctx.user.id,
        accountNumber,
        accountType: input.accountType,
        currency: input.currency,
        balance: 0,
        status: "active",
      });

      await createAuditLog({
        userId: ctx.user.id,
        action: "account_created",
        entityType: "account",
        details: `Created ${input.accountType} account`,
      });

      return { success: true, accountNumber };
    }),

  // Get account transactions
  getTransactions: protectedProcedure
    .input(z.object({
      accountId: z.number(),
      limit: z.number().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const account = await getAccountById(input.accountId);
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }

      const transactions = await getTransactionsByAccountId(input.accountId, input.limit);
      return transactions.map(txn => ({
        ...txn,
        formattedAmount: formatCurrency(txn.amount, txn.currency),
        formattedFee: formatCurrency(txn.fee, txn.currency),
      }));
    }),

  // Local transfer (between internal accounts)
  localTransfer: protectedProcedure
    .input(z.object({
      fromAccountId: z.number(),
      toAccountNumber: z.string(),
      amount: z.number().positive(),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Validate from account
      const fromAccount = await getAccountById(input.fromAccountId);
      if (!fromAccount || fromAccount.userId !== ctx.user.id) {
        throw new Error("Source account not found or unauthorized");
      }

      if (fromAccount.status !== "active") {
        throw new Error("Source account is not active");
      }

      // Validate to account
      const toAccount = await getAccountByNumber(input.toAccountNumber);
      if (!toAccount) {
        throw new Error("Destination account not found");
      }

      if (toAccount.status !== "active") {
        throw new Error("Destination account is not active");
      }

      // Check balance
      const amountInCents = Math.round(input.amount * 100);
      if (fromAccount.balance < amountInCents) {
        throw new Error("Insufficient funds");
      }

      // Create transaction
      const reference = generateTransactionReference();
      await createTransaction({
        fromAccountId: fromAccount.id,
        toAccountId: toAccount.id,
        amount: amountInCents,
        currency: fromAccount.currency,
        transactionType: "transfer",
        status: "completed",
        description: input.description || "Local transfer",
        reference,
        fee: 0,
        completedAt: new Date(),
      });

      // Update balances
      await updateAccountBalance(fromAccount.id, fromAccount.balance - amountInCents);
      await updateAccountBalance(toAccount.id, toAccount.balance + amountInCents);

      // Create notifications
      await createNotification({
        userId: ctx.user.id,
        title: "Transfer Sent",
        message: `You sent ${formatCurrency(amountInCents, fromAccount.currency)} to account ${maskAccountNumber(toAccount.accountNumber)}`,
        type: "transaction",
        isRead: 0,
      });

      await createNotification({
        userId: toAccount.userId,
        title: "Transfer Received",
        message: `You received ${formatCurrency(amountInCents, fromAccount.currency)} from account ${maskAccountNumber(fromAccount.accountNumber)}`,
        type: "transaction",
        isRead: 0,
      });

      // Audit log
      await createAuditLog({
        userId: ctx.user.id,
        action: "local_transfer",
        entityType: "transaction",
        details: `Transferred ${formatCurrency(amountInCents, fromAccount.currency)} to ${maskAccountNumber(toAccount.accountNumber)}`,
      });

      return { success: true, reference };
    }),

  // International transfer
  internationalTransfer: protectedProcedure
    .input(z.object({
      fromAccountId: z.number(),
      toAccountNumber: z.string(),
      amount: z.number().positive(),
      currency: z.string(),
      swiftCode: z.string(),
      recipientName: z.string(),
      recipientBank: z.string(),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Validate from account
      const fromAccount = await getAccountById(input.fromAccountId);
      if (!fromAccount || fromAccount.userId !== ctx.user.id) {
        throw new Error("Source account not found or unauthorized");
      }

      if (fromAccount.status !== "active") {
        throw new Error("Source account is not active");
      }

      // Validate SWIFT code
      if (!isValidSwiftCode(input.swiftCode)) {
        throw new Error("Invalid SWIFT code format");
      }

      // Calculate amounts
      const amountInCents = Math.round(input.amount * 100);
      const fee = Math.round(amountInCents * 0.02); // 2% fee
      const totalAmount = amountInCents + fee;

      // Check balance
      if (fromAccount.balance < totalAmount) {
        throw new Error("Insufficient funds (including fees)");
      }

      // Get exchange rate
      const exchangeRate = getExchangeRate(fromAccount.currency, input.currency);
      const convertedAmount = convertCurrency(amountInCents, fromAccount.currency, input.currency);

      // Create transaction
      const reference = generateTransactionReference();
      await createTransaction({
        fromAccountId: fromAccount.id,
        toAccountId: null,
        amount: amountInCents,
        currency: input.currency,
        transactionType: "transfer",
        status: "pending",
        description: input.description || `International transfer to ${input.recipientName}`,
        reference,
        swiftCode: input.swiftCode,
        fee,
        exchangeRate: exchangeRate.toString(),
      });

      // Update balance (deduct amount + fee)
      await updateAccountBalance(fromAccount.id, fromAccount.balance - totalAmount);

      // Create notification
      await createNotification({
        userId: ctx.user.id,
        title: "International Transfer Initiated",
        message: `Your transfer of ${formatCurrency(amountInCents, fromAccount.currency)} to ${input.recipientName} is being processed. Fee: ${formatCurrency(fee, fromAccount.currency)}`,
        type: "transaction",
        isRead: 0,
      });

      // Audit log
      await createAuditLog({
        userId: ctx.user.id,
        action: "international_transfer",
        entityType: "transaction",
        details: `International transfer of ${formatCurrency(amountInCents, fromAccount.currency)} to ${input.recipientName} (${input.swiftCode})`,
      });

      return {
        success: true,
        reference,
        fee: formatCurrency(fee, fromAccount.currency),
        exchangeRate,
        convertedAmount: formatCurrency(convertedAmount, input.currency),
      };
    }),

  // Get exchange rate
  getExchangeRate: protectedProcedure
    .input(z.object({
      from: z.string(),
      to: z.string(),
    }))
    .query(({ input }) => {
      const rate = getExchangeRate(input.from, input.to);
      return { rate, from: input.from, to: input.to };
    }),
});
