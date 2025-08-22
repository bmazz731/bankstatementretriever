/**
 * Session management with 24-hour timeout and invalidation on password changes
 */
import { nanoid } from "nanoid";
import type {
  UserSession,
  SessionStore,
  AuthConfig,
  UserWithOrg,
} from "./types";

// In-memory session store (for Workers/edge environments)
export class MemorySessionStore implements SessionStore {
  private sessions = new Map<string, UserSession>();
  private userSessions = new Map<string, Set<string>>(); // userId -> sessionIds

  async create(session: UserSession): Promise<void> {
    this.sessions.set(session.sessionId, session);

    // Track sessions by user
    if (!this.userSessions.has(session.userId)) {
      this.userSessions.set(session.userId, new Set());
    }
    this.userSessions.get(session.userId)!.add(session.sessionId);
  }

  async get(sessionId: string): Promise<UserSession | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    // Check if expired
    if (Date.now() > session.expiresAt) {
      await this.delete(sessionId);
      return null;
    }

    return session;
  }

  async update(
    sessionId: string,
    updates: Partial<UserSession>,
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      Object.assign(session, updates);
      this.sessions.set(sessionId, session);
    }
  }

  async delete(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      this.sessions.delete(sessionId);

      // Remove from user tracking
      const userSessionIds = this.userSessions.get(session.userId);
      if (userSessionIds) {
        userSessionIds.delete(sessionId);
        if (userSessionIds.size === 0) {
          this.userSessions.delete(session.userId);
        }
      }
    }
  }

  async deleteAllForUser(userId: string): Promise<void> {
    const sessionIds = this.userSessions.get(userId);
    if (sessionIds) {
      for (const sessionId of sessionIds) {
        this.sessions.delete(sessionId);
      }
      this.userSessions.delete(userId);
    }
  }

  async cleanup(): Promise<void> {
    const now = Date.now();
    const expiredSessions: string[] = [];

    for (const [sessionId, session] of this.sessions) {
      if (now > session.expiresAt) {
        expiredSessions.push(sessionId);
      }
    }

    for (const sessionId of expiredSessions) {
      await this.delete(sessionId);
    }
  }

  // Get all active sessions for a user
  async getAllForUser(userId: string): Promise<UserSession[]> {
    const sessionIds = this.userSessions.get(userId);
    if (!sessionIds) return [];

    const sessions: UserSession[] = [];
    for (const sessionId of sessionIds) {
      const session = await this.get(sessionId);
      if (session) {
        sessions.push(session);
      }
    }

    return sessions;
  }
}

// KV-based session store (for Cloudflare Workers)
export class KVSessionStore implements SessionStore {
  private kv: KVNamespace;
  private keyPrefix = "session:";
  private userPrefix = "user_sessions:";

  constructor(kv: KVNamespace) {
    this.kv = kv;
  }

  async create(session: UserSession): Promise<void> {
    const key = this.keyPrefix + session.sessionId;
    const userKey = this.userPrefix + session.userId;

    // Store session
    await this.kv.put(key, JSON.stringify(session), {
      expirationTtl: Math.floor((session.expiresAt - Date.now()) / 1000),
    });

    // Track sessions by user
    const userSessions = await this.getUserSessionIds(session.userId);
    userSessions.add(session.sessionId);

    await this.kv.put(userKey, JSON.stringify([...userSessions]), {
      expirationTtl: 30 * 24 * 3600, // 30 days
    });
  }

  async get(sessionId: string): Promise<UserSession | null> {
    const key = this.keyPrefix + sessionId;
    const data = await this.kv.get(key);

    if (!data) return null;

    try {
      return JSON.parse(data) as UserSession;
    } catch (error) {
      return null;
    }
  }

  async update(
    sessionId: string,
    updates: Partial<UserSession>,
  ): Promise<void> {
    const session = await this.get(sessionId);
    if (session) {
      Object.assign(session, updates);
      await this.create(session); // Overwrites existing
    }
  }

