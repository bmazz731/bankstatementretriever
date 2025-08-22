/**
 * API Middleware - Authentication, Rate Limiting, Logging
 */
import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
import type { Env } from "../types/env";

// Request ID middleware
export const requestId = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    const requestId = c.req.header("X-Request-ID") || crypto.randomUUID();
    c.set("requestId", requestId);
    c.header("X-Request-ID", requestId);
    await next();
  },
);

// Request/Response logging middleware
export const apiLogger = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    const start = Date.now();
    const requestId = c.get("requestId");
    const method = c.req.method;
    const url = c.req.url;
    const userAgent = c.req.header("User-Agent") || "unknown";

    // Log request
    console.log(
      JSON.stringify({
        type: "api_request",
        request_id: requestId,
        method,
        url,
        user_agent: userAgent,
        timestamp: new Date().toISOString(),
      }),
    );

    await next();

    // Log response
    const duration = Date.now() - start;
    const status = c.res.status;

    console.log(
      JSON.stringify({
        type: "api_response",
        request_id: requestId,
        method,
        url,
        status,
        duration_ms: duration,
        timestamp: new Date().toISOString(),
      }),
    );
  },
);

// JWT Authentication middleware
export const jwtAuth = (secret: string) => {
  return jwt({
    secret,
    verify: async (payload, key) => {
      // Additional verification logic can go here
      return true;
    },
  });
};

// Rate limiting middleware using Durable Objects
export const rateLimit = (
  requests: number = 100,
  windowMs: number = 60000,
  keyGenerator?: (c: any) => string,
) => {
  return createMiddleware<{ Bindings: Env }>(async (c, next) => {
    try {
      // Generate rate limit key
      const key = keyGenerator
        ? keyGenerator(c)
        : c.req.header("CF-Connecting-IP") ||
          c.req.header("X-Forwarded-For") ||
          "unknown";

      // Get rate limiter instance
      const id = c.env.RATE_LIMITER.idFromName(`rate_limit_${key}`);
      const rateLimiter = c.env.RATE_LIMITER.get(id);

      // Check rate limit
      const result = await rateLimiter.fetch(c.req.url, {
        method: "POST",
        body: JSON.stringify({
          key,
          limit: requests,
          window: windowMs,
        }),
      });

      const limitData = (await result.json()) as any;

      // Add rate limit headers
      c.header("X-RateLimit-Limit", requests.toString());
      c.header("X-RateLimit-Remaining", limitData.remaining?.toString() || "0");
      c.header("X-RateLimit-Reset", limitData.resetTime?.toString() || "0");

      if (limitData.exceeded) {
        return c.json(
          {
            error: "BSR_RATE_LIMIT_ERROR",
            message: "Rate limit exceeded",
            retry_after: limitData.retryAfter,
          },
          429,
        );
      }

      await next();
    } catch (error) {
      console.error("Rate limiting error:", error);
      // Don't block request if rate limiting fails
      await next();
    }
  });
};

// User context extraction middleware (requires JWT auth)
export const extractUserContext = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    try {
      const payload = c.get("jwtPayload");
      if (payload && payload.sub) {
        c.set("userId", payload.sub);
        c.set("userEmail", payload.email);
        c.set("orgId", payload.org_id || payload.sub); // Default org to user ID for MVP
      }
      await next();
    } catch (error) {
      console.error("User context extraction error:", error);
      return c.json(
        {
          error: "BSR_AUTH_ERROR",
          message: "Invalid authentication token",
        },
        401,
      );
    }
  },
);

// Input validation middleware factory
export const validateInput = (schema: any) => {
  return createMiddleware<{ Bindings: Env }>(async (c, next) => {
    try {
      const body = await c.req.json();

      // Basic validation - in production you'd use Zod or Joi
      if (schema.required) {
        for (const field of schema.required) {
          if (!(field in body)) {
            return c.json(
              {
                error: "BSR_VALIDATION_ERROR",
                message: `Missing required field: ${field}`,
                details: {
                  missing_fields: [field],
                },
              },
              400,
            );
          }
        }
      }

      c.set("validatedBody", body);
      await next();
    } catch (error) {
      return c.json(
        {
          error: "BSR_VALIDATION_ERROR",
          message: "Invalid JSON in request body",
        },
        400,
      );
    }
  });
};

// Error handling middleware
export const errorHandler = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    try {
      await next();
    } catch (error) {
      const requestId = c.get("requestId");

      console.error(
        JSON.stringify({
          type: "api_error",
          request_id: requestId,
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: new Date().toISOString(),
        }),
      );

      return c.json(
        {
          error: "BSR_INTERNAL_ERROR",
          message: "An unexpected error occurred",
          request_id: requestId,
        },
        500,
      );
    }
  },
);

// CORS middleware for API routes
export const apiCors = createMiddleware<{ Bindings: Env }>(async (c, next) => {
  const origin = c.req.header("Origin");
  const allowedOrigins = [
    "https://app.bankstatementretriever.com",
    "https://bankstatementretriever.com",
  ];

  if (origin && allowedOrigins.includes(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
  }

  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Request-ID",
  );
  c.header("Access-Control-Max-Age", "86400");

  if (c.req.method === "OPTIONS") {
    return c.body(null, 204);
  }

  await next();
});

// Idempotency middleware
export const idempotency = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    const idempotencyKey = c.req.header("Idempotency-Key");

    if (idempotencyKey && ["POST", "PUT", "PATCH"].includes(c.req.method)) {
      // Check KV for existing response
      const existingResponse = await c.env.BSR_CACHE.get(
        `idempotency:${idempotencyKey}`,
      );

      if (existingResponse) {
        const cached = JSON.parse(existingResponse);
        return c.json(cached.body, cached.status);
      }

      // Store idempotency key for response caching
      c.set("idempotencyKey", idempotencyKey);
    }

    await next();

    // Cache successful responses for idempotency
    if (idempotencyKey && c.res.status < 400) {
      const responseBody = await c.res.clone().json();
      await c.env.BSR_CACHE.put(
        `idempotency:${idempotencyKey}`,
        JSON.stringify({
          body: responseBody,
          status: c.res.status,
        }),
        { expirationTtl: 3600 }, // 1 hour
      );
    }
  },
);
