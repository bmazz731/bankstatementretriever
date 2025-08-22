// Authentication types and interfaces for BankStatementRetriever
import type { User, Organization } from "@bsr/database";

// Auth configuration
export interface AuthConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceKey: string;
  jwtSecret: string;
  sessionDurationHours: number;
  passwordMinLength: number;
  passwordMinStrength: number;
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;
  googleClientId?: string;
  googleClientSecret?: string;
}

// User session data
export interface UserSession {
  userId: string;
  orgId: string;
  email: string;
  plan: string;
  role: "owner" | "member";
  sessionId: string;
  expiresAt: number;
  createdAt: number;
  lastActivity: number;
  ipAddress?: string;
  userAgent?: string;
}

// JWT payload structure
export interface JWTPayload {
  sub: string; // userId
  email: string;
  org_id: string;
  role: "owner" | "member";
  plan: string;
  session_id: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

// Authentication result
export interface AuthResult {
  success: boolean;
  user?: UserWithOrg;
  session?: UserSession;
  token?: string;
  refreshToken?: string;
  error?: AuthError;
  requiresVerification?: boolean;
}

// User with organization data
export interface UserWithOrg extends User {
  organization: Organization;
}

// Authentication errors
export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "USER_NOT_FOUND"
  | "EMAIL_ALREADY_EXISTS"
  | "WEAK_PASSWORD"
  | "ACCOUNT_LOCKED"
  | "SESSION_EXPIRED"
  | "INVALID_TOKEN"
  | "EMAIL_NOT_VERIFIED"
  | "GOOGLE_AUTH_ERROR"
  | "MAGIC_LINK_EXPIRED"
  | "RATE_LIMITED"
  | "UNAUTHORIZED"
  | "FORBIDDEN";

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  field?: string;
  retryAfter?: number;
}

// Password validation result
export interface PasswordValidation {
  valid: boolean;
  score: number;
  feedback: string[];
  requirements: {
    minLength: boolean;
    strength: boolean;
  };
}

// Magic link token data
export interface MagicLinkToken {
  email: string;
  action: "login" | "signup" | "reset_password";
  expiresAt: number;
  used: boolean;
}

// Google OAuth user info
export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture?: string;
}

// Rate limiting
export interface RateLimitInfo {
  attempts: number;
  windowStart: number;
  lockedUntil?: number;
}

// Audit log data for auth events
export interface AuthAuditData {
  action:
    | "login"
    | "logout"
    | "signup"
    | "password_change"
    | "password_reset"
    | "email_verification";
  userId?: string;
  email: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  errorCode?: AuthErrorCode;
  metadata?: Record<string, any>;
}

// Session storage interface (for different backends)
export interface SessionStore {
  create(session: UserSession): Promise<void>;
  get(sessionId: string): Promise<UserSession | null>;
  update(sessionId: string, updates: Partial<UserSession>): Promise<void>;
  delete(sessionId: string): Promise<void>;
  deleteAllForUser(userId: string): Promise<void>;
  cleanup(): Promise<void>;
}

// Auth middleware context
export interface AuthContext {
  user?: UserWithOrg;
  session?: UserSession;
  token?: string;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  requireAuth: () => void;
  requirePlan: (plan: string) => void;
}

// Request context with auth
export interface AuthenticatedRequest {
  auth: AuthContext;
  headers: Record<string, string>;
  method: string;
  url: string;
  body?: any;
}

// Magic link options
export interface MagicLinkOptions {
  email: string;
  action: "login" | "signup" | "reset_password";
  redirectUrl?: string;
  expirationMinutes?: number;
}

// Google auth options
export interface GoogleAuthOptions {
  code: string;
  redirectUri: string;
}

// Permission levels
export type Permission =
  | "read:accounts"
  | "write:accounts"
  | "read:statements"
  | "write:statements"
  | "read:destinations"
  | "write:destinations"
  | "admin:organization"
  | "admin:billing";
