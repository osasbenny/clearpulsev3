import { eq, and, desc, sql, or, gte, lte } from "drizzle-orm";
import {
  accounts,
  transactions,
  loans,
  loanRepayments,
  cards,
  kycDocuments,
  notifications,
  supportTickets,
  auditLogs,
  systemSettings,
  InsertAccount,
  InsertTransaction,
  InsertLoan,
  InsertLoanRepayment,
  InsertCard,
  InsertKycDocument,
  InsertNotification,
  InsertSupportTicket,
  InsertAuditLog,
  InsertSystemSetting,
} from "../drizzle/schema";
import { getDb } from "./db";

// ============= Account Operations =============

export async function createAccount(data: InsertAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(accounts).values(data);
  return result;
}

export async function getAccountsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(accounts).where(eq(accounts.userId, userId));
}

export async function getAccountById(accountId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(accounts).where(eq(accounts.id, accountId)).limit(1);
  return result[0];
}

export async function getAccountByNumber(accountNumber: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(accounts).where(eq(accounts.accountNumber, accountNumber)).limit(1);
  return result[0];
}

export async function updateAccountBalance(accountId: number, newBalance: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(accounts).set({ balance: newBalance }).where(eq(accounts.id, accountId));
}

export async function updateAccountStatus(accountId: number, status: "active" | "frozen" | "closed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(accounts).set({ status }).where(eq(accounts.id, accountId));
}

// ============= Transaction Operations =============

export async function createTransaction(data: InsertTransaction) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(transactions).values(data);
  return result;
}

export async function getTransactionById(transactionId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(transactions).where(eq(transactions.id, transactionId)).limit(1);
  return result[0];
}

export async function getTransactionsByAccountId(accountId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(transactions)
    .where(or(eq(transactions.fromAccountId, accountId), eq(transactions.toAccountId, accountId)))
    .orderBy(desc(transactions.createdAt))
    .limit(limit);
}

export async function updateTransactionStatus(transactionId: number, status: "pending" | "completed" | "failed" | "cancelled") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { status };
  if (status === "completed") {
    updateData.completedAt = new Date();
  }
  
  await db.update(transactions).set(updateData).where(eq(transactions.id, transactionId));
}

export async function getAllTransactions(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(transactions).orderBy(desc(transactions.createdAt)).limit(limit);
}

// ============= Loan Operations =============

export async function createLoan(data: InsertLoan) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(loans).values(data);
  return result;
}

export async function getLoansByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(loans).where(eq(loans.userId, userId)).orderBy(desc(loans.appliedAt));
}

export async function getLoanById(loanId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(loans).where(eq(loans.id, loanId)).limit(1);
  return result[0];
}

export async function updateLoanStatus(loanId: number, status: "pending" | "approved" | "rejected" | "active" | "completed" | "defaulted", approvedBy?: number, rejectionReason?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { status };
  if (status === "approved") {
    updateData.approvedAt = new Date();
    if (approvedBy) updateData.approvedBy = approvedBy;
  }
  if (status === "rejected" && rejectionReason) {
    updateData.rejectionReason = rejectionReason;
  }
  
  await db.update(loans).set(updateData).where(eq(loans.id, loanId));
}

export async function updateLoanBalance(loanId: number, remainingBalance: number, nextPaymentDue?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { remainingBalance };
  if (nextPaymentDue) updateData.nextPaymentDue = nextPaymentDue;
  
  await db.update(loans).set(updateData).where(eq(loans.id, loanId));
}

export async function getAllLoans(status?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (status) {
    return await db.select().from(loans).where(eq(loans.status, status as any)).orderBy(desc(loans.appliedAt));
  }
  return await db.select().from(loans).orderBy(desc(loans.appliedAt));
}

// ============= Loan Repayment Operations =============

export async function createLoanRepayment(data: InsertLoanRepayment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(loanRepayments).values(data);
  return result;
}

export async function getRepaymentsByLoanId(loanId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(loanRepayments).where(eq(loanRepayments.loanId, loanId)).orderBy(loanRepayments.dueDate);
}

export async function updateRepaymentStatus(repaymentId: number, status: "scheduled" | "paid" | "overdue" | "missed", transactionId?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { status };
  if (status === "paid") {
    updateData.paidAt = new Date();
    if (transactionId) updateData.transactionId = transactionId;
  }
  
  await db.update(loanRepayments).set(updateData).where(eq(loanRepayments.id, repaymentId));
}

