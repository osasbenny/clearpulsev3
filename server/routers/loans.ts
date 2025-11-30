import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import {
  createLoan,
  getLoansByUserId,
  getLoanById,
  updateLoanStatus,
  updateLoanBalance,
  getRepaymentsByLoanId,
  createLoanRepayment,
  updateRepaymentStatus,
  getAccountById,
  createTransaction,
  updateAccountBalance,
  createNotification,
  createAuditLog,
} from "../banking";
import { calculateLoanRepayment, formatCurrency } from "../utils";

export const loansRouter = router({
  // Get user's loans
  getLoans: protectedProcedure.query(async ({ ctx }) => {
    const loans = await getLoansByUserId(ctx.user.id);
    return loans.map(loan => ({
      ...loan,
      formattedAmount: formatCurrency(loan.amount),
      formattedMonthlyPayment: formatCurrency(loan.monthlyPayment),
      formattedTotalRepayment: formatCurrency(loan.totalRepayment),
      formattedRemainingBalance: formatCurrency(loan.remainingBalance),
    }));
  }),

  // Calculate loan details
  calculateLoan: protectedProcedure
    .input(z.object({
      amount: z.number().positive(),
      interestRate: z.number().positive(),
      termMonths: z.number().int().positive(),
    }))
    .query(({ input }) => {
      const amountInCents = Math.round(input.amount * 100);
      const calculation = calculateLoanRepayment(amountInCents, input.interestRate, input.termMonths);
      
      return {
        monthlyPayment: formatCurrency(calculation.monthlyPayment),
        totalRepayment: formatCurrency(calculation.totalRepayment),
        totalInterest: formatCurrency(calculation.totalRepayment - amountInCents),
        schedule: calculation.schedule.map(item => ({
          ...item,
          formattedPrincipal: formatCurrency(item.principalAmount),
          formattedInterest: formatCurrency(item.interestAmount),
          formattedTotal: formatCurrency(item.totalAmount),
          formattedRemaining: formatCurrency(item.remainingBalance),
        })),
      };
    }),

  // Apply for loan
  applyForLoan: protectedProcedure
    .input(z.object({
      accountId: z.number(),
      amount: z.number().positive(),
      interestRate: z.number().positive(),
      termMonths: z.number().int().positive(),
      purpose: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Validate account
      const account = await getAccountById(input.accountId);
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }

      if (account.status !== "active") {
        throw new Error("Account is not active");
      }

      // Calculate loan details
      const amountInCents = Math.round(input.amount * 100);
      const calculation = calculateLoanRepayment(amountInCents, input.interestRate, input.termMonths);

      // Create loan application
      await createLoan({
        userId: ctx.user.id,
        accountId: input.accountId,
        amount: amountInCents,
        interestRate: input.interestRate.toString(),
        termMonths: input.termMonths,
        monthlyPayment: calculation.monthlyPayment,
        totalRepayment: calculation.totalRepayment,
        remainingBalance: calculation.totalRepayment,
        status: "pending",
        purpose: input.purpose,
      });

      // Create notification
      await createNotification({
        userId: ctx.user.id,
        title: "Loan Application Submitted",
        message: `Your loan application for ${formatCurrency(amountInCents)} has been submitted and is pending review.`,
        type: "loan",
        isRead: 0,
      });

      // Audit log
      await createAuditLog({
        userId: ctx.user.id,
        action: "loan_application",
        entityType: "loan",
        details: `Applied for loan of ${formatCurrency(amountInCents)} for ${input.termMonths} months`,
      });

      return { success: true };
    }),

  // Get loan details with repayment schedule
  getLoanDetails: protectedProcedure
    .input(z.object({ loanId: z.number() }))
    .query(async ({ ctx, input }) => {
      const loan = await getLoanById(input.loanId);
      if (!loan || loan.userId !== ctx.user.id) {
        throw new Error("Loan not found or unauthorized");
      }

      const repayments = await getRepaymentsByLoanId(input.loanId);

      return {
        ...loan,
        formattedAmount: formatCurrency(loan.amount),
        formattedMonthlyPayment: formatCurrency(loan.monthlyPayment),
        formattedTotalRepayment: formatCurrency(loan.totalRepayment),
        formattedRemainingBalance: formatCurrency(loan.remainingBalance),
        repayments: repayments.map(r => ({
          ...r,
          formattedAmount: formatCurrency(r.amount),
          formattedPrincipal: formatCurrency(r.principalAmount),
          formattedInterest: formatCurrency(r.interestAmount),
        })),
      };
    }),

  // Make loan repayment
  makeRepayment: protectedProcedure
    .input(z.object({
      loanId: z.number(),
      amount: z.number().positive(),
    }))
    .mutation(async ({ ctx, input }) => {
      const loan = await getLoanById(input.loanId);
      if (!loan || loan.userId !== ctx.user.id) {
        throw new Error("Loan not found or unauthorized");
      }

      if (loan.status !== "active") {
        throw new Error("Loan is not active");
      }

      const account = await getAccountById(loan.accountId);
      if (!account) {
        throw new Error("Account not found");
      }

      const amountInCents = Math.round(input.amount * 100);

      // Check balance
      if (account.balance < amountInCents) {
        throw new Error("Insufficient funds");
      }

      // Create transaction
      const txnResult = await createTransaction({
        fromAccountId: account.id,
        toAccountId: null,
        amount: amountInCents,
        currency: account.currency,
        transactionType: "loan_repayment",
        status: "completed",
        description: `Loan repayment for loan #${loan.id}`,
        fee: 0,
        completedAt: new Date(),
      });

      // Update account balance
      await updateAccountBalance(account.id, account.balance - amountInCents);

      // Update loan balance
      const newBalance = loan.remainingBalance - amountInCents;
      const nextPaymentDue = loan.nextPaymentDue 
        ? new Date(loan.nextPaymentDue.getTime() + 30 * 24 * 60 * 60 * 1000) // Add 30 days
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      await updateLoanBalance(loan.id, Math.max(0, newBalance), nextPaymentDue);

      // If loan is fully paid
      if (newBalance <= 0) {
        await updateLoanStatus(loan.id, "completed");
      }

      // Create notification
      await createNotification({
        userId: ctx.user.id,
        title: "Loan Repayment Successful",
        message: `Your payment of ${formatCurrency(amountInCents)} has been applied to your loan. Remaining balance: ${formatCurrency(Math.max(0, newBalance))}`,
        type: "loan",
        isRead: 0,
      });

      // Audit log
      await createAuditLog({
        userId: ctx.user.id,
        action: "loan_repayment",
        entityType: "loan",
        entityId: loan.id,
        details: `Repaid ${formatCurrency(amountInCents)} towards loan`,
      });

      return { success: true, remainingBalance: Math.max(0, newBalance) };
    }),
});
