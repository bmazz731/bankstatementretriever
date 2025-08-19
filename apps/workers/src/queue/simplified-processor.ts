/**
 * Simplified statement processor with direct streaming
 * Zero storage - direct Plaid to destination streaming
 */
import { 
  PlaidService, 
  createPlaidConfig 
} from '@bsr/plaid'
import { 
  SimplifiedStorageService,
  type SimplifiedStorageConfig
} from '@bsr/storage/src/simplified-storage'
import type { Env } from '../types/env'

// Simplified queue message with consistent snake_case
export interface QueueMessage {
  type: string
  statement_id?: string
  connection_id?: string
  account_id?: string
  destination_id?: string
  file_name?: string
  priority?: 'low' | 'normal' | 'high'
}

export class SimplifiedProcessor {
  private plaidService: PlaidService
  private storageService: SimplifiedStorageService

  constructor(env: Env) {
    // Initialize Plaid
    const plaidConfig = createPlaidConfig(
      env.PLAID_CLIENT_ID,
      env.PLAID_SECRET,
      env.PLAID_ENV as 'sandbox' | 'development' | 'production',
      `https://${env.DOMAIN}/api/plaid/webhook`
    )
    this.plaidService = new PlaidService(plaidConfig, env.ENCRYPTION_KEY)

    // Initialize Storage
    const storageConfig: SimplifiedStorageConfig = {
      googleDrive: {
        clientId: env.GOOGLE_DRIVE_CLIENT_ID,
        clientSecret: env.GOOGLE_DRIVE_CLIENT_SECRET,
        redirectUri: `https://${env.DOMAIN}/api/storage/google-drive/callback`
      },
      dropbox: {
        clientId: env.DROPBOX_CLIENT_ID,
        clientSecret: env.DROPBOX_CLIENT_SECRET,
        redirectUri: `https://${env.DOMAIN}/api/storage/dropbox/callback`
      },
      onedrive: {
        clientId: env.ONEDRIVE_CLIENT_ID,
        clientSecret: env.ONEDRIVE_CLIENT_SECRET,
        redirectUri: `https://${env.DOMAIN}/api/storage/onedrive/callback`
      },
      encryptionKey: env.ENCRYPTION_KEY
    }
    this.storageService = new SimplifiedStorageService(storageConfig)
  }

  /**
   * Process queue messages
   */
  async processMessage(message: QueueMessage, env: Env): Promise<void> {
    console.log(`Processing message: ${message.type}`)

    try {
      switch (message.type) {
        case 'check_statements':
          await this.checkStatements(message, env)
          break
          
        case 'deliver_statement':
          await this.deliverStatement(message, env)
          break
          
        default:
          console.warn(`Unknown message type: ${message.type}`)
      }
    } catch (error) {
      console.error(`Error processing message ${message.type}:`, error)
      throw error // Let queue handle retries
    }
  }

