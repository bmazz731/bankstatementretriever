/**
 * JWT token management with JOSE library for edge compatibility
 */
import { SignJWT, jwtVerify, type JWTPayload as JOSEJWTPayload } from 'jose'
import { nanoid } from 'nanoid'
import type { JWTPayload, UserWithOrg, AuthConfig, AuthError } from './types'

export class JWTManager {
  private config: AuthConfig
  private secret: Uint8Array

  constructor(config: AuthConfig) {
    this.config = config
    this.secret = new TextEncoder().encode(config.jwtSecret)
  }

  /**
   * Create JWT token for authenticated user
   */
  async createToken(user: UserWithOrg, sessionId?: string): Promise<{
    token: string
    refreshToken: string
    expiresAt: number
  }> {
    const now = Math.floor(Date.now() / 1000)
    const expiresAt = now + (this.config.sessionDurationHours * 3600)
    const finalSessionId = sessionId || nanoid()

    const payload: JWTPayload = {
      sub: user.id,
      email: user.email,
      org_id: user.org_id,
      role: user.id === user.organization.owner_user_id ? 'owner' : 'member',
      plan: user.organization.plan,
      session_id: finalSessionId,
      iat: now,
      exp: expiresAt,
      aud: 'bankstatementretriever.com',
      iss: 'api.bankstatementretriever.com'
    }

    // Create access token
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(this.secret)

    // Create refresh token (longer expiry)
    const refreshPayload = {
      sub: user.id,
      session_id: finalSessionId,
      type: 'refresh',
      iat: now,
      exp: now + (30 * 24 * 3600) // 30 days
    }

    const refreshToken = await new SignJWT(refreshPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt() 
      .setExpirationTime(refreshPayload.exp)
      .sign(this.secret)

    return {
      token,
      refreshToken,
      expiresAt
    }
  }

  /**
   * Verify and decode JWT token
   */
  async verifyToken(token: string): Promise<{
    valid: boolean
    payload?: JWTPayload
    error?: AuthError
  }> {
    try {
      const { payload } = await jwtVerify(token, this.secret, {
        issuer: 'api.bankstatementretriever.com',
        audience: 'bankstatementretriever.com'
      })

      // Type assertion since we know our payload structure
      const jwtPayload = payload as unknown as JWTPayload

      // Additional validation
      if (!jwtPayload.sub || !jwtPayload.org_id || !jwtPayload.session_id) {
        return {
          valid: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Token missing required claims'
          }
        }
      }

      return {
        valid: true,
        payload: jwtPayload
      }

    } catch (error: any) {
      let authError: AuthError

      if (error.code === 'ERR_JWT_EXPIRED') {
        authError = {
          code: 'SESSION_EXPIRED',
          message: 'Token has expired'
        }
      } else if (error.code === 'ERR_JWT_INVALID') {
        authError = {
          code: 'INVALID_TOKEN',
          message: 'Token is invalid'
        }
      } else {
        authError = {
          code: 'INVALID_TOKEN',
          message: 'Token verification failed'
        }
      }

      return {
        valid: false,
        error: authError
      }
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{
    token?: string
    expiresAt?: number
    error?: AuthError
  }> {
    try {
      const { payload } = await jwtVerify(refreshToken, this.secret)

      if ((payload as any).type !== 'refresh') {
        return {
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid refresh token'
          }
        }
      }

      // TODO: Get user data from database using payload.sub
      // For now, return error requiring re-authentication
      return {
        error: {
          code: 'SESSION_EXPIRED',
          message: 'Please log in again'
        }
      }

    } catch (error) {
      return {
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid refresh token'
        }
      }
    }
  }

  /**
   * Extract token from Authorization header
   */
  extractFromHeader(authHeader: string): string | null {
    if (!authHeader) return null

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null
    }

    return parts[1]
  }

  /**
   * Create magic link token
   */
  async createMagicLinkToken(email: string, action: 'login' | 'signup' | 'reset_password'): Promise<string> {
    const now = Math.floor(Date.now() / 1000)
    const expiresAt = now + (15 * 60) // 15 minutes

    const payload = {
      email,
      action,
      type: 'magic_link',
      iat: now,
      exp: expiresAt
    }

    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(this.secret)
  }

  /**
   * Verify magic link token
   */
  async verifyMagicLinkToken(token: string): Promise<{
    valid: boolean
    email?: string
    action?: string
    error?: AuthError
  }> {
    try {
      const { payload } = await jwtVerify(token, this.secret)

      if ((payload as any).type !== 'magic_link') {
        return {
          valid: false,
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid magic link token'
          }
        }
      }

      return {
        valid: true,
        email: (payload as any).email,
        action: (payload as any).action
      }

    } catch (error: any) {
      return {
        valid: false,
        error: {
          code: 'MAGIC_LINK_EXPIRED',
          message: 'Magic link has expired or is invalid'
        }
      }
    }
  }

  /**
   * Decode token without verification (for debugging)
   */
  decode(token: string): any {
    try {
      const [header, payload, signature] = token.split('.')
      return {
        header: JSON.parse(atob(header)),
        payload: JSON.parse(atob(payload)),
        signature
      }
    } catch (error) {
      return null
    }
  }
}