  async delete(sessionId: string): Promise<void> {
    const session = await this.get(sessionId);
    if (session) {
      const key = this.keyPrefix + sessionId;
      await this.kv.delete(key);

      // Remove from user tracking
      const userSessionIds = await this.getUserSessionIds(session.userId);
      userSessionIds.delete(sessionId);

      const userKey = this.userPrefix + session.userId;
      if (userSessionIds.size > 0) {
        await this.kv.put(userKey, JSON.stringify([...userSessionIds]));
      } else {
        await this.kv.delete(userKey);
      }
    }
  }

  async deleteAllForUser(userId: string): Promise<void> {
    const sessionIds = await this.getUserSessionIds(userId);

    // Delete all sessions
    const deletePromises = [...sessionIds].map((sessionId) =>
      this.kv.delete(this.keyPrefix + sessionId),
    );

    // Delete user tracking
    deletePromises.push(this.kv.delete(this.userPrefix + userId));

    await Promise.all(deletePromises);
  }

  async cleanup(): Promise<void> {
    // KV automatically handles TTL-based cleanup
    // Manual cleanup would require listing all keys (expensive)
  }

  private async getUserSessionIds(userId: string): Promise<Set<string>> {
    const userKey = this.userPrefix + userId;
    const data = await this.kv.get(userKey);

    if (!data) return new Set();

    try {
      const sessionIds = JSON.parse(data) as string[];
      return new Set(sessionIds);
    } catch (error) {
      return new Set();
    }
  }
}

export class SessionManager {
  private store: SessionStore;
  private config: AuthConfig;

  constructor(store: SessionStore, config: AuthConfig) {
    this.store = store;
    this.config = config;
  }

  /**
   * Create new session for user
   */
  async createSession(
    user: UserWithOrg,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<UserSession> {
    const now = Date.now();
    const session: UserSession = {
      userId: user.id,
      orgId: user.org_id,
      email: user.email,
      plan: user.organization.plan,
      role: user.id === user.organization.owner_user_id ? "owner" : "member",
      sessionId: nanoid(),
      expiresAt: now + this.config.sessionDurationHours * 60 * 60 * 1000,
      createdAt: now,
      lastActivity: now,
      ipAddress,
      userAgent,
    };

    await this.store.create(session);
    return session;
  }

  /**
   * Get session by ID
   */
  async getSession(sessionId: string): Promise<UserSession | null> {
    return this.store.get(sessionId);
  }

  /**
   * Update session last activity
   */
  async updateActivity(sessionId: string): Promise<void> {
    await this.store.update(sessionId, {
      lastActivity: Date.now(),
    });
  }

  /**
   * Validate session and check expiry
   */
  async validateSession(sessionId: string): Promise<{
    valid: boolean;
    session?: UserSession;
    reason?: string;
  }> {
    const session = await this.store.get(sessionId);

    if (!session) {
      return { valid: false, reason: "Session not found" };
    }

    if (Date.now() > session.expiresAt) {
      await this.store.delete(sessionId);
      return { valid: false, reason: "Session expired" };
    }

    return { valid: true, session };
  }

  /**
   * Delete session (logout)
   */
  async deleteSession(sessionId: string): Promise<void> {
    await this.store.delete(sessionId);
  }

  /**
   * Delete all sessions for user (on password change, etc.)
   */
  async invalidateAllUserSessions(userId: string): Promise<void> {
    await this.store.deleteAllForUser(userId);
  }

  /**
   * Get all active sessions for user (for device management)
   */
  async getUserSessions(userId: string): Promise<UserSession[]> {
    if (this.store instanceof MemorySessionStore) {
      return this.store.getAllForUser(userId);
    }

    // For KV store, we'd need to implement this differently
    // For MVP, return empty array
    return [];
  }

  /**
   * Extend session expiry
   */
  async extendSession(
    sessionId: string,
    additionalHours: number = 24,
  ): Promise<boolean> {
    const session = await this.store.get(sessionId);
    if (!session) return false;

    const newExpiresAt = session.expiresAt + additionalHours * 60 * 60 * 1000;
    await this.store.update(sessionId, { expiresAt: newExpiresAt });

    return true;
  }

  /**
   * Clean up expired sessions
   */
  async cleanup(): Promise<void> {
    await this.store.cleanup();
  }
}
