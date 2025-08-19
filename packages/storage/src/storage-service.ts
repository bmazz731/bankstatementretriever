/**
 * Storage service coordinator - manages uploads across providers
 * Handles retry logic, queuing, and provider selection
 */
import type {
  StorageProvider,
  StorageDestination,
  StorageTokens,
  StorageResult,
  UploadSession,
  UploadChunk,
  StorageUploadMessage,
  MultipartUpload
} from './types'
import { GoogleDriveProvider } from './providers/google-drive'
import { DropboxProvider } from './providers/dropbox'
import { OneDriveProvider } from './providers/onedrive'
import { TokenEncryptionService } from './oauth'
import { EdgeStreamChunker, UploadResume } from './stream-chunker'
import { prisma } from '@bsr/database'

export interface StorageServiceConfig {
  googleDrive: {
    clientId: string
    clientSecret: string
    redirectUri: string
  }
  dropbox: {
    clientId: string
    clientSecret: string
    redirectUri: string
  }
  onedrive: {
    clientId: string
    clientSecret: string
    redirectUri: string
  }
  encryptionKey: string
}

export class StorageService {
  private providers: Map<string, StorageProvider> = new Map()
  private encryption: TokenEncryptionService
  private uploadSessions: Map<string, UploadSession> = new Map()

  constructor(private config: StorageServiceConfig) {
    this.encryption = new TokenEncryptionService(config.encryptionKey)
    
    // Initialize providers
    this.providers.set('google_drive', new GoogleDriveProvider(
      config.googleDrive.clientId,
      config.googleDrive.clientSecret,
      config.googleDrive.redirectUri
    ))
    
    this.providers.set('dropbox', new DropboxProvider(
      config.dropbox.clientId,
      config.dropbox.clientSecret,
      config.dropbox.redirectUri
    ))
    
    this.providers.set('onedrive', new OneDriveProvider(
      config.onedrive.clientId,
      config.onedrive.clientSecret,
      config.onedrive.redirectUri
    ))
  }

  /**
   * Get provider instance
   */
  getProvider(providerName: string): StorageProvider | undefined {
    return this.providers.get(providerName)
  }

  /**
   * Store destination with encrypted tokens
   */
  async storeDestination(
    userId: string,
    provider: string,
    name: string,
    tokens: StorageTokens,
    metadata: Record<string, any> = {}
  ): Promise<string> {
    const encrypted = await this.encryption.encryptTokens(tokens)
    
    const destination = await prisma.destination.create({
      data: {
        user_id: userId,
        provider,
        name,
        encrypted_tokens: encrypted.encrypted_data,
        encryption_iv: encrypted.iv,
        status: 'active',
        metadata_json: metadata
      }
    })

    return destination.id
  }

  /**
   * Get destination with decrypted tokens
   */
  async getDestination(destinationId: string): Promise<{
    destination: StorageDestination
    tokens: StorageTokens
  } | null> {
    const destination = await prisma.destination.findUnique({
      where: { id: destinationId }
    })

    if (!destination?.encrypted_tokens || !destination.encryption_iv) {
      return null
    }

    try {
      const tokens = await this.encryption.decryptTokens(
        destination.encrypted_tokens,
        destination.encryption_iv
      )

      return {
        destination: destination as any,
        tokens
      }
    } catch (error) {
      console.error('Failed to decrypt destination tokens:', error)
      return null
    }
  }

  /**
   * Refresh tokens for a destination
   */
  async refreshDestinationTokens(destinationId: string): Promise<boolean> {
    const destinationData = await this.getDestination(destinationId)
    if (!destinationData) return false

    const { destination, tokens } = destinationData
    const provider = this.getProvider(destination.provider)
    if (!provider) return false

    // Check if refresh is needed
    if (!tokens.refresh_token) return false

    const result = await provider.refreshTokens(tokens.refresh_token)
    if (!result.success || !result.data) return false

    // Update stored tokens
    const encrypted = await this.encryption.encryptTokens(result.data)
    
    await prisma.destination.update({
      where: { id: destinationId },
      data: {
        encrypted_tokens: encrypted.encrypted_data,
        encryption_iv: encrypted.iv,
        status: 'active',
        error_message: null
      }
    })

    return true
  }

