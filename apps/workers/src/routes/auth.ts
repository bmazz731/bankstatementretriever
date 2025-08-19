/**
 * Authentication routes for Cloudflare Workers
 */
import { Hono } from 'hono'
import { 
  AuthService, 
  MemorySessionStore,
  KVSessionStore,
  HonoAuthMiddleware,
  createAuthConfig,
  getCurrentUser,
  requireAuth
} from '@bsr/auth'
import type { Env } from '../types/env'
import { DatabaseClient } from '../lib/database'

const auth = new Hono<{ Bindings: Env }>()

// Initialize auth service
function createAuthService(env: Env) {
  const config = createAuthConfig({
    supabaseUrl: env.SUPABASE_URL,
    supabaseAnonKey: env.SUPABASE_ANON_KEY,
    supabaseServiceKey: env.SUPABASE_SERVICE_ROLE_KEY,
    jwtSecret: env.WEBHOOK_SIGNING_SECRET, // Reuse signing secret for JWT
    googleClientId: env.GOOGLE_CLIENT_ID,
    googleClientSecret: env.GOOGLE_CLIENT_SECRET
  })

  // Use KV store for sessions in Workers
  const sessionStore = new KVSessionStore(env.BSR_CACHE)
  
  return new AuthService(config, sessionStore)
}

// Initialize middleware
function createAuthMiddleware(env: Env) {
  const authService = createAuthService(env)
  return new HonoAuthMiddleware(authService)
}

// Public routes (no auth required)

// Sign up with email/password
auth.post('/signup', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Email and password are required'
      }, 400)
    }

    const authService = createAuthService(c.env)
    const ipAddress = c.req.header('CF-Connecting-IP')
    
    const result = await authService.signUp(email, password, ipAddress)
    
    if (!result.success) {
      return c.json({
        error: result.error!.code,
        message: result.error!.message,
        field: result.error!.field
      }, 400)
    }

    return c.json({
      success: true,
      user: {
        id: result.user!.id,
        email: result.user!.email,
        organization: {
          id: result.user!.org_id,
          plan: result.user!.organization.plan,
          status: result.user!.organization.status
        }
      },
      token: result.token,
      refreshToken: result.refreshToken,
      expiresAt: result.session!.expiresAt
    })

  } catch (error) {
    console.error('Signup error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Signup failed'
    }, 500)
  }
})

// Sign in with email/password
auth.post('/signin', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Email and password are required'
      }, 400)
    }

    const authService = createAuthService(c.env)
    const ipAddress = c.req.header('CF-Connecting-IP')
    const userAgent = c.req.header('User-Agent')
    
    const result = await authService.signIn(email, password, ipAddress, userAgent)
    
    if (!result.success) {
      return c.json({
        error: result.error!.code,
        message: result.error!.message,
        retryAfter: result.error!.retryAfter
      }, result.error!.code === 'RATE_LIMITED' ? 429 : 401)
    }

    return c.json({
      success: true,
      user: {
        id: result.user!.id,
        email: result.user!.email,
        organization: {
          id: result.user!.org_id,
          plan: result.user!.organization.plan,
          status: result.user!.organization.status
        }
      },
      token: result.token,
      refreshToken: result.refreshToken,
      expiresAt: result.session!.expiresAt
    })

  } catch (error) {
    console.error('Signin error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Signin failed'
    }, 500)
  }
})

// Google OAuth callback
auth.post('/google/callback', async (c) => {
  try {
    const { code, redirectUri } = await c.req.json()
    
    if (!code || !redirectUri) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Authorization code and redirect URI are required'
      }, 400)
    }

    const authService = createAuthService(c.env)
    const ipAddress = c.req.header('CF-Connecting-IP')
    
    const result = await authService.signInWithGoogle({ code, redirectUri }, ipAddress)
    
    if (!result.success) {
      return c.json({
        error: result.error!.code,
        message: result.error!.message
      }, 400)
    }

    return c.json({
      success: true,
      user: {
        id: result.user!.id,
        email: result.user!.email,
        organization: {
          id: result.user!.org_id,
          plan: result.user!.organization.plan,
          status: result.user!.organization.status
        }
      },
      token: result.token,
      refreshToken: result.refreshToken,
      expiresAt: result.session!.expiresAt
    })

  } catch (error) {
    console.error('Google auth error:', error)
    return c.json({
      error: 'GOOGLE_AUTH_ERROR',
      message: 'Google authentication failed'
    }, 400)
  }
})

