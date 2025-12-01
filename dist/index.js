var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc3) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc3 = __getOwnPropDesc(from, key)) || desc3.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  accounts: () => accounts,
  auditLogs: () => auditLogs,
  cards: () => cards,
  kycDocuments: () => kycDocuments,
  loanRepayments: () => loanRepayments,
  loans: () => loans,
  notifications: () => notifications,
  supportTickets: () => supportTickets,
  systemSettings: () => systemSettings,
  transactions: () => transactions,
  users: () => users
});
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
var users, kycDocuments, accounts, transactions, loans, loanRepayments, cards, notifications, supportTickets, auditLogs, systemSettings;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
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
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    kycDocuments = mysqlTable("kycDocuments", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      documentType: mysqlEnum("documentType", ["id", "proof_of_address", "selfie"]).notNull(),
      documentUrl: text("documentUrl").notNull(),
      status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
      rejectionReason: text("rejectionReason"),
      uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
      reviewedAt: timestamp("reviewedAt"),
      reviewedBy: int("reviewedBy")
    });
    accounts = mysqlTable("accounts", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      accountNumber: varchar("accountNumber", { length: 20 }).notNull().unique(),
      accountType: mysqlEnum("accountType", ["checking", "savings"]).notNull(),
      balance: int("balance").default(0).notNull(),
      // stored in cents
      currency: varchar("currency", { length: 3 }).default("USD").notNull(),
      status: mysqlEnum("status", ["active", "frozen", "closed"]).default("active").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    transactions = mysqlTable("transactions", {
      id: int("id").autoincrement().primaryKey(),
      fromAccountId: int("fromAccountId"),
      toAccountId: int("toAccountId"),
      amount: int("amount").notNull(),
      // stored in cents
      currency: varchar("currency", { length: 3 }).default("USD").notNull(),
      transactionType: mysqlEnum("transactionType", ["transfer", "deposit", "withdrawal", "loan_disbursement", "loan_repayment", "fee"]).notNull(),
      status: mysqlEnum("status", ["pending", "completed", "failed", "cancelled"]).default("pending").notNull(),
      description: text("description"),
      reference: varchar("reference", { length: 100 }),
      swiftCode: varchar("swiftCode", { length: 11 }),
      fee: int("fee").default(0).notNull(),
      // stored in cents
      exchangeRate: varchar("exchangeRate", { length: 20 }),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      completedAt: timestamp("completedAt")
    });
    loans = mysqlTable("loans", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      accountId: int("accountId").notNull(),
      amount: int("amount").notNull(),
      // stored in cents
      interestRate: varchar("interestRate", { length: 10 }).notNull(),
      // stored as percentage string
      termMonths: int("termMonths").notNull(),
      monthlyPayment: int("monthlyPayment").notNull(),
      // stored in cents
      totalRepayment: int("totalRepayment").notNull(),
      // stored in cents
      remainingBalance: int("remainingBalance").notNull(),
      // stored in cents
      status: mysqlEnum("status", ["pending", "approved", "rejected", "active", "completed", "defaulted"]).default("pending").notNull(),
      purpose: text("purpose"),
      rejectionReason: text("rejectionReason"),
      appliedAt: timestamp("appliedAt").defaultNow().notNull(),
      approvedAt: timestamp("approvedAt"),
      approvedBy: int("approvedBy"),
      disbursedAt: timestamp("disbursedAt"),
      nextPaymentDue: timestamp("nextPaymentDue")
    });
    loanRepayments = mysqlTable("loanRepayments", {
      id: int("id").autoincrement().primaryKey(),
      loanId: int("loanId").notNull(),
      transactionId: int("transactionId"),
      amount: int("amount").notNull(),
      // stored in cents
      principalAmount: int("principalAmount").notNull(),
      // stored in cents
      interestAmount: int("interestAmount").notNull(),
      // stored in cents
      dueDate: timestamp("dueDate").notNull(),
      paidAt: timestamp("paidAt"),
      status: mysqlEnum("status", ["scheduled", "paid", "overdue", "missed"]).default("scheduled").notNull()
    });
    cards = mysqlTable("cards", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      accountId: int("accountId").notNull(),
      cardNumber: varchar("cardNumber", { length: 16 }).notNull().unique(),
      cardType: mysqlEnum("cardType", ["debit", "atm"]).notNull(),
      cvv: varchar("cvv", { length: 3 }).notNull(),
      expiryDate: varchar("expiryDate", { length: 7 }).notNull(),
      // MM/YYYY
      status: mysqlEnum("status", ["requested", "processing", "shipped", "active", "blocked", "expired"]).default("requested").notNull(),
      requestedAt: timestamp("requestedAt").defaultNow().notNull(),
      activatedAt: timestamp("activatedAt"),
      shippedAt: timestamp("shippedAt")
    });
    notifications = mysqlTable("notifications", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      message: text("message").notNull(),
      type: mysqlEnum("type", ["transaction", "login", "security", "loan", "card", "system"]).notNull(),
      isRead: int("isRead").default(0).notNull(),
      // 0 = false, 1 = true
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    supportTickets = mysqlTable("supportTickets", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull(),
      subject: varchar("subject", { length: 255 }).notNull(),
      message: text("message").notNull(),
      status: mysqlEnum("status", ["open", "in_progress", "resolved", "closed"]).default("open").notNull(),
      priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      resolvedAt: timestamp("resolvedAt"),
      resolvedBy: int("resolvedBy")
    });
    auditLogs = mysqlTable("auditLogs", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId"),
      action: varchar("action", { length: 100 }).notNull(),
      entityType: varchar("entityType", { length: 50 }),
      entityId: int("entityId"),
      ipAddress: varchar("ipAddress", { length: 45 }),
      userAgent: text("userAgent"),
      details: text("details"),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    systemSettings = mysqlTable("systemSettings", {
      id: int("id").autoincrement().primaryKey(),
      settingKey: varchar("settingKey", { length: 100 }).notNull().unique(),
      settingValue: text("settingValue").notNull(),
      description: text("description"),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      updatedBy: int("updatedBy")
    });
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/db.ts
init_schema();
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
};

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers/banking.ts
import { z as z2 } from "zod";

