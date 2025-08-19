/**
 * Queue processor for statement downloads and delivery
 * Handles streaming downloads without buffering to stay under 128MB limit
 */
import { 
  PlaidService, 
  createPlaidConfig 
} from '@bsr/plaid'
import type { Env } from '../types/env'
import { processStorageMessage } from './storage-processor'

export interface QueueMessage {
  type: string
  statement_id?: string
  connection_id?: string
  account_id?: string
  item_id?: string
  priority?: 'low' | 'normal' | 'high'
  webhook_triggered?: boolean
  notification_type?: string
  data?: any
}

export class StatementProcessor {
  private plaidService: PlaidService

  constructor(env: Env) {
    const config = createPlaidConfig(
      env.PLAID_CLIENT_ID,
      env.PLAID_SECRET,
      env.PLAID_ENV as 'sandbox' | 'development' | 'production',
      `https://${env.DOMAIN}/api/plaid/webhook`
    )
    
    this.plaidService = new PlaidService(config, env.ENCRYPTION_KEY)
  }

  /**
   * Process queue messages
   */
  async processMessage(message: QueueMessage, env: Env): Promise<void> {
    console.log(`Processing queue message: ${message.type}`)

    try {
      switch (message.type) {
        case 'download_statement':
          await this.downloadStatement(message, env)
          break
          
        case 'check_statements':
          await this.checkStatements(message, env)
          break
          
        case 'send_notification':
          await this.sendNotification(message, env)
          break
          
        case 'deliver_statement':
          await this.deliverStatement(message, env)
          break
          
        case 'storage_upload':
        case 'storage_refresh_tokens':
          await processStorageMessage(message as any, env)
          break
          
        default:
          console.warn(`Unknown message type: ${message.type}`)
      }
      
    } catch (error) {
      console.error(`Error processing message ${message.type}:`, error)
      throw error // Re-throw to trigger retry
    }
  }

  /**
   * Download statement from Plaid and store in temporary location
   */
  private async downloadStatement(message: QueueMessage, env: Env): Promise<void> {
    const { statement_id, connection_id, account_id } = message
    
    if (!statement_id || !connection_id || !account_id) {
      throw new Error('Missing required fields for statement download')
    }

    try {
      // Get access token
      const accessToken = await this.plaidService.getAccessToken(connection_id)
      if (!accessToken) {
        throw new Error(`No access token for connection ${connection_id}`)
      }

      // Update statement status
      await env.DB.prepare(`
        UPDATE statements 
        SET status = 'downloading', updated_at = ?
        WHERE plaid_statement_id = ?
      `).bind(new Date().toISOString(), statement_id).run()

      console.log(`Downloading statement ${statement_id}`)

      // Download as stream
      const downloadResult = await this.plaidService.downloadStatement(accessToken, statement_id)
      
      if (!downloadResult.success || !downloadResult.data) {
        throw new Error(`Failed to download statement: ${downloadResult.error?.error_message}`)
      }

      // Stream to temporary R2 storage
      const tempKey = `temp/${statement_id}_${Date.now()}.pdf`
      
      // Use TransformStream to process without buffering
      const transformStream = new TransformStream({
        transform(chunk, controller) {
          // Pass through without modification for now
          // Could add virus scanning, compression, etc here
          controller.enqueue(chunk)
        }
      })

      // Stream directly to R2
      await env.BSR_STORAGE.put(tempKey, downloadResult.data.pipeThrough(transformStream))

      // Update statement with temp location
      await env.DB.prepare(`
        UPDATE statements 
        SET 
          status = 'downloaded',
          temp_storage_key = ?,
          file_size = ?,
          downloaded_at = ?,
          updated_at = ?
        WHERE plaid_statement_id = ?
      `).bind(
        tempKey,
        null, // File size not easily available from stream
        new Date().toISOString(),
        new Date().toISOString(),
        statement_id
      ).run()

      // Queue for delivery
      await this.queueDelivery(statement_id, env)

      console.log(`Statement ${statement_id} downloaded and queued for delivery`)

    } catch (error) {
      console.error(`Failed to download statement ${statement_id}:`, error)
      
      // Update statement status to error
      await env.DB.prepare(`
        UPDATE statements 
        SET 
          status = 'error',
          error_message = ?,
          updated_at = ?
        WHERE plaid_statement_id = ?
      `).bind(
        error instanceof Error ? error.message : 'Unknown error',
        new Date().toISOString(),
        statement_id
      ).run()
      
      throw error
    }
  }

