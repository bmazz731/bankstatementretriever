/**
 * Hono-specific middleware for Cloudflare Workers
 */
import { Context, Next } from 'hono'
import type { AuthContext, UserWithOrg, UserSession, Permission } from './types'
import { AuthService } from './auth-service'

// Extend Hono context with auth
declare module 'hono' {
  interface ContextVariableMap {
    auth: AuthContext
    user?: UserWithOrg
    session?: UserSession
  }
}

export class HonoAuthMiddleware {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  /**
   * Authentication middleware for Hono
   */
  authenticate(required: boolean = true) {
    return async (c: Context, next: Next) => {
      try {
        const authHeader = c.req.header('Authorization')
        
        if (!authHeader) {
          if (required) {
            return c.json({
              error: 'UNAUTHORIZED',
              message: 'Authorization header required'
            }, 401)
          }
          
          c.set('auth', this.createEmptyAuthContext())
          return next()
        }

        const token = this.extractToken(authHeader)
        if (!token) {
          if (required) {
            return c.json({
              error: 'UNAUTHORIZED', 
              message: 'Invalid authorization header format'
            }, 401)
          }
          
          c.set('auth', this.createEmptyAuthContext())
          return next()
        }

        const verification = await this.authService.verifyToken(token)
        
        if (!verification.valid) {
          if (required) {
            return c.json({
              error: verification.error?.code || 'UNAUTHORIZED',
              message: verification.error?.message || 'Invalid token'
            }, 401)
          }
          
          c.set('auth', this.createEmptyAuthContext())
          return next()
        }

        // Create auth context
        const authContext = this.createAuthContext(verification.user!, verification.session)
        
        // Set context variables
        c.set('auth', authContext)
        c.set('user', verification.user)
        c.set('session', verification.session)

        // Add security headers
        c.header('X-User-ID', verification.user!.id)
        c.header('X-Org-ID', verification.user!.org_id)

        return next()

      } catch (error) {
        console.error('Hono auth middleware error:', error)
        
        return c.json({
          error: 'INTERNAL_ERROR',
          message: 'Authentication failed'
        }, 500)
      }
    }
  }

  /**
   * Permission-based middleware
   */
  requirePermission(permission: Permission) {
    return async (c: Context, next: Next) => {
      const auth = c.get('auth')
      
      if (!auth?.isAuthenticated) {
        return c.json({
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        }, 401)
      }

      if (!auth.hasPermission(permission)) {
        return c.json({
          error: 'FORBIDDEN',
          message: `Permission '${permission}' required`
        }, 403)
      }

      return next()
    }
  }

  /**
   * Plan-based middleware
   */
  requirePlan(plan: string) {
    return async (c: Context, next: Next) => {
      const auth = c.get('auth')
      
      if (!auth?.isAuthenticated) {
        return c.json({
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        }, 401)
      }

      const user = c.get('user')
      if (!user || !this.isPlanSufficient(user.organization.plan, plan)) {
        return c.json({
          error: 'FORBIDDEN',
          message: `${plan} plan or higher required`
        }, 403)
      }

      return next()
    }
  }

  /**
   * Organization access middleware
   */
  requireOrgAccess() {
    return async (c: Context, next: Next) => {
      const auth = c.get('auth')
      
      if (!auth?.isAuthenticated) {
        return c.json({
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        }, 401)
      }

      const user = c.get('user')!
      const orgId = c.req.param('orgId')
      
      if (orgId && orgId !== user.org_id) {
        return c.json({
          error: 'FORBIDDEN',
          message: 'Access denied to organization'
        }, 403)
      }

      return next()
    }
  }

  /**
   * Owner-only middleware
   */
  requireOwner() {
    return async (c: Context, next: Next) => {
      const auth = c.get('auth')
      const user = c.get('user')
      
      if (!auth?.isAuthenticated || !user) {
        return c.json({
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        }, 401)
      }

      if (user.id !== user.organization.owner_user_id) {
        return c.json({
          error: 'FORBIDDEN',
          message: 'Organization owner access required'
        }, 403)
      }

      return next()
    }
  }

