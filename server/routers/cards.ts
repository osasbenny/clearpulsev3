import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import {
  createCard,
  getCardsByUserId,
  getAccountById,
  createNotification,
  createAuditLog,
} from "../banking";
import {
  generateCardNumber,
  generateCVV,
  generateCardExpiry,
  maskCardNumber,
} from "../utils";

export const cardsRouter = router({
  // Get user's cards
  getCards: protectedProcedure.query(async ({ ctx }) => {
    const cards = await getCardsByUserId(ctx.user.id);
    return cards.map(card => ({
      ...card,
      maskedNumber: maskCardNumber(card.cardNumber),
      // Don't expose full card number and CVV in regular queries
      cardNumber: maskCardNumber(card.cardNumber),
      cvv: "***",
    }));
  }),

  // Request new card
  requestCard: protectedProcedure
    .input(z.object({
      accountId: z.number(),
      cardType: z.enum(["debit", "atm"]),
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

      // Generate card details
      const cardNumber = generateCardNumber();
      const cvv = generateCVV();
      const expiryDate = generateCardExpiry();

      // Create card request
      await createCard({
        userId: ctx.user.id,
        accountId: input.accountId,
        cardNumber,
        cardType: input.cardType,
        cvv,
        expiryDate,
        status: "requested",
      });

      // Create notification
      await createNotification({
        userId: ctx.user.id,
        title: "Card Request Received",
        message: `Your ${input.cardType} card request has been received and is being processed.`,
        type: "card",
        isRead: 0,
      });

      // Audit log
      await createAuditLog({
        userId: ctx.user.id,
        action: "card_request",
        entityType: "card",
        details: `Requested ${input.cardType} card for account ${account.accountNumber}`,
      });

      return { success: true };
    }),

  // Get card details (with full info for active cards)
  getCardDetails: protectedProcedure
    .input(z.object({ cardId: z.number() }))
    .query(async ({ ctx, input }) => {
      const cards = await getCardsByUserId(ctx.user.id);
      const card = cards.find(c => c.id === input.cardId);
      
      if (!card) {
        throw new Error("Card not found or unauthorized");
      }

      // Only show full details for active cards
      if (card.status === "active") {
        return {
          ...card,
          maskedNumber: maskCardNumber(card.cardNumber),
        };
      }

      return {
        ...card,
        cardNumber: maskCardNumber(card.cardNumber),
        cvv: "***",
        maskedNumber: maskCardNumber(card.cardNumber),
      };
    }),
});
