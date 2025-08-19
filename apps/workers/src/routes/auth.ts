/**
 * Authentication routes for Cloudflare Workers - MVP Stub Implementation
 */
import { Hono } from 'hono'
import type { Env } from '../types/env'

// Stub types and functions to replace @bsr/auth
interface User {
  id: string
  email: string
  org_id: string
  organization: {
    plan: string
    status: string
    owner_user_id: string
  }
  mfa_enabled?: boolean
  created_at?: string
}

// Simple JWT-like token generation for MVP
function generateStubToken(userId: string): string {
  return `stub_token_${userId}_${Date.now()}`
}

// Stub auth middleware
function requireAuth(c: any, next: any) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'UNAUTHORIZED', message: 'Authentication required' }, 401)
  }
  
  // Stub user for MVP
  c.set('user', {
    id: 'user_123',
    email: 'demo@example.com',
    org_id: 'org_123',
    organization: {
      plan: 'starter',
      status: 'active',
      owner_user_id: 'user_123'
    }
  })
  
  return next()
}

function getCurrentUser(c: any): User | null {
  return c.get('user')
}

const auth = new Hono<{ Bindings: Env }>()

// Public routes (no auth required)

// Sign up with email/password - MVP stub
auth.post('/signup', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Email and password are required'
      }, 400)
    }

    // Stub response for MVP
    const userId = `user_${Date.now()}`
    const token = generateStubToken(userId)
    
    return c.json({
      success: true,
      user: {
        id: userId,
        email: email,
        organization: {
          id: `org_${Date.now()}`,
          plan: 'starter',
          status: 'active'
        }
      },
      token: token,
      refreshToken: `refresh_${token}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

  } catch (error) {
    console.error('Signup error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Signup failed'
    }, 500)
  }
})

// Sign in with email/password - MVP stub
auth.post('/signin', async (c) => {
  try {
    const { email, password } = await c.req.json()
    
    if (!email || !password) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Email and password are required'
      }, 400)
    }

    // Stub response - accept any email/password for MVP
    const userId = 'user_123'
    const token = generateStubToken(userId)
    
    return c.json({
      success: true,
      user: {
        id: userId,
        email: email,
        organization: {
          id: 'org_123',
          plan: 'starter',
          status: 'active'
        }
      },
      token: token,
      refreshToken: `refresh_${token}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

  } catch (error) {
    console.error('Signin error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Signin failed'
    }, 500)
  }
})

// Google OAuth callback - MVP stub
auth.post('/google/callback', async (c) => {
  try {
    const { code, redirectUri } = await c.req.json()
    
    if (!code || !redirectUri) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Authorization code and redirect URI are required'
      }, 400)
    }

    // Stub Google auth for MVP
    const userId = 'user_google_123'
    const token = generateStubToken(userId)
    
    return c.json({
      success: true,
      user: {
        id: userId,
        email: 'google.user@example.com',
        organization: {
          id: 'org_123',
          plan: 'starter',
          status: 'active'
        }
      },
      token: token,
      refreshToken: `refresh_${token}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

  } catch (error) {
    console.error('Google auth error:', error)
    return c.json({
      error: 'GOOGLE_AUTH_ERROR',
      message: 'Google authentication failed'
    }, 400)
  }
})

// Send magic link - MVP stub
auth.post('/magic-link', async (c) => {
  try {
    const { email, action = 'login', redirectUrl } = await c.req.json()
    
    if (!email) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Email is required'
      }, 400)
    }

    // Stub magic link for MVP
    console.log(`Magic link would be sent to: ${email}`);
    
    return c.json({
      success: true,
      message: 'Magic link sent to your email',
      // For testing: provide a stub token
      test_token: `magic_link_${Date.now()}`
    })

  } catch (error) {
    console.error('Magic link error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to send magic link'
    }, 500)
  }
})

// Verify magic link - MVP stub
auth.post('/magic-link/verify', async (c) => {
  try {
    const { token } = await c.req.json()
    
    if (!token) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Token is required'
      }, 400)
    }

    // Stub magic link verification for MVP
    const userId = 'user_magic_123'
    const authToken = generateStubToken(userId)
    
    return c.json({
      success: true,
      user: {
        id: userId,
        email: 'magic.user@example.com',
        organization: {
          id: 'org_123',
          plan: 'starter',
          status: 'active'
        }
      },
      token: authToken,
      refreshToken: `refresh_${authToken}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
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
const authMiddleware = requireAuth

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

// Sign out - MVP stub
auth.post('/signout', authMiddleware, async (c) => {
  try {
    // Stub signout for MVP
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

// Change password - MVP stub
auth.post('/change-password', authMiddleware, async (c) => {
  try {
    const { currentPassword, newPassword } = await c.req.json()
    
    if (!currentPassword || !newPassword) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Current password and new password are required'
      }, 400)
    }

    // Stub password change for MVP
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

// Refresh token - MVP stub
auth.post('/refresh', async (c) => {
  try {
    const { refreshToken } = await c.req.json()
    
    if (!refreshToken) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'Refresh token is required'
      }, 400)
    }

    // Stub refresh token for MVP
    const userId = 'user_123'
    const newToken = generateStubToken(userId)
    
    return c.json({
      success: true,
      token: newToken,
      refreshToken: `refresh_${newToken}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

  } catch (error) {
    console.error('Refresh token error:', error)
    return c.json({
      error: 'INVALID_TOKEN',
      message: 'Failed to refresh token'
    }, 401)
  }
})

// Resend confirmation email - MVP with real Supabase integration
auth.post('/resend-confirmation', async (c) => {
  try {
    const { email } = await c.req.json()
    
    if (!email) {
      return c.json({ error: 'Email is required' }, 400)
    }
    
    // Use Supabase client to trigger resend
    const supabaseUrl = c.env.SUPABASE_URL
    const supabaseAnonKey = c.env.SUPABASE_ANON_KEY
    
    const response = await fetch(`${supabaseUrl}/auth/v1/resend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: 'https://app.bankstatementretriever.com/auth/callback'
        }
      })
    })
    
    const result = await response.text()
    console.log(`Resend confirmation for ${email}, Response: ${response.status}, Body: ${result}`)
    
    if (response.ok) {
      return c.json({
        success: true,
        message: 'Confirmation email sent successfully',
        email: email
      })
    } else {
      console.error('Supabase resend error:', result)
      return c.json({
        success: false,
        error: 'Failed to send confirmation email',
        details: result
      }, response.status)
    }
    
  } catch (error) {
    console.error('Resend confirmation error:', error)
    return c.json({ error: 'Failed to resend confirmation email' }, 500)
  }
})

// Simple resend endpoint for testing
auth.post('/resend-simple', async (c) => {
  try {
    const { email } = await c.req.json()
    
    if (!email) {
      return c.json({ error: 'Email is required' }, 400)
    }
    
    console.log(`Resend confirmation requested for: ${email}`)
    
    return c.json({
      success: true,
      message: 'If an account with this email exists, a confirmation email has been sent.',
      email: email,
      test_resend_url: `https://yoodxepoxrxzfstfgwst.supabase.co/auth/v1/verify?token=test_token&type=signup&redirect_to=https://app.bankstatementretriever.com/auth/callback`
    })
    
  } catch (error) {
    console.error('Simple resend error:', error)
    return c.json({ error: 'Failed to resend confirmation email' }, 500)
  }
})

export { auth as authRouter }