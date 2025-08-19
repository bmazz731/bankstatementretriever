/**
 * OneDrive streaming upload implementation for Cloudflare Workers
 * Uses Microsoft Graph API upload sessions
 */
import type {
  StorageProvider,
  StorageTokens,
  StorageResult,
  StorageError,
  UploadSession,
  UploadChunk,
  UploadProgress,
  StorageFile,
  StorageUserInfo,
  PKCEData,
  OneDriveFile
} from '../types'
import { EdgeOAuthService } from '../oauth'
import { CHUNK_SIZES, OAUTH_SCOPES, UPLOAD_TIMEOUTS } from '../types'

export class OneDriveProvider implements StorageProvider {
  readonly provider = 'onedrive'
  
  private readonly oauthService: EdgeOAuthService
  private readonly baseUrl = 'https://graph.microsoft.com/v1.0'
  
  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly redirectUri: string
  ) {
    this.oauthService = new EdgeOAuthService()
  }

  /**
   * Generate OAuth authorization URL with PKCE
   */
  async generateAuthUrl(state: string): Promise<{ authUrl: string; pkceData: PKCEData }> {
    const pkceData = await this.oauthService.generatePKCE()
    pkceData.state = state
    pkceData.redirect_uri = this.redirectUri

    const authUrl = this.oauthService.generateAuthUrl(
      'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      this.clientId,
      this.redirectUri,
      OAUTH_SCOPES.ONEDRIVE,
      pkceData
    )

    return { authUrl, pkceData }
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCodeForTokens(
    code: string,
    pkceData: PKCEData
  ): Promise<StorageResult<StorageTokens>> {
    return this.oauthService.exchangeCodeForTokens(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      this.clientId,
      this.clientSecret,
      code,
      this.redirectUri,
      pkceData.code_verifier
    )
  }

  /**
   * Refresh access tokens
   */
  async refreshTokens(refreshToken: string): Promise<StorageResult<StorageTokens>> {
    return this.oauthService.refreshTokens(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      this.clientId,
      this.clientSecret,
      refreshToken
    )
  }

  /**
   * Validate tokens by checking user profile
   */
  async validateTokens(tokens: StorageTokens): Promise<boolean> {
    return this.oauthService.validateTokens(
      `${this.baseUrl}/me`,
      tokens
    )
  }

  /**
   * Get user information
   */
  async getUserInfo(tokens: StorageTokens): Promise<StorageResult<StorageUserInfo>> {
    try {
      const [userResponse, driveResponse] = await Promise.all([
        this.oauthService.makeAuthenticatedRequest(
          `${this.baseUrl}/me`,
          tokens
        ),
        this.oauthService.makeAuthenticatedRequest(
          `${this.baseUrl}/me/drive`,
          tokens
        )
      ])

      if (!userResponse.ok) {
        return {
          success: false,
          error: {
            code: 'USER_INFO_ERROR',
            message: 'Failed to fetch user information'
          }
        }
      }

      const userData = await userResponse.json()
      const driveData = driveResponse.ok ? await driveResponse.json() : null

      return {
        success: true,
        data: {
          id: userData.id,
          email: userData.mail || userData.userPrincipalName,
          name: userData.displayName,
          quotaTotal: driveData?.quota?.total,
          quotaUsed: driveData?.quota?.used
        }
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network request failed'
        }
      }
    }
  }

  /**
   * Create upload session for large files
   */
  async createUploadSession(
    fileName: string,
    fileSize: number,
    mimeType: string,
    metadata: Record<string, any> = {}
  ): Promise<StorageResult<UploadSession>> {
    try {
      const tokens = metadata.tokens as StorageTokens
      const folderPath = metadata.folderPath || '/drive/root'
      
      // Construct the item path
      const itemPath = folderPath === '/drive/root' 
        ? `/me/drive/root:/${fileName}:`
        : `/me/drive/root:/${folderPath}/${fileName}:`

      const uploadMetadata = {
        item: {
          '@microsoft.graph.conflictBehavior': 'rename',
          name: fileName
        }
      }

      const response = await this.oauthService.makeAuthenticatedRequest(
        `${this.baseUrl}${itemPath}createUploadSession`,
        tokens,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(uploadMetadata)
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return {
          success: false,
          error: {
            code: 'UPLOAD_SESSION_ERROR',
            message: errorData.error?.message || 'Failed to create upload session',
            details: errorData
          }
        }
      }

      const sessionData = await response.json()
      
      const session: UploadSession = {
        sessionId: this.extractSessionId(sessionData.uploadUrl),
        provider: 'onedrive',
        uploadUrl: sessionData.uploadUrl,
        fileName,
        fileSize,
        mimeType,
        bytesUploaded: 0,
        chunkSize: CHUNK_SIZES.ONEDRIVE,
        status: 'pending',
        createdAt: new Date(),
        expiresAt: new Date(sessionData.expirationDateTime),
        metadata: {
          ...metadata,
          uploadUrl: sessionData.uploadUrl
        }
      }

      return {
        success: true,
        data: session
      }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Failed to create upload session'
        }
      }
    }
  }

  /**
   * Upload a chunk to OneDrive
   */
  async uploadChunk(
    sessionId: string,
    chunk: UploadChunk
  ): Promise<StorageResult<UploadProgress>> {
    try {
      const uploadUrl = chunk.data.metadata?.uploadUrl as string
      const tokens = chunk.data.metadata?.tokens as StorageTokens
      const totalSize = chunk.data.metadata?.totalSize as number

      if (!uploadUrl) {
        return {
          success: false,
          error: {
            code: 'MISSING_UPLOAD_URL',
            message: 'Upload URL not found for session'
          }
        }
      }

      // OneDrive requires specific range format
      const contentRange = `bytes ${chunk.startByte}-${chunk.endByte}/${totalSize}`

      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Range': contentRange,
          'Content-Length': chunk.chunkSize.toString()
        },
        body: chunk.data,
        signal: AbortSignal.timeout(UPLOAD_TIMEOUTS.CHUNK_UPLOAD)
      })

      if (response.status === 202) {
        // Partial upload successful
        const rangeHeader = response.headers.get('range')
        const bytesUploaded = rangeHeader ? 
          this.parseRangeHeader(rangeHeader) : 
          chunk.endByte + 1

        return {
          success: true,
          data: {
            bytesUploaded,
            totalBytes: totalSize,
            percentage: Math.round((bytesUploaded / totalSize) * 100),
            chunkIndex: chunk.chunkIndex,
            totalChunks: Math.ceil(totalSize / chunk.chunkSize)
          }
        }
      }

      if (response.status === 201 || response.status === 200) {
        // Upload complete
        const fileData = await response.json()
        
        // Store file information in metadata
        chunk.data.metadata.fileId = fileData.id
        chunk.data.metadata.fileUrl = fileData.webUrl

        return {
          success: true,
          data: {
            bytesUploaded: totalSize,
            totalBytes: totalSize,
            percentage: 100,
            chunkIndex: chunk.chunkIndex,
            totalChunks: Math.ceil(totalSize / chunk.chunkSize)
          }
        }
      }

      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        error: {
          code: 'CHUNK_UPLOAD_ERROR',
          message: errorData.error?.message || `Upload failed with status ${response.status}`,
          retryable: response.status >= 500 || response.status === 429
        }
      }

    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        return {
          success: false,
          error: {
            code: 'UPLOAD_TIMEOUT',
            message: 'Chunk upload timed out',
            retryable: true
          }
        }
      }

      return {
        success: false,
        error: {
          code: 'CHUNK_UPLOAD_ERROR',
          message: error instanceof Error ? error.message : 'Chunk upload failed',
          retryable: true
        }
      }
    }
  }

  /**
   * Check upload session status
   */
  async getUploadStatus(
    uploadUrl: string,
    tokens: StorageTokens
  ): Promise<StorageResult<{ bytesUploaded: number; expiresAt?: string }>> {
    try {
      const response = await this.oauthService.makeAuthenticatedRequest(
        uploadUrl,
        tokens,
        {
          method: 'GET'
        }
      )

      if (response.ok) {
        const sessionData = await response.json()
        return {
          success: true,
          data: {
            bytesUploaded: sessionData.nextExpectedRanges?.[0] ? 
              parseInt(sessionData.nextExpectedRanges[0].split('-')[0]) : 0,
            expiresAt: sessionData.expirationDateTime
          }
        }
      }

      return {
        success: false,
        error: {
          code: 'STATUS_CHECK_ERROR',
          message: `Status check failed with status ${response.status}`
        }
      }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Status check failed'
        }
      }
    }
  }

  /**
   * Cancel upload session
   */
  async cancelUploadSession(
    uploadUrl: string,
    tokens: StorageTokens
  ): Promise<StorageResult<void>> {
    try {
      const response = await this.oauthService.makeAuthenticatedRequest(
        uploadUrl,
        tokens,
        {
          method: 'DELETE'
        }
      )

      if (response.ok) {
        return { success: true }
      }

      return {
        success: false,
        error: {
          code: 'CANCEL_ERROR',
          message: `Failed to cancel upload session: ${response.status}`
        }
      }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Failed to cancel upload session'
        }
      }
    }
  }

  /**
   * Finalize upload - not needed for OneDrive as it's automatic
   */
  async finalizeUpload(sessionId: string): Promise<StorageResult<StorageFile>> {
    return {
      success: false,
      error: {
        code: 'NOT_NEEDED',
        message: 'OneDrive uploads are finalized automatically'
      }
    }
  }

  /**
   * Create folder in OneDrive
   */
  async createFolder(
    name: string,
    parentPath: string | undefined,
    tokens: StorageTokens
  ): Promise<StorageResult<OneDriveFile>> {
    try {
      const parentFolder = parentPath || '/drive/root'
      const endpoint = parentFolder === '/drive/root' 
        ? `${this.baseUrl}/me/drive/root/children`
        : `${this.baseUrl}/me/drive/root:/${parentPath}:/children`

      const folderMetadata = {
        name,
        folder: {},
        '@microsoft.graph.conflictBehavior': 'rename'
      }

      const response = await this.oauthService.makeAuthenticatedRequest(
        endpoint,
        tokens,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(folderMetadata)
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: {
            code: 'FOLDER_CREATE_ERROR',
            message: errorData.error?.message || 'Failed to create folder'
          }
        }
      }

      const folderData = await response.json()
      return {
        success: true,
        data: folderData
      }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Failed to create folder'
        }
      }
    }
  }

  /**
   * Get sharing link for file
   */
  async createSharingLink(
    fileId: string,
    tokens: StorageTokens,
    type: 'view' | 'edit' = 'view'
  ): Promise<StorageResult<{ shareUrl: string; expiresAt?: string }>> {
    try {
      const response = await this.oauthService.makeAuthenticatedRequest(
        `${this.baseUrl}/me/drive/items/${fileId}/createLink`,
        tokens,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type,
            scope: 'anonymous'
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        return {
          success: false,
          error: {
            code: 'SHARE_LINK_ERROR',
            message: errorData.error?.message || 'Failed to create sharing link'
          }
        }
      }

      const linkData = await response.json()
      return {
        success: true,
        data: {
          shareUrl: linkData.link.webUrl,
          expiresAt: linkData.expirationDateTime
        }
      }

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Failed to create sharing link'
        }
      }
    }
  }

  // Private helper methods

  private extractSessionId(uploadUrl: string): string {
    // Extract session ID from OneDrive upload URL
    const url = new URL(uploadUrl)
    const sessionMatch = url.pathname.match(/upload\.([^.]+)\./)
    return sessionMatch ? sessionMatch[1] : crypto.randomUUID()
  }

  private parseRangeHeader(rangeHeader: string | null): number {
    if (!rangeHeader) return 0
    
    // OneDrive range header format: "bytes=0-1234567"
    const match = rangeHeader.match(/bytes=0-(\d+)/)
    return match ? parseInt(match[1]) + 1 : 0
  }
}