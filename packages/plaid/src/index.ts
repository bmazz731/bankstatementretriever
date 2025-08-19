/**
 * BankStatementRetriever Plaid Integration
 * Edge-compatible Plaid service for Cloudflare Workers
 */

// Core service
export { PlaidService } from './plaid-service'
export { StatementLearningService } from './learning-algorithm'
export { TokenEncryption } from './encryption'

// Types
export type {
  PlaidConfig,
  PlaidResult,
  PlaidError,
  PlaidApiError,
  LinkTokenRequest,
  LinkTokenResponse,
  ItemPublicTokenExchangeRequest,
  ItemPublicTokenExchangeResponse,
  Account,
  AccountsGetResponse,
  Institution,
  InstitutionsGetByIdResponse,
  Statement,
  StatementsListRequest,
  StatementsListResponse,
  StatementsDownloadRequest,
  PlaidWebhook,
  StatementRefreshWebhook,
  ItemWebhook,
  StatementPattern,
  LearningData,
  AvailabilityCheck,
  RateLimitInfo,
  EncryptedToken
} from './types'

// Utility functions
export function createPlaidConfig(
  clientId: string,
  secret: string,
  environment: 'sandbox' | 'development' | 'production',
  webhook?: string
): PlaidConfig {
  return {
    clientId,
    secret,
    environment,
    webhook
  }
}

export function isPlaidWebhook(data: any): data is PlaidWebhook {
  return (
    data &&
    typeof data.webhook_type === 'string' &&
    typeof data.webhook_code === 'string' &&
    typeof data.item_id === 'string' &&
    typeof data.environment === 'string'
  )
}

export function isStatementWebhook(webhook: PlaidWebhook): webhook is StatementRefreshWebhook {
  return webhook.webhook_type === 'STATEMENTS'
}

export function isItemWebhook(webhook: PlaidWebhook): webhook is ItemWebhook {
  return webhook.webhook_type === 'ITEM'
}

// Error handling helpers
export function isPlaidError(error: any): error is PlaidError {
  return (
    error &&
    typeof error.error_type === 'string' &&
    typeof error.error_code === 'string' &&
    typeof error.error_message === 'string'
  )
}

export class PlaidApiError extends Error implements PlaidApiError {
  public error: PlaidError
  public status_code: number

  constructor(error: PlaidError, statusCode: number = 400) {
    super(error.error_message)
    this.name = 'PlaidApiError'
    this.error = error
    this.status_code = statusCode
  }
}

// Constants
export const PLAID_ENVIRONMENTS = {
  SANDBOX: 'sandbox' as const,
  DEVELOPMENT: 'development' as const,
  PRODUCTION: 'production' as const
}

export const PLAID_PRODUCTS = {
  STATEMENTS: 'statements',
  TRANSACTIONS: 'transactions',
  ACCOUNTS: 'accounts',
  IDENTITY: 'identity',
  ASSETS: 'assets',
  LIABILITIES: 'liabilities'
} as const

export const PLAID_WEBHOOK_TYPES = {
  STATEMENTS: 'STATEMENTS',
  ITEM: 'ITEM',
  TRANSACTIONS: 'TRANSACTIONS',
  HOLDINGS: 'HOLDINGS'
} as const

export const STATEMENT_WEBHOOK_CODES = {
  DEFAULT_UPDATE: 'DEFAULT_UPDATE',
  HISTORICAL_UPDATE: 'HISTORICAL_UPDATE'
} as const

export const ITEM_WEBHOOK_CODES = {
  ERROR: 'ERROR',
  PENDING_EXPIRATION: 'PENDING_EXPIRATION',
  USER_PERMISSION_REVOKED: 'USER_PERMISSION_REVOKED',
  WEBHOOK_UPDATE_ACKNOWLEDGED: 'WEBHOOK_UPDATE_ACKNOWLEDGED'
} as const