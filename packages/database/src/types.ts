// Additional type definitions and utilities for BankStatementRetriever
import type { Prisma } from "../generated/client";

// Plan types from PRD Section 9
export type PlanType =
  | "free"
  | "business"
  | "professional"
  | "agency"
  | "enterprise";

export type PlanLimits = {
  accounts: number;
  statements_per_month: number;
  has_webhooks: boolean;
  has_api_access: boolean;
};

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    accounts: 1,
    statements_per_month: 1,
    has_webhooks: false,
    has_api_access: false,
  },
  business: {
    accounts: 5,
    statements_per_month: -1, // unlimited
    has_webhooks: false,
    has_api_access: false,
  },
  professional: {
    accounts: 20,
    statements_per_month: -1,
    has_webhooks: true,
    has_api_access: false,
  },
  agency: {
    accounts: 50,
    statements_per_month: -1,
    has_webhooks: true,
    has_api_access: true,
  },
  enterprise: {
    accounts: -1, // unlimited
    statements_per_month: -1,
    has_webhooks: true,
    has_api_access: true,
  },
};

// Status enums
export type OrganizationStatus = "active" | "paused" | "cancelled";
export type ConnectionStatus =
  | "active"
  | "paused"
  | "error"
  | "reauth_required";
export type AccountStatus = "active" | "paused" | "not_supported";
export type DeliveryStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "retrying"
  | "paused";
export type BackfillStatus = "pending" | "running" | "completed" | "failed";

// File types from PRD Section 4.4
export type StatementFileType = "pdf" | "csv";

// Storage provider types from PRD Section 4.5
export type DestinationKind =
  | "google_drive"
  | "dropbox"
  | "onedrive"
  | "webhook";

// Notification types from PRD Section 15.22
export type NotificationChannel = "email" | "webhook";
export type NotificationEventType =
  | "statement_delivered"
  | "delivery_failed"
  | "reauth_required"
  | "monthly_summary";

// Template variables for filename patterns (PRD Section 4.4)
export type FilenameTemplateVars = {
  institution: string;
  accountLast4: string;
  periodEnd: string;
  accountName: string;
  fileType: StatementFileType;
};

// Learning schedule JSON structure (PRD Section 6)
export type LearnedSchedule = {
  confidence: number;
  pattern: "monthly" | "irregular";
  expected_day_range: [number, number]; // Day of month range
  expected_time_range: [string, string]; // Time range in HH:MM format
  timezone: string;
  last_updated: string;
  cycles_confirmed: number;
};

// Webhook payload structure (PRD Section 4.6)
export type WebhookPayload = {
  webhookVersion: "1.0";
  eventType: "statement.delivered";
  orgId: string;
  accountId: string;
  institution: string;
  accountLast4: string;
  periodStart: string; // YYYY-MM-DD
  periodEnd: string; // YYYY-MM-DD
  statementDate: string; // YYYY-MM-DD
  fileType: StatementFileType;
  fileName: string;
  deliveryPath: string;
  deliveredAt: string; // ISO-8601
  checksum: string; // sha256:...
  requestId: string; // UUID
};

// Prisma transaction type
import type { PrismaClient } from "../generated/client";
export type PrismaTransaction = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

// Common query options
export type PaginationOptions = {
  page?: number;
  pageSize?: number;
};

export type DateRangeOptions = {
  from?: Date;
  to?: Date;
};

// Helper type for API responses
export type ApiResponse<T> = {
  data: T;
  page?: number;
  pageSize?: number;
  total?: number;
};

// Audit log action types
export type AuditAction =
  | "user_login"
  | "user_logout"
  | "connection_added"
  | "connection_removed"
  | "connection_paused"
  | "destination_added"
  | "destination_removed"
  | "statement_retrieved"
  | "delivery_succeeded"
  | "delivery_failed"
  | "backfill_started"
  | "backfill_completed"
  | "settings_changed"
  | "plan_changed";
