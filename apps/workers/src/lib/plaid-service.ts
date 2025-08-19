/**
 * Plaid API service for Cloudflare Workers
 * Uses native fetch() and Web APIs - no external dependencies
 */
import type { Env } from '../types/env'

export interface PlaidConfig {
  clientId: string
  secret: string
  environment: 'sandbox' | 'development' | 'production'
  webhook?: string
}

export interface PlaidError {
  error_type: string
  error_code: string
  error_message: string
  display_message?: string
}

export interface LinkTokenCreateRequest {
  client_name: string
  country_codes: string[]
  language: string
  user: {
    client_user_id: string
  }
  products: string[]
  webhook?: string
  account_filters?: {
    depository?: {
      account_subtypes: string[]
    }
    credit?: {
      account_subtypes: string[]
    }
  }
}

export interface LinkTokenCreateResponse {
  link_token: string
  expiration: string
}

export interface ItemPublicTokenExchangeRequest {
  public_token: string
}

export interface ItemPublicTokenExchangeResponse {
  access_token: string
  item_id: string
}

export interface AccountsGetRequest {
  access_token: string
}

export interface PlaidAccount {
  account_id: string
  balances: {
    available: number | null
    current: number | null
    iso_currency_code: string | null
  }
  mask: string | null
  name: string
  official_name: string | null
  type: string
  subtype: string | null
}

export interface AccountsGetResponse {
  accounts: PlaidAccount[]
  item: {
    available_products: string[]
    billed_products: string[]
    consent_expiration_time: string | null
    error: PlaidError | null
    institution_id: string | null
    item_id: string
    webhook: string | null
  }
}

export interface StatementsListRequest {
  access_token: string
  account_id: string
  start_date?: string
  end_date?: string
  count?: number
  offset?: number
}

export interface PlaidStatement {
  statement_id: string
  account_id: string
  statement_date: string
  period_start: string
  period_end: string
}

export interface StatementsListResponse {
  statements: PlaidStatement[]
  total_count: number
}

export class PlaidService {
  private config: PlaidConfig
  private baseUrl: string

  constructor(env: Env) {
    this.config = {
      clientId: env.PLAID_CLIENT_ID,
      secret: env.PLAID_SECRET,
      environment: env.PLAID_ENV,
      webhook: env.PLAID_WEBHOOK_SECRET ? `https://${env.DOMAIN}/api/plaid/webhook` : undefined
    }

    this.baseUrl = {
      sandbox: 'https://sandbox.api.plaid.com',
      development: 'https://development.api.plaid.com', 
      production: 'https://production.api.plaid.com'
    }[this.config.environment]
  }

  /**
   * Create a link token for Plaid Link initialization
   */
  async createLinkToken(userId: string): Promise<LinkTokenCreateResponse> {
    const request: LinkTokenCreateRequest = {
      client_name: 'BankStatementRetriever',
      country_codes: ['US'],
      language: 'en',
      user: {
        client_user_id: userId
      },
      products: ['statements', 'auth', 'identity'],
      webhook: this.config.webhook,
      account_filters: {
        depository: {
          account_subtypes: ['checking', 'savings']
        },
        credit: {
          account_subtypes: ['credit card']
        }
      }
    }

    return this.makeRequest<LinkTokenCreateResponse>('/link/token/create', request)
  }

  /**
   * Exchange public token for access token
   */
  async exchangePublicToken(publicToken: string): Promise<ItemPublicTokenExchangeResponse> {
    const request: ItemPublicTokenExchangeRequest = {
      public_token: publicToken
    }

    return this.makeRequest<ItemPublicTokenExchangeResponse>('/link/token/exchange', request)
  }

  /**
   * Get accounts for an access token
   */
  async getAccounts(accessToken: string): Promise<AccountsGetResponse> {
    const request: AccountsGetRequest = {
      access_token: accessToken
    }

    return this.makeRequest<AccountsGetResponse>('/accounts/get', request)
  }

  /**
   * List available statements for account
   */
  async getStatements(accessToken: string, accountId: string, options: {
    startDate?: string
    endDate?: string
    count?: number
    offset?: number
  } = {}): Promise<StatementsListResponse> {
    const request: StatementsListRequest = {
      access_token: accessToken,
      account_id: accountId,
      start_date: options.startDate,
      end_date: options.endDate,
      count: options.count,
      offset: options.offset
    }

    return this.makeRequest<StatementsListResponse>('/statements/list', request)
  }

  /**
   * Download statement as stream (memory-efficient)
   */
  async downloadStatement(accessToken: string, statementId: string): Promise<ReadableStream<Uint8Array>> {
    const request = {
      access_token: accessToken,
      statement_id: statementId
    }

    const response = await fetch(`${this.baseUrl}/statements/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PLAID-CLIENT-ID': this.config.clientId,
        'PLAID-SECRET': this.config.secret,
        'User-Agent': 'BankStatementRetriever/1.0'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Plaid API error: ${JSON.stringify(errorData)}`)
    }

    if (!response.body) {
      throw new Error('No response body received')
    }

    return response.body
  }

  // Private helper methods

  private async makeRequest<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PLAID-CLIENT-ID': this.config.clientId,
        'PLAID-SECRET': this.config.secret,
        'User-Agent': 'BankStatementRetriever/1.0'
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error(`Plaid API ${endpoint} failed:`, responseData)
      throw new PlaidAPIError(responseData)
    }

    return responseData as T
  }
}

export class PlaidAPIError extends Error {
  public plaidError: PlaidError

  constructor(plaidError: PlaidError) {
    super(plaidError.error_message)
    this.name = 'PlaidAPIError'
    this.plaidError = plaidError
  }
}