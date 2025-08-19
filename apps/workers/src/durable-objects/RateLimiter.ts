/**
 * RateLimiter Durable Object
 * Implements rate limiting with sliding window algorithm
 */
import type { RateLimitState } from '../types/env'

export class RateLimiter {
  private state: DurableObjectState

  constructor(state: DurableObjectState, env: any) {
    this.state = state
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    try {
      switch (path) {
        case '/check':
          return this.checkRateLimit(request)
        case '/reset':
          return this.resetRateLimit(request)
        case '/status':
          return this.getRateLimitStatus(request)
        default:
          return new Response('Not Found', { status: 404 })
      }
    } catch (error) {
      console.error('RateLimiter error:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  }

  // Check and increment rate limit
  private async checkRateLimit(request: Request): Promise<Response> {
    const { key, limit, window } = await request.json()
    
    if (!key || !limit || !window) {
      return new Response('Missing required parameters', { status: 400 })
    }

    const now = Date.now()
    const windowMs = window * 1000 // Convert seconds to milliseconds
    const windowStart = now - windowMs

    // Get current state
    const currentState = await this.getRateLimitState(key)
    
    // Check if we need to reset the window
    if (currentState.windowStart < windowStart) {
      // Reset window
      const newState: RateLimitState = {
        key,
        count: 1,
        windowStart: now,
        windowEnd: now + windowMs
      }
      
      await this.updateRateLimitState(key, newState)
      
      return Response.json({
        allowed: true,
        count: 1,
        limit,
        window_start: now,
        window_end: now + windowMs,
        reset_time: now + windowMs
      })
    }

    // Check if limit is exceeded
    if (currentState.count >= limit) {
      return Response.json({
        allowed: false,
        count: currentState.count,
        limit,
        window_start: currentState.windowStart,
        window_end: currentState.windowEnd,
        reset_time: currentState.windowEnd,
        retry_after: Math.ceil((currentState.windowEnd - now) / 1000)
      }, { status: 429 })
    }

    // Increment counter
    const updatedState: RateLimitState = {
      ...currentState,
      count: currentState.count + 1
    }
    
    await this.updateRateLimitState(key, updatedState)

    return Response.json({
      allowed: true,
      count: updatedState.count,
      limit,
      window_start: currentState.windowStart,
      window_end: currentState.windowEnd,
      reset_time: currentState.windowEnd
    })
  }

  // Reset rate limit for a key
  private async resetRateLimit(request: Request): Response {
    const { key } = await request.json()
    
    if (!key) {
      return new Response('Missing key parameter', { status: 400 })
    }

    await this.state.storage.delete(key)
    
    return Response.json({ reset: true, key })
  }

  // Get rate limit status
  private async getRateLimitStatus(request: Request): Response {
    const url = new URL(request.url)
    const key = url.searchParams.get('key')
    
    if (!key) {
      // Return all rate limit states
      const allStates = await this.state.storage.list()
      return Response.json(Object.fromEntries(allStates))
    }

    const state = await this.getRateLimitState(key)
    return Response.json(state)
  }

  // Get rate limit state from storage
  private async getRateLimitState(key: string): Promise<RateLimitState> {
    const stored = await this.state.storage.get<RateLimitState>(key)
    
    return stored || {
      key,
      count: 0,
      windowStart: 0,
      windowEnd: 0
    }
  }

  // Update rate limit state in storage
  private async updateRateLimitState(key: string, state: RateLimitState): Promise<void> {
    await this.state.storage.put(key, state)
  }

  // Cleanup expired entries (called periodically)
  private async cleanup(): Promise<void> {
    const now = Date.now()
    const allEntries = await this.state.storage.list<RateLimitState>()
    
    const expiredKeys: string[] = []
    
    for (const [key, state] of allEntries) {
      if (state.windowEnd < now) {
        expiredKeys.push(key)
      }
    }
    
    if (expiredKeys.length > 0) {
      await this.state.storage.delete(expiredKeys)
      console.log(`Cleaned up ${expiredKeys.length} expired rate limit entries`)
    }
  }
}