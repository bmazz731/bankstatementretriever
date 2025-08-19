/**
 * AccountCoordinator Durable Object
 * Manages per-account statement retrieval coordination and learned scheduling
 */
import type { AccountCoordinatorState } from '../types/env'

export class AccountCoordinator {
  private state: DurableObjectState
  private env: any

  constructor(state: DurableObjectState, env: any) {
    this.state = state
    this.env = env
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    try {
      switch (path) {
        case '/retrieve':
          return this.handleRetrieve(request)
        case '/status':
          return this.handleStatus()
        case '/schedule':
          return this.handleSchedule(request)
        default:
          return new Response('Not Found', { status: 404 })
      }
    } catch (error) {
      console.error('AccountCoordinator error:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  }

  // Handle statement retrieval coordination
  private async handleRetrieve(request: Request): Promise<Response> {
    const message = await request.json()
    const { accountId, orgId, connectionId, requestId } = message

    console.log(`AccountCoordinator processing retrieval for account ${accountId}`)

    // Get current state
    const currentState = await this.getAccountState(accountId)
    
    // Check if already processing
    if (currentState.status === 'retrieving') {
      console.log(`Account ${accountId} already retrieving, skipping`)
      return Response.json({ skipped: true, reason: 'already_retrieving' })
    }

    // Check rate limiting
    const rateLimitId = this.env.RATE_LIMITER.idFromName(`account:${accountId}`)
    const rateLimiter = this.env.RATE_LIMITER.get(rateLimitId)
    
    const rateLimitResponse = await rateLimiter.fetch('http://limiter/check', {
      method: 'POST',
      body: JSON.stringify({ key: `account:${accountId}`, limit: 10, window: 3600 })
    })

    if (!rateLimitResponse.ok) {
      console.log(`Rate limit exceeded for account ${accountId}`)
      await this.updateAccountState(accountId, { 
        ...currentState,
        status: 'rate_limited',
        lastPoll: Date.now()
      })
      return Response.json({ error: 'Rate limit exceeded' }, { status: 429 })
    }

    // Update status to retrieving
    await this.updateAccountState(accountId, {
      ...currentState,
      status: 'retrieving',
      lastPoll: Date.now()
    })

    try {
      // Retrieve statements from Plaid
      const statements = await this.retrieveStatementsFromPlaid(connectionId, accountId)
      
      if (statements.length > 0) {
        console.log(`Found ${statements.length} new statements for account ${accountId}`)
        
        // Queue delivery jobs for each statement
        for (const statement of statements) {
          const deliveryMessage = {
            type: 'deliver_statement',
            statementId: statement.id,
            destinationId: statement.destinationId, // TODO: Get from routing rules
            requestId: crypto.randomUUID()
          }

          await this.env.DELIVERY_QUEUE.send(deliveryMessage)
        }

        // Update learned schedule based on successful retrieval
        await this.updateLearnedSchedule(accountId, currentState)
      }

      // Update status back to idle
      await this.updateAccountState(accountId, {
        ...currentState,
        status: 'idle',
        lastPoll: Date.now()
      })

      return Response.json({ 
        success: true,
        statements_found: statements.length,
        request_id: requestId
      })

    } catch (error) {
      console.error(`Failed to retrieve statements for account ${accountId}:`, error)
      
      await this.updateAccountState(accountId, {
        ...currentState,
        status: 'idle' // Reset to idle on error
      })

      return Response.json({ 
        error: 'Retrieval failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 })
    }
  }

  // Get account status
  private async handleStatus(): Promise<Response> {
    // Return current state for monitoring
    const allStates = await this.state.storage.list()
    return Response.json(Object.fromEntries(allStates))
  }

  // Update learned schedule
  private async handleSchedule(request: Request): Promise<Response> {
    const { accountId, pattern, day, hour, confidence } = await request.json()
    
    const currentState = await this.getAccountState(accountId)
    const updatedState = {
      ...currentState,
      learnedSchedule: {
        pattern,
        expectedDay: day,
        expectedHour: hour,
        confidence
      }
    }

    await this.updateAccountState(accountId, updatedState)
    
    return Response.json({ updated: true })
  }

  // Get account state from storage
  private async getAccountState(accountId: string): Promise<AccountCoordinatorState> {
    const stored = await this.state.storage.get<AccountCoordinatorState>(accountId)
    
    return stored || {
      accountId,
      status: 'idle',
      lastPoll: 0
    }
  }

  // Update account state in storage
  private async updateAccountState(accountId: string, state: AccountCoordinatorState): Promise<void> {
    await this.state.storage.put(accountId, state)
  }

  // Retrieve statements from Plaid
  private async retrieveStatementsFromPlaid(connectionId: string, accountId: string): Promise<any[]> {
    // This would integrate with Plaid Statements API
    // Implementation by Plaid Integration Agent
    
    // Mock response for now
    console.log(`Mock: Retrieving statements for connection ${connectionId}, account ${accountId}`)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return mock statements (empty for now)
    return []
  }

  // Update learned schedule based on successful retrievals
  private async updateLearnedSchedule(accountId: string, currentState: AccountCoordinatorState): Promise<void> {
    // Learning algorithm per PRD Section 6
    // Implementation by Learning Algorithm Agent
    
    console.log(`TODO: Update learned schedule for account ${accountId}`)
  }
}