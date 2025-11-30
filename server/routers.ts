import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { bankingRouter } from "./routers/banking";
import { loansRouter } from "./routers/loans";
import { cardsRouter } from "./routers/cards";
import { kycRouter } from "./routers/kyc";
import { userRouter } from "./routers/user";
import { adminRouter } from "./routers/admin";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  banking: bankingRouter,
  loans: loansRouter,
  cards: cardsRouter,
  kyc: kycRouter,
  user: userRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