// server/banking.ts
init_schema();
import { eq as eq2, desc, or } from "drizzle-orm";
async function createAccount(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(accounts).values(data);
  return result;
}
async function getAccountsByUserId(userId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(accounts).where(eq2(accounts.userId, userId));
}
async function getAccountById(accountId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(accounts).where(eq2(accounts.id, accountId)).limit(1);
  return result[0];
}
async function getAccountByNumber(accountNumber) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(accounts).where(eq2(accounts.accountNumber, accountNumber)).limit(1);
  return result[0];
}
async function updateAccountBalance(accountId, newBalance) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(accounts).set({ balance: newBalance }).where(eq2(accounts.id, accountId));
}
async function updateAccountStatus(accountId, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(accounts).set({ status }).where(eq2(accounts.id, accountId));
}
async function createTransaction(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(transactions).values(data);
  return result;
}
async function getTransactionsByAccountId(accountId, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(transactions).where(or(eq2(transactions.fromAccountId, accountId), eq2(transactions.toAccountId, accountId))).orderBy(desc(transactions.createdAt)).limit(limit);
}
async function getAllTransactions(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(transactions).orderBy(desc(transactions.createdAt)).limit(limit);
}
async function createLoan(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(loans).values(data);
  return result;
}
async function getLoansByUserId(userId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(loans).where(eq2(loans.userId, userId)).orderBy(desc(loans.appliedAt));
}
async function getLoanById(loanId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(loans).where(eq2(loans.id, loanId)).limit(1);
  return result[0];
}
async function updateLoanStatus(loanId, status, approvedBy, rejectionReason) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData = { status };
  if (status === "approved") {
    updateData.approvedAt = /* @__PURE__ */ new Date();
    if (approvedBy) updateData.approvedBy = approvedBy;
  }
  if (status === "rejected" && rejectionReason) {
    updateData.rejectionReason = rejectionReason;
  }
  await db.update(loans).set(updateData).where(eq2(loans.id, loanId));
}
async function updateLoanBalance(loanId, remainingBalance, nextPaymentDue) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData = { remainingBalance };
  if (nextPaymentDue) updateData.nextPaymentDue = nextPaymentDue;
  await db.update(loans).set(updateData).where(eq2(loans.id, loanId));
}
async function getAllLoans(status) {
  const db = await getDb();
  if (!db) return [];
  if (status) {
    return await db.select().from(loans).where(eq2(loans.status, status)).orderBy(desc(loans.appliedAt));
  }
  return await db.select().from(loans).orderBy(desc(loans.appliedAt));
}
async function getRepaymentsByLoanId(loanId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(loanRepayments).where(eq2(loanRepayments.loanId, loanId)).orderBy(loanRepayments.dueDate);
}
async function createCard(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(cards).values(data);
  return result;
}
async function getCardsByUserId(userId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(cards).where(eq2(cards.userId, userId)).orderBy(desc(cards.requestedAt));
}
async function createKycDocument(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(kycDocuments).values(data);
  return result;
}
async function getKycDocumentsByUserId(userId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(kycDocuments).where(eq2(kycDocuments.userId, userId)).orderBy(desc(kycDocuments.uploadedAt));
}
async function updateKycStatus(documentId, status, reviewedBy, rejectionReason) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData = { status, reviewedAt: /* @__PURE__ */ new Date(), reviewedBy };
  if (rejectionReason) updateData.rejectionReason = rejectionReason;
  await db.update(kycDocuments).set(updateData).where(eq2(kycDocuments.id, documentId));
}
async function getAllKycDocuments(status) {
  const db = await getDb();
  if (!db) return [];
  if (status) {
    return await db.select().from(kycDocuments).where(eq2(kycDocuments.status, status)).orderBy(desc(kycDocuments.uploadedAt));
  }
  return await db.select().from(kycDocuments).orderBy(desc(kycDocuments.uploadedAt));
}
async function createNotification(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(notifications).values(data);
  return result;
}
async function getNotificationsByUserId(userId, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(notifications).where(eq2(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(limit);
}
async function markNotificationAsRead(notificationId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(notifications).set({ isRead: 1 }).where(eq2(notifications.id, notificationId));
}
async function markAllNotificationsAsRead(userId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(notifications).set({ isRead: 1 }).where(eq2(notifications.userId, userId));
}
async function createSupportTicket(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(supportTickets).values(data);
  return result;
}
async function getSupportTicketsByUserId(userId) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(supportTickets).where(eq2(supportTickets.userId, userId)).orderBy(desc(supportTickets.createdAt));
}
async function getAllSupportTickets(status) {
  const db = await getDb();
  if (!db) return [];
  if (status) {
    return await db.select().from(supportTickets).where(eq2(supportTickets.status, status)).orderBy(desc(supportTickets.createdAt));
  }
  return await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
}
async function updateSupportTicketStatus(ticketId, status, resolvedBy) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData = { status };
  if (status === "resolved" || status === "closed") {
    updateData.resolvedAt = /* @__PURE__ */ new Date();
    if (resolvedBy) updateData.resolvedBy = resolvedBy;
  }
  await db.update(supportTickets).set(updateData).where(eq2(supportTickets.id, ticketId));
}
async function createAuditLog(data) {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(auditLogs).values(data);
  } catch (error) {
    console.error("Failed to create audit log:", error);
  }
}
async function getAuditLogsByUserId(userId, limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(auditLogs).where(eq2(auditLogs.userId, userId)).orderBy(desc(auditLogs.createdAt)).limit(limit);
}
async function getAllAuditLogs(limit = 200) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(limit);
}
async function getSystemSetting(key) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(systemSettings).where(eq2(systemSettings.settingKey, key)).limit(1);
  return result[0];
}
async function setSystemSetting(key, value, description, updatedBy) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSystemSetting(key);
  if (existing) {
    await db.update(systemSettings).set({ settingValue: value, updatedBy }).where(eq2(systemSettings.settingKey, key));
  } else {
    await db.insert(systemSettings).values({ settingKey: key, settingValue: value, description, updatedBy });
  }
}
async function getAllSystemSettings() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(systemSettings);
}

