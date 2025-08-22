/**
 * Dropbox streaming upload implementation for Cloudflare Workers
 * Uses upload sessions API for large files
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
  DropboxFile,
} from "../types";
import { EdgeOAuthService } from "../oauth";
import { CHUNK_SIZES, OAUTH_SCOPES, UPLOAD_TIMEOUTS } from "../types";

export class DropboxProvider implements StorageProvider {
  readonly provider = "dropbox";

  private readonly oauthService: EdgeOAuthService;
  private readonly baseUrl = "https://api.dropboxapi.com/2";
  private readonly contentUrl = "https://content.dropboxapi.com/2";

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
      "https://www.dropbox.com/oauth2/authorize",
      this.clientId,
      this.redirectUri,
      OAUTH_SCOPES.DROPBOX,
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
      "https://api.dropbox.com/oauth2/token",
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
      "https://api.dropbox.com/oauth2/token",
      this.clientId,
      this.clientSecret,
      refreshToken,
    );
  }

  /**
   * Validate tokens by checking current account
   */
  async validateTokens(tokens: StorageTokens): Promise<boolean> {
    try {
      const response = await this.oauthService.makeAuthenticatedRequest(
        `${this.baseUrl}/users/get_current_account`,
        tokens,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: "null",
        },
      );
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user information
   */
  async getUserInfo(
    tokens: StorageTokens,
  ): Promise<StorageResult<StorageUserInfo>> {
    try {
      const [accountResponse, spaceResponse] = await Promise.all([
        this.oauthService.makeAuthenticatedRequest(
          `${this.baseUrl}/users/get_current_account`,
          tokens,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: "null",
          },
        ),
        this.oauthService.makeAuthenticatedRequest(
          `${this.baseUrl}/users/get_space_usage`,
          tokens,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: "null",
          },
        ),
      ]);

      if (!accountResponse.ok) {
        return {
          success: false,
          error: {
            code: "USER_INFO_ERROR",
            message: "Failed to fetch account information",
          },
        };
      }

      const accountData = await accountResponse.json();
      const spaceData = spaceResponse.ok ? await spaceResponse.json() : null;

      return {
        success: true,
        data: {
          id: accountData.account_id,
          email: accountData.email,
          name: accountData.name.display_name,
          quotaTotal: spaceData?.allocation?.allocated,
          quotaUsed: spaceData?.used,
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
   * Create upload session for large files
   */
  async createUploadSession(
    fileName: string,
    fileSize: number,
    mimeType: string,
    metadata: Record<string, any> = {},
  ): Promise<StorageResult<UploadSession>> {
    try {
      const tokens = metadata.tokens as StorageTokens;
      const folderPath = metadata.folderPath || "";
      const fullPath = folderPath
        ? `${folderPath}/${fileName}`
        : `/${fileName}`;

      // Start upload session
      const response = await this.oauthService.makeAuthenticatedRequest(
        `${this.contentUrl}/files/upload_session/start`,
        tokens,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            "Dropbox-API-Arg": JSON.stringify({
              close: false,
            }),
          },
          body: new Uint8Array(0), // Empty body to start session
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: {
            code: "UPLOAD_SESSION_ERROR",
            message:
              errorData.error_summary || "Failed to create upload session",
            details: errorData,
          },
        };
      }

      const sessionData = await response.json();

      const session: UploadSession = {
        sessionId: sessionData.session_id,
        provider: "dropbox",
        uploadUrl: `${this.contentUrl}/files/upload_session/append_v2`,
        fileName,
        fileSize,
        mimeType,
        bytesUploaded: 0,
        chunkSize: CHUNK_SIZES.DROPBOX,
        status: "pending",
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        metadata: {
          ...metadata,
          fullPath,
          sessionId: sessionData.session_id,
        },
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
   * Upload a chunk to the session
   */
  async uploadChunk(
    sessionId: string,
    chunk: UploadChunk,
  ): Promise<StorageResult<UploadProgress>> {
    try {
      const tokens = chunk.data.metadata?.tokens as StorageTokens;
      const totalSize = chunk.data.metadata?.totalSize as number;
      const dbxSessionId = chunk.data.metadata?.sessionId as string;

      const isLastChunk = chunk.endByte === totalSize - 1;

      if (isLastChunk) {
        // Final chunk - use finish endpoint
        return this.finishUploadSession(dbxSessionId, chunk, tokens);
      } else {
        // Intermediate chunk - use append endpoint
        return this.appendToSession(dbxSessionId, chunk, tokens);
      }
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
   * Finalize upload session - not needed for Dropbox as it's handled in the last chunk
   */
  async finalizeUpload(sessionId: string): Promise<StorageResult<StorageFile>> {
    return {
      success: false,
      error: {
        code: "NOT_NEEDED",
        message:
          "Dropbox uploads are finalized automatically with the last chunk",
      },
    };
  }

  /**
   * Create folder in Dropbox
   */
  async createFolder(
    path: string,
    tokens: StorageTokens,
  ): Promise<StorageResult<DropboxFile>> {
    try {
      const response = await this.oauthService.makeAuthenticatedRequest(
        `${this.baseUrl}/files/create_folder_v2`,
        tokens,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path,
            autorename: false,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: "FOLDER_CREATE_ERROR",
            message: errorData.error_summary || "Failed to create folder",
          },
        };
      }

      const folderData = await response.json();
      return {
        success: true,
        data: folderData.metadata,
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

  private async appendToSession(
    sessionId: string,
    chunk: UploadChunk,
    tokens: StorageTokens,
  ): Promise<StorageResult<UploadProgress>> {
    const response = await this.oauthService.makeAuthenticatedRequest(
      `${this.contentUrl}/files/upload_session/append_v2`,
      tokens,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": JSON.stringify({
            cursor: {
              session_id: sessionId,
              offset: chunk.startByte,
            },
            close: false,
          }),
        },
        body: chunk.data,
        signal: AbortSignal.timeout(UPLOAD_TIMEOUTS.CHUNK_UPLOAD),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: "CHUNK_UPLOAD_ERROR",
          message:
            errorData.error_summary ||
            `Upload failed with status ${response.status}`,
          retryable: response.status >= 500 || response.status === 429,
        },
      };
    }

    const totalSize = chunk.data.metadata?.totalSize as number;
    const bytesUploaded = chunk.endByte + 1;

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

  private async finishUploadSession(
    sessionId: string,
    chunk: UploadChunk,
    tokens: StorageTokens,
  ): Promise<StorageResult<UploadProgress>> {
    const fullPath = chunk.data.metadata?.fullPath as string;

    const response = await this.oauthService.makeAuthenticatedRequest(
      `${this.contentUrl}/files/upload_session/finish`,
      tokens,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Dropbox-API-Arg": JSON.stringify({
            cursor: {
              session_id: sessionId,
              offset: chunk.startByte,
            },
            commit: {
              path: fullPath,
              mode: "add",
              autorename: true,
              mute: false,
              strict_conflict: false,
            },
          }),
        },
        body: chunk.data,
        signal: AbortSignal.timeout(UPLOAD_TIMEOUTS.CHUNK_UPLOAD),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: "UPLOAD_FINISH_ERROR",
          message:
            errorData.error_summary ||
            `Upload finish failed with status ${response.status}`,
          retryable: response.status >= 500 || response.status === 429,
        },
      };
    }

    const fileData = await response.json();
    const totalSize = chunk.data.metadata?.totalSize as number;

    // Store file metadata for later use
    chunk.data.metadata.fileId = fileData.id;
    chunk.data.metadata.filePath = fileData.path_display;

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

  /**
   * Get temporary link for file sharing
   */
  async getTemporaryLink(
    filePath: string,
    tokens: StorageTokens,
  ): Promise<StorageResult<{ link: string; expires: string }>> {
    try {
      const response = await this.oauthService.makeAuthenticatedRequest(
        `${this.baseUrl}/files/get_temporary_link`,
        tokens,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: filePath,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: {
            code: "TEMP_LINK_ERROR",
            message: errorData.error_summary || "Failed to get temporary link",
          },
        };
      }

      const linkData = await response.json();
      return {
        success: true,
        data: {
          link: linkData.link,
          expires: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Failed to get temporary link",
        },
      };
    }
  }
}
