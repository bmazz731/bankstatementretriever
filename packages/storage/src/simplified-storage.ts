/**
 * Simplified storage service for direct streaming
 * No chunking, no R2, just direct Plaid to destination streaming
 */
import type { StorageTokens, StorageResult } from './types'
import { GoogleDriveProvider } from './providers/google-drive'
import { DropboxProvider } from './providers/dropbox'
import { OneDriveProvider } from './providers/onedrive'
import { TokenEncryptionService } from './oauth'
import { prisma } from '@bsr/database'

export interface SimplifiedStorageConfig {
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

export class SimplifiedStorageService {
  private encryption: TokenEncryptionService

  constructor(private config: SimplifiedStorageConfig) {
    this.encryption = new TokenEncryptionService(config.encryptionKey)
  }

  /**
   * Direct stream upload - no chunking, no complexity
   * Stream goes directly from source to destination
   */
  async streamToDestination(
    destination_id: string,
    file_name: string,
    mime_type: string,
    stream: ReadableStream<Uint8Array>
  ): Promise<StorageResult<void>> {
    try {
      // Get destination with decrypted tokens
      const destination = await prisma.destination.findUnique({
        where: { id: destination_id }
      })

      if (!destination?.encrypted_tokens || !destination.encryption_iv) {
        return {
          success: false,
          error: {
            code: 'DESTINATION_NOT_FOUND',
            message: 'Destination not found or tokens invalid'
          }
        }
      }

      // Decrypt tokens
      const tokens = await this.encryption.decryptTokens(
        destination.encrypted_tokens,
        destination.encryption_iv
      )

      // Based on provider, use the appropriate upload method
      switch (destination.provider) {
        case 'google_drive':
          return this.uploadToGoogleDrive(tokens, file_name, mime_type, stream, destination.metadata_json)
        case 'dropbox':
          return this.uploadToDropbox(tokens, file_name, mime_type, stream, destination.metadata_json)
        case 'onedrive':
          return this.uploadToOneDrive(tokens, file_name, mime_type, stream, destination.metadata_json)
        default:
          return {
            success: false,
            error: {
              code: 'UNSUPPORTED_PROVIDER',
              message: `Provider ${destination.provider} not supported`
            }
          }
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UPLOAD_ERROR',
          message: error instanceof Error ? error.message : 'Upload failed'
        }
      }
    }
  }

  /**
   * Simple Google Drive upload - one shot, no chunking for MVP
   */
  private async uploadToGoogleDrive(
    tokens: StorageTokens,
    file_name: string,
    mime_type: string,
    stream: ReadableStream<Uint8Array>,
    metadata: any
  ): Promise<StorageResult<void>> {
    try {
      // Simple upload for files under 5MB (MVP scope)
      // For larger files, would need resumable upload
      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': mime_type
          },
          body: stream
        }
      )

      if (!response.ok) {
        const error = await response.json()
        return {
          success: false,
          error: {
            code: 'GOOGLE_DRIVE_ERROR',
            message: error.error?.message || 'Upload failed'
          }
        }
      }

      // Create metadata
      const fileData = await response.json()
      await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: file_name })
        }
      )

      return { success: true }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'GOOGLE_DRIVE_ERROR',
          message: error instanceof Error ? error.message : 'Upload failed'
        }
      }
    }
  }

  /**
   * Simple Dropbox upload - single upload for files under 150MB
   */
  private async uploadToDropbox(
    tokens: StorageTokens,
    file_name: string,
    mime_type: string,
    stream: ReadableStream<Uint8Array>,
    metadata: any
  ): Promise<StorageResult<void>> {
    try {
      const path = metadata?.folder_path ? `${metadata.folder_path}/${file_name}` : `/${file_name}`
      
      const response = await fetch(
        'https://content.dropboxapi.com/2/files/upload',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
              path,
              mode: 'add',
              autorename: true,
              mute: false
            })
          },
          body: stream
        }
      )

      if (!response.ok) {
        const error = await response.json()
        return {
          success: false,
          error: {
            code: 'DROPBOX_ERROR',
            message: error.error_summary || 'Upload failed'
          }
        }
      }

      return { success: true }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'DROPBOX_ERROR',
          message: error instanceof Error ? error.message : 'Upload failed'
        }
      }
    }
  }

  /**
   * Simple OneDrive upload - single PUT for files under 4MB
   */
  private async uploadToOneDrive(
    tokens: StorageTokens,
    file_name: string,
    mime_type: string,
    stream: ReadableStream<Uint8Array>,
    metadata: any
  ): Promise<StorageResult<void>> {
    try {
      const path = metadata?.folder_path || ''
      const uploadPath = path ? 
        `/me/drive/root:/${path}/${file_name}:/content` :
        `/me/drive/root:/${file_name}:/content`

      const response = await fetch(
        `https://graph.microsoft.com/v1.0${uploadPath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': mime_type
          },
          body: stream
        }
      )

      if (!response.ok) {
        const error = await response.json()
        return {
          success: false,
          error: {
            code: 'ONEDRIVE_ERROR',
            message: error.error?.message || 'Upload failed'
          }
        }
      }

      return { success: true }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'ONEDRIVE_ERROR',
          message: error instanceof Error ? error.message : 'Upload failed'
        }
      }
    }
  }

  /**
   * Store destination with encrypted tokens
   */
  async storeDestination(
    user_id: string,
    provider: string,
    name: string,
    tokens: StorageTokens,
    metadata: Record<string, any> = {}
  ): Promise<string> {
    const encrypted = await this.encryption.encryptTokens(tokens)
    
    const destination = await prisma.destination.create({
      data: {
        user_id,
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
   * Refresh tokens if needed
   */
  async refreshTokensIfNeeded(destination_id: string): Promise<boolean> {
    try {
      const destination = await prisma.destination.findUnique({
        where: { id: destination_id }
      })

      if (!destination?.encrypted_tokens || !destination.encryption_iv) {
        return false
      }

      const tokens = await this.encryption.decryptTokens(
        destination.encrypted_tokens,
        destination.encryption_iv
      )

      // Check if refresh is needed (simple expiry check)
      if (tokens.expires_at && tokens.expires_at > Date.now() + 5 * 60 * 1000) {
        return true // Still valid
      }

      if (!tokens.refresh_token) {
        return false // Can't refresh without refresh token
      }

      // Refresh tokens based on provider
      // This would call the appropriate provider's refresh method
      // For simplicity, returning false for now
      return false

    } catch (error) {
      console.error('Token refresh failed:', error)
      return false
    }
  }
}