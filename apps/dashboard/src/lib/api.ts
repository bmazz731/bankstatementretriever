import { createSupabaseClient } from './supabase'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.bankstatementretriever.com'

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private supabase = createSupabaseClient()

  private async getAuthToken(): Promise<string | null> {
    const { data: { session } } = await this.supabase.auth.getSession()
    return session?.access_token || null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const token = await this.getAuthToken()
      
      console.log(`Making API request to: ${API_BASE_URL}${endpoint}`)
      console.log('Auth token present:', !!token)
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      })

      console.log(`Response status: ${response.status}`)
      
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) {
        console.error('API request failed with status:', response.status, data)
        return { error: data.error || data.message || `Request failed with status ${response.status}` }
      }

      return { data }
    } catch (error) {
      console.error('API request failed:', error)
      return { error: 'Network error' }
    }
  }

  // Account endpoints
  async getAccounts(params?: { status?: string; page?: number; page_size?: number }) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.page_size) searchParams.set('page_size', params.page_size.toString())
    
    const query = searchParams.toString()
    const result = await this.request(`/api/accounts${query ? `?${query}` : ''}`)
    
    // Fix double-wrapping issue: return the API response directly
    return result.data || result
  }

  async deleteAccount(accountId: string) {
    return this.request(`/api/accounts/${accountId}`, { method: 'DELETE' })
  }

  async syncAccount(accountId: string) {
    return this.request(`/api/accounts/${accountId}/sync`, { method: 'POST' })
  }

  async backfillAccount(accountId: string, range_start: string, range_end: string) {
    return this.request(`/api/accounts/${accountId}/backfill`, {
      method: 'POST',
      body: JSON.stringify({ range_start, range_end }),
    })
  }

  // Statement endpoints
  async getStatements(accountId: string, params?: { 
    from?: string; 
    to?: string; 
    file_type?: string;
    page?: number;
    page_size?: number;
  }) {
    const searchParams = new URLSearchParams()
    if (params?.from) searchParams.set('from', params.from)
    if (params?.to) searchParams.set('to', params.to)
    if (params?.file_type) searchParams.set('file_type', params.file_type)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.page_size) searchParams.set('page_size', params.page_size.toString())
    
    const query = searchParams.toString()
    return this.request(`/api/statements/${accountId}${query ? `?${query}` : ''}`)
  }

  // Destination endpoints
  async getDestinations() {
    return this.request('/api/destinations')
  }

  async createDestination(destination: {
    type: string
    name: string
    config: object
    folder_path?: string
  }) {
    return this.request('/api/destinations', {
      method: 'POST',
      body: JSON.stringify(destination),
    })
  }

  async testWebhookDestination(destinationId: string) {
    return this.request(`/api/destinations/${destinationId}/test`, { method: 'POST' })
  }

  // Route endpoints
  async createRoute(route: {
    account_id: string
    destination_id: string
    folder_override?: string
    filename_template?: string
  }) {
    return this.request('/api/routes', {
      method: 'POST',
      body: JSON.stringify(route),
    })
  }

  // Notification endpoints
  async updateNotificationPreferences(accountId: string, preferences: Array<{
    channel: string
    event_type: string
    enabled: boolean
  }>) {
    return this.request(`/api/notifications/preferences/${accountId}`, {
      method: 'PUT',
      body: JSON.stringify({ preferences }),
    })
  }

  // Plaid endpoints
  async createLinkToken() {
    return this.request('/api/plaid/link_token', { method: 'POST' })
  }

  async exchangePublicToken(publicToken: string, backfillMonths: number = 1) {
    return this.request('/api/plaid/exchange_public_token', {
      method: 'POST',
      body: JSON.stringify({ 
        public_token: publicToken,
        backfill_months: backfillMonths
      }),
    })
  }

  // Health endpoints
  async getHealth() {
    return this.request('/health')
  }

  async getDeepHealth() {
    return this.request('/health/deep')
  }
}

export const apiClient = new ApiClient()
export default apiClient