// Send magic link
auth.post('/magic-link', async (c) => {
  try {
    const { email, action = 'login', redirectUrl } = await c.req.json()
    
    if (!email) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Email is required'
      }, 400)
    }

    const authService = createAuthService(c.env)
    
    const result = await authService.sendMagicLink({ 
      email, 
      action, 
      redirectUrl 
    })
    
    if (!result.success) {
      return c.json({
        error: result.error!.code,
        message: result.error!.message
      }, 400)
    }

    return c.json({
      success: true,
      message: 'Magic link sent to your email'
    })

  } catch (error) {
    console.error('Magic link error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to send magic link'
    }, 500)
  }
})

// Verify magic link
auth.post('/magic-link/verify', async (c) => {
  try {
    const { token } = await c.req.json()
    
    if (!token) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Token is required'
      }, 400)
    }

    const authService = createAuthService(c.env)
    const ipAddress = c.req.header('CF-Connecting-IP')
    
    const result = await authService.verifyMagicLink(token, ipAddress)
    
    if (!result.success) {
      return c.json({
        error: result.error!.code,
        message: result.error!.message
      }, 400)
    }

    return c.json({
      success: true,
      user: {
        id: result.user!.id,
        email: result.user!.email,
        organization: {
          id: result.user!.org_id,
          plan: result.user!.organization.plan,
          status: result.user!.organization.status
        }
      },
      token: result.token,
      refreshToken: result.refreshToken,
      expiresAt: result.session!.expiresAt
    })

  } catch (error) {
    console.error('Magic link verification error:', error)
    return c.json({
      error: 'MAGIC_LINK_EXPIRED',
      message: 'Magic link verification failed'
    }, 400)
  }
})

// Protected routes (require authentication)
const authMiddleware = (c: any, next: any) => createAuthMiddleware(c.env).authenticate(true)(c, next)

// Get current user profile
auth.get('/me', authMiddleware, async (c) => {
  const user = getCurrentUser(c)!
  
  return c.json({
    id: user.id,
    email: user.email,
    organization: {
      id: user.org_id,
      plan: user.organization.plan,
      status: user.organization.status,
      role: user.id === user.organization.owner_user_id ? 'owner' : 'member'
    },
    mfa_enabled: user.mfa_enabled,
    created_at: user.created_at
  })
})

// Sign out (invalidate session)
auth.post('/signout', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const authService = createAuthService(c.env)
    
    // Extract session ID from token
    const authHeader = c.req.header('Authorization')
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      const verification = await authService.verifyToken(token)
      
      if (verification.valid && verification.session) {
        await authService.signOut((verification.session as any).sessionId)
      }
    }

    return c.json({
      success: true,
      message: 'Signed out successfully'
    })

  } catch (error) {
    console.error('Signout error:', error)
    return c.json({
      success: true // Always return success for signout
    })
  }
})

// Change password
auth.post('/change-password', authMiddleware, async (c) => {
  try {
    const { currentPassword, newPassword } = await c.req.json()
    
    if (!currentPassword || !newPassword) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Current password and new password are required'
      }, 400)
    }

    const user = getCurrentUser(c)!
    const authService = createAuthService(c.env)
    
    const result = await authService.changePassword(user.id, currentPassword, newPassword)
    
    if (!result.success) {
      return c.json({
        error: result.error!.code,
        message: result.error!.message
      }, 400)
    }

    return c.json({
      success: true,
      message: 'Password changed successfully. Please sign in again.'
    })

  } catch (error) {
    console.error('Change password error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to change password'
    }, 500)
  }
})

// Refresh token
auth.post('/refresh', async (c) => {
  try {
    const { refreshToken } = await c.req.json()
    
    if (!refreshToken) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Refresh token is required'
      }, 400)
    }

    // TODO: Implement refresh token logic
    return c.json({
      error: 'NOT_IMPLEMENTED',
      message: 'Token refresh not implemented yet'
    }, 501)

  } catch (error) {
    console.error('Refresh token error:', error)
    return c.json({
      error: 'INVALID_TOKEN',
      message: 'Failed to refresh token'
    }, 401)
  }
})

export { auth as authRouter }