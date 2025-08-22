// Main export file for @bsr/database package
export { prisma, PrismaClient } from "./client";
export * from "./types";
export * from "./queries";

// Re-export Prisma types for convenience
export type {
  Organization,
  User,
  Connection,
  Account,
  Statement,
  Destination,
  RoutingRule,
  Delivery,
  WebhookEndpoint,
  OAuthToken,
  AuditLog,
  BackfillJob,
  NotificationPreference,
  Prisma,
} from "./client";