  /**
   * Rate limiting middleware
   */
  rateLimit(windowMs: number = 15 * 60 * 1000, max: number = 100) {
    const requests = new Map<string, { count: number; resetTime: number }>()

    return async (c: Context, next: Next) => {
      const identifier = this.getClientIdentifier(c)
      const now = Date.now()

      let requestInfo = requests.get(identifier)
      
      if (!requestInfo || now > requestInfo.resetTime) {
        requestInfo = { count: 0, resetTime: now + windowMs }
        requests.set(identifier, requestInfo)
      }

      if (requestInfo.count >= max) {
        const retryAfter = Math.ceil((requestInfo.resetTime - now) / 1000)
        
        c.header('Retry-After', retryAfter.toString())
        
        return c.json({
          error: 'RATE_LIMITED',
          message: 'Too many requests',
          retryAfter
        }, 429)
      }

      requestInfo.count++

      // Add rate limit headers
      c.header('X-RateLimit-Limit', max.toString())
      c.header('X-RateLimit-Remaining', (max - requestInfo.count).toString())
      c.header('X-RateLimit-Reset', requestInfo.resetTime.toString())

      return next()
    }
  }

  // Helper methods

  private createAuthContext(user: UserWithOrg, session?: UserSession): AuthContext {
    const hasPermission = (permission: Permission): boolean => {
      // Owner has all permissions
      if (user.id === user.organization.owner_user_id) {
        return true
      }

      // Plan-based permissions
      const planPermissions = this.getPlanPermissions(user.organization.plan)
      return planPermissions.includes(permission)
    }

    const requireAuth = (): void => {
      throw new Error('Authentication required')
    }

    const requirePlan = (requiredPlan: string): void => {
      if (!this.isPlanSufficient(user.organization.plan, requiredPlan)) {
        throw new Error(`${requiredPlan} plan or higher required`)
      }
    }

    return {
      user,
      session,
      isAuthenticated: true,
      hasPermission,
      requireAuth,
      requirePlan
    }
  }

  private createEmptyAuthContext(): AuthContext {
    const hasPermission = (): boolean => false
    
    const requireAuth = (): void => {
      throw new Error('Authentication required')
    }

    const requirePlan = (): void => {
      throw new Error('Authentication required')
    }

    return {
      isAuthenticated: false,
      hasPermission,
      requireAuth,
      requirePlan
    }
  }

  private extractToken(authHeader: string): string | null {
    if (!authHeader) return null
    
    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null
    }
    
    return parts[1]
  }

  private getClientIdentifier(c: Context): string {
    // Cloudflare Workers specific headers
    return c.req.header('CF-Connecting-IP') || 
           c.req.header('X-Forwarded-For') || 
           c.req.header('X-Real-IP') || 
           'unknown'
  }

  private getPlanPermissions(plan: string): Permission[] {
    const permissions: Record<string, Permission[]> = {
      free: [
        'read:accounts',
        'read:statements'
      ],
      business: [
        'read:accounts',
        'write:accounts',
        'read:statements',
        'read:destinations',
        'write:destinations'
      ],
      professional: [
        'read:accounts',
        'write:accounts',
        'read:statements',
        'write:statements',
        'read:destinations',
        'write:destinations'
      ],
      agency: [
        'read:accounts',
        'write:accounts',
        'read:statements',
        'write:statements',
        'read:destinations',
        'write:destinations',
        'admin:organization'
      ],
      enterprise: [
        'read:accounts',
        'write:accounts',
        'read:statements',
        'write:statements',
        'read:destinations',
        'write:destinations',
        'admin:organization',
        'admin:billing'
      ]
    }

    return permissions[plan] || permissions.free
  }

  private isPlanSufficient(userPlan: string, requiredPlan: string): boolean {
    const planHierarchy = ['free', 'business', 'professional', 'agency', 'enterprise']
    
    const userPlanIndex = planHierarchy.indexOf(userPlan)
    const requiredPlanIndex = planHierarchy.indexOf(requiredPlan)
    
    return userPlanIndex >= requiredPlanIndex
  }
}

// Helper functions for use in route handlers

export function getAuthContext(c: Context): AuthContext {
  return c.get('auth')
}

export function getCurrentUser(c: Context): UserWithOrg | undefined {
  return c.get('user')
}

export function getCurrentSession(c: Context): UserSession | undefined {
  return c.get('session')
}

export function requireAuth(c: Context): UserWithOrg {
  const user = c.get('user')
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}

export function requirePlan(c: Context, plan: string): void {
  const user = requireAuth(c)
  const planHierarchy = ['free', 'business', 'professional', 'agency', 'enterprise']
  
  const userPlanIndex = planHierarchy.indexOf(user.organization.plan)
  const requiredPlanIndex = planHierarchy.indexOf(plan)
  
  if (userPlanIndex < requiredPlanIndex) {
    throw new Error(`${plan} plan or higher required`)
  }
}