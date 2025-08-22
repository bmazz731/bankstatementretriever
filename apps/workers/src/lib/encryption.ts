/**
 * AES-256 encryption utilities for Cloudflare Workers
 * Used for encrypting Plaid access tokens
 */

export interface EncryptedData {
  encrypted: string;
  iv: string;
}

export class TokenEncryption {
  private key: CryptoKey | null = null;

  constructor(private encryptionKey: string) {}

  private async getKey(): Promise<CryptoKey> {
    if (this.key) {
      return this.key;
    }

    // Convert base64 key to ArrayBuffer
    const keyData = Uint8Array.from(atob(this.encryptionKey), (c) =>
      c.charCodeAt(0),
    );

    this.key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"],
    );

    return this.key;
  }

  /**
   * Encrypt a string using AES-256-GCM
   */
  async encrypt(plaintext: string): Promise<EncryptedData> {
    const key = await this.getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for GCM
    const encodedText = new TextEncoder().encode(plaintext);

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encodedText,
    );

    return {
      encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv)),
    };
  }

  /**
   * Decrypt a string using AES-256-GCM
   */
  async decrypt(encryptedData: string, ivString: string): Promise<string> {
    const key = await this.getKey();
    const iv = Uint8Array.from(atob(ivString), (c) => c.charCodeAt(0));
    const encrypted = Uint8Array.from(atob(encryptedData), (c) =>
      c.charCodeAt(0),
    );

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encrypted,
    );

    return new TextDecoder().decode(decrypted);
  }
}

/**
 * Generate a secure random encryption key (base64 encoded)
 * Use this to generate ENCRYPTION_KEY environment variable
 */
export function generateEncryptionKey(): string {
  const key = crypto.getRandomValues(new Uint8Array(32)); // 256 bits
  return btoa(String.fromCharCode(...key));
}
