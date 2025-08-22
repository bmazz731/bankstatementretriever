/**
 * Google Drive streaming upload implementation for Cloudflare Workers
 * Uses resumable uploads to handle large files efficiently
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
  GoogleDriveFile,
} from "../types";
import { EdgeOAuthService } from "../oauth";
import { CHUNK_SIZES, OAUTH_SCOPES, UPLOAD_TIMEOUTS } from "../types";

export class GoogleDriveProvider implements StorageProvider {
  readonly provider = "google_drive";

  private readonly oauthService: EdgeOAuthService;
  private readonly baseUrl = "https://www.googleapis.com";
  private readonly uploadUrl = "https://www.googleapis.com/upload/drive/v3";

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly redirectUri: string,
  ) {
    this.oauthService = new EdgeOAuthService();
  }

  /**
   * Generate OAuth authorization URL with PKCE
   */
  async generateAuthUrl(
    state: string,
  ): Promise<{ authUrl: string; pkceData: PKCEData }> {
    const pkceData = await this.oauthService.generatePKCE();
    pkceData.state = state;
    pkceData.redirect_uri = this.redirectUri;

    const authUrl = this.oauthService.generateAuthUrl(
      "https://accounts.google.com/o/oauth2/v2/auth",
      this.clientId,
      this.redirectUri,
      OAUTH_SCOPES.GOOGLE_DRIVE,
      pkceData,
    );

    return { authUrl, pkceData };
  }

  /**
   * Exchange authorization code for tokens
   */
  async exchangeCodeForTokens(
    code: string,
    pkceData: PKCEData,
  ): Promise<StorageResult<StorageTokens>> {
    return this.oauthService.exchangeCodeForTokens(
      "https://oauth2.googleapis.com/token",
      this.clientId,
      this.clientSecret,
      code,
      this.redirectUri,
      pkceData.code_verifier,
    );
  }

  /**
   * Refresh access tokens
   */
  async refreshTokens(
    refreshToken: string,
  ): Promise<StorageResult<StorageTokens>> {
    return this.oauthService.refreshTokens(
      "https://oauth2.googleapis.com/token",
      this.clientId,
      this.clientSecret,
      refreshToken,
    );
  }

  /**
   * Validate tokens by checking user info
   */
  async validateTokens(tokens: StorageTokens): Promise<boolean> {
    return this.oauthService.validateTokens(
      `${this.baseUrl}/oauth2/v2/userinfo`,
      tokens,
    );
  }

  /**
   * Get user information
   */
  async getUserInfo(
    tokens: StorageTokens,
  ): Promise<StorageResult<StorageUserInfo>> {
    try {
      const [userResponse, aboutResponse] = await Promise.all([
        this.oauthService.makeAuthenticatedRequest(
          `${this.baseUrl}/oauth2/v2/userinfo`,
          tokens,
        ),
        this.oauthService.makeAuthenticatedRequest(
          `${this.baseUrl}/drive/v3/about?fields=storageQuota`,
          tokens,
        ),
      ]);

      if (!userResponse.ok) {
        return {
          success: false,
          error: {
            code: "USER_INFO_ERROR",
            message: "Failed to fetch user information",
          },
        };
      }

      const userData = await userResponse.json();
      const aboutData = aboutResponse.ok ? await aboutResponse.json() : null;

      return {
        success: true,
        data: {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          quotaTotal: aboutData?.storageQuota?.limit
            ? parseInt(aboutData.storageQuota.limit)
            : undefined,
          quotaUsed: aboutData?.storageQuota?.usage
            ? parseInt(aboutData.storageQuota.usage)
            : undefined,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message:
            error instanceof Error ? error.message : "Network request failed",
        },
      };
    }
  }

  /**
   * Create resumable upload session
   */
  async createUploadSession(
    fileName: string,
    fileSize: number,
    mimeType: string,
    metadata: Record<string, any> = {},
  ): Promise<StorageResult<UploadSession>> {
    try {
      const uploadMetadata = {
        name: fileName,
        mimeType,
        parents: metadata.parentFolderId
          ? [metadata.parentFolderId]
          : undefined,
      };

      const response = await fetch(
        `${this.uploadUrl}/files?uploadType=resumable`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${metadata.tokens.access_token}`,
            "Content-Type": "application/json; charset=UTF-8",
            "X-Upload-Content-Type": mimeType,
            "X-Upload-Content-Length": fileSize.toString(),
          },
          body: JSON.stringify(uploadMetadata),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: {
            code: "UPLOAD_SESSION_ERROR",
            message:
              errorData.error?.message || "Failed to create upload session",
            details: errorData,
          },
        };
      }

      const uploadUrl = response.headers.get("location");
      if (!uploadUrl) {
        return {
          success: false,
          error: {
            code: "UPLOAD_SESSION_ERROR",
            message: "No upload URL returned from Google Drive",
          },
        };
      }

      const session: UploadSession = {
        sessionId: this.extractSessionId(uploadUrl),
        provider: "google_drive",
        uploadUrl,
        fileName,
        fileSize,
        mimeType,
        bytesUploaded: 0,
        chunkSize: CHUNK_SIZES.GOOGLE_DRIVE,
        status: "pending",
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        metadata,
      };

      return {
        success: true,
        data: session,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Failed to create upload session",
        },
      };
    }
  }

  /**
   * Upload a chunk using resumable upload
   */
  async uploadChunk(
    sessionId: string,
    chunk: UploadChunk,
  ): Promise<StorageResult<UploadProgress>> {
    try {
      // Note: uploadUrl should be stored and retrieved based on sessionId
      // For this implementation, we'll assume it's passed in metadata
      const uploadUrl = chunk.data.metadata?.uploadUrl;
      if (!uploadUrl) {
        return {
          success: false,
          error: {
            code: "MISSING_UPLOAD_URL",
            message: "Upload URL not found for session",
          },
        };
      }

      const tokens = chunk.data.metadata?.tokens as StorageTokens;
      const totalSize = chunk.data.metadata?.totalSize as number;

      // Create content range header
      const contentRange = `bytes ${chunk.startByte}-${chunk.endByte}/${totalSize}`;

      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          "Content-Range": contentRange,
          "Content-Type": "application/octet-stream",
        },
        body: chunk.data,
        signal: AbortSignal.timeout(UPLOAD_TIMEOUTS.CHUNK_UPLOAD),
      });

      if (response.status === 308) {
        // Partial content uploaded, get range from response
        const rangeHeader = response.headers.get("range");
        const bytesUploaded = rangeHeader
          ? parseInt(rangeHeader.split("-")[1]) + 1
          : chunk.endByte + 1;

        return {
          success: true,
          data: {
            bytesUploaded,
            totalBytes: totalSize,
            percentage: Math.round((bytesUploaded / totalSize) * 100),
            chunkIndex: chunk.chunkIndex,
            totalChunks: Math.ceil(totalSize / chunk.chunkSize),
          },
        };
      }

      if (response.status === 200 || response.status === 201) {
        // Upload complete
        return {
          success: true,
          data: {
            bytesUploaded: totalSize,
            totalBytes: totalSize,
            percentage: 100,
            chunkIndex: chunk.chunkIndex,
            totalChunks: Math.ceil(totalSize / chunk.chunkSize),
          },
        };
      }

      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: "CHUNK_UPLOAD_ERROR",
          message:
            errorData.error?.message ||
            `Upload failed with status ${response.status}`,
          retryable: response.status >= 500 || response.status === 429,
        },
      };
    } catch (error) {
      if (error instanceof Error && error.name === "TimeoutError") {
        return {
          success: false,
          error: {
            code: "UPLOAD_TIMEOUT",
            message: "Chunk upload timed out",
            retryable: true,
          },
        };
      }

      return {
        success: false,
        error: {
          code: "CHUNK_UPLOAD_ERROR",
          message:
            error instanceof Error ? error.message : "Chunk upload failed",
          retryable: true,
        },
      };
    }
  }

  /**
   * Check upload status and get progress
   */
  async getUploadStatus(
    uploadUrl: string,
    tokens: StorageTokens,
  ): Promise<StorageResult<{ bytesUploaded: number; totalBytes?: number }>> {
    try {
      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          "Content-Range": "bytes */*",
        },
      });

      if (response.status === 308) {
        const rangeHeader = response.headers.get("range");
        const bytesUploaded = rangeHeader
          ? parseInt(rangeHeader.split("-")[1]) + 1
          : 0;

        return {
          success: true,
          data: { bytesUploaded },
        };
      }

      return {
        success: false,
        error: {
          code: "STATUS_CHECK_ERROR",
          message: `Unexpected status: ${response.status}`,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message:
            error instanceof Error ? error.message : "Status check failed",
        },
      };
    }
  }

  /**
   * Finalize upload and get file info
   */
  async finalizeUpload(sessionId: string): Promise<StorageResult<StorageFile>> {
    // For Google Drive, finalization happens automatically when the last chunk is uploaded
    // We would typically store the file ID from the final response

    // This is a placeholder - in practice, the file info would come from the final upload response
    return {
      success: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: "Finalization is handled automatically by Google Drive",
      },
    };
  }

  /**
   * Create folder in Google Drive
   */
  async createFolder(
    name: string,
    parentFolderId: string | undefined,
    tokens: StorageTokens,
  ): Promise<StorageResult<GoogleDriveFile>> {
    try {
      const metadata = {
        name,
        mimeType: "application/vnd.google-apps.folder",
        parents: parentFolderId ? [parentFolderId] : undefined,
      };

      const response = await this.oauthService.makeAuthenticatedRequest(
        `${this.baseUrl}/drive/v3/files`,
        tokens,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(metadata),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: "FOLDER_CREATE_ERROR",
            message: errorData.error?.message || "Failed to create folder",
          },
        };
      }

      const folderData = await response.json();
      return {
        success: true,
        data: folderData,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to create folder",
        },
      };
    }
  }

  // Private helper methods

  private extractSessionId(uploadUrl: string): string {
    // Extract session ID from upload URL
    const url = new URL(uploadUrl);
    const pathParts = url.pathname.split("/");
    return pathParts[pathParts.length - 1] || crypto.randomUUID();
  }

  private parseRangeHeader(rangeHeader: string | null): number {
    if (!rangeHeader) return 0;

    // Range header format: "bytes=0-1234567"
    const match = rangeHeader.match(/bytes=0-(\d+)/);
    return match ? parseInt(match[1]) + 1 : 0;
  }
}
