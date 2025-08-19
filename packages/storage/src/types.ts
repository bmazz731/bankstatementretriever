/**
 * Storage provider types for edge-compatible implementations
 */

// Storage provider configuration
export interface StorageConfig {
  provider: 'google_drive' | 'dropbox' | 'onedrive'
  clientId: string
  clientSecret: string
  redirectUri: string
  scopes: string[]
}

// OAuth token data
export interface StorageTokens {
  access_token: string
  refresh_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
}

// Encrypted token storage
export interface EncryptedStorageTokens {
  encrypted_data: string
  iv: string
  provider: string
  created_at: Date
  expires_at?: Date
}

// OAuth PKCE flow data
export interface PKCEData {
  code_verifier: string
  code_challenge: string
  state: string
  redirect_uri: string
}

// Upload session for resumable uploads
export interface UploadSession {
  sessionId: string
  provider: 'google_drive' | 'dropbox' | 'onedrive'
  uploadUrl: string
  fileName: string
  fileSize: number
  mimeType: string
  bytesUploaded: number
  chunkSize: number
  status: 'pending' | 'uploading' | 'completed' | 'failed'
  createdAt: Date
  expiresAt: Date
  metadata?: Record<string, any>
}

// Upload chunk information
export interface UploadChunk {
  chunkIndex: number
  startByte: number
  endByte: number
  chunkSize: number
  data: ReadableStream<Uint8Array>
}

// Upload progress callback
export interface UploadProgress {
  bytesUploaded: number
  totalBytes: number
  percentage: number
  chunkIndex: number
  totalChunks: number
}

// Storage provider API interfaces
export interface StorageProvider {
  readonly provider: string
  
  // OAuth flow
  generateAuthUrl(state: string): Promise<{ authUrl: string; pkceData: PKCEData }>
  exchangeCodeForTokens(code: string, pkceData: PKCEData): Promise<StorageResult<StorageTokens>>
  refreshTokens(refreshToken: string): Promise<StorageResult<StorageTokens>>
  
  // File operations
  createUploadSession(
    fileName: string,
    fileSize: number,
    mimeType: string,
    metadata?: Record<string, any>
  ): Promise<StorageResult<UploadSession>>
  
  uploadChunk(
    sessionId: string,
    chunk: UploadChunk
  ): Promise<StorageResult<UploadProgress>>
  
  finalizeUpload(sessionId: string): Promise<StorageResult<StorageFile>>
  
  // Utility methods
  validateTokens(tokens: StorageTokens): Promise<boolean>
  getUserInfo(tokens: StorageTokens): Promise<StorageResult<StorageUserInfo>>
}

// Storage operation result
export interface StorageResult<T> {
  success: boolean
  data?: T
  error?: StorageError
}

// Storage error
export interface StorageError {
  code: string
  message: string
  details?: any
  retryable?: boolean
}

// Storage file info
export interface StorageFile {
  id: string
  name: string
  size: number
  mimeType: string
  createdAt: Date
  downloadUrl?: string
  shareUrl?: string
  metadata?: Record<string, any>
}

// Storage user info
export interface StorageUserInfo {
  id: string
  email: string
  name: string
  quotaTotal?: number
  quotaUsed?: number
}

// Queue message types for storage operations
export interface StorageUploadMessage {
  type: 'storage_upload'
  destinationId: string
  statementId: string
  fileName: string
  fileSize?: number
  mimeType: string
  sourceKey?: string // R2 key for source file
  chunkIndex?: number
  sessionId?: string
  retryCount?: number
  metadata?: Record<string, any>
}

export interface StorageRefreshMessage {
  type: 'storage_refresh_tokens'
  destinationId: string
  provider: string
  retryCount?: number
}

// Storage destination configuration
export interface StorageDestination {
  id: string
  userId: string
  provider: 'google_drive' | 'dropbox' | 'onedrive'
  name: string
  folderPath?: string
  encryptedTokens: string
  tokenIv: string
  status: 'active' | 'error' | 'expired'
  lastSync?: Date
  errorMessage?: string
  metadata?: Record<string, any>
}

// Upload coordination for large files
export interface MultipartUpload {
  uploadId: string
  sessionId: string
  totalChunks: number
  completedChunks: Set<number>
  failedChunks: Set<number>
  chunkSize: number
  totalSize: number
  createdAt: Date
  lastActivity: Date
}

// Streaming utilities
export interface StreamChunker {
  chunkSize: number
  createChunks(stream: ReadableStream<Uint8Array>, totalSize: number): AsyncIterable<UploadChunk>
}

// Provider-specific types
export interface GoogleDriveFile {
  id: string
  name: string
  mimeType: string
  size: string
  createdTime: string
  parents?: string[]
  webViewLink?: string
}

export interface DropboxFile {
  id: string
  name: string
  size: number
  server_modified: string
  client_modified: string
  sharing_info?: {
    read_only: boolean
    parent_shared_folder_id?: string
  }
}

export interface OneDriveFile {
  id: string
  name: string
  size: number
  createdDateTime: string
  lastModifiedDateTime: string
  webUrl?: string
  parentReference?: {
    driveId: string
    path: string
  }
}

// Constants
export const CHUNK_SIZES = {
  GOOGLE_DRIVE: 8 * 1024 * 1024, // 8MB - Google's recommended chunk size
  DROPBOX: 4 * 1024 * 1024,      // 4MB - Dropbox limit
  ONEDRIVE: 10 * 1024 * 1024     // 10MB - OneDrive maximum
} as const

export const OAUTH_SCOPES = {
  GOOGLE_DRIVE: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/userinfo.email'
  ],
  DROPBOX: [
    'files.content.write',
    'account_info.read'
  ],
  ONEDRIVE: [
    'Files.ReadWrite',
    'User.Read'
  ]
} as const

export const UPLOAD_TIMEOUTS = {
  CHUNK_UPLOAD: 25000,    // 25s - leave buffer for 30s Worker limit
  SESSION_CREATE: 10000,   // 10s
  TOKEN_REFRESH: 10000     // 10s
} as const