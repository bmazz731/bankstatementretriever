/**
 * Core authentication service
 * Handles email/password, Google SSO, and magic link authentication
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import type { 
  AuthConfig, 
  AuthResult, 
  AuthError, 
  UserWithOrg, 
  GoogleAuthOptions,
  MagicLinkOptions,
  AuthAuditData,
  GoogleUserInfo
} from './types'
import { PasswordValidator } from './password'
import { JWTManager } from './jwt'
import { SessionManager, type SessionStore } from './session'
import { AuthRateLimiter } from './rate-limiter'
import { prisma } from '@bsr/database'

export class AuthService {
  private config: AuthConfig
  private supabase: SupabaseClient
  private passwordValidator: PasswordValidator
  private jwtManager: JWTManager
  private sessionManager: SessionManager
  private rateLimiter: AuthRateLimiter

  constructor(config: AuthConfig, sessionStore: SessionStore) {
    this.config = config
    this.supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
    this.passwordValidator = new PasswordValidator(config)
    this.jwtManager = new JWTManager(config)
    this.sessionManager = new SessionManager(sessionStore, config)
    this.rateLimiter = new AuthRateLimiter(config)
  }

  /**
   * Sign up new user with email and password
   */
  async signUp(email: string, password: string, ipAddress?: string): Promise<AuthResult> {
    try {
      // Rate limiting check
      const rateLimitCheck = await this.rateLimiter.checkLimit(email)
      if (!rateLimitCheck.allowed) {
        await this.auditLog({
          action: 'signup',
          email,
          ipAddress,
          success: false,
          errorCode: rateLimitCheck.error!.code
        })
        return { success: false, error: rateLimitCheck.error }
      }

      // Validate password
      const validation = this.passwordValidator.validate(password, [email])
      if (!validation.valid) {
        await this.rateLimiter.recordFailure(email)
        
        const error: AuthError = {
          code: 'WEAK_PASSWORD',
          message: validation.feedback.join('. '),
          field: 'password'
        }

        await this.auditLog({
          action: 'signup',
          email,
          ipAddress,
          success: false,
          errorCode: 'WEAK_PASSWORD'
        })

        return { success: false, error }
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
        include: { organization: true }
      })

      if (existingUser) {
        await this.rateLimiter.recordFailure(email)
        
        const error: AuthError = {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'An account with this email already exists',
          field: 'email'
        }

        await this.auditLog({
          action: 'signup',
          email,
          ipAddress,
          success: false,
          errorCode: 'EMAIL_ALREADY_EXISTS'
        })

        return { success: false, error }
      }

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await this.supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true // Skip email verification for MVP
      })

      if (authError || !authData.user) {
        await this.rateLimiter.recordFailure(email)
        
        const error: AuthError = {
          code: 'EMAIL_ALREADY_EXISTS',
          message: authError?.message || 'Failed to create account'
        }

        await this.auditLog({
          action: 'signup',
          email,
          ipAddress,
          success: false,
          errorCode: 'EMAIL_ALREADY_EXISTS'
        })

        return { success: false, error }
      }

      // Hash password for our database
      const hashedPassword = await this.passwordValidator.hash(password)

      // Create organization and user in our database
      const user = await prisma.$transaction(async (tx) => {
        // Create user first
        const newUser = await tx.user.create({
          data: {
            id: authData.user.id,
            email,
            password_hash: hashedPassword,
            org_id: authData.user.id, // Temporary, will be updated
            mfa_enabled: false
          }
        })

        // Create organization with user as owner
        const organization = await tx.organization.create({
          data: {
            id: authData.user.id, // Same as user ID for single-owner MVP
            owner_user_id: newUser.id,
            plan: 'free',
            status: 'active'
          }
        })

        // Update user with correct org_id
        const updatedUser = await tx.user.update({
          where: { id: newUser.id },
          data: { org_id: organization.id },
          include: { organization: true }
        })

        return updatedUser as UserWithOrg
      })

      // Create session
      const session = await this.sessionManager.createSession(user, ipAddress)

      // Create JWT token
      const { token, refreshToken, expiresAt } = await this.jwtManager.createToken(user, session.sessionId)

      // Clear rate limiting on success
      await this.rateLimiter.clearAttempts(email)

      await this.auditLog({
        action: 'signup',
        userId: user.id,
        email,
        ipAddress,
        success: true
      })

      return {
        success: true,
        user,
        session,
        token,
        refreshToken
      }

    } catch (error) {
      console.error('SignUp error:', error)
      
      await this.auditLog({
        action: 'signup',
        email,
        ipAddress,
        success: false,
        errorCode: 'INVALID_CREDENTIALS'
      })

      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Failed to create account'
        }
      }
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string, ipAddress?: string, userAgent?: string): Promise<AuthResult> {
    try {
      // Rate limiting check
      const rateLimitCheck = await this.rateLimiter.checkLimit(email)
      if (!rateLimitCheck.allowed) {
        await this.auditLog({
          action: 'login',
          email,
          ipAddress,
          success: false,
          errorCode: rateLimitCheck.error!.code
        })
        return { success: false, error: rateLimitCheck.error }
      }

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { email },
        include: { organization: true }
      }) as UserWithOrg | null

      if (!user || !user.password_hash) {
        await this.rateLimiter.recordFailure(email)
        
        const error: AuthError = {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }

        await this.auditLog({
          action: 'login',
          email,
          ipAddress,
          success: false,
          errorCode: 'INVALID_CREDENTIALS'
        })

        return { success: false, error }
      }

      // Verify password
      const passwordValid = await this.passwordValidator.verify(password, user.password_hash)
      if (!passwordValid) {
        await this.rateLimiter.recordFailure(email)
        
        const error: AuthError = {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }

        await this.auditLog({
          action: 'login',
          userId: user.id,
          email,
          ipAddress,
          success: false,
          errorCode: 'INVALID_CREDENTIALS'
        })

        return { success: false, error }
      }

      // Check organization status
      if (user.organization.status !== 'active') {
        const error: AuthError = {
          code: 'ACCOUNT_LOCKED',
          message: 'Account is not active'
        }

        await this.auditLog({
          action: 'login',
          userId: user.id,
          email,
          ipAddress,
          success: false,
          errorCode: 'ACCOUNT_LOCKED'
        })

        return { success: false, error }
      }

      // Create session
      const session = await this.sessionManager.createSession(user, ipAddress, userAgent)

      // Create JWT token
      const { token, refreshToken } = await this.jwtManager.createToken(user, session.sessionId)

      // Clear rate limiting on success
      await this.rateLimiter.clearAttempts(email)

      await this.auditLog({
        action: 'login',
        userId: user.id,
        email,
        ipAddress,
        success: true
      })

      return {
        success: true,
        user,
        session,
        token,
        refreshToken
      }

    } catch (error) {
      console.error('SignIn error:', error)
      
      await this.auditLog({
        action: 'login',
        email,
        ipAddress,
        success: false,
        errorCode: 'INVALID_CREDENTIALS'
      })

      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Authentication failed'
        }
      }
    }
  }

  /**
   * Google SSO authentication
   */
  async signInWithGoogle(options: GoogleAuthOptions, ipAddress?: string): Promise<AuthResult> {
    try {
      // Exchange Google auth code for tokens
      const googleUser = await this.getGoogleUserInfo(options.code, options.redirectUri)
      
      if (!googleUser) {
        const error: AuthError = {
          code: 'GOOGLE_AUTH_ERROR',
          message: 'Failed to authenticate with Google'
        }

        await this.auditLog({
          action: 'login',
          email: 'unknown',
          ipAddress,
          success: false,
          errorCode: 'GOOGLE_AUTH_ERROR'
        })

        return { success: false, error }
      }

      // Check if user exists
      let user = await prisma.user.findUnique({
        where: { email: googleUser.email },
        include: { organization: true }
      }) as UserWithOrg | null

      if (!user) {
        // Create new user with Google SSO
        user = await prisma.$transaction(async (tx) => {
          const newUser = await tx.user.create({
            data: {
              id: nanoid(),
              email: googleUser.email,
              oidc_provider: 'google',
              org_id: nanoid(), // Temporary
              mfa_enabled: false
            }
          })

          const organization = await tx.organization.create({
            data: {
              id: newUser.org_id,
              owner_user_id: newUser.id,
              plan: 'free',
              status: 'active'
            }
          })

          return tx.user.findUnique({
            where: { id: newUser.id },
            include: { organization: true }
          }) as Promise<UserWithOrg>
        })

        if (!user) {
          throw new Error('Failed to create user')
        }
      }

      // Create session
      const session = await this.sessionManager.createSession(user, ipAddress)

      // Create JWT token
      const { token, refreshToken } = await this.jwtManager.createToken(user, session.sessionId)

      await this.auditLog({
        action: 'login',
        userId: user.id,
        email: user.email,
        ipAddress,
        success: true,
        metadata: { provider: 'google' }
      })

      return {
        success: true,
        user,
        session,
        token,
        refreshToken
      }

    } catch (error) {
      console.error('Google auth error:', error)
      
      return {
        success: false,
        error: {
          code: 'GOOGLE_AUTH_ERROR',
          message: 'Google authentication failed'
        }
      }
    }
  }

  /**
   * Send magic link for passwordless auth
   */
  async sendMagicLink(options: MagicLinkOptions): Promise<{ success: boolean; error?: AuthError }> {
    try {
      // Create magic link token
      const token = await this.jwtManager.createMagicLinkToken(options.email, options.action)

      // In production, send via email service
      // For MVP, return the token (would be sent via email)
      console.log(`Magic link token for ${options.email}: ${token}`)

      return { success: true }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Failed to send magic link'
        }
      }
    }
  }

  /**
   * Verify magic link token and authenticate
   */
  async verifyMagicLink(token: string, ipAddress?: string): Promise<AuthResult> {
    try {
      const verification = await this.jwtManager.verifyMagicLinkToken(token)
      
      if (!verification.valid || !verification.email) {
        return { success: false, error: verification.error }
      }

      // Get or create user
      let user = await prisma.user.findUnique({
        where: { email: verification.email },
        include: { organization: true }
      }) as UserWithOrg | null

      if (!user && verification.action === 'signup') {
        // Create new user
        user = await this.createUserFromMagicLink(verification.email)
      }

      if (!user) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        }
      }

      // Create session
      const session = await this.sessionManager.createSession(user, ipAddress)

      // Create JWT token
      const { token: jwtToken, refreshToken } = await this.jwtManager.createToken(user, session.sessionId)

      await this.auditLog({
        action: 'login',
        userId: user.id,
        email: user.email,
        ipAddress,
        success: true,
        metadata: { provider: 'magic_link' }
      })

      return {
        success: true,
        user,
        session,
        token: jwtToken,
        refreshToken
      }

    } catch (error) {
      console.error('Magic link verification error:', error)
      
      return {
        success: false,
        error: {
          code: 'MAGIC_LINK_EXPIRED',
          message: 'Magic link verification failed'
        }
      }
    }
  }

  /**
   * Sign out user and invalidate session
   */
  async signOut(sessionId: string): Promise<{ success: boolean }> {
    try {
      const session = await this.sessionManager.getSession(sessionId)
      
      if (session) {
        await this.sessionManager.deleteSession(sessionId)
        
        await this.auditLog({
          action: 'logout',
          userId: session.userId,
          email: session.email,
          success: true
        })
      }

      return { success: true }
    } catch (error) {
      console.error('SignOut error:', error)
      return { success: false }
    }
  }

  /**
   * Change password and invalidate all sessions
   */
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
    success: boolean
    error?: AuthError
  }> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { organization: true }
      })

      if (!user || !user.password_hash) {
        return {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found'
          }
        }
      }

      // Verify current password
      const currentPasswordValid = await this.passwordValidator.verify(currentPassword, user.password_hash)
      if (!currentPasswordValid) {
        return {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Current password is incorrect'
          }
        }
      }

      // Validate new password
      const validation = this.passwordValidator.validate(newPassword, [user.email])
      if (!validation.valid) {
        return {
          success: false,
          error: {
            code: 'WEAK_PASSWORD',
            message: validation.feedback.join('. ')
          }
        }
      }

      // Hash new password
      const newPasswordHash = await this.passwordValidator.hash(newPassword)

      // Update password in database
      await prisma.user.update({
        where: { id: userId },
        data: { password_hash: newPasswordHash }
      })

      // Invalidate all user sessions (security requirement)
      await this.sessionManager.invalidateAllUserSessions(userId)

      await this.auditLog({
        action: 'password_change',
        userId,
        email: user.email,
        success: true
      })

      return { success: true }

    } catch (error) {
      console.error('Change password error:', error)
      
      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Failed to change password'
        }
      }
    }
  }

  /**
   * Verify JWT token and get user session
   */
  async verifyToken(token: string): Promise<{
    valid: boolean
    user?: UserWithOrg
    session?: any
    error?: AuthError
  }> {
    const verification = await this.jwtManager.verifyToken(token)
    
    if (!verification.valid) {
      return { valid: false, error: verification.error }
    }

    const payload = verification.payload!
    
    // Validate session
    const sessionValidation = await this.sessionManager.validateSession(payload.session_id)
    if (!sessionValidation.valid) {
      return {
        valid: false,
        error: {
          code: 'SESSION_EXPIRED',
          message: sessionValidation.reason || 'Session invalid'
        }
      }
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      include: { organization: true }
    }) as UserWithOrg | null

    if (!user) {
      return {
        valid: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      }
    }

    // Update session activity
    await this.sessionManager.updateActivity(payload.session_id)

    return {
      valid: true,
      user,
      session: sessionValidation.session
    }
  }

  // Private helper methods

  private async createUserFromMagicLink(email: string): Promise<UserWithOrg> {
    return prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          id: nanoid(),
          email,
          org_id: nanoid(), // Temporary
          mfa_enabled: false
        }
      })

      const organization = await tx.organization.create({
        data: {
          id: newUser.org_id,
          owner_user_id: newUser.id,
          plan: 'free',
          status: 'active'
        }
      })

      return tx.user.findUnique({
        where: { id: newUser.id },
        include: { organization: true }
      }) as Promise<UserWithOrg>
    })
  }

  private async getGoogleUserInfo(code: string, redirectUri: string): Promise<GoogleUserInfo | null> {
    try {
      // Exchange code for tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: this.config.googleClientId!,
          client_secret: this.config.googleClientSecret!,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri
        })
      })

      const tokens = await tokenResponse.json()
      
      if (!tokens.access_token) {
        throw new Error('No access token received')
      }

      // Get user info
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { 'Authorization': `Bearer ${tokens.access_token}` }
      })

      const userInfo = await userResponse.json()
      return userInfo as GoogleUserInfo

    } catch (error) {
      console.error('Google user info error:', error)
      return null
    }
  }

  private async auditLog(data: AuthAuditData): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          org_id: data.userId ? (await prisma.user.findUnique({
            where: { id: data.userId }
          }))?.org_id || 'unknown' : 'unknown',
          user_id: data.userId,
          action: data.action,
          meta_json: {
            email: data.email,
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
            success: data.success,
            errorCode: data.errorCode,
            ...data.metadata
          }
        }
      })
    } catch (error) {
      console.error('Audit log error:', error)
    }
  }
}