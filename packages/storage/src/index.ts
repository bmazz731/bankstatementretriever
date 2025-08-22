/**
 * BankStatementRetriever Storage Integration
 * Edge-compatible streaming uploads for Google Drive, Dropbox, and OneDrive
 */

// Core services
export { StorageService, type StorageServiceConfig } from "./storage-service";
export { EdgeOAuthService, TokenEncryptionService } from "./oauth";
export {
  EdgeStreamChunker,
  StreamSplitter,
  UploadResume,
} from "./stream-chunker";

// Provider implementations
export { GoogleDriveProvider } from "./providers/google-drive";
export { DropboxProvider } from "./providers/dropbox";
export { OneDriveProvider } from "./providers/onedrive";

// Types and interfaces
export type {
  // Core interfaces
  StorageProvider,
  StorageConfig,
  StorageTokens,
  StorageResult,
  StorageError,
  StorageFile,
  StorageUserInfo,
  StorageDestination,

  // OAuth types
  PKCEData,
  EncryptedStorageTokens,

  // Upload types
  UploadSession,
  UploadChunk,
  UploadProgress,
  MultipartUpload,
  StreamChunker,

  // Queue messages
  StorageUploadMessage,
  StorageRefreshMessage,

  // Provider-specific types
  GoogleDriveFile,
  DropboxFile,
  OneDriveFile,
} from "./types";

// Constants and utilities
export { CHUNK_SIZES, OAUTH_SCOPES, UPLOAD_TIMEOUTS } from "./types";

// Utility functions
export function createStorageService(
  config: StorageServiceConfig,
): StorageService {
  return new StorageService(config);
}

export function getProviderName(provider: StorageProvider): string {
  return provider.provider;
}

export function isUploadError(
  result: StorageResult<any>,
): result is { success: false; error: StorageError } {
  return !result.success && !!result.error;
}

export function isUploadSuccess<T>(
  result: StorageResult<T>,
): result is { success: true; data: T } {
  return result.success && !!result.data;
}

export function calculateUploadTimeEstimate(
  bytesRemaining: number,
  bytesPerSecond: number,
): number {
  if (bytesPerSecond <= 0) return Infinity;
  return Math.ceil(bytesRemaining / bytesPerSecond);
}

export function formatUploadSpeed(bytesPerSecond: number): string {
  if (bytesPerSecond < 1024) {
    return `${bytesPerSecond.toFixed(0)} B/s`;
  } else if (bytesPerSecond < 1024 * 1024) {
    return `${(bytesPerSecond / 1024).toFixed(1)} KB/s`;
  } else {
    return `${(bytesPerSecond / (1024 * 1024)).toFixed(1)} MB/s`;
  }
}

export function getOptimalChunkSize(
  provider: string,
  fileSize: number,
  connectionSpeed?: number,
): number {
  const providerDefaults = {
    google_drive: CHUNK_SIZES.GOOGLE_DRIVE,
    dropbox: CHUNK_SIZES.DROPBOX,
    onedrive: CHUNK_SIZES.ONEDRIVE,
  };

  const defaultSize =
    providerDefaults[provider as keyof typeof providerDefaults] ||
    CHUNK_SIZES.GOOGLE_DRIVE;

  // For small files, use smaller chunks
  if (fileSize < 10 * 1024 * 1024) {
    // 10MB
    return Math.min(
      defaultSize,
      Math.max(256 * 1024, Math.ceil(fileSize / 10)),
    );
  }

  // For slow connections, use smaller chunks
  if (connectionSpeed && connectionSpeed < 1024 * 1024) {
    // 1 Mbps
    return Math.min(defaultSize, 2 * 1024 * 1024); // 2MB max
  }

  return defaultSize;
}

// Error handling helpers
export class StorageServiceError extends Error {
  constructor(
    public code: string,
    message: string,
    public retryable: boolean = false,
    public details?: any,
  ) {
    super(message);
    this.name = "StorageServiceError";
  }
}

export function isRetryableError(error: StorageError): boolean {
  return (
    error.retryable === true ||
    [
      "NETWORK_ERROR",
      "UPLOAD_TIMEOUT",
      "RATE_LIMITED",
      "SERVER_ERROR",
    ].includes(error.code)
  );
}

export function getRetryDelay(
  attempt: number,
  baseDelay: number = 1000,
): number {
  // Exponential backoff with jitter
  const exponentialDelay = Math.pow(2, attempt) * baseDelay;
  const jitter = Math.random() * 0.1 * exponentialDelay;
  return Math.min(exponentialDelay + jitter, 30000); // Max 30 seconds
}

// Provider validation
export function validateProviderConfig(
  provider: string,
  config: StorageConfig,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.clientId) {
    errors.push("clientId is required");
  }

  if (!config.clientSecret) {
    errors.push("clientSecret is required");
  }

  if (!config.redirectUri) {
    errors.push("redirectUri is required");
  }

  if (!config.scopes || config.scopes.length === 0) {
    errors.push("scopes are required");
  }

  // Provider-specific validation
  if (provider === "google_drive") {
    const requiredScopes = OAUTH_SCOPES.GOOGLE_DRIVE;
    const hasRequired = requiredScopes.every((scope) =>
      config.scopes.includes(scope),
    );
    if (!hasRequired) {
      errors.push(
        `Missing required scopes for Google Drive: ${requiredScopes.join(", ")}`,
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Stream utilities for edge environments
export function createMemoryEfficientTransform(): TransformStream<
  Uint8Array,
  Uint8Array
> {
  let bufferSize = 0;
  const maxBuffer = 1024 * 1024; // 1MB max buffer

  return new TransformStream({
    transform(chunk, controller) {
      bufferSize += chunk.length;

      if (bufferSize > maxBuffer) {
        // Apply backpressure
        return new Promise((resolve) => {
          setTimeout(() => {
            controller.enqueue(chunk);
            bufferSize -= chunk.length;
            resolve();
          }, 100);
        });
      }

      controller.enqueue(chunk);
    },
  });
}

export function createProgressTrackingTransform(
  onProgress: (bytes: number) => void,
): TransformStream<Uint8Array, Uint8Array> {
  let totalBytes = 0;

  return new TransformStream({
    transform(chunk, controller) {
      totalBytes += chunk.length;
      onProgress(totalBytes);
      controller.enqueue(chunk);
    },
  });
}
