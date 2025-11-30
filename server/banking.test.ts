import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(role: "user" | "admin" = "user"): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-openid",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Banking Router", () => {
  it("should get user accounts", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const accounts = await caller.banking.getAccounts();
    expect(Array.isArray(accounts)).toBe(true);
  });

  it("should create a new account", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.banking.createAccount({
      accountType: "checking",
      currency: "USD",
    });

    expect(result.success).toBe(true);
    expect(result.accountNumber).toBeDefined();
  });

  it("should get exchange rate", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.banking.getExchangeRate({
      from: "USD",
      to: "EUR",
    });

    expect(result.rate).toBeDefined();
    expect(result.from).toBe("USD");
    expect(result.to).toBe("EUR");
  });
});

describe("Loans Router", () => {
  it("should calculate loan details", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.loans.calculateLoan({
      amount: 10000,
      interestRate: 5,
      termMonths: 12,
    });

    expect(result.monthlyPayment).toBeDefined();
    expect(result.totalRepayment).toBeDefined();
    expect(result.totalInterest).toBeDefined();
    expect(result.schedule).toBeDefined();
    expect(result.schedule.length).toBe(12);
  });

  it("should get user loans", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const loans = await caller.loans.getLoans();
    expect(Array.isArray(loans)).toBe(true);
  });
});

describe("Cards Router", () => {
  it("should get user cards", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const cards = await caller.cards.getCards();
    expect(Array.isArray(cards)).toBe(true);
  });
});

describe("KYC Router", () => {
  it("should get KYC documents", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const documents = await caller.kyc.getDocuments();
    expect(Array.isArray(documents)).toBe(true);
  });

  it("should get KYC status", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const status = await caller.kyc.getKycStatus();
    expect(status.status).toBeDefined();
    expect(status.overallStatus).toBeDefined();
    expect(status.documents).toBeDefined();
  });
});

describe("User Router", () => {
  it("should get user profile", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const profile = await caller.user.getProfile();
    expect(profile.id).toBe(1);
    expect(profile.email).toBe("test@example.com");
    expect(profile.name).toBe("Test User");
  });

  it("should get notifications", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const notifications = await caller.user.getNotifications({ limit: 10 });
    expect(Array.isArray(notifications)).toBe(true);
  });

  it("should get support tickets", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const tickets = await caller.user.getSupportTickets();
    expect(Array.isArray(tickets)).toBe(true);
  });
});

describe("Admin Router - Access Control", () => {
  it("should deny non-admin access to admin routes", async () => {
    const { ctx } = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.getDashboardStats()).rejects.toThrow();
  });

  it("should allow admin access to admin routes", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.admin.getDashboardStats();
    expect(stats).toBeDefined();
    expect(stats.totalUsers).toBeDefined();
  });

  it("should get pending KYC documents for admin", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const pendingKyc = await caller.admin.getPendingKyc();
    expect(Array.isArray(pendingKyc)).toBe(true);
  });

  it("should get pending loans for admin", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const pendingLoans = await caller.admin.getPendingLoans();
    expect(Array.isArray(pendingLoans)).toBe(true);
  });
});
