/**
 * Rate limiting for authentication attempts
 * Prevents brute force attacks and abuse
 */
import type { RateLimitInfo, AuthConfig, AuthError } from "./types";

export class AuthRateLimiter {
  private attempts = new Map<string, RateLimitInfo>();
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  /**
   * Check if IP/email is rate limited
   */
  async checkLimit(identifier: string): Promise<{
    allowed: boolean;
    error?: AuthError;
    attemptsRemaining?: number;
  }> {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const key = `auth:${identifier}`;

    let rateLimit = this.attempts.get(key);

    // Initialize or reset if window expired
    if (!rateLimit || now > rateLimit.windowStart + windowMs) {
      rateLimit = {
        attempts: 0,
        windowStart: now,
      };
    }

    // Check if locked out
    if (rateLimit.lockedUntil && now < rateLimit.lockedUntil) {
      const lockoutMinutes = Math.ceil(
        (rateLimit.lockedUntil - now) / (60 * 1000),
      );
      return {
        allowed: false,
        error: {
          code: "ACCOUNT_LOCKED",
          message: `Too many failed attempts. Try again in ${lockoutMinutes} minutes.`,
          retryAfter: lockoutMinutes * 60,
        },
      };
    }

    // Check rate limit
    if (rateLimit.attempts >= this.config.maxLoginAttempts) {
      // Lock out the identifier
      rateLimit.lockedUntil =
        now + this.config.lockoutDurationMinutes * 60 * 1000;
      this.attempts.set(key, rateLimit);

      return {
        allowed: false,
        error: {
          code: "RATE_LIMITED",
          message: `Too many attempts. Locked out for ${this.config.lockoutDurationMinutes} minutes.`,
          retryAfter: this.config.lockoutDurationMinutes * 60,
        },
      };
    }

    return {
      allowed: true,
      attemptsRemaining: this.config.maxLoginAttempts - rateLimit.attempts,
    };
  }

  /**
   * Record failed attempt
   */
  async recordFailure(identifier: string): Promise<void> {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const key = `auth:${identifier}`;

    let rateLimit = this.attempts.get(key);

    if (!rateLimit || now > rateLimit.windowStart + windowMs) {
      rateLimit = {
        attempts: 1,
        windowStart: now,
      };
    } else {
      rateLimit.attempts++;
    }

    this.attempts.set(key, rateLimit);
  }

  /**
   * Clear attempts on successful login
   */
  async clearAttempts(identifier: string): Promise<void> {
    const key = `auth:${identifier}`;
    this.attempts.delete(key);
  }

  /**
   * Get current attempt info
   */
  async getAttemptInfo(identifier: string): Promise<RateLimitInfo | null> {
    const key = `auth:${identifier}`;
    return this.attempts.get(key) || null;
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const lockoutMs = this.config.lockoutDurationMinutes * 60 * 1000;

    for (const [key, rateLimit] of this.attempts.entries()) {
      const windowExpired = now > rateLimit.windowStart + windowMs;
      const lockoutExpired =
        !rateLimit.lockedUntil || now > rateLimit.lockedUntil;

      if (windowExpired && lockoutExpired) {
        this.attempts.delete(key);
      }
    }
  }
}

// KV-based rate limiter for distributed environments
export class KVRateLimiter {
  private kv: KVNamespace;
  private config: AuthConfig;
  private keyPrefix = "rate_limit:";

  constructor(kv: KVNamespace, config: AuthConfig) {
    this.kv = kv;
    this.config = config;
  }

  async checkLimit(identifier: string): Promise<{
    allowed: boolean;
    error?: AuthError;
    attemptsRemaining?: number;
  }> {
    const now = Date.now();
    const key = this.keyPrefix + identifier;

    const data = await this.kv.get(key);
    let rateLimit: RateLimitInfo;

    if (data) {
      try {
        rateLimit = JSON.parse(data);
      } catch (error) {
        // If parsing fails, reset
        rateLimit = { attempts: 0, windowStart: now };
      }
    } else {
      rateLimit = { attempts: 0, windowStart: now };
    }

    // Check if window expired (15 minutes)
    const windowMs = 15 * 60 * 1000;
    if (now > rateLimit.windowStart + windowMs) {
      rateLimit = { attempts: 0, windowStart: now };
    }

    // Check if locked out
    if (rateLimit.lockedUntil && now < rateLimit.lockedUntil) {
      const lockoutMinutes = Math.ceil(
        (rateLimit.lockedUntil - now) / (60 * 1000),
      );
      return {
        allowed: false,
        error: {
          code: "ACCOUNT_LOCKED",
          message: `Too many failed attempts. Try again in ${lockoutMinutes} minutes.`,
          retryAfter: lockoutMinutes * 60,
        },
      };
    }

    // Check rate limit
    if (rateLimit.attempts >= this.config.maxLoginAttempts) {
      // Lock out
      rateLimit.lockedUntil =
        now + this.config.lockoutDurationMinutes * 60 * 1000;

      await this.kv.put(key, JSON.stringify(rateLimit), {
        expirationTtl: this.config.lockoutDurationMinutes * 60 + 900, // Add 15 min buffer
      });

      return {
        allowed: false,
        error: {
          code: "RATE_LIMITED",
          message: `Too many attempts. Locked out for ${this.config.lockoutDurationMinutes} minutes.`,
          retryAfter: this.config.lockoutDurationMinutes * 60,
        },
      };
    }

    return {
      allowed: true,
      attemptsRemaining: this.config.maxLoginAttempts - rateLimit.attempts,
    };
  }

  async recordFailure(identifier: string): Promise<void> {
    const now = Date.now();
    const key = this.keyPrefix + identifier;

    const data = await this.kv.get(key);
    let rateLimit: RateLimitInfo;

    if (data) {
      try {
        rateLimit = JSON.parse(data);
      } catch (error) {
        rateLimit = { attempts: 1, windowStart: now };
      }
    } else {
      rateLimit = { attempts: 1, windowStart: now };
    }

    // Check if window expired
    const windowMs = 15 * 60 * 1000;
    if (now > rateLimit.windowStart + windowMs) {
      rateLimit = { attempts: 1, windowStart: now };
    } else {
      rateLimit.attempts++;
    }

    await this.kv.put(key, JSON.stringify(rateLimit), {
      expirationTtl: 900, // 15 minutes
    });
  }

  async clearAttempts(identifier: string): Promise<void> {
    const key = this.keyPrefix + identifier;
    await this.kv.delete(key);
  }

  async getAttemptInfo(identifier: string): Promise<RateLimitInfo | null> {
    const key = this.keyPrefix + identifier;
    const data = await this.kv.get(key);

    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }
}
