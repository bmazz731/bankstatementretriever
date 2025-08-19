/**
 * Webhook signature verification utilities
 */

/**
 * Verify HMAC SHA-256 webhook signature
 */
export async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    // Import secret key
    const encoder = new TextEncoder()
    const secretKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )

    // Sign the payload
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      secretKey,
      encoder.encode(payload)
    )

    // Convert to hex
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // Compare signatures (constant time)
    return signature === expectedSignature
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return false
  }
}

/**
 * Verify Plaid webhook signature specifically
 */
export async function verifyPlaidWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  // Plaid uses SHA-256 HMAC with hex encoding
  return verifyWebhookSignature(payload, signature, secret)
}