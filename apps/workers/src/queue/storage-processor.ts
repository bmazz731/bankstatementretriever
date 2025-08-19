/**
 * Queue processor for storage uploads
 * Handles streaming uploads with retry logic and continuation
 */
import { 
  StorageService,
  type StorageServiceConfig,
  type StorageUploadMessage,
  type StorageRefreshMessage,
  isRetryableError,
  getRetryDelay,
  StorageServiceError
} from '@bsr/storage'
import type { Env } from '../types/env'

export class StorageQueueProcessor {
  private storageService: StorageService

  constructor(env: Env) {
    const config: StorageServiceConfig = {
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
    
    this.storageService = new StorageService(config)
  }

  /**
   * Process storage upload message
   */
  async processUploadMessage(
    message: StorageUploadMessage,
    env: Env
  ): Promise<void> {
    const { destinationId, statementId, fileName, mimeType, sourceKey } = message

    try {
      console.log(`Processing storage upload for statement ${statementId} to destination ${destinationId}`)

      // Get statement and source file from R2
      if (!sourceKey) {
        throw new StorageServiceError(
          'MISSING_SOURCE_KEY',
          'Source file key is required for upload'
        )
      }

      const sourceObject = await env.BSR_STORAGE.get(sourceKey)
      if (!sourceObject || !sourceObject.body) {
        throw new StorageServiceError(
          'SOURCE_FILE_NOT_FOUND',
          `Source file not found: ${sourceKey}`
        )
      }

      const fileSize = sourceObject.size
      const sourceStream = sourceObject.body

      // Start streaming upload
      const uploadResult = await this.storageService.startUpload(
        destinationId,
        fileName,
        fileSize,
        mimeType,
        sourceStream,
        {
          statementId,
          sourceKey
        }
      )

      if (!uploadResult.success) {
        throw new StorageServiceError(
          uploadResult.error?.code || 'UPLOAD_ERROR',
          uploadResult.error?.message || 'Upload failed',
          uploadResult.error?.retryable
        )
      }

      console.log(`Upload started successfully: ${uploadResult.data}`)

      // Update statement delivery status
      await env.DB.prepare(`
        UPDATE statements 
        SET 
          delivery_status = 'delivered',
          delivered_at = ?,
          delivery_destination = ?,
          updated_at = ?
        WHERE plaid_statement_id = ?
      `).bind(
        new Date().toISOString(),
        destinationId,
        new Date().toISOString(),
        statementId
      ).run()

      // Clean up temporary file
      await env.BSR_STORAGE.delete(sourceKey)

    } catch (error) {
      console.error(`Storage upload failed for statement ${statementId}:`, error)
      
      // Update statement with error status
      await env.DB.prepare(`
        UPDATE statements 
        SET 
          delivery_status = 'error',
          error_message = ?,
          updated_at = ?
        WHERE plaid_statement_id = ?
      `).bind(
        error instanceof Error ? error.message : 'Upload failed',
        new Date().toISOString(),
        statementId
      ).run()

      // Re-throw for retry handling
      throw error
    }
  }

  /**
   * Process chunked upload continuation
   */
  async processChunkUpload(
    message: StorageUploadMessage & { chunkIndex: number; sessionId: string },
    env: Env
  ): Promise<void> {
    const { destinationId, sessionId, chunkIndex, sourceKey } = message

    try {
      if (!sourceKey || !sessionId) {
        throw new StorageServiceError(
          'MISSING_UPLOAD_DATA',
          'Missing required upload session data'
        )
      }

      // Get source file from R2
      const sourceObject = await env.BSR_STORAGE.get(sourceKey)
      if (!sourceObject || !sourceObject.body) {
        throw new StorageServiceError(
          'SOURCE_FILE_NOT_FOUND',
          `Source file not found: ${sourceKey}`
        )
      }

      // Resume upload using the storage service
      const resumeResult = await this.storageService.resumeUpload(
        destinationId,
        sessionId,
        sourceKey
      )

      if (!resumeResult.success) {
        throw new StorageServiceError(
          resumeResult.error?.code || 'RESUME_ERROR',
          resumeResult.error?.message || 'Failed to resume upload',
          resumeResult.error?.retryable
        )
      }

      console.log(`Chunk upload resumed successfully for session ${sessionId}`)

    } catch (error) {
      console.error(`Chunk upload failed for session ${sessionId}, chunk ${chunkIndex}:`, error)
      throw error
    }
  }

  /**
   * Process token refresh message
   */
  async processTokenRefresh(
    message: StorageRefreshMessage,
    env: Env
  ): Promise<void> {
    const { destinationId, provider } = message

    try {
      console.log(`Refreshing tokens for destination ${destinationId} (${provider})`)

      const refreshed = await this.storageService.refreshDestinationTokens(destinationId)
      
      if (!refreshed) {
        // Mark destination as expired
        await env.DB.prepare(`
          UPDATE destinations 
          SET 
            status = 'expired',
            error_message = 'Failed to refresh tokens',
            updated_at = ?
          WHERE id = ?
        `).bind(
          new Date().toISOString(),
          destinationId
        ).run()

        throw new StorageServiceError(
          'TOKEN_REFRESH_FAILED',
          'Failed to refresh destination tokens',
          false // Not retryable
        )
      }

      console.log(`Tokens refreshed successfully for destination ${destinationId}`)

    } catch (error) {
      console.error(`Token refresh failed for destination ${destinationId}:`, error)
      throw error
    }
  }

  /**
   * Handle storage operation with timeout management
   */
  async processWithTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number = 25000 // 25s to leave buffer for 30s Worker limit
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    })

    try {
      return await Promise.race([operation(), timeoutPromise])
    } catch (error) {
      if (error instanceof Error && error.message === 'Operation timed out') {
        throw new StorageServiceError(
          'OPERATION_TIMEOUT',
          'Storage operation timed out',
          true // Retryable
        )
      }
      throw error
    }
  }

  /**
   * Validate destination before processing
   */
  async validateDestination(destinationId: string, env: Env): Promise<boolean> {
    try {
      const destination = await this.storageService.getDestination(destinationId)
      if (!destination) return false

      const provider = this.storageService.getProvider(destination.destination.provider)
      if (!provider) return false

      return await provider.validateTokens(destination.tokens)
    } catch (error) {
      console.error(`Destination validation failed for ${destinationId}:`, error)
      return false
    }
  }

  /**
   * Get upload progress for monitoring
   */
  async getUploadProgress(uploadId: string): Promise<{
    status: string
    progress: number
    error?: string
  }> {
    try {
      const progress = await this.storageService.getUploadProgress(uploadId)
      
      if (!progress) {
        return { status: 'unknown', progress: 0 }
      }

      return {
        status: progress.status,
        progress: progress.percentage,
      }
    } catch (error) {
      return {
        status: 'error',
        progress: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

/**
 * Main queue processor function
 */
export async function processStorageMessage(
  message: StorageUploadMessage | StorageRefreshMessage,
  env: Env
): Promise<void> {
  const processor = new StorageQueueProcessor(env)

  try {
    switch (message.type) {
      case 'storage_upload':
        if ('chunkIndex' in message && 'sessionId' in message) {
          await processor.processWithTimeout(
            () => processor.processChunkUpload(message as any, env)
          )
        } else {
          await processor.processWithTimeout(
            () => processor.processUploadMessage(message as StorageUploadMessage, env)
          )
        }
        break

      case 'storage_refresh_tokens':
        await processor.processWithTimeout(
          () => processor.processTokenRefresh(message as StorageRefreshMessage, env)
        )
        break

      default:
        console.warn(`Unknown storage message type: ${(message as any).type}`)
    }

  } catch (error) {
    console.error('Storage message processing failed:', error)

    // Check if error is retryable
    if (error instanceof StorageServiceError && isRetryableError(error)) {
      const retryCount = message.retryCount || 0
      const maxRetries = 3

      if (retryCount < maxRetries) {
        // Schedule retry with exponential backoff
        const delay = getRetryDelay(retryCount)
        
        setTimeout(() => {
          env.BSR_QUEUE.send({
            ...message,
            retryCount: retryCount + 1
          })
        }, delay)

        console.log(`Scheduling retry ${retryCount + 1}/${maxRetries} in ${delay}ms`)
        return
      }
    }

    // Max retries exceeded or non-retryable error
    console.error('Storage operation failed permanently:', error)
    throw error
  }
}