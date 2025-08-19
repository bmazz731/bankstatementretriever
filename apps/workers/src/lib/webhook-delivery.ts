/**
 * Webhook delivery utilities with HMAC signing per PRD Section 8
 */

export interface WebhookPayload {
  event_type: 'statement_delivered' | 'statement_failed' | 'reauth_required' | 'monthly_summary'
  timestamp: string
  account_id: string
  data: Record<string, any>
}

export interface WebhookDeliveryResult {
  success: boolean
  status_code?: number
  error?: string
  delivery_id: string
  attempt: number
}

/**
 * Generate HMAC signature for webhook payload
 */
export async function generateWebhookSignature(
  payload: string,
  secret: string
): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  const hashArray = Array.from(new Uint8Array(signature))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return `sha256=${hashHex}`
}

/**
 * Verify webhook signature (for incoming webhooks)
 */
export async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const expectedSignature = await generateWebhookSignature(payload, secret)
    return signature === expectedSignature
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return false
  }
}

/**
 * Deliver webhook with HMAC signing and retry logic
 */
export async function deliverWebhook(
  url: string,
  payload: WebhookPayload,
  secret: string,
  deliveryId: string = crypto.randomUUID(),
  attempt: number = 1
): Promise<WebhookDeliveryResult> {
  try {
    // Validate timestamp skew (reject if > 5 minutes per PRD)
    const payloadTime = new Date(payload.timestamp)
    const now = new Date()
    const skewMs = Math.abs(now.getTime() - payloadTime.getTime())
    const maxSkewMs = 5 * 60 * 1000 // 5 minutes
    
    if (skewMs > maxSkewMs) {
      return {
        success: false,
        error: 'Timestamp skew exceeds 5 minutes',
        delivery_id: deliveryId,
        attempt
      }
    }

    // Prepare payload with BSR headers
    const payloadString = JSON.stringify(payload)
    const signature = await generateWebhookSignature(payloadString, secret)
    
    const headers = {
      'Content-Type': 'application/json',
      'X-BSR-Signature': signature,
      'X-BSR-Timestamp': payload.timestamp,
      'X-BSR-Delivery-ID': deliveryId,
      'X-BSR-Attempt': attempt.toString(),
      'User-Agent': 'BankStatementRetriever-Webhook/1.0'
    }

    // Send webhook with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: payloadString,
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      const success = response.status >= 200 && response.status < 300
      
      return {
        success,
        status_code: response.status,
        error: success ? undefined : `HTTP ${response.status}: ${response.statusText}`,
        delivery_id: deliveryId,
        attempt
      }
      
    } catch (fetchError) {
      clearTimeout(timeoutId)
      throw fetchError
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return {
      success: false,
      error: errorMessage,
      delivery_id: deliveryId,
      attempt
    }
  }
}

/**
 * Webhook delivery with exponential backoff retry
 */
export async function deliverWebhookWithRetry(
  url: string,
  payload: WebhookPayload,
  secret: string,
  maxRetries: number = 3
): Promise<WebhookDeliveryResult[]> {
  const results: WebhookDeliveryResult[] = []
  const deliveryId = crypto.randomUUID()
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await deliverWebhook(url, payload, secret, deliveryId, attempt)
    results.push(result)
    
    if (result.success) {
      break
    }
    
    // Don't retry on 4xx errors (except 408, 429)
    if (result.status_code && result.status_code >= 400 && result.status_code < 500) {
      if (result.status_code !== 408 && result.status_code !== 429) {
        break
      }
    }
    
    // Exponential backoff: 1s, 2s, 4s
    if (attempt < maxRetries) {
      const delayMs = Math.pow(2, attempt - 1) * 1000
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }
  
  return results
}

/**
 * Create webhook payload for different event types
 */
export function createWebhookPayload(
  eventType: WebhookPayload['event_type'],
  accountId: string,
  data: Record<string, any>
): WebhookPayload {
  return {
    event_type: eventType,
    timestamp: new Date().toISOString(),
    account_id: accountId,
    data
  }
}

/**
 * Test webhook endpoint connectivity
 */
export async function testWebhookEndpoint(
  url: string,
  secret: string
): Promise<{ success: boolean; error?: string; response_time_ms?: number }> {
  const startTime = Date.now()
  
  try {
    const testPayload = createWebhookPayload('statement_delivered', 'test-account', {
      test: true,
      message: 'Webhook endpoint test from BankStatementRetriever'
    })
    
    const result = await deliverWebhook(url, testPayload, secret)
    const responseTime = Date.now() - startTime
    
    return {
      success: result.success,
      error: result.error,
      response_time_ms: responseTime
    }
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      response_time_ms: Date.now() - startTime
    }
  }
}