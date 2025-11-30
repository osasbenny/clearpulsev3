import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import {
  getNotificationsByUserId,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  createSupportTicket,
  getSupportTicketsByUserId,
  createAuditLog,
  getAuditLogsByUserId,
} from "../banking";
import { getUserByOpenId } from "../db";

export const userRouter = router({
  // Get user profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return {
      id: ctx.user.id,
      name: ctx.user.name,
      email: ctx.user.email,
      role: ctx.user.role,
      createdAt: ctx.user.createdAt,
      lastSignedIn: ctx.user.lastSignedIn,
    };
  }),

  // Get notifications
  getNotifications: protectedProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      return await getNotificationsByUserId(ctx.user.id, input.limit);
    }),

  // Mark notification as read
  markNotificationRead: protectedProcedure
    .input(z.object({ notificationId: z.number() }))
    .mutation(async ({ input }) => {
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
  createSupportTicket: protectedProcedure
    .input(z.object({
      subject: z.string(),
      message: z.string(),
      priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await createSupportTicket({
        userId: ctx.user.id,
        subject: input.subject,
        message: input.message,
        priority: input.priority || "medium",
        status: "open",
      });

      await createAuditLog({
        userId: ctx.user.id,
        action: "support_ticket_created",
        entityType: "support_ticket",
        details: `Created support ticket: ${input.subject}`,
      });

      return { success: true };
    }),

  // Get activity logs
  getActivityLogs: protectedProcedure
    .input(z.object({ limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      return await getAuditLogsByUserId(ctx.user.id, input.limit);
    }),
});