  /**
   * Start streaming upload to destination
   */
  async startUpload(
    destinationId: string,
    fileName: string,
    fileSize: number,
    mimeType: string,
    sourceStream: ReadableStream<Uint8Array>,
    metadata: Record<string, any> = {}
  ): Promise<StorageResult<string>> {
    try {
      const destinationData = await this.getDestination(destinationId)
      if (!destinationData) {
        return {
          success: false,
          error: {
            code: 'DESTINATION_NOT_FOUND',
            message: 'Destination not found or tokens invalid'
          }
        }
      }

      const { destination, tokens } = destinationData
      const provider = this.getProvider(destination.provider)
      if (!provider) {
        return {
          success: false,
          error: {
            code: 'PROVIDER_NOT_SUPPORTED',
            message: `Provider ${destination.provider} not supported`
          }
        }
      }

      // Create upload session
      const sessionResult = await provider.createUploadSession(
        fileName,
        fileSize,
        mimeType,
        {
          ...metadata,
          tokens,
          ...destination.metadata_json
        }
      )

      if (!sessionResult.success || !sessionResult.data) {
        return {
          success: false,
          error: sessionResult.error || {
            code: 'SESSION_CREATE_ERROR',
            message: 'Failed to create upload session'
          }
        }
      }

      const session = sessionResult.data
      this.uploadSessions.set(session.sessionId, session)

      // Start chunked upload
      const uploadId = await this.startChunkedUpload(
        session,
        sourceStream,
        provider,
        tokens
      )

      return {
        success: true,
        data: uploadId
      }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UPLOAD_START_ERROR',
          message: error instanceof Error ? error.message : 'Failed to start upload'
        }
      }
    }
  }

  /**
   * Start chunked upload using queue for coordination
   */
  private async startChunkedUpload(
    session: UploadSession,
    sourceStream: ReadableStream<Uint8Array>,
    provider: StorageProvider,
    tokens: StorageTokens
  ): Promise<string> {
    const uploadId = crypto.randomUUID()
    const chunker = new EdgeStreamChunker(session.chunkSize)
    
    // Create multipart upload tracking
    const multipartUpload: MultipartUpload = {
      uploadId,
      sessionId: session.sessionId,
      totalChunks: chunker.calculateTotalChunks(session.fileSize),
      completedChunks: new Set(),
      failedChunks: new Set(),
      chunkSize: session.chunkSize,
      totalSize: session.fileSize,
      createdAt: new Date(),
      lastActivity: new Date()
    }

    // Process chunks
    let chunkIndex = 0
    try {
      for await (const chunk of chunker.createChunks(sourceStream, session.fileSize)) {
        // Queue each chunk for upload
        await this.queueChunkUpload(session, chunk, provider, tokens, uploadId)
        chunkIndex++

        // Yield control to prevent blocking
        if (chunkIndex % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0))
        }
      }
    } catch (error) {
      console.error('Error during chunked upload:', error)
      throw error
    }

    return uploadId
  }

  /**
   * Queue individual chunk upload
   */
  private async queueChunkUpload(
    session: UploadSession,
    chunk: UploadChunk,
    provider: StorageProvider,
    tokens: StorageTokens,
    uploadId: string
  ): Promise<void> {
    // In a real implementation, this would enqueue to Cloudflare Queue
    // For now, upload directly with retry logic
    const maxRetries = 3
    let attempt = 0

    while (attempt < maxRetries) {
      try {
        // Add metadata to chunk
        chunk.data.metadata = {
          ...chunk.data.metadata,
          tokens,
          uploadUrl: session.uploadUrl,
          totalSize: session.fileSize,
          sessionId: session.sessionId,
          uploadId
        }

        const result = await provider.uploadChunk(session.sessionId, chunk)
        
        if (result.success) {
          console.log(`Chunk ${chunk.chunkIndex} uploaded successfully`, result.data)
          break
        } else if (result.error?.retryable && attempt < maxRetries - 1) {
          attempt++
          const delay = Math.pow(2, attempt) * 1000 // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay))
          continue
        } else {
          throw new Error(result.error?.message || 'Chunk upload failed')
        }

      } catch (error) {
        if (attempt === maxRetries - 1) {
          console.error(`Chunk ${chunk.chunkIndex} failed after ${maxRetries} attempts:`, error)
          throw error
        }
        attempt++
        const delay = Math.pow(2, attempt) * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  /**
   * Resume failed upload
   */
  async resumeUpload(
    destinationId: string,
    uploadId: string,
    r2Key: string
  ): Promise<StorageResult<void>> {
    // Implementation would:
    // 1. Get upload session from storage
    // 2. Check which chunks were completed
    // 3. Resume from last successful chunk
    // 4. Use UploadResume utility to calculate required chunks

    return {
      success: false,
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'Resume upload not yet implemented'
      }
    }
  }

  /**
   * Get upload progress
   */
  async getUploadProgress(uploadId: string): Promise<{
    bytesUploaded: number
    totalBytes: number
    percentage: number
    status: string
    completedChunks: number
    totalChunks: number
  } | null> {
    // Implementation would query upload tracking data
    return null
  }

  /**
   * Cancel upload
   */
  async cancelUpload(uploadId: string): Promise<boolean> {
    // Implementation would:
    // 1. Cancel upload session with provider
    // 2. Clean up temporary data
    // 3. Update tracking records
    
    return false
  }

  /**
   * Validate all destinations for a user
   */
  async validateUserDestinations(userId: string): Promise<{
    valid: string[]
    invalid: string[]
    refreshed: string[]
  }> {
    const destinations = await prisma.destination.findMany({
      where: { 
        user_id: userId,
        status: 'active'
      }
    })

    const valid: string[] = []
    const invalid: string[] = []
    const refreshed: string[] = []

    for (const dest of destinations) {
      const destinationData = await this.getDestination(dest.id)
      if (!destinationData) {
        invalid.push(dest.id)
        continue
      }

      const { tokens } = destinationData
      const provider = this.getProvider(dest.provider)
      if (!provider) {
        invalid.push(dest.id)
        continue
      }

      const isValid = await provider.validateTokens(tokens)
      if (isValid) {
        valid.push(dest.id)
      } else if (tokens.refresh_token) {
        // Try to refresh
        const refreshed_tokens = await this.refreshDestinationTokens(dest.id)
        if (refreshed_tokens) {
          refreshed.push(dest.id)
          valid.push(dest.id)
        } else {
          invalid.push(dest.id)
        }
      } else {
        invalid.push(dest.id)
      }
    }

    return { valid, invalid, refreshed }
  }
}