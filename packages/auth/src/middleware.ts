/**
 * Authorization middleware for request authentication and permission checking
 */
import type { 
  AuthContext, 
  AuthenticatedRequest, 
  Permission, 
  UserWithOrg, 
  AuthError,
  UserSession
} from './types'
import { AuthService } from './auth-service'

// Middleware context interface for different frameworks
export interface MiddlewareContext {
  request: {
    method: string
    url: string
    headers: Record<string, string>
    body?: any
  }
  response: {
    status: (code: number) => void
    json: (data: any) => void
    headers: Record<string, string>
  }
  next?: () => void
}

export class AuthMiddleware {
  private authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  /**
   * Create auth context from request
   */
  private createAuthContext(user?: UserWithOrg, session?: UserSession): AuthContext {
    const hasPermission = (permission: Permission): boolean => {
      if (!user) return false
      
      // Owner has all permissions
      if (user.id === user.organization.owner_user_id) {
        return true
      }

      // Plan-based permissions
      const planPermissions = this.getPlanPermissions(user.organization.plan)
      return planPermissions.includes(permission)
    }

    const requireAuth = (): void => {
      if (!user) {
        throw new AuthError({
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        })
      }
    }

    const requirePlan = (requiredPlan: string): void => {
      if (!user) {
        throw new AuthError({
          code: 'UNAUTHORIZED',
          message: 'Authentication required'
        })
      }

      if (!this.isPlanSufficient(user.organization.plan, requiredPlan)) {
        throw new AuthError({
          code: 'FORBIDDEN',
          message: `${requiredPlan} plan or higher required`
        })
      }
    }

    return {
      user,
      session,
      isAuthenticated: !!user,
      hasPermission,
      requireAuth,
      requirePlan
    }
  }

  /**
   * Express-style middleware
   */
  authenticate(required: boolean = true) {
    return async (ctx: MiddlewareContext) => {
      try {
        const authHeader = ctx.request.headers['authorization']
        let authContext: AuthContext

        if (!authHeader) {
          if (required) {
            ctx.response.status(401)
            ctx.response.json({
              error: 'UNAUTHORIZED',
              message: 'Authorization header required'
            })
            return
          }
          
          authContext = this.createAuthContext()
        } else {
          const token = this.extractToken(authHeader)
          if (!token) {
            if (required) {
              ctx.response.status(401)
              ctx.response.json({
                error: 'UNAUTHORIZED',
                message: 'Invalid authorization header format'
              })
              return
            }
            
            authContext = this.createAuthContext()
          } else {
            const verification = await this.authService.verifyToken(token)
            
            if (!verification.valid) {
              if (required) {
                ctx.response.status(401)
                ctx.response.json({
                  error: verification.error?.code || 'UNAUTHORIZED',
                  message: verification.error?.message || 'Invalid token'
                })
                return
              }
              
              authContext = this.createAuthContext()
            } else {
              authContext = this.createAuthContext(verification.user, verification.session)
              
              // Add security headers
              ctx.response.headers['X-User-ID'] = verification.user!.id
              ctx.response.headers['X-Org-ID'] = verification.user!.org_id
            }
          }
        }

        // Attach auth context to request
        ;(ctx.request as AuthenticatedRequest).auth = authContext

        if (ctx.next) {
          await ctx.next()
        }

      } catch (error) {
        console.error('Auth middleware error:', error)
        
        ctx.response.status(500)
        ctx.response.json({
          error: 'INTERNAL_ERROR',
          message: 'Authentication failed'
        })
      }
    }
  }

  /**
   * Permission-based middleware
   */
  requirePermission(permission: Permission) {
    return async (ctx: MiddlewareContext) => {
      const authCtx = (ctx.request as AuthenticatedRequest).auth
      
      if (!authCtx?.isAuthenticated) {
        ctx.response.status(401)
        ctx.response.json({
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        })
        return
      }

      if (!authCtx.hasPermission(permission)) {
        ctx.response.status(403)
        ctx.response.json({
          error: 'FORBIDDEN',
          message: `Permission '${permission}' required`
        })
        return
      }

      if (ctx.next) {
        await ctx.next()
      }
    }
  }