// server/utils.ts
import { nanoid } from "nanoid";
function generateAccountNumber() {
  const timestamp2 = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1e4).toString().padStart(4, "0");
  return `${timestamp2}${random}`;
}
function generateCardNumber() {
  const parts = [];
  for (let i = 0; i < 4; i++) {
    parts.push(Math.floor(Math.random() * 1e4).toString().padStart(4, "0"));
  }
  return parts.join("").slice(0, 16);
}
function generateCVV() {
  return Math.floor(Math.random() * 1e3).toString().padStart(3, "0");
}
function generateCardExpiry() {
  const now = /* @__PURE__ */ new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear() + 5;
  return `${month}/${year}`;
}
function formatCurrency(cents, currency = "USD") {
  const amount = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount);
}
function maskAccountNumber(accountNumber) {
  if (accountNumber.length <= 4) return accountNumber;
  return `****${accountNumber.slice(-4)}`;
}
function maskCardNumber(cardNumber) {
  if (cardNumber.length <= 4) return cardNumber;
  return `**** **** **** ${cardNumber.slice(-4)}`;
}
function generateTransactionReference() {
  return `TXN${Date.now()}${nanoid(6).toUpperCase()}`;
}
function calculateLoanRepayment(principal, annualInterestRate, termMonths) {
  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyPayment = Math.round(
    principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths) / (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
  let remainingBalance = principal;
  const schedule = [];
  for (let month = 1; month <= termMonths; month++) {
    const interestAmount = Math.round(remainingBalance * monthlyRate);
    const principalAmount = monthlyPayment - interestAmount;
    remainingBalance -= principalAmount;
    if (month === termMonths && remainingBalance !== 0) {
      const adjustment = remainingBalance;
      remainingBalance = 0;
      schedule.push({
        month,
        principalAmount: principalAmount + adjustment,
        interestAmount,
        totalAmount: monthlyPayment + adjustment,
        remainingBalance: 0
      });
    } else {
      schedule.push({
        month,
        principalAmount,
        interestAmount,
        totalAmount: monthlyPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }
  }
  const totalRepayment = schedule.reduce((sum, payment) => sum + payment.totalAmount, 0);
  return {
    monthlyPayment,
    totalRepayment,
    schedule
  };
}
function getExchangeRate(fromCurrency, toCurrency) {
  const rates = {
    USD: { USD: 1, EUR: 0.92, GBP: 0.79 },
    EUR: { USD: 1.09, EUR: 1, GBP: 0.86 },
    GBP: { USD: 1.27, EUR: 1.16, GBP: 1 }
  };
  return rates[fromCurrency]?.[toCurrency] || 1;
}
function convertCurrency(amount, fromCurrency, toCurrency) {
  const rate = getExchangeRate(fromCurrency, toCurrency);
  return Math.round(amount * rate);
}
function isValidSwiftCode(swiftCode) {
  const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
  return swiftRegex.test(swiftCode);
}

// server/routers/banking.ts
var bankingRouter = router({
  // Get user's accounts
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    const accounts2 = await getAccountsByUserId(ctx.user.id);
    return accounts2.map((acc) => ({
      ...acc,
      maskedNumber: maskAccountNumber(acc.accountNumber),
      formattedBalance: formatCurrency(acc.balance, acc.currency)
    }));
  }),
  // Create new account
  createAccount: protectedProcedure.input(z2.object({
    accountType: z2.enum(["checking", "savings"]),
    currency: z2.string().default("USD")
  })).mutation(async ({ ctx, input }) => {
    const accountNumber = generateAccountNumber();
    await createAccount({
      userId: ctx.user.id,
      accountNumber,
      accountType: input.accountType,
      currency: input.currency,
      balance: 0,
      status: "active"
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "account_created",
      entityType: "account",
      details: `Created ${input.accountType} account`
    });
    return { success: true, accountNumber };
  }),
  // Get account transactions
  getTransactions: protectedProcedure.input(z2.object({
    accountId: z2.number(),
    limit: z2.number().optional()
  })).query(async ({ ctx, input }) => {
    const account = await getAccountById(input.accountId);
    if (!account || account.userId !== ctx.user.id) {
      throw new Error("Account not found or unauthorized");
    }
    const transactions2 = await getTransactionsByAccountId(input.accountId, input.limit);
    return transactions2.map((txn) => ({
      ...txn,
      formattedAmount: formatCurrency(txn.amount, txn.currency),
      formattedFee: formatCurrency(txn.fee, txn.currency)
    }));
  }),
  // Local transfer (between internal accounts)
  localTransfer: protectedProcedure.input(z2.object({
    fromAccountId: z2.number(),
    toAccountNumber: z2.string(),
    amount: z2.number().positive(),
    description: z2.string().optional()
  })).mutation(async ({ ctx, input }) => {
    const fromAccount = await getAccountById(input.fromAccountId);
    if (!fromAccount || fromAccount.userId !== ctx.user.id) {
      throw new Error("Source account not found or unauthorized");
    }
    if (fromAccount.status !== "active") {
      throw new Error("Source account is not active");
    }
    const toAccount = await getAccountByNumber(input.toAccountNumber);
    if (!toAccount) {
      throw new Error("Destination account not found");
    }
    if (toAccount.status !== "active") {
      throw new Error("Destination account is not active");
    }
    const amountInCents = Math.round(input.amount * 100);
    if (fromAccount.balance < amountInCents) {
      throw new Error("Insufficient funds");
    }
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
      completedAt: /* @__PURE__ */ new Date()
    });
    await updateAccountBalance(fromAccount.id, fromAccount.balance - amountInCents);
    await updateAccountBalance(toAccount.id, toAccount.balance + amountInCents);
    await createNotification({
      userId: ctx.user.id,
      title: "Transfer Sent",
      message: `You sent ${formatCurrency(amountInCents, fromAccount.currency)} to account ${maskAccountNumber(toAccount.accountNumber)}`,
      type: "transaction",
      isRead: 0
    });
    await createNotification({
      userId: toAccount.userId,
      title: "Transfer Received",
      message: `You received ${formatCurrency(amountInCents, fromAccount.currency)} from account ${maskAccountNumber(fromAccount.accountNumber)}`,
      type: "transaction",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "local_transfer",
      entityType: "transaction",
      details: `Transferred ${formatCurrency(amountInCents, fromAccount.currency)} to ${maskAccountNumber(toAccount.accountNumber)}`
    });
    return { success: true, reference };
  }),
  // International transfer
  internationalTransfer: protectedProcedure.input(z2.object({
    fromAccountId: z2.number(),
    toAccountNumber: z2.string(),
    amount: z2.number().positive(),
    currency: z2.string(),
    swiftCode: z2.string(),
    recipientName: z2.string(),
    recipientBank: z2.string(),
    description: z2.string().optional()
  })).mutation(async ({ ctx, input }) => {
    const fromAccount = await getAccountById(input.fromAccountId);
    if (!fromAccount || fromAccount.userId !== ctx.user.id) {
      throw new Error("Source account not found or unauthorized");
    }
    if (fromAccount.status !== "active") {
      throw new Error("Source account is not active");
    }
    if (!isValidSwiftCode(input.swiftCode)) {
      throw new Error("Invalid SWIFT code format");
    }
    const amountInCents = Math.round(input.amount * 100);
    const fee = Math.round(amountInCents * 0.02);
    const totalAmount = amountInCents + fee;
    if (fromAccount.balance < totalAmount) {
      throw new Error("Insufficient funds (including fees)");
    }
    const exchangeRate = getExchangeRate(fromAccount.currency, input.currency);
    const convertedAmount = convertCurrency(amountInCents, fromAccount.currency, input.currency);
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
      exchangeRate: exchangeRate.toString()
    });
    await updateAccountBalance(fromAccount.id, fromAccount.balance - totalAmount);
    await createNotification({
      userId: ctx.user.id,
      title: "International Transfer Initiated",
      message: `Your transfer of ${formatCurrency(amountInCents, fromAccount.currency)} to ${input.recipientName} is being processed. Fee: ${formatCurrency(fee, fromAccount.currency)}`,
      type: "transaction",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "international_transfer",
      entityType: "transaction",
      details: `International transfer of ${formatCurrency(amountInCents, fromAccount.currency)} to ${input.recipientName} (${input.swiftCode})`
    });
    return {
      success: true,
      reference,
      fee: formatCurrency(fee, fromAccount.currency),
      exchangeRate,
      convertedAmount: formatCurrency(convertedAmount, input.currency)
    };
  }),
  // Get exchange rate
  getExchangeRate: protectedProcedure.input(z2.object({
    from: z2.string(),
    to: z2.string()
  })).query(({ input }) => {
    const rate = getExchangeRate(input.from, input.to);
    return { rate, from: input.from, to: input.to };
  })
});

