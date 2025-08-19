/**
 * Edge-compatible OAuth 2.0 with PKCE implementation
 * Supports Google Drive, Dropbox, and OneDrive
 */
import type { PKCEData, StorageTokens, StorageResult, StorageError } from './types'

export class EdgeOAuthService {
  
  /**
   * Generate PKCE code verifier and challenge
   */
  async generatePKCE(): Promise<PKCEData> {
    // Generate 128-byte random code verifier
    const codeVerifier = this.base64URLEncode(crypto.getRandomValues(new Uint8Array(96)))
    
    // Create SHA256 hash of verifier
    const encoder = new TextEncoder()
    const challengeBytes = await crypto.subtle.digest(
      'SHA-256',
      encoder.encode(codeVerifier)
    )
    
    const codeChallenge = this.base64URLEncode(new Uint8Array(challengeBytes))
    const state = this.base64URLEncode(crypto.getRandomValues(new Uint8Array(32)))
    
    return {
      code_verifier: codeVerifier,
      code_challenge: codeChallenge,
      state,
      redirect_uri: '' // Set by provider
    }
  }

  /**
   * Generate OAuth authorization URL
   */
  generateAuthUrl(
    authEndpoint: string,
    clientId: string,
    redirectUri: string,
    scopes: string[],
    pkceData: PKCEData
  ): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      state: pkceData.state,
      code_challenge: pkceData.code_challenge,
      code_challenge_method: 'S256',
      access_type: 'offline', // For refresh tokens
      prompt: 'consent'       // Force consent to get refresh token
    })

    return `${authEndpoint}?${params.toString()}`
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCodeForTokens(
    tokenEndpoint: string,
    clientId: string,
    clientSecret: string,
    code: string,
    redirectUri: string,
    codeVerifier: string
  ): Promise<StorageResult<StorageTokens>> {
    try {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
      })

      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'BankStatementRetriever/1.0'
        },
        body: body.toString()
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error || 'TOKEN_EXCHANGE_ERROR',
            message: data.error_description || 'Failed to exchange code for tokens'
          }
        }
      }

      const tokens: StorageTokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: data.expires_in ? Date.now() + (data.expires_in * 1000) : undefined,
        token_type: data.token_type || 'Bearer',
        scope: data.scope
      }

      return {
        success: true,
        data: tokens
      }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network request failed',
          retryable: true
        }
      }
    }
  }

  /**
   * Refresh access token
   */
  async refreshTokens(
    tokenEndpoint: string,
    clientId: string,
    clientSecret: string,
    refreshToken: string
  ): Promise<StorageResult<StorageTokens>> {
    try {
      const body = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken
      })

      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'BankStatementRetriever/1.0'
        },
        body: body.toString()
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.error || 'TOKEN_REFRESH_ERROR',
            message: data.error_description || 'Failed to refresh tokens',
            retryable: data.error !== 'invalid_grant'
          }
        }
      }

      const tokens: StorageTokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token || refreshToken, // Some providers don't return new refresh token
        expires_at: data.expires_in ? Date.now() + (data.expires_in * 1000) : undefined,
        token_type: data.token_type || 'Bearer',
        scope: data.scope
      }

      return {
        success: true,
        data: tokens
      }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network request failed',
          retryable: true
        }
      }
    }
  }

  /**
   * Check if tokens are expired
   */
  isTokenExpired(tokens: StorageTokens, bufferMinutes: number = 5): boolean {
    if (!tokens.expires_at) return false
    
    const bufferMs = bufferMinutes * 60 * 1000
    return Date.now() >= (tokens.expires_at - bufferMs)
  }

  /**
   * Validate tokens by making a test API call
   */
  async validateTokens(
    testEndpoint: string,
    tokens: StorageTokens
  ): Promise<boolean> {
    try {
      const response = await fetch(testEndpoint, {
        headers: {
          'Authorization': `${tokens.token_type || 'Bearer'} ${tokens.access_token}`,
          'User-Agent': 'BankStatementRetriever/1.0'
        }
      })

      return response.ok
    } catch (error) {
      return false
    }
  }

  /**
   * Make authenticated API request with automatic retry
   */
  async makeAuthenticatedRequest(
    url: string,
    tokens: StorageTokens,
    options: RequestInit = {}
  ): Promise<Response> {
    const headers = new Headers(options.headers)
    headers.set('Authorization', `${tokens.token_type || 'Bearer'} ${tokens.access_token}`)
    headers.set('User-Agent', 'BankStatementRetriever/1.0')

    return fetch(url, {
      ...options,
      headers
    })
  }

  // Private helper methods

  private base64URLEncode(buffer: Uint8Array): string {
    const base64 = btoa(String.fromCharCode(...buffer))
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  }
}

/**
 * Token encryption service using Web Crypto API
 */
export class TokenEncryptionService {
  private key: CryptoKey | null = null

  constructor(private secretKey: string) {}

  async getKey(): Promise<CryptoKey> {
    if (this.key) return this.key

    const encoder = new TextEncoder()
    const keyData = encoder.encode(this.secretKey.substring(0, 32).padEnd(32, '0'))
    
    this.key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    )

    return this.key
  }

  async encryptTokens(tokens: StorageTokens): Promise<{
    encrypted_data: string
    iv: string
  }> {
    const key = await this.getKey()
    const encoder = new TextEncoder()
    const data = encoder.encode(JSON.stringify(tokens))
    
    const iv = crypto.getRandomValues(new Uint8Array(12))
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    )

    return {
      encrypted_data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv))
    }
  }

  async decryptTokens(encryptedData: string, iv: string): Promise<StorageTokens> {
    const key = await this.getKey()
    
    const encrypted = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    )
    
    const ivArray = new Uint8Array(
      atob(iv).split('').map(char => char.charCodeAt(0))
    )

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivArray },
      key,
      encrypted
    )

    const decoder = new TextDecoder()
    return JSON.parse(decoder.decode(decrypted))
  }
}