  /**
   * Check for new statements
   */
  private async checkStatements(message: QueueMessage, env: Env): Promise<void> {
    const { connection_id, account_id } = message
    
    if (!connection_id) {
      throw new Error('connection_id required for statement check')
    }

    // Get access token
    const accessToken = await this.plaidService.getAccessToken(connection_id)
    if (!accessToken) {
      console.warn(`No access token for connection ${connection_id}`)
      return
    }

    // Get statements from Plaid
    const statementsResult = await this.plaidService.getStatements(
      accessToken,
      account_id!,
      { count: 3 } // Check last 3 months
    )

    if (!statementsResult.success || !statementsResult.data) {
      console.error(`Failed to get statements for ${account_id}:`, statementsResult.error)
      return
    }

    const accountStatements = statementsResult.data.accounts.find(
      acc => acc.account_id === account_id
    )

    if (!accountStatements) return

    // Process each new statement
    for (const statement of accountStatements.statements) {
      // Check if already exists
      const existing = await env.DB.prepare(`
        SELECT id FROM statements WHERE plaid_statement_id = ?
      `).bind(statement.statement_id).first()

      if (existing) continue // Already processed

      // Create statement record
      await env.DB.prepare(`
        INSERT INTO statements (
          id, connection_id, account_id, plaid_statement_id,
          statement_month, statement_year, status, available_date,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        crypto.randomUUID(),
        connection_id,
        account_id,
        statement.statement_id,
        statement.month,
        statement.year,
        'available',
        new Date().toISOString(),
        new Date().toISOString(),
        new Date().toISOString()
      ).run()

      // Queue for delivery
      await env.BSR_QUEUE.send({
        type: 'deliver_statement',
        statement_id: statement.statement_id,
        connection_id,
        account_id,
        priority: 'normal'
      })
    }
  }

  /**
   * Deliver statement directly from Plaid to destination
   * NO INTERMEDIATE STORAGE - Direct streaming only
   */
  private async deliverStatement(message: QueueMessage, env: Env): Promise<void> {
    const { statement_id, connection_id, account_id } = message
    
    if (!statement_id || !connection_id || !account_id) {
      throw new Error('Missing required fields for statement delivery')
    }

    try {
      // Get access token
      const accessToken = await this.plaidService.getAccessToken(connection_id)
      if (!accessToken) {
        throw new Error(`No access token for connection ${connection_id}`)
      }

      // Get user's active destinations
      const destinations = await env.DB.prepare(`
        SELECT dest.* FROM destinations dest
        JOIN connections conn ON dest.user_id = conn.user_id
        WHERE conn.id = ? AND dest.status = 'active'
      `).bind(connection_id).all()

      if (destinations.results.length === 0) {
        console.log(`No active destinations for connection ${connection_id}`)
        return
      }

      // Get account name for filename
      const account = await env.DB.prepare(`
        SELECT name FROM accounts WHERE plaid_account_id = ?
      `).bind(account_id).first() as any

      // Get statement details
      const statementRecord = await env.DB.prepare(`
        SELECT statement_month, statement_year 
        FROM statements WHERE plaid_statement_id = ?
      `).bind(statement_id).first() as any

      const fileName = `${account?.name || 'Statement'}_${statementRecord.statement_month}_${statementRecord.statement_year}.pdf`

      // DIRECT STREAMING: Download from Plaid and upload to each destination
      // No intermediate storage - stream directly
      for (const destination of destinations.results as any[]) {
        try {
          console.log(`Delivering statement ${statement_id} to destination ${destination.id}`)
          
          // Get fresh stream from Plaid for each destination
          // This ensures we don't try to reuse a consumed stream
          const downloadResult = await this.plaidService.downloadStatement(accessToken, statement_id)
          
          if (!downloadResult.success || !downloadResult.data) {
            throw new Error(`Failed to download statement: ${downloadResult.error?.error_message}`)
          }

          // Stream directly to storage provider - NO INTERMEDIATE STORAGE
          const uploadResult = await this.storageService.streamToDestination(
            destination.id,
            fileName,
            'application/pdf',
            downloadResult.data // Direct stream from Plaid
          )

          if (!uploadResult.success) {
            throw new Error(`Upload failed: ${uploadResult.error?.message}`)
          }

          // Update delivery status
          await env.DB.prepare(`
            UPDATE statements 
            SET delivery_status = 'delivered', delivered_at = ?, updated_at = ?
            WHERE plaid_statement_id = ?
          `).bind(
            new Date().toISOString(),
            new Date().toISOString(),
            statement_id
          ).run()

          console.log(`Successfully delivered statement ${statement_id} to destination ${destination.id}`)

        } catch (error) {
          console.error(`Failed to deliver to destination ${destination.id}:`, error)
          
          // Update error status
          await env.DB.prepare(`
            UPDATE statements 
            SET delivery_status = 'error', error_message = ?, updated_at = ?
            WHERE plaid_statement_id = ?
          `).bind(
            error instanceof Error ? error.message : 'Delivery failed',
            new Date().toISOString(),
            statement_id
          ).run()
        }
      }

    } catch (error) {
      console.error(`Statement delivery failed for ${statement_id}:`, error)
      throw error // Re-throw for queue retry
    }
  }
}

/**
 * Main queue handler - simplified
 */
export async function handleSimplifiedQueue(
  batch: MessageBatch<QueueMessage>,
  env: Env
): Promise<void> {
  const processor = new SimplifiedProcessor(env)

  for (const message of batch.messages) {
    try {
      await processor.processMessage(message.body, env)
      message.ack()
    } catch (error) {
      console.error(`Failed to process message:`, error)
      message.retry()
    }
  }
}