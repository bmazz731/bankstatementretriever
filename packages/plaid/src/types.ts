/**
 * Plaid API types for edge runtime compatibility
 */

// Configuration
export interface PlaidConfig {
  clientId: string
  secret: string
  environment: 'sandbox' | 'development' | 'production'
  webhook?: string
}

// Link Token Request/Response
export interface LinkTokenRequest {
  client_name: string
  country_codes: string[]
  language: string
  user: {
    client_user_id: string
  }
  products: string[]
  webhook?: string
  redirect_uri?: string
  android_package_name?: string
  account_filters?: {
    depository?: {
      account_subtypes?: string[]
    }
  }
}

export interface LinkTokenResponse {
  link_token: string
  expiration: string
  request_id: string
}

// Item Exchange
export interface ItemPublicTokenExchangeRequest {
  public_token: string
}

export interface ItemPublicTokenExchangeResponse {
  access_token: string
  item_id: string
  request_id: string
}

// Accounts
export interface Account {
  account_id: string
  balances: {
    available: number | null
    current: number | null
    iso_currency_code: string | null
    limit: number | null
    unofficial_currency_code: string | null
  }
  mask: string | null
  name: string
  official_name: string | null
  subtype: string | null
  type: string
}

export interface AccountsGetResponse {
  accounts: Account[]
  item: {
    available_products: string[]
    billed_products: string[]
    consent_expiration_time: string | null
    error: any | null
    institution_id: string | null
    item_id: string
    update_type: string
    webhook: string | null
  }
  request_id: string
}

// Institutions
export interface Institution {
  institution_id: string
  name: string
  products: string[]
  country_codes: string[]
  url: string | null
  primary_color: string | null
  logo: string | null
  routing_numbers: string[]
  dtc_numbers: string[]
  oauth: boolean
}

export interface InstitutionsGetByIdResponse {
  institution: Institution
  request_id: string
}

// Statements
export interface StatementsListRequest {
  access_token: string
  account_id: string
  start_date?: string
  end_date?: string
  count?: number
  offset?: number
}

export interface Statement {
  account_id: string
  statement_id: string
  month: number
  year: number
  download_url?: string
}

export interface StatementsListResponse {
  accounts: Array<{
    account_id: string
    statements: Statement[]
  }>
  request_id: string
}

export interface StatementsDownloadRequest {
  access_token: string
  statement_id: string
}

// Webhooks
export interface PlaidWebhook {
  webhook_type: string
  webhook_code: string
  item_id: string
  error?: PlaidError | null
  new_webhook_url?: string
  environment: string
}

export interface StatementRefreshWebhook extends PlaidWebhook {
  webhook_type: 'STATEMENTS'
  webhook_code: 'DEFAULT_UPDATE' | 'HISTORICAL_UPDATE'
  account_id: string
  start_date?: string
  end_date?: string
}

export interface ItemWebhook extends PlaidWebhook {
  webhook_type: 'ITEM'
  webhook_code: 'ERROR' | 'PENDING_EXPIRATION' | 'USER_PERMISSION_REVOKED' | 'WEBHOOK_UPDATE_ACKNOWLEDGED'
  consent_expiration_time?: string
}

// Error handling
export interface PlaidError {
  error_type: string
  error_code: string
  error_message: string
  display_message?: string | null
  request_id?: string
  causes?: any[]
  status?: number
  documentation_url?: string
  suggested_action?: string
}

export interface PlaidApiError extends Error {
  error: PlaidError
  status_code: number
}

// Learning Algorithm Types
export interface StatementPattern {
  institution_id: string
  account_id: string
  typical_day: number // Day of month statements typically become available
  confidence: number // 0-1, based on historical data
  last_updated: Date
  sample_size: number
}

export interface LearningData {
  institution_id: string
  account_id: string
  statement_month: number
  statement_year: number
  available_date: Date
  discovered_day: number // Day of month it became available
}

// Rate Limiting
export interface RateLimitInfo {
  requests_remaining: number
  requests_limit: number
  reset_time: Date
}

// Encryption for token storage
export interface EncryptedToken {
  encrypted_data: string
  iv: string
  auth_tag: string
}

// Service Result Types
export interface PlaidResult<T> {
  success: boolean
  data?: T
  error?: PlaidError
}

// Statement Availability Check
export interface AvailabilityCheck {
  account_id: string
  expected_date: Date
  confidence: number
  check_after: Date
}