  /**
   * Check statements for specific item/account
   */
  private async checkStatements(message: QueueMessage, env: Env): Promise<void> {
    const { item_id, account_id } = message
    
    if (!item_id) {
      throw new Error('item_id required for statement check')
    }

    try {
      const accessToken = await this.plaidService.getAccessToken(item_id)
      if (!accessToken) {
        console.warn(`No access token for item ${item_id}`)
        return
      }

      // Get accounts to check
      let accountsToCheck: string[] = []
      
      if (account_id) {
        accountsToCheck = [account_id]
      } else {
        // Get all accounts for this connection
        const accounts = await env.DB.prepare(`
          SELECT plaid_account_id FROM accounts WHERE connection_id = ?
        `).bind(item_id).all()
        
        accountsToCheck = accounts.results.map((acc: any) => acc.plaid_account_id)
      }

      console.log(`Checking statements for ${accountsToCheck.length} accounts`)

      // Check each account
      for (const accountId of accountsToCheck) {
        const statementsResult = await this.plaidService.getStatements(
          accessToken,
          accountId,
          { count: 3 } // Check last 3 months
        )

        if (statementsResult.success && statementsResult.data) {
          const accountStatements = statementsResult.data.accounts.find(
            acc => acc.account_id === accountId
          )

          if (accountStatements) {
            for (const statement of accountStatements.statements) {
              await this.processNewStatement(statement, item_id, accountId, env)
            }
          }
        }
      }

    } catch (error) {
      console.error(`Failed to check statements for item ${item_id}:`, error)
      throw error
    }
  }

  /**
   * Process newly found statement
   */
  private async processNewStatement(statement: any, connectionId: string, accountId: string, env: Env): Promise<void> {
    // Check if already exists
    const existing = await env.DB.prepare(`
      SELECT id FROM statements WHERE plaid_statement_id = ?
    `).bind(statement.statement_id).first()

    if (existing) return // Already processed

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

    // Queue for download
    await env.BSR_QUEUE.send({
      type: 'download_statement',
      statement_id: statement.statement_id,
      connection_id: connectionId,
      account_id: accountId,
      priority: 'normal'
    })
  }

  /**
   * Queue statement for delivery
   */
  private async queueDelivery(statementId: string, env: Env): Promise<void> {
    // Get destinations for this statement's user
    const destinations = await env.DB.prepare(`
      SELECT dest.* FROM destinations dest
      JOIN connections conn ON dest.user_id = conn.user_id
      JOIN statements stmt ON stmt.connection_id = conn.id
      WHERE stmt.plaid_statement_id = ? AND dest.status = 'active'
    `).bind(statementId).all()

    // Get statement details for filename
    const statement = await env.DB.prepare(`
      SELECT s.*, a.name as account_name 
      FROM statements s
      JOIN accounts a ON a.plaid_account_id = s.account_id
      WHERE s.plaid_statement_id = ?
    `).bind(statementId).first() as any

    if (!statement) return

    const fileName = `${statement.account_name}_Statement_${statement.statement_month}_${statement.statement_year}.pdf`

    // Queue storage upload to each destination
    for (const destination of destinations.results as any[]) {
      await env.BSR_QUEUE.send({
        type: 'storage_upload',
        destinationId: destination.id,
        statementId,
        fileName,
        mimeType: 'application/pdf',
        sourceKey: statement.temp_storage_key,
        priority: 'normal'
      })
    }
  }

  /**
   * Deliver statement to destination
   */
  private async deliverStatement(message: QueueMessage, env: Env): Promise<void> {
    // This will be implemented in the storage provider integration
    console.log(`Statement delivery queued for statement ${message.statement_id}`)
    
    // For now, just log - will be implemented with storage providers
    const statement = await env.DB.prepare(`
      SELECT * FROM statements WHERE plaid_statement_id = ?
    `).bind(message.statement_id).first()

    if (statement) {
      console.log(`Would deliver statement ${message.statement_id} to destination ${message.data?.destination_id}`)
    }
  }

  /**
   * Send notification
   */
  private async sendNotification(message: QueueMessage, env: Env): Promise<void> {
    console.log(`Notification: ${message.notification_type}`, message.data)
    
    // This will be implemented with the notification system
    // For now, just log the notification
  }
}

/**
 * Queue consumer handler
 */
export async function handleQueueMessage(
  batch: MessageBatch<QueueMessage>,
  env: Env
): Promise<void> {
  const processor = new StatementProcessor(env)

  // Process messages in parallel but with concurrency limit
  const concurrency = 3
  const messages = batch.messages

  for (let i = 0; i < messages.length; i += concurrency) {
    const batch = messages.slice(i, i + concurrency)
    
    await Promise.allSettled(
      batch.map(async (message) => {
        try {
          await processor.processMessage(message.body, env)
          message.ack()
        } catch (error) {
          console.error(`Failed to process message:`, error)
          message.retry()
        }
      })
    )
  }
}