// server/routers/loans.ts
import { z as z3 } from "zod";
var loansRouter = router({
  // Get user's loans
  getLoans: protectedProcedure.query(async ({ ctx }) => {
    const loans2 = await getLoansByUserId(ctx.user.id);
    return loans2.map((loan) => ({
      ...loan,
      formattedAmount: formatCurrency(loan.amount),
      formattedMonthlyPayment: formatCurrency(loan.monthlyPayment),
      formattedTotalRepayment: formatCurrency(loan.totalRepayment),
      formattedRemainingBalance: formatCurrency(loan.remainingBalance)
    }));
  }),
  // Calculate loan details
  calculateLoan: protectedProcedure.input(z3.object({
    amount: z3.number().positive(),
    interestRate: z3.number().positive(),
    termMonths: z3.number().int().positive()
  })).query(({ input }) => {
    const amountInCents = Math.round(input.amount * 100);
    const calculation = calculateLoanRepayment(amountInCents, input.interestRate, input.termMonths);
    return {
      monthlyPayment: formatCurrency(calculation.monthlyPayment),
      totalRepayment: formatCurrency(calculation.totalRepayment),
      totalInterest: formatCurrency(calculation.totalRepayment - amountInCents),
      schedule: calculation.schedule.map((item) => ({
        ...item,
        formattedPrincipal: formatCurrency(item.principalAmount),
        formattedInterest: formatCurrency(item.interestAmount),
        formattedTotal: formatCurrency(item.totalAmount),
        formattedRemaining: formatCurrency(item.remainingBalance)
      }))
    };
  }),
  // Apply for loan
  applyForLoan: protectedProcedure.input(z3.object({
    accountId: z3.number(),
    amount: z3.number().positive(),
    interestRate: z3.number().positive(),
    termMonths: z3.number().int().positive(),
    purpose: z3.string()
  })).mutation(async ({ ctx, input }) => {
    const account = await getAccountById(input.accountId);
    if (!account || account.userId !== ctx.user.id) {
      throw new Error("Account not found or unauthorized");
    }
    if (account.status !== "active") {
      throw new Error("Account is not active");
    }
    const amountInCents = Math.round(input.amount * 100);
    const calculation = calculateLoanRepayment(amountInCents, input.interestRate, input.termMonths);
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
      purpose: input.purpose
    });
    await createNotification({
      userId: ctx.user.id,
      title: "Loan Application Submitted",
      message: `Your loan application for ${formatCurrency(amountInCents)} has been submitted and is pending review.`,
      type: "loan",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "loan_application",
      entityType: "loan",
      details: `Applied for loan of ${formatCurrency(amountInCents)} for ${input.termMonths} months`
    });
    return { success: true };
  }),
  // Get loan details with repayment schedule
  getLoanDetails: protectedProcedure.input(z3.object({ loanId: z3.number() })).query(async ({ ctx, input }) => {
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
      repayments: repayments.map((r) => ({
        ...r,
        formattedAmount: formatCurrency(r.amount),
        formattedPrincipal: formatCurrency(r.principalAmount),
        formattedInterest: formatCurrency(r.interestAmount)
      }))
    };
  }),
  // Make loan repayment
  makeRepayment: protectedProcedure.input(z3.object({
    loanId: z3.number(),
    amount: z3.number().positive()
  })).mutation(async ({ ctx, input }) => {
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
    if (account.balance < amountInCents) {
      throw new Error("Insufficient funds");
    }
    const txnResult = await createTransaction({
      fromAccountId: account.id,
      toAccountId: null,
      amount: amountInCents,
      currency: account.currency,
      transactionType: "loan_repayment",
      status: "completed",
      description: `Loan repayment for loan #${loan.id}`,
      fee: 0,
      completedAt: /* @__PURE__ */ new Date()
    });
    await updateAccountBalance(account.id, account.balance - amountInCents);
    const newBalance = loan.remainingBalance - amountInCents;
    const nextPaymentDue = loan.nextPaymentDue ? new Date(loan.nextPaymentDue.getTime() + 30 * 24 * 60 * 60 * 1e3) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3);
    await updateLoanBalance(loan.id, Math.max(0, newBalance), nextPaymentDue);
    if (newBalance <= 0) {
      await updateLoanStatus(loan.id, "completed");
    }
    await createNotification({
      userId: ctx.user.id,
      title: "Loan Repayment Successful",
      message: `Your payment of ${formatCurrency(amountInCents)} has been applied to your loan. Remaining balance: ${formatCurrency(Math.max(0, newBalance))}`,
      type: "loan",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "loan_repayment",
      entityType: "loan",
      entityId: loan.id,
      details: `Repaid ${formatCurrency(amountInCents)} towards loan`
    });
    return { success: true, remainingBalance: Math.max(0, newBalance) };
  })
});

