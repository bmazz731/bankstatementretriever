/**
 * Edge-compatible encryption for Plaid tokens using Web Crypto API
 */

export class TokenEncryption {
  private key: CryptoKey | null = null

  constructor(private secretKey: string) {}

  async getKey(): Promise<CryptoKey> {
    if (this.key) return this.key

    const encoder = new TextEncoder()
    const keyData = encoder.encode(this.secretKey.substring(0, 32).padEnd(32, '0'))
    
    this.key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    )

    return this.key
  }

  async encrypt(plaintext: string): Promise<{ 
    encrypted_data: string
    iv: string 
  }> {
    const key = await this.getKey()
    const encoder = new TextEncoder()
    const data = encoder.encode(plaintext)
    
    const iv = crypto.getRandomValues(new Uint8Array(12))
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    )

    return {
      encrypted_data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv))
    }
  }

  async decrypt(encryptedData: string, iv: string): Promise<string> {
    const key = await this.getKey()
    
    const encrypted = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    )
    
    const ivArray = new Uint8Array(
      atob(iv).split('').map(char => char.charCodeAt(0))
    )

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivArray },
      key,
      encrypted
    )

    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  }
}