import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import {
  createKycDocument,
  getKycDocumentsByUserId,
  createNotification,
  createAuditLog,
} from "../banking";

export const kycRouter = router({
  // Get user's KYC documents
  getDocuments: protectedProcedure.query(async ({ ctx }) => {
    return await getKycDocumentsByUserId(ctx.user.id);
  }),

  // Upload KYC document
  uploadDocument: protectedProcedure
    .input(z.object({
      documentType: z.enum(["id", "proof_of_address", "selfie"]),
      documentUrl: z.string().url(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create KYC document record
      await createKycDocument({
        userId: ctx.user.id,
        documentType: input.documentType,
        documentUrl: input.documentUrl,
        status: "pending",
      });

      // Create notification
      await createNotification({
        userId: ctx.user.id,
        title: "KYC Document Uploaded",
        message: `Your ${input.documentType.replace('_', ' ')} has been uploaded and is pending review.`,
        type: "system",
        isRead: 0,
      });

      // Audit log
      await createAuditLog({
        userId: ctx.user.id,
        action: "kyc_upload",
        entityType: "kyc",
        details: `Uploaded ${input.documentType} document`,
      });

      return { success: true };
    }),

  // Get KYC status summary
  getKycStatus: protectedProcedure.query(async ({ ctx }) => {
    const documents = await getKycDocumentsByUserId(ctx.user.id);
    
    const status = {
      id: documents.find(d => d.documentType === "id")?.status || "not_uploaded",
      proof_of_address: documents.find(d => d.documentType === "proof_of_address")?.status || "not_uploaded",
      selfie: documents.find(d => d.documentType === "selfie")?.status || "not_uploaded",
    };

    const allApproved = Object.values(status).every(s => s === "approved");
    const anyRejected = Object.values(status).some(s => s === "rejected");
    const anyPending = Object.values(status).some(s => s === "pending");

    return {
      status,
      overallStatus: allApproved ? "verified" : anyRejected ? "rejected" : anyPending ? "pending" : "incomplete",
      documents,
    };
  }),
});
