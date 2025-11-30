import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../_core/trpc";
import {
  getAllKycDocuments,
  updateKycStatus,
  getAllLoans,
  updateLoanStatus,
  getLoanById,
  getAccountById,
  createTransaction,
  updateAccountBalance,
  getAllTransactions,
  getAllSupportTickets,
  updateSupportTicketStatus,
  createNotification,
  createAuditLog,
  getAllAuditLogs,
  getSystemSetting,
  setSystemSetting,
  getAllSystemSettings,
  updateAccountStatus,
} from "../banking";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { desc, sql } from "drizzle-orm";
import { formatCurrency } from "../utils";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const adminRouter = router({
  // Dashboard statistics
  getDashboardStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const [userStats] = await db.select({ count: sql<number>`count(*)` }).from(users);
    const totalUsers = userStats?.count || 0;

    const transactions = await getAllTransactions(1000);
    const totalVolume = transactions
      .filter(t => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const kycDocs = await getAllKycDocuments("pending");
    const pendingKyc = kycDocs.length;

    const loans = await getAllLoans("pending");
    const pendingLoans = loans.length;

    return {
      totalUsers,
      totalVolume: formatCurrency(totalVolume),
      pendingKyc,
      pendingLoans,
      recentTransactions: transactions.slice(0, 10).map(t => ({
        ...t,
        formattedAmount: formatCurrency(t.amount, t.currency),
      })),
    };
  }),

  // User management
  getAllUsers: adminProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db
        .select()
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(input.limit || 100);
    }),

  // Freeze/unfreeze user account
  updateAccountStatus: adminProcedure
    .input(z.object({
      accountId: z.number(),
      status: z.enum(["active", "frozen", "closed"]),
      reason: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await updateAccountStatus(input.accountId, input.status);

      const account = await getAccountById(input.accountId);
      if (account) {
        await createNotification({
          userId: account.userId,
          title: "Account Status Changed",
          message: `Your account has been ${input.status}. ${input.reason || ""}`,
          type: "system",
          isRead: 0,
        });
      }

      await createAuditLog({
        userId: ctx.user.id,
        action: "account_status_update",
        entityType: "account",
        entityId: input.accountId,
        details: `Changed account status to ${input.status}. Reason: ${input.reason || "N/A"}`,
      });

      return { success: true };
    }),

  // KYC management
  getPendingKyc: adminProcedure.query(async () => {
    return await getAllKycDocuments("pending");
  }),

  approveKyc: adminProcedure
    .input(z.object({ documentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const docs = await getAllKycDocuments();
      const doc = docs.find(d => d.id === input.documentId);
      
      if (!doc) throw new Error("Document not found");

      await updateKycStatus(input.documentId, "approved", ctx.user.id);

      await createNotification({
        userId: doc.userId,
        title: "KYC Document Approved",
        message: `Your ${doc.documentType.replace('_', ' ')} has been approved.`,
        type: "system",
        isRead: 0,
      });

      await createAuditLog({
        userId: ctx.user.id,
        action: "kyc_approved",
        entityType: "kyc",
        entityId: input.documentId,
        details: `Approved ${doc.documentType} for user ${doc.userId}`,
      });

      return { success: true };
    }),

  rejectKyc: adminProcedure
    .input(z.object({
      documentId: z.number(),
      reason: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const docs = await getAllKycDocuments();
      const doc = docs.find(d => d.id === input.documentId);
      
      if (!doc) throw new Error("Document not found");

      await updateKycStatus(input.documentId, "rejected", ctx.user.id, input.reason);

      await createNotification({
        userId: doc.userId,
        title: "KYC Document Rejected",
        message: `Your ${doc.documentType.replace('_', ' ')} was rejected. Reason: ${input.reason}`,
        type: "system",
        isRead: 0,
      });

      await createAuditLog({
        userId: ctx.user.id,
        action: "kyc_rejected",
        entityType: "kyc",
        entityId: input.documentId,
        details: `Rejected ${doc.documentType} for user ${doc.userId}. Reason: ${input.reason}`,
      });

      return { success: true };
    }),

  // Loan management
  getPendingLoans: adminProcedure.query(async () => {
    const loans = await getAllLoans("pending");
    return loans.map(loan => ({
      ...loan,
      formattedAmount: formatCurrency(loan.amount),
      formattedMonthlyPayment: formatCurrency(loan.monthlyPayment),
    }));
  }),

  approveLoan: adminProcedure
    .input(z.object({ loanId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const loan = await getLoanById(input.loanId);
      if (!loan) throw new Error("Loan not found");

      // Update loan status
      await updateLoanStatus(input.loanId, "approved", ctx.user.id);

      // Disburse loan amount to account
      const account = await getAccountById(loan.accountId);
      if (account) {
        await createTransaction({
          fromAccountId: null,
          toAccountId: account.id,
          amount: loan.amount,
          currency: account.currency,
          transactionType: "loan_disbursement",
          status: "completed",
          description: `Loan disbursement for loan #${loan.id}`,
          fee: 0,
          completedAt: new Date(),
        });

        await updateAccountBalance(account.id, account.balance + loan.amount);
      }

      // Update loan to active
      await updateLoanStatus(input.loanId, "active", ctx.user.id);

      // Set next payment due date (30 days from now)
      const nextPaymentDue = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      await getDb().then(db => {
        if (db) {
          return db.update(require("../../drizzle/schema").loans)
            .set({ disbursedAt: new Date(), nextPaymentDue })
            .where(require("drizzle-orm").eq(require("../../drizzle/schema").loans.id, input.loanId));
        }
      });

      await createNotification({
        userId: loan.userId,
        title: "Loan Approved",
        message: `Your loan application for ${formatCurrency(loan.amount)} has been approved and disbursed to your account.`,
        type: "loan",
        isRead: 0,
      });

      await createAuditLog({
        userId: ctx.user.id,
        action: "loan_approved",
        entityType: "loan",
        entityId: input.loanId,
        details: `Approved and disbursed loan of ${formatCurrency(loan.amount)} to user ${loan.userId}`,
      });

      return { success: true };
    }),

  rejectLoan: adminProcedure
    .input(z.object({
      loanId: z.number(),
      reason: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const loan = await getLoanById(input.loanId);
      if (!loan) throw new Error("Loan not found");

      await updateLoanStatus(input.loanId, "rejected", ctx.user.id, input.reason);

      await createNotification({
        userId: loan.userId,
        title: "Loan Application Rejected",
        message: `Your loan application was rejected. Reason: ${input.reason}`,
        type: "loan",
        isRead: 0,
      });

      await createAuditLog({
        userId: ctx.user.id,
        action: "loan_rejected",
        entityType: "loan",
        entityId: input.loanId,
        details: `Rejected loan for user ${loan.userId}. Reason: ${input.reason}`,
      });

      return { success: true };
    }),

  // Support ticket management
  getAllTickets: adminProcedure
    .input(z.object({ status: z.string().optional() }))
    .query(async ({ input }) => {
      return await getAllSupportTickets(input.status);
    }),

  updateTicketStatus: adminProcedure
    .input(z.object({
      ticketId: z.number(),
      status: z.enum(["open", "in_progress", "resolved", "closed"]),
    }))
    .mutation(async ({ ctx, input }) => {
      await updateSupportTicketStatus(input.ticketId, input.status, ctx.user.id);

      await createAuditLog({
        userId: ctx.user.id,
        action: "ticket_status_update",
        entityType: "support_ticket",
        entityId: input.ticketId,
        details: `Updated ticket status to ${input.status}`,
      });

      return { success: true };
    }),

  // System settings
  getSystemSettings: adminProcedure.query(async () => {
    return await getAllSystemSettings();
  }),

  updateSystemSetting: adminProcedure
    .input(z.object({
      key: z.string(),
      value: z.string(),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await setSystemSetting(input.key, input.value, input.description, ctx.user.id);

      await createAuditLog({
        userId: ctx.user.id,
        action: "system_setting_update",
        entityType: "system_setting",
        details: `Updated ${input.key} = ${input.value}`,
      });

      return { success: true };
    }),

  // Audit logs
  getAuditLogs: adminProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input }) => {
      return await getAllAuditLogs(input.limit);
    }),

  // All transactions
  getAllTransactions: adminProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ input }) => {
      const transactions = await getAllTransactions(input.limit);
      return transactions.map(t => ({
        ...t,
        formattedAmount: formatCurrency(t.amount, t.currency),
        formattedFee: formatCurrency(t.fee, t.currency),
      }));
    }),
});