// server/routers/cards.ts
import { z as z4 } from "zod";
var cardsRouter = router({
  // Get user's cards
  getCards: protectedProcedure.query(async ({ ctx }) => {
    const cards2 = await getCardsByUserId(ctx.user.id);
    return cards2.map((card) => ({
      ...card,
      maskedNumber: maskCardNumber(card.cardNumber),
      // Don't expose full card number and CVV in regular queries
      cardNumber: maskCardNumber(card.cardNumber),
      cvv: "***"
    }));
  }),
  // Request new card
  requestCard: protectedProcedure.input(z4.object({
    accountId: z4.number(),
    cardType: z4.enum(["debit", "atm"])
  })).mutation(async ({ ctx, input }) => {
    const account = await getAccountById(input.accountId);
    if (!account || account.userId !== ctx.user.id) {
      throw new Error("Account not found or unauthorized");
    }
    if (account.status !== "active") {
      throw new Error("Account is not active");
    }
    const cardNumber = generateCardNumber();
    const cvv = generateCVV();
    const expiryDate = generateCardExpiry();
    await createCard({
      userId: ctx.user.id,
      accountId: input.accountId,
      cardNumber,
      cardType: input.cardType,
      cvv,
      expiryDate,
      status: "requested"
    });
    await createNotification({
      userId: ctx.user.id,
      title: "Card Request Received",
      message: `Your ${input.cardType} card request has been received and is being processed.`,
      type: "card",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "card_request",
      entityType: "card",
      details: `Requested ${input.cardType} card for account ${account.accountNumber}`
    });
    return { success: true };
  }),
  // Get card details (with full info for active cards)
  getCardDetails: protectedProcedure.input(z4.object({ cardId: z4.number() })).query(async ({ ctx, input }) => {
    const cards2 = await getCardsByUserId(ctx.user.id);
    const card = cards2.find((c) => c.id === input.cardId);
    if (!card) {
      throw new Error("Card not found or unauthorized");
    }
    if (card.status === "active") {
      return {
        ...card,
        maskedNumber: maskCardNumber(card.cardNumber)
      };
    }
    return {
      ...card,
      cardNumber: maskCardNumber(card.cardNumber),
      cvv: "***",
      maskedNumber: maskCardNumber(card.cardNumber)
    };
  })
});

