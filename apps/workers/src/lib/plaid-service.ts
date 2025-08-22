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
    // Validate required environment variables
    if (!env.PLAID_CLIENT_ID) {
      throw new Error('PLAID_CLIENT_ID environment variable is required')
    }
    if (!env.PLAID_SECRET) {
      throw new Error('PLAID_SECRET environment variable is required')
    }
    if (!env.PLAID_ENV) {
      throw new Error('PLAID_ENV environment variable is required')
    }
    if (!env.DOMAIN) {
      throw new Error('DOMAIN environment variable is required for webhook URL')
    }

    this.config = {
      clientId: env.PLAID_CLIENT_ID,
      secret: env.PLAID_SECRET,
      environment: env.PLAID_ENV as 'sandbox' | 'development' | 'production',
      webhook: `https://${env.DOMAIN}/api/plaid/webhook`
    }

    this.baseUrl = {
      sandbox: 'https://sandbox.plaid.com',
      development: 'https://development.plaid.com', 
      production: 'https://production.plaid.com'
    }[this.config.environment]

    if (!this.baseUrl) {
      throw new Error(`Invalid PLAID_ENV: ${env.PLAID_ENV}. Must be 'sandbox', 'development', or 'production'`)
    }
  }

  /**
   * Create a link token for Plaid Link initialization
   */
  async createLinkToken(userId: string): Promise<LinkTokenCreateResponse> {
    // Use different products based on environment
    // statements product may not be available in sandbox/development
    const products = this.config.environment === 'production' 
      ? ['statements'] 
      : ['transactions']  // fallback for development/sandbox
    
    const request: LinkTokenCreateRequest = {
      client_name: 'BankStatementRetriever',
      country_codes: ['US'],
      language: 'en',
      user: {
        client_user_id: userId
      },
      products: products,
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

    try {
      return await this.makeRequest<LinkTokenCreateResponse>('/link/token/create', request)
    } catch (error) {
      // If statements product fails, retry with transactions product
      if (error instanceof PlaidAPIError && 
          error.plaidError.error_code === 'INVALID_PRODUCT' &&
          products.includes('statements')) {
        console.log('Statements product not available, retrying with transactions')
        
        const fallbackRequest = {
          ...request,
          products: ['transactions']
        }
        
        return this.makeRequest<LinkTokenCreateResponse>('/link/token/create', fallbackRequest)
      }
      
      throw error
    }
  }

  /**
   * Exchange public token for access token
   */
  async exchangePublicToken(publicToken: string): Promise<ItemPublicTokenExchangeResponse> {
    const request: ItemPublicTokenExchangeRequest = {
      public_token: publicToken
    }

    return this.makeRequest<ItemPublicTokenExchangeResponse>('/item/public_token/exchange', request)
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
    console.log(`Making Plaid API request to: ${this.baseUrl}${endpoint}`)
    console.log('Request payload:', JSON.stringify(data, null, 2))
    
    try {
      // WORKAROUND: Remove cf-workers-preview-token header to fix Cloudflare 530/1016 error
      // in Partial (CNAME) setup zones. This is a known Cloudflare Workers issue.
      // Reference: https://developers.cloudflare.com/workers/platform/known-issues/
      const request = new Request(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PLAID-CLIENT-ID': this.config.clientId,
          'PLAID-SECRET': this.config.secret,
          'User-Agent': 'BankStatementRetriever/1.0'
        },
        body: JSON.stringify(data)
      })
      
      // Apply Cloudflare workaround for DNS resolution in CNAME setups
      request.headers.delete('cf-workers-preview-token')
      
      const response = await fetch(request)

      console.log(`Plaid API response status: ${response.status}`)
      
      const responseData = await response.json()
      console.log('Plaid API response data:', JSON.stringify(responseData, null, 2))

      if (!response.ok) {
        console.error(`Plaid API ${endpoint} failed with status ${response.status}:`, responseData)
        throw new PlaidAPIError(responseData as PlaidError)
      }

      return responseData as T
    } catch (error) {
      console.error(`Plaid API request to ${endpoint} threw an error:`, error)
      throw error
    }
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