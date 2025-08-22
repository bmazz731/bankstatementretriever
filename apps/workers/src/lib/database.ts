/**
 * Edge-compatible Supabase database client for Cloudflare Workers
 */
import { createClient } from "@supabase/supabase-js";
import type { Env } from "../types/env";

// Create Supabase client instance
export function createSupabaseClient(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      // Use custom fetch for Workers compatibility
      fetch: (url, options = {}) => {
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            // Add CF-specific headers if needed
          },
        });
      },
    },
  });
}

// Database helper functions optimized for Workers
export class DatabaseClient {
  private client: ReturnType<typeof createSupabaseClient>;

  constructor(env: Env) {
    this.client = createSupabaseClient(env);
  }

  // Organization queries
  async getOrgById(orgId: string) {
    const { data, error } = await this.client
      .from("organizations")
      .select("*")
      .eq("id", orgId)
      .single();

    if (error) throw new Error(`Failed to get organization: ${error.message}`);
    return data;
  }

  // Account queries optimized for Workers
  async getActiveAccounts(orgId: string) {
    const { data, error } = await this.client
      .from("accounts")
      .select(
        `
        *,
        connection:connections (
          id,
          org_id,
          plaid_item_id,
          institution,
          status
        )
      `,
      )
      .eq("connection.org_id", orgId)
      .eq("status", "active")
      .eq("statements_supported", true);

    if (error) throw new Error(`Failed to get accounts: ${error.message}`);
    return data;
  }

  async getAccountById(accountId: string) {
    const { data, error } = await this.client
      .from("accounts")
      .select(
        `
        *,
        connection:connections (*),
        routing_rules:routing_rules (
          *,
          destination:destinations (*)
        )
      `,
      )
      .eq("id", accountId)
      .single();

    if (error) throw new Error(`Failed to get account: ${error.message}`);
    return data;
  }

  // Statement queries
  async createStatement(statement: {
    account_id: string;
    period_start: string;
    period_end: string;
    statement_date: string;
    file_type: string;
    checksum: string;
  }) {
    // Check for existing statement (deduplication)
    const { data: existing } = await this.client
      .from("statements")
      .select("id, version")
      .eq("account_id", statement.account_id)
      .eq("period_end", statement.period_end)
      .eq("file_type", statement.file_type)
      .order("version", { ascending: false })
      .limit(1);

    const version =
      existing && existing.length > 0 ? existing[0].version + 1 : 1;

    const { data, error } = await this.client
      .from("statements")
      .insert({
        ...statement,
        version,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create statement: ${error.message}`);
    return data;
  }

  async getStatementsByAccount(
    accountId: string,
    options: {
      from?: string;
      to?: string;
      fileType?: string;
      limit?: number;
    } = {},
  ) {
    let query = this.client
      .from("statements")
      .select(
        `
        *,
        deliveries:deliveries (
          *,
          destination:destinations (*)
        )
      `,
      )
      .eq("account_id", accountId)
      .order("statement_date", { ascending: false });

    if (options.from) query = query.gte("statement_date", options.from);
    if (options.to) query = query.lte("statement_date", options.to);
    if (options.fileType) query = query.eq("file_type", options.fileType);
    if (options.limit) query = query.limit(options.limit);

    const { data, error } = await query;

    if (error) throw new Error(`Failed to get statements: ${error.message}`);
    return data;
  }

  // Connection queries
  async updateConnectionStatus(itemId: string, status: string) {
    const { data, error } = await this.client
      .from("connections")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("plaid_item_id", itemId)
      .select();

    if (error) throw new Error(`Failed to update connection: ${error.message}`);
    return data;
  }

  // Delivery queries
  async createDelivery(delivery: {
    statement_id: string;
    destination_id: string;
    request_id: string;
    status?: string;
  }) {
    const { data, error } = await this.client
      .from("deliveries")
      .insert({
        status: "pending",
        attempts: 0,
        ...delivery,
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create delivery: ${error.message}`);
    return data;
  }

  async updateDeliveryStatus(
    deliveryId: string,
    updates: {
      status: string;
      path?: string;
      delivered_at?: string;
      last_error?: string;
      attempts?: number;
    },
  ) {
    const { data, error } = await this.client
      .from("deliveries")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", deliveryId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update delivery: ${error.message}`);
    return data;
  }

  async getDeliveryByRequestId(requestId: string) {
    const { data, error } = await this.client
      .from("deliveries")
      .select(
        `
        *,
        statement:statements (*),
        destination:destinations (*)
      `,
      )
      .eq("request_id", requestId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw new Error(`Failed to get delivery: ${error.message}`);
    }
    return data;
  }

  // Routing rules
  async getRoutingRules(accountId: string) {
    const { data, error } = await this.client
      .from("routing_rules")
      .select(
        `
        *,
        destination:destinations (*)
      `,
      )
      .eq("account_id", accountId)
      .eq("active", true);

    if (error) throw new Error(`Failed to get routing rules: ${error.message}`);
    return data;
  }

  // Audit logging
  async createAuditLog(log: {
    org_id: string;
    user_id?: string;
    action: string;
    target_id?: string;
    meta_json?: any;
  }) {
    const { data, error } = await this.client
      .from("audit_logs")
      .insert(log)
      .select()
      .single();

    if (error) throw new Error(`Failed to create audit log: ${error.message}`);
    return data;
  }

  // Notification preferences
  async getNotificationPreferences(accountId: string) {
    const { data, error } = await this.client
      .from("notification_preferences")
      .select("*")
      .eq("account_id", accountId)
      .eq("enabled", true);

    if (error)
      throw new Error(
        `Failed to get notification preferences: ${error.message}`,
      );
    return data;
  }

  // Health check
  async healthCheck(): Promise<{
    status: "ok" | "error";
    latency: number;
    error?: string;
  }> {
    const startTime = Date.now();

    try {
      await this.client
        .from("organizations")
        .select("count", { count: "exact", head: true })
        .limit(1);

      return {
        status: "ok",
        latency: Date.now() - startTime,
      };
    } catch (error) {
      return {
        status: "error",
        latency: Date.now() - startTime,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Utility function for raw SQL queries (if needed)
export async function executeQuery(
  env: Env,
  query: string,
  params: any[] = [],
) {
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/execute_sql`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, params }),
  });

  if (!response.ok) {
    throw new Error(`Query failed: ${response.statusText}`);
  }

  return response.json();
}