// ============= Card Operations =============

export async function createCard(data: InsertCard) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(cards).values(data);
  return result;
}

export async function getCardsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(cards).where(eq(cards.userId, userId)).orderBy(desc(cards.requestedAt));
}

export async function getCardById(cardId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(cards).where(eq(cards.id, cardId)).limit(1);
  return result[0];
}

export async function updateCardStatus(cardId: number, status: "requested" | "processing" | "shipped" | "active" | "blocked" | "expired") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { status };
  if (status === "shipped") updateData.shippedAt = new Date();
  if (status === "active") updateData.activatedAt = new Date();
  
  await db.update(cards).set(updateData).where(eq(cards.id, cardId));
}

// ============= KYC Operations =============

export async function createKycDocument(data: InsertKycDocument) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(kycDocuments).values(data);
  return result;
}

export async function getKycDocumentsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(kycDocuments).where(eq(kycDocuments.userId, userId)).orderBy(desc(kycDocuments.uploadedAt));
}

export async function updateKycStatus(documentId: number, status: "pending" | "approved" | "rejected", reviewedBy: number, rejectionReason?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { status, reviewedAt: new Date(), reviewedBy };
  if (rejectionReason) updateData.rejectionReason = rejectionReason;
  
  await db.update(kycDocuments).set(updateData).where(eq(kycDocuments.id, documentId));
}

export async function getAllKycDocuments(status?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (status) {
    return await db.select().from(kycDocuments).where(eq(kycDocuments.status, status as any)).orderBy(desc(kycDocuments.uploadedAt));
  }
  return await db.select().from(kycDocuments).orderBy(desc(kycDocuments.uploadedAt));
}

// ============= Notification Operations =============

export async function createNotification(data: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(notifications).values(data);
  return result;
}

export async function getNotificationsByUserId(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(limit);
}

export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(notifications).set({ isRead: 1 }).where(eq(notifications.id, notificationId));
}

export async function markAllNotificationsAsRead(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(notifications).set({ isRead: 1 }).where(eq(notifications.userId, userId));
}

// ============= Support Ticket Operations =============

export async function createSupportTicket(data: InsertSupportTicket) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(supportTickets).values(data);
  return result;
}

export async function getSupportTicketsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(supportTickets).where(eq(supportTickets.userId, userId)).orderBy(desc(supportTickets.createdAt));
}

export async function getAllSupportTickets(status?: string) {
  const db = await getDb();
  if (!db) return [];
  
  if (status) {
    return await db.select().from(supportTickets).where(eq(supportTickets.status, status as any)).orderBy(desc(supportTickets.createdAt));
  }
  return await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
}

export async function updateSupportTicketStatus(ticketId: number, status: "open" | "in_progress" | "resolved" | "closed", resolvedBy?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { status };
  if (status === "resolved" || status === "closed") {
    updateData.resolvedAt = new Date();
    if (resolvedBy) updateData.resolvedBy = resolvedBy;
  }
  
  await db.update(supportTickets).set(updateData).where(eq(supportTickets.id, ticketId));
}

// ============= Audit Log Operations =============

export async function createAuditLog(data: InsertAuditLog) {
  const db = await getDb();
  if (!db) return;
  
  try {
    await db.insert(auditLogs).values(data);
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}

export async function getAuditLogsByUserId(userId: number, limit = 100) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(auditLogs).where(eq(auditLogs.userId, userId)).orderBy(desc(auditLogs.createdAt)).limit(limit);
}

export async function getAllAuditLogs(limit = 200) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limit);
}

// ============= System Settings Operations =============

export async function getSystemSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(systemSettings).where(eq(systemSettings.settingKey, key)).limit(1);
  return result[0];
}

export async function setSystemSetting(key: string, value: string, description?: string, updatedBy?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getSystemSetting(key);
  
  if (existing) {
    await db.update(systemSettings).set({ settingValue: value, updatedBy }).where(eq(systemSettings.settingKey, key));
  } else {
    await db.insert(systemSettings).values({ settingKey: key, settingValue: value, description, updatedBy });
  }
}

export async function getAllSystemSettings() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(systemSettings);
}
