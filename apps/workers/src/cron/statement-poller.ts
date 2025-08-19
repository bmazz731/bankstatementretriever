/**
 * Statement polling cron job - runs daily at 2:00 AM ET
 * Uses learning algorithm to determine optimal check patterns
 */
import { 
  PlaidService, 
  StatementLearningService,
  createPlaidConfig
} from '@bsr/plaid'
import type { Env } from '../types/env'

export class StatementPoller {
  private plaidService: PlaidService
  private learningService: StatementLearningService

  constructor(env: Env) {
    const config = createPlaidConfig(
      env.PLAID_CLIENT_ID,
      env.PLAID_SECRET,
      env.PLAID_ENV as 'sandbox' | 'development' | 'production',
      `https://${env.DOMAIN}/api/plaid/webhook`
    )
    
    this.plaidService = new PlaidService(config, env.ENCRYPTION_KEY)
    this.learningService = new StatementLearningService()
  }

  /**
   * Main polling function called by cron
   */
  async poll(env: Env): Promise<void> {
    console.log('Starting statement polling at:', new Date().toISOString())
    
    try {
      // Get accounts that need checking
      const accountsToCheck = await this.learningService.getAccountsToCheck()
      console.log(`Found ${accountsToCheck.length} accounts to check`)

      // Process in batches to manage memory
      const batchSize = 10
      for (let i = 0; i < accountsToCheck.length; i += batchSize) {
        const batch = accountsToCheck.slice(i, i + batchSize)
        
        await Promise.all(
          batch.map(check => this.checkAccountStatements(check.account_id, env))
        )
        
        // Small delay between batches
        if (i + batchSize < accountsToCheck.length) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      console.log('Statement polling completed successfully')

    } catch (error) {
      console.error('Statement polling failed:', error)
      
      // Send alert notification
      await env.BSR_QUEUE.send({
        type: 'send_notification',
        notification_type: 'system_alert',
        data: {
          alert: 'statement_polling_failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      })
    }
  }

  /**
   * Check statements for a specific account
   */
  private async checkAccountStatements(accountId: string, env: Env): Promise<void> {
    try {
      // Get account and connection info
      const account = await env.DB.prepare(`
        SELECT 
          a.*,
          conn.id as connection_id,
          conn.institution_id,
          conn.status as connection_status
        FROM accounts a
        JOIN connections conn ON a.connection_id = conn.id
        WHERE a.plaid_account_id = ? AND conn.status = 'active'
      `).bind(accountId).first() as any

      if (!account) {
        console.log(`Account ${accountId} not found or inactive`)
        return
      }

      // Get access token
      const accessToken = await this.plaidService.getAccessToken(account.connection_id)
      if (!accessToken) {
        console.error(`No access token for connection ${account.connection_id}`)
        return
      }

      // Determine check frequency
      const frequency = await this.learningService.getCheckFrequency(
        account.institution_id || 'unknown',
        accountId
      )

      // Skip if not daily and account doesn't need smart checking
      if (frequency === 'smart') {
        const prediction = await this.learningService.predictNextStatement(
          account.institution_id || 'unknown',
          accountId
        )
        
        if (!prediction || prediction.check_after > new Date()) {
          console.log(`Skipping ${accountId} - not time for smart check`)
          return
        }
      }

      console.log(`Checking statements for account ${accountId} (${frequency} frequency)`)

      // Get current statements
      const statementsResult = await this.plaidService.getStatements(
        accessToken,
        accountId,
        {
          count: 5, // Check last 5 months
          offset: 0
        }
      )

      if (!statementsResult.success || !statementsResult.data) {
        console.error(`Failed to get statements for ${accountId}:`, statementsResult.error)
        return
      }

      const accountStatements = statementsResult.data.accounts.find(
        acc => acc.account_id === accountId
      )

      if (!accountStatements) {
        console.log(`No statements found for account ${accountId}`)
        return
      }

      // Check for new statements
      for (const statement of accountStatements.statements) {
        await this.processStatement(
          statement,
          account.connection_id,
          accountId,
          account.institution_id || 'unknown',
          env
        )
      }

    } catch (error) {
      console.error(`Error checking statements for account ${accountId}:`, error)
    }
  }

  /**
   * Process a single statement
   */
  private async processStatement(
    statement: any,
    connectionId: string,
    accountId: string,
    institutionId: string,
    env: Env
  ): Promise<void> {
    try {
      // Check if statement already exists
      const existingStatement = await env.DB.prepare(`
        SELECT id FROM statements 
        WHERE plaid_statement_id = ?
      `).bind(statement.statement_id).first()

      if (existingStatement) {
        return // Already processed
      }

      console.log(`Found new statement: ${statement.statement_id} for ${statement.month}/${statement.year}`)

      // Record statement availability for learning
      await this.learningService.recordStatementAvailability(
        institutionId,
        accountId,
        statement.month,
        statement.year,
        new Date()
      )

      // Create statement record
      await env.DB.prepare(`
        INSERT INTO statements (
          id,
          connection_id,
          account_id,
          plaid_statement_id,
          statement_month,
          statement_year,
          status,
          available_date,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        crypto.randomUUID(),
        connectionId,
        accountId,
        statement.statement_id,
        statement.month,
        statement.year,
        'available',
        new Date().toISOString(),
        new Date().toISOString(),
        new Date().toISOString()
      ).run()

      // Enqueue for direct delivery (no download - streaming only)
      await env.BSR_QUEUE.send({
        type: 'deliver_statement',
        statement_id: statement.statement_id,
        connection_id: connectionId,
        account_id: accountId,
        priority: 'normal'
      })

      console.log(`Queued statement ${statement.statement_id} for download`)

    } catch (error) {
      console.error(`Error processing statement ${statement.statement_id}:`, error)
    }
  }

  /**
   * Health check for monitoring
   */
  async healthCheck(env: Env): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy'
    stats: any
  }> {
    try {
      // Get basic stats
      const connections = await env.DB.prepare(`
        SELECT COUNT(*) as total FROM connections WHERE status = 'active'
      `).first() as any

      const accounts = await env.DB.prepare(`
        SELECT COUNT(*) as total FROM accounts
      `).first() as any

      const recentStatements = await env.DB.prepare(`
        SELECT COUNT(*) as total FROM statements 
        WHERE created_at > datetime('now', '-24 hours')
      `).first() as any

      // Get learning algorithm stats
      const learningStats = await this.learningService.getStatistics()

      return {
        status: 'healthy',
        stats: {
          active_connections: connections.total || 0,
          total_accounts: accounts.total || 0,
          statements_last_24h: recentStatements.total || 0,
          learning_accounts: learningStats.learning_accounts,
          confident_accounts: learningStats.confident_accounts,
          avg_confidence: Math.round(learningStats.avg_confidence * 100) / 100
        }
      }

    } catch (error) {
      console.error('Health check failed:', error)
      return {
        status: 'unhealthy',
        stats: { error: error instanceof Error ? error.message : 'Unknown error' }
      }
    }
  }
}

/**
 * Cron handler function
 */
export async function handleStatementPolling(env: Env): Promise<Response> {
  const poller = new StatementPoller(env)
  
  try {
    await poller.poll(env)
    
    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Statement polling completed'
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
    
  } catch (error) {
    console.error('Cron statement polling failed:', error)
    
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

/**
 * Health check endpoint
 */
export async function handleHealthCheck(env: Env): Promise<Response> {
  const poller = new StatementPoller(env)
  const health = await poller.healthCheck(env)
  
  const statusCode = health.status === 'healthy' ? 200 : 
                    health.status === 'degraded' ? 206 : 500
  
  return new Response(JSON.stringify(health), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' }
  })
}