// server/routers/kyc.ts
import { z as z5 } from "zod";
var kycRouter = router({
  // Get user's KYC documents
  getDocuments: protectedProcedure.query(async ({ ctx }) => {
    return await getKycDocumentsByUserId(ctx.user.id);
  }),
  // Upload KYC document
  uploadDocument: protectedProcedure.input(z5.object({
    documentType: z5.enum(["id", "proof_of_address", "selfie"]),
    documentUrl: z5.string().url()
  })).mutation(async ({ ctx, input }) => {
    await createKycDocument({
      userId: ctx.user.id,
      documentType: input.documentType,
      documentUrl: input.documentUrl,
      status: "pending"
    });
    await createNotification({
      userId: ctx.user.id,
      title: "KYC Document Uploaded",
      message: `Your ${input.documentType.replace("_", " ")} has been uploaded and is pending review.`,
      type: "system",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "kyc_upload",
      entityType: "kyc",
      details: `Uploaded ${input.documentType} document`
    });
    return { success: true };
  }),
  // Get KYC status summary
  getKycStatus: protectedProcedure.query(async ({ ctx }) => {
    const documents = await getKycDocumentsByUserId(ctx.user.id);
    const status = {
      id: documents.find((d) => d.documentType === "id")?.status || "not_uploaded",
      proof_of_address: documents.find((d) => d.documentType === "proof_of_address")?.status || "not_uploaded",
      selfie: documents.find((d) => d.documentType === "selfie")?.status || "not_uploaded"
    };
    const allApproved = Object.values(status).every((s) => s === "approved");
    const anyRejected = Object.values(status).some((s) => s === "rejected");
    const anyPending = Object.values(status).some((s) => s === "pending");
    return {
      status,
      overallStatus: allApproved ? "verified" : anyRejected ? "rejected" : anyPending ? "pending" : "incomplete",
      documents
    };
  })
});

