/**
 * BankStatementRetriever Authentication System
 * Complete auth implementation with JWT, sessions, and middleware
 */

// Core auth service and components
export { AuthService } from "./auth-service";
export { JWTManager } from "./jwt";
export { PasswordValidator } from "./password";
export { SessionManager, MemorySessionStore, KVSessionStore } from "./session";
export { AuthRateLimiter, KVRateLimiter } from "./rate-limiter";

// Middleware
export { AuthMiddleware, AuthError } from "./middleware";
export {
  HonoAuthMiddleware,
  getAuthContext,
  getCurrentUser,
  getCurrentSession,
  requireAuth,
  requirePlan,
} from "./hono-middleware";

// Types and interfaces
export type {
  AuthConfig,
  AuthResult,
  AuthError as AuthErrorType,
  UserSession,
  UserWithOrg,
  JWTPayload,
  PasswordValidation,
  MagicLinkOptions,
  GoogleAuthOptions,
  AuthContext,
  AuthenticatedRequest,
  Permission,
  SessionStore,
  RateLimitInfo,
  AuthAuditData,
  GoogleUserInfo,
  MagicLinkToken,
} from "./types";

// Default configurations
export const DEFAULT_AUTH_CONFIG: Partial<AuthConfig> = {
  sessionDurationHours: 24,
  passwordMinLength: 12,
  passwordMinStrength: 3,
  maxLoginAttempts: 5,
  lockoutDurationMinutes: 15,
};

// Utility functions
export function createAuthConfig(overrides: Partial<AuthConfig>): AuthConfig {
  const required = [
    "supabaseUrl",
    "supabaseAnonKey",
    "supabaseServiceKey",
    "jwtSecret",
  ];

  for (const field of required) {
    if (!overrides[field as keyof AuthConfig]) {
      throw new Error(`Missing required auth config: ${field}`);
    }
  }

  return {
    ...DEFAULT_AUTH_CONFIG,
    ...overrides,
  } as AuthConfig;
}

// Permission constants
export const PERMISSIONS = {
  // Account permissions
  READ_ACCOUNTS: "read:accounts" as Permission,
  WRITE_ACCOUNTS: "write:accounts" as Permission,

  // Statement permissions
  READ_STATEMENTS: "read:statements" as Permission,
  WRITE_STATEMENTS: "write:statements" as Permission,

  // Destination permissions
  READ_DESTINATIONS: "read:destinations" as Permission,
  WRITE_DESTINATIONS: "write:destinations" as Permission,

  // Admin permissions
  ADMIN_ORGANIZATION: "admin:organization" as Permission,
  ADMIN_BILLING: "admin:billing" as Permission,
} as const;

// Plan constants
export const PLANS = {
  FREE: "free",
  BUSINESS: "business",
  PROFESSIONAL: "professional",
  AGENCY: "agency",
  ENTERPRISE: "enterprise",
} as const;

// Error codes
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  WEAK_PASSWORD: "WEAK_PASSWORD",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  SESSION_EXPIRED: "SESSION_EXPIRED",
  INVALID_TOKEN: "INVALID_TOKEN",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  GOOGLE_AUTH_ERROR: "GOOGLE_AUTH_ERROR",
  MAGIC_LINK_EXPIRED: "MAGIC_LINK_EXPIRED",
  RATE_LIMITED: "RATE_LIMITED",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
} as const;
