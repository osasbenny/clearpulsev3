import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// KYC Documents
export const kycDocuments = mysqlTable("kycDocuments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  documentType: mysqlEnum("documentType", ["id", "proof_of_address", "selfie"]).notNull(),
  documentUrl: text("documentUrl").notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  reviewedAt: timestamp("reviewedAt"),
  reviewedBy: int("reviewedBy"),
});

export type KycDocument = typeof kycDocuments.$inferSelect;
export type InsertKycDocument = typeof kycDocuments.$inferInsert;

// Bank Accounts
export const accounts = mysqlTable("accounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  accountNumber: varchar("accountNumber", { length: 20 }).notNull().unique(),
  accountType: mysqlEnum("accountType", ["checking", "savings"]).notNull(),
  balance: int("balance").default(0).notNull(), // stored in cents
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  status: mysqlEnum("status", ["active", "frozen", "closed"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Account = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;

// Transactions
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  fromAccountId: int("fromAccountId"),
  toAccountId: int("toAccountId"),
  amount: int("amount").notNull(), // stored in cents
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  transactionType: mysqlEnum("transactionType", ["transfer", "deposit", "withdrawal", "loan_disbursement", "loan_repayment", "fee"]).notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "cancelled"]).default("pending").notNull(),
  description: text("description"),
  reference: varchar("reference", { length: 100 }),
  swiftCode: varchar("swiftCode", { length: 11 }),
  fee: int("fee").default(0).notNull(), // stored in cents
  exchangeRate: varchar("exchangeRate", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

// Loans
export const loans = mysqlTable("loans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  accountId: int("accountId").notNull(),
  amount: int("amount").notNull(), // stored in cents
  interestRate: varchar("interestRate", { length: 10 }).notNull(), // stored as percentage string
  termMonths: int("termMonths").notNull(),
  monthlyPayment: int("monthlyPayment").notNull(), // stored in cents
  totalRepayment: int("totalRepayment").notNull(), // stored in cents
  remainingBalance: int("remainingBalance").notNull(), // stored in cents
  status: mysqlEnum("status", ["pending", "approved", "rejected", "active", "completed", "defaulted"]).default("pending").notNull(),
  purpose: text("purpose"),
  rejectionReason: text("rejectionReason"),
  appliedAt: timestamp("appliedAt").defaultNow().notNull(),
  approvedAt: timestamp("approvedAt"),
  approvedBy: int("approvedBy"),
  disbursedAt: timestamp("disbursedAt"),
  nextPaymentDue: timestamp("nextPaymentDue"),
});

export type Loan = typeof loans.$inferSelect;
export type InsertLoan = typeof loans.$inferInsert;

// Loan Repayments
export const loanRepayments = mysqlTable("loanRepayments", {
  id: int("id").autoincrement().primaryKey(),
  loanId: int("loanId").notNull(),
  transactionId: int("transactionId"),
  amount: int("amount").notNull(), // stored in cents
  principalAmount: int("principalAmount").notNull(), // stored in cents
  interestAmount: int("interestAmount").notNull(), // stored in cents
  dueDate: timestamp("dueDate").notNull(),
  paidAt: timestamp("paidAt"),
  status: mysqlEnum("status", ["scheduled", "paid", "overdue", "missed"]).default("scheduled").notNull(),
});

export type LoanRepayment = typeof loanRepayments.$inferSelect;
export type InsertLoanRepayment = typeof loanRepayments.$inferInsert;

// Cards
export const cards = mysqlTable("cards", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  accountId: int("accountId").notNull(),
  cardNumber: varchar("cardNumber", { length: 16 }).notNull().unique(),
  cardType: mysqlEnum("cardType", ["debit", "atm"]).notNull(),
  cvv: varchar("cvv", { length: 3 }).notNull(),
  expiryDate: varchar("expiryDate", { length: 7 }).notNull(), // MM/YYYY
  status: mysqlEnum("status", ["requested", "processing", "shipped", "active", "blocked", "expired"]).default("requested").notNull(),
  requestedAt: timestamp("requestedAt").defaultNow().notNull(),
  activatedAt: timestamp("activatedAt"),
  shippedAt: timestamp("shippedAt"),
});

export type Card = typeof cards.$inferSelect;
export type InsertCard = typeof cards.$inferInsert;

// Notifications
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["transaction", "login", "security", "loan", "card", "system"]).notNull(),
  isRead: int("isRead").default(0).notNull(), // 0 = false, 1 = true
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// Support Tickets
export const supportTickets = mysqlTable("supportTickets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "resolved", "closed"]).default("open").notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
  resolvedBy: int("resolvedBy"),
});

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

// Audit Logs
export const auditLogs = mysqlTable("auditLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 50 }),
  entityId: int("entityId"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  details: text("details"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

// System Settings
export const systemSettings = mysqlTable("systemSettings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 100 }).notNull().unique(),
  settingValue: text("settingValue").notNull(),
  description: text("description"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  updatedBy: int("updatedBy"),
});

export type SystemSetting = typeof systemSettings.$inferSelect;
export type InsertSystemSetting = typeof systemSettings.$inferInsert;