// server/routers/user.ts
import { z as z6 } from "zod";
var userRouter = router({
  // Get user profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return {
      id: ctx.user.id,
      name: ctx.user.name,
      email: ctx.user.email,
      role: ctx.user.role,
      createdAt: ctx.user.createdAt,
      lastSignedIn: ctx.user.lastSignedIn
    };
  }),
  // Get notifications
  getNotifications: protectedProcedure.input(z6.object({ limit: z6.number().optional() })).query(async ({ ctx, input }) => {
    return await getNotificationsByUserId(ctx.user.id, input.limit);
  }),
  // Mark notification as read
  markNotificationRead: protectedProcedure.input(z6.object({ notificationId: z6.number() })).mutation(async ({ input }) => {
    await markNotificationAsRead(input.notificationId);
    return { success: true };
  }),
  // Mark all notifications as read
  markAllNotificationsRead: protectedProcedure.mutation(async ({ ctx }) => {
    await markAllNotificationsAsRead(ctx.user.id);
    return { success: true };
  }),
  // Get support tickets
  getSupportTickets: protectedProcedure.query(async ({ ctx }) => {
    return await getSupportTicketsByUserId(ctx.user.id);
  }),
  // Create support ticket
  createSupportTicket: protectedProcedure.input(z6.object({
    subject: z6.string(),
    message: z6.string(),
    priority: z6.enum(["low", "medium", "high", "urgent"]).optional()
  })).mutation(async ({ ctx, input }) => {
    await createSupportTicket({
      userId: ctx.user.id,
      subject: input.subject,
      message: input.message,
      priority: input.priority || "medium",
      status: "open"
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "support_ticket_created",
      entityType: "support_ticket",
      details: `Created support ticket: ${input.subject}`
    });
    return { success: true };
  }),
  // Get activity logs
  getActivityLogs: protectedProcedure.input(z6.object({ limit: z6.number().optional() })).query(async ({ ctx, input }) => {
    return await getAuditLogsByUserId(ctx.user.id, input.limit);
  })
});

// server/routers/admin.ts
import { z as z7 } from "zod";
import { TRPCError as TRPCError3 } from "@trpc/server";
init_schema();
import { desc as desc2, sql as sql2 } from "drizzle-orm";
var adminProcedure2 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});
var adminRouter = router({
  // Dashboard statistics
  getDashboardStats: adminProcedure2.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const [userStats] = await db.select({ count: sql2`count(*)` }).from(users);
    const totalUsers = userStats?.count || 0;
    const transactions2 = await getAllTransactions(1e3);
    const totalVolume = transactions2.filter((t2) => t2.status === "completed").reduce((sum, t2) => sum + t2.amount, 0);
    const kycDocs = await getAllKycDocuments("pending");
    const pendingKyc = kycDocs.length;
    const loans2 = await getAllLoans("pending");
    const pendingLoans = loans2.length;
    return {
      totalUsers,
      totalVolume: formatCurrency(totalVolume),
      pendingKyc,
      pendingLoans,
      recentTransactions: transactions2.slice(0, 10).map((t2) => ({
        ...t2,
        formattedAmount: formatCurrency(t2.amount, t2.currency)
      }))
    };
  }),
  // User management
  getAllUsers: adminProcedure2.input(z7.object({ limit: z7.number().optional() })).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    return await db.select().from(users).orderBy(desc2(users.createdAt)).limit(input.limit || 100);
  }),
  // Freeze/unfreeze user account
  updateAccountStatus: adminProcedure2.input(z7.object({
    accountId: z7.number(),
    status: z7.enum(["active", "frozen", "closed"]),
    reason: z7.string().optional()
  })).mutation(async ({ ctx, input }) => {
    await updateAccountStatus(input.accountId, input.status);
    const account = await getAccountById(input.accountId);
    if (account) {
      await createNotification({
        userId: account.userId,
        title: "Account Status Changed",
        message: `Your account has been ${input.status}. ${input.reason || ""}`,
        type: "system",
        isRead: 0
      });
    }
    await createAuditLog({
      userId: ctx.user.id,
      action: "account_status_update",
      entityType: "account",
      entityId: input.accountId,
      details: `Changed account status to ${input.status}. Reason: ${input.reason || "N/A"}`
    });
    return { success: true };
  }),
  // KYC management
  getPendingKyc: adminProcedure2.query(async () => {
    return await getAllKycDocuments("pending");
  }),
  approveKyc: adminProcedure2.input(z7.object({ documentId: z7.number() })).mutation(async ({ ctx, input }) => {
    const docs = await getAllKycDocuments();
    const doc = docs.find((d) => d.id === input.documentId);
    if (!doc) throw new Error("Document not found");
    await updateKycStatus(input.documentId, "approved", ctx.user.id);
    await createNotification({
      userId: doc.userId,
      title: "KYC Document Approved",
      message: `Your ${doc.documentType.replace("_", " ")} has been approved.`,
      type: "system",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "kyc_approved",
      entityType: "kyc",
      entityId: input.documentId,
      details: `Approved ${doc.documentType} for user ${doc.userId}`
    });
    return { success: true };
  }),
  rejectKyc: adminProcedure2.input(z7.object({
    documentId: z7.number(),
    reason: z7.string()
  })).mutation(async ({ ctx, input }) => {
    const docs = await getAllKycDocuments();
    const doc = docs.find((d) => d.id === input.documentId);
    if (!doc) throw new Error("Document not found");
    await updateKycStatus(input.documentId, "rejected", ctx.user.id, input.reason);
    await createNotification({
      userId: doc.userId,
      title: "KYC Document Rejected",
      message: `Your ${doc.documentType.replace("_", " ")} was rejected. Reason: ${input.reason}`,
      type: "system",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "kyc_rejected",
      entityType: "kyc",
      entityId: input.documentId,
      details: `Rejected ${doc.documentType} for user ${doc.userId}. Reason: ${input.reason}`
    });
    return { success: true };
  }),
  // Loan management
  getPendingLoans: adminProcedure2.query(async () => {
    const loans2 = await getAllLoans("pending");
    return loans2.map((loan) => ({
      ...loan,
      formattedAmount: formatCurrency(loan.amount),
      formattedMonthlyPayment: formatCurrency(loan.monthlyPayment)
    }));
  }),
  approveLoan: adminProcedure2.input(z7.object({ loanId: z7.number() })).mutation(async ({ ctx, input }) => {
    const loan = await getLoanById(input.loanId);
    if (!loan) throw new Error("Loan not found");
    await updateLoanStatus(input.loanId, "approved", ctx.user.id);
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
        completedAt: /* @__PURE__ */ new Date()
      });
      await updateAccountBalance(account.id, account.balance + loan.amount);
    }
    await updateLoanStatus(input.loanId, "active", ctx.user.id);
    const nextPaymentDue = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3);
    await getDb().then((db) => {
      if (db) {
        return db.update((init_schema(), __toCommonJS(schema_exports)).loans).set({ disbursedAt: /* @__PURE__ */ new Date(), nextPaymentDue }).where(__require("drizzle-orm").eq((init_schema(), __toCommonJS(schema_exports)).loans.id, input.loanId));
      }
    });
    await createNotification({
      userId: loan.userId,
      title: "Loan Approved",
      message: `Your loan application for ${formatCurrency(loan.amount)} has been approved and disbursed to your account.`,
      type: "loan",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "loan_approved",
      entityType: "loan",
      entityId: input.loanId,
      details: `Approved and disbursed loan of ${formatCurrency(loan.amount)} to user ${loan.userId}`
    });
    return { success: true };
  }),
  rejectLoan: adminProcedure2.input(z7.object({
    loanId: z7.number(),
    reason: z7.string()
  })).mutation(async ({ ctx, input }) => {
    const loan = await getLoanById(input.loanId);
    if (!loan) throw new Error("Loan not found");
    await updateLoanStatus(input.loanId, "rejected", ctx.user.id, input.reason);
    await createNotification({
      userId: loan.userId,
      title: "Loan Application Rejected",
      message: `Your loan application was rejected. Reason: ${input.reason}`,
      type: "loan",
      isRead: 0
    });
    await createAuditLog({
      userId: ctx.user.id,
      action: "loan_rejected",
      entityType: "loan",
      entityId: input.loanId,
      details: `Rejected loan for user ${loan.userId}. Reason: ${input.reason}`
    });
    return { success: true };
  }),
  // Support ticket management
  getAllTickets: adminProcedure2.input(z7.object({ status: z7.string().optional() })).query(async ({ input }) => {
    return await getAllSupportTickets(input.status);
  }),
  updateTicketStatus: adminProcedure2.input(z7.object({
    ticketId: z7.number(),
    status: z7.enum(["open", "in_progress", "resolved", "closed"])
  })).mutation(async ({ ctx, input }) => {
    await updateSupportTicketStatus(input.ticketId, input.status, ctx.user.id);
    await createAuditLog({
      userId: ctx.user.id,
      action: "ticket_status_update",
      entityType: "support_ticket",
      entityId: input.ticketId,
      details: `Updated ticket status to ${input.status}`
    });
    return { success: true };
  }),
  // System settings
  getSystemSettings: adminProcedure2.query(async () => {
    return await getAllSystemSettings();
  }),
  updateSystemSetting: adminProcedure2.input(z7.object({
    key: z7.string(),
    value: z7.string(),
    description: z7.string().optional()
  })).mutation(async ({ ctx, input }) => {
    await setSystemSetting(input.key, input.value, input.description, ctx.user.id);
    await createAuditLog({
      userId: ctx.user.id,
      action: "system_setting_update",
      entityType: "system_setting",
      details: `Updated ${input.key} = ${input.value}`
    });
    return { success: true };
  }),
  // Audit logs
  getAuditLogs: adminProcedure2.input(z7.object({ limit: z7.number().optional() })).query(async ({ input }) => {
    return await getAllAuditLogs(input.limit);
  }),
  // All transactions
  getAllTransactions: adminProcedure2.input(z7.object({ limit: z7.number().optional() })).query(async ({ input }) => {
    const transactions2 = await getAllTransactions(input.limit);
    return transactions2.map((t2) => ({
      ...t2,
      formattedAmount: formatCurrency(t2.amount, t2.currency),
      formattedFee: formatCurrency(t2.fee, t2.currency)
    }));
  })
});

// server/routers.ts
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  banking: bankingRouter,
  loans: loansRouter,
  cards: cardsRouter,
  kyc: kycRouter,
  user: userRouter,
  admin: adminRouter
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs from "fs";
import { nanoid as nanoid2 } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid2()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    if (req.originalUrl.startsWith("/api") || req.originalUrl.includes(".")) {
      return;
    }
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
