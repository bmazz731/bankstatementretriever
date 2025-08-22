export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  plan: "free" | "business" | "professional" | "agency" | "enterprise";
  status: "active" | "paused" | "cancelled";
  account_limit: number;
  billing_email?: string;
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Connection {
  id: string;
  user_id: string;
  plaid_item_id: string;
  institution_id: string;
  institution_name: string;
  status: "active" | "reauth_required" | "error" | "revoked";
  error_message?: string;
  last_sync: string | null;
  created_at: string;
  updated_at: string;
}

export interface Account {
  id: string;
  connection_id: string;
  plaid_account_id: string;
  name: string;
  official_name?: string;
  type: string;
  subtype?: string;
  mask?: string;
  balances?: {
    available?: number;
    current?: number;
    limit?: number;
  };
  status: "active" | "paused" | "inactive";
  statements_supported: boolean;
  last_statement_check?: string;
  created_at: string;
  updated_at: string;
  connection?: Connection;
}

export interface Statement {
  id: string;
  account_id: string;
  period_start: string;
  period_end: string;
  statement_date: string;
  file_type: "pdf" | "csv";
  file_size?: number;
  checksum?: string;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  id: string;
  type: "google_drive" | "dropbox" | "onedrive" | "webhook";
  name: string;
  config: Record<string, any>;
  folder_path?: string;
  status: "active" | "inactive" | "error";
  last_test?: string;
  created_at: string;
  updated_at: string;
}

export interface AccountDestination {
  id: string;
  account_id: string;
  destination_id: string;
  folder_override?: string;
  filename_template: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  destination?: Destination;
}

export interface Delivery {
  id: string;
  statement_id: string;
  destination_id: string;
  status: "pending" | "in_progress" | "succeeded" | "failed";
  error_message?: string;
  file_path?: string;
  file_size?: number;
  attempts: number;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
  destination?: Destination;
}

export interface NotificationPreference {
  id: string;
  account_id: string;
  channel: "email" | "webhook";
  event_type:
    | "statement_delivered"
    | "statement_failed"
    | "reauth_required"
    | "monthly_summary";
  enabled: boolean;
  config?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  event_type: string;
  event_data: Record<string, any>;
  user_id?: string;
  account_id?: string;
  organization_id: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface HealthCheck {
  status: "ok" | "degraded" | "error";
  timestamp: string;
  response_time_ms?: number;
  checks?: {
    database?: { status: string; latency?: number; error?: string };
    kv_config?: { status: string; error?: string };
    kv_cache?: { status: string; error?: string };
    queues?: { status: string; error?: string };
    plaid?: { status: string; error?: string };
  };
}

export interface PlaidLinkSuccess {
  public_token: string;
  metadata: {
    institution: {
      name: string;
      institution_id: string;
    };
    accounts: Array<{
      id: string;
      name: string;
      mask: string;
      type: string;
      subtype: string;
    }>;
  };
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  page_size: number;
  total: number;
}

export interface AccountsResponse extends PaginatedResponse<Account> {
  accounts: Account[];
}

export interface StatementsResponse extends PaginatedResponse<Statement> {
  statements: Statement[];
}

export interface DestinationsResponse {
  destinations: Destination[];
}

// Form types
export interface BackfillRequest {
  range_start: string;
  range_end: string;
}

export interface CreateDestinationRequest {
  type: "google_drive" | "dropbox" | "onedrive" | "webhook";
  name: string;
  config: Record<string, any>;
  folder_path?: string;
}

export interface CreateRouteRequest {
  account_id: string;
  destination_id: string;
  folder_override?: string;
  filename_template?: string;
}

export interface NotificationPreferencesRequest {
  preferences: Array<{
    channel: "email" | "webhook";
    event_type:
      | "statement_delivered"
      | "statement_failed"
      | "reauth_required"
      | "monthly_summary";
    enabled: boolean;
  }>;
}