  /**
   * Plan-based middleware
   */
  requirePlan(plan: string) {
    return async (ctx: MiddlewareContext) => {
      const authCtx = (ctx.request as AuthenticatedRequest).auth
      
      if (!authCtx?.isAuthenticated) {
        ctx.response.status(401)
        ctx.response.json({
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        })
        return
      }

      if (!this.isPlanSufficient(authCtx.user!.organization.plan, plan)) {
        ctx.response.status(403)
        ctx.response.json({
          error: 'FORBIDDEN',
          message: `${plan} plan or higher required`
        })
        return
      }

      if (ctx.next) {
        await ctx.next()
      }
    }
  }

  /**
   * Organization access middleware
   */
  requireOrgAccess(orgIdParam: string = 'orgId') {
    return async (ctx: MiddlewareContext) => {
      const authCtx = (ctx.request as AuthenticatedRequest).auth
      
      if (!authCtx?.isAuthenticated) {
        ctx.response.status(401)
        ctx.response.json({
          error: 'UNAUTHORIZED',
          message: 'Authentication required'
        })
        return
      }

      // Extract org ID from URL params (framework-specific)
      const requestedOrgId = this.extractParam(ctx.request.url, orgIdParam)
      
      if (requestedOrgId && requestedOrgId !== authCtx.user!.org_id) {
        ctx.response.status(403)
        ctx.response.json({
          error: 'FORBIDDEN',
          message: 'Access denied to organization'
        })
        return
      }

      if (ctx.next) {
        await ctx.next()
      }
    }
  }

  /**
   * Rate limiting middleware (simple in-memory version)
   */
  rateLimit(windowMs: number = 15 * 60 * 1000, max: number = 100) {
    const requests = new Map<string, { count: number; resetTime: number }>()

    return async (ctx: MiddlewareContext) => {
      const identifier = this.getClientIdentifier(ctx.request)
      const now = Date.now()

      let requestInfo = requests.get(identifier)
      
      if (!requestInfo || now > requestInfo.resetTime) {
        requestInfo = { count: 0, resetTime: now + windowMs }
        requests.set(identifier, requestInfo)
      }

      if (requestInfo.count >= max) {
        const retryAfter = Math.ceil((requestInfo.resetTime - now) / 1000)
        
        ctx.response.status(429)
        ctx.response.headers['Retry-After'] = retryAfter.toString()
        ctx.response.json({
          error: 'RATE_LIMITED',
          message: 'Too many requests',
          retryAfter
        })
        return
      }

      requestInfo.count++

      // Add rate limit headers
      ctx.response.headers['X-RateLimit-Limit'] = max.toString()
      ctx.response.headers['X-RateLimit-Remaining'] = (max - requestInfo.count).toString()
      ctx.response.headers['X-RateLimit-Reset'] = requestInfo.resetTime.toString()

      if (ctx.next) {
        await ctx.next()
      }
    }
  }

  // Helper methods

  private extractToken(authHeader: string): string | null {
    if (!authHeader) return null
    
    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null
    }
    
    return parts[1]
  }

  private extractParam(url: string, paramName: string): string | null {
    // Simple URL parameter extraction (framework-specific in real apps)
    const match = url.match(new RegExp(`/${paramName}/([^/]+)`))
    return match ? match[1] : null
  }

  private getClientIdentifier(request: { headers: Record<string, string> }): string {
    // Use IP address or user ID for rate limiting
    return request.headers['cf-connecting-ip'] || 
           request.headers['x-forwarded-for'] || 
           request.headers['x-real-ip'] || 
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

// Utility function for error responses
export class AuthError extends Error {
  public code: string
  public statusCode: number

  constructor({ code, message }: { code: string; message: string }) {
    super(message)
    this.name = 'AuthError'
    this.code = code
    
    // Map error codes to HTTP status codes
    const statusMap: Record<string, number> = {
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      INVALID_CREDENTIALS: 401,
      USER_NOT_FOUND: 404,
      EMAIL_ALREADY_EXISTS: 409,
      WEAK_PASSWORD: 400,
      ACCOUNT_LOCKED: 423,
      SESSION_EXPIRED: 401,
      INVALID_TOKEN: 401,
      EMAIL_NOT_VERIFIED: 403,
      GOOGLE_AUTH_ERROR: 400,
      MAGIC_LINK_EXPIRED: 400,
      RATE_LIMITED: 429
    }
    
    this.statusCode = statusMap[code] || 500
  }
}