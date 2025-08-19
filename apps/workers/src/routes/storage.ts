/**
 * Storage provider OAuth and management routes
 */
import { Hono } from 'hono'
import { 
  StorageService,
  type StorageServiceConfig,
  GoogleDriveProvider,
  DropboxProvider,
  OneDriveProvider
} from '@bsr/storage'
import { requireAuth, getCurrentUser } from '@bsr/auth'
import type { Env } from '../types/env'

const storage = new Hono<{ Bindings: Env }>()

// Initialize storage service
function createStorageService(env: Env): StorageService {
  const config: StorageServiceConfig = {
    googleDrive: {
      clientId: env.GOOGLE_DRIVE_CLIENT_ID,
      clientSecret: env.GOOGLE_DRIVE_CLIENT_SECRET,
      redirectUri: `https://${env.DOMAIN}/api/storage/google-drive/callback`
    },
    dropbox: {
      clientId: env.DROPBOX_CLIENT_ID,
      clientSecret: env.DROPBOX_CLIENT_SECRET,
      redirectUri: `https://${env.DOMAIN}/api/storage/dropbox/callback`
    },
    onedrive: {
      clientId: env.ONEDRIVE_CLIENT_ID,
      clientSecret: env.ONEDRIVE_CLIENT_SECRET,
      redirectUri: `https://${env.DOMAIN}/api/storage/onedrive/callback`
    },
    encryptionKey: env.ENCRYPTION_KEY
  }
  
  return new StorageService(config)
}

// Middleware for authenticated routes
const authMiddleware = (c: any, next: any) => requireAuth(c, next)

// Get user's storage destinations
storage.get('/destinations', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    
    const destinations = await c.env.DB.prepare(`
      SELECT 
        id,
        provider,
        name,
        status,
        last_sync,
        error_message,
        created_at,
        metadata_json
      FROM destinations 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `).bind(user.id).all()

    return c.json({
      destinations: destinations.results
    })

  } catch (error) {
    console.error('Get destinations error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to fetch destinations'
    }, 500)
  }
})

// Validate user's destinations
storage.post('/destinations/validate', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const storageService = createStorageService(c.env)
    
    const result = await storageService.validateUserDestinations(user.id)
    
    return c.json(result)

  } catch (error) {
    console.error('Validate destinations error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to validate destinations'
    }, 500)
  }
})

// Delete destination
storage.delete('/destinations/:destinationId', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const destinationId = c.req.param('destinationId')
    
    const destination = await c.env.DB.prepare(`
      SELECT id FROM destinations 
      WHERE id = ? AND user_id = ?
    `).bind(destinationId, user.id).first()
    
    if (!destination) {
      return c.json({
        error: 'NOT_FOUND',
        message: 'Destination not found'
      }, 404)
    }

    await c.env.DB.prepare(`
      DELETE FROM destinations WHERE id = ?
    `).bind(destinationId).run()

    return c.json({
      success: true,
      message: 'Destination deleted successfully'
    })

  } catch (error) {
    console.error('Delete destination error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to delete destination'
    }, 500)
  }
})

// Google Drive OAuth routes
storage.get('/google-drive/auth', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const storageService = createStorageService(c.env)
    const provider = storageService.getProvider('google_drive') as GoogleDriveProvider
    
    const { authUrl, pkceData } = await provider.generateAuthUrl(user.id)
    
    // Store PKCE data in KV with expiration
    await c.env.BSR_CACHE.put(
      `pkce:${user.id}:google_drive`,
      JSON.stringify(pkceData),
      { expirationTtl: 10 * 60 } // 10 minutes
    )
    
    return c.json({
      authUrl,
      state: pkceData.state
    })

  } catch (error) {
    console.error('Google Drive auth URL error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to generate auth URL'
    }, 500)
  }
})

storage.get('/google-drive/callback', async (c) => {
  try {
    const code = c.req.query('code')
    const state = c.req.query('state')
    const error = c.req.query('error')
    
    if (error) {
      return c.json({
        error: 'OAUTH_ERROR',
        message: `OAuth error: ${error}`
      }, 400)
    }
    
    if (!code || !state) {
      return c.json({
        error: 'MISSING_PARAMETERS',
        message: 'Missing authorization code or state'
      }, 400)
    }

    // Get PKCE data from KV
    const pkceData = await c.env.BSR_CACHE.get(`pkce:${state}:google_drive`)
    if (!pkceData) {
      return c.json({
        error: 'INVALID_STATE',
        message: 'Invalid or expired OAuth state'
      }, 400)
    }

    const pkce = JSON.parse(pkceData)
    const storageService = createStorageService(c.env)
    const provider = storageService.getProvider('google_drive') as GoogleDriveProvider
    
    // Exchange code for tokens
    const tokenResult = await provider.exchangeCodeForTokens(code, pkce)
    
    if (!tokenResult.success || !tokenResult.data) {
      return c.json({
        error: tokenResult.error?.code || 'TOKEN_EXCHANGE_ERROR',
        message: tokenResult.error?.message || 'Failed to exchange code for tokens'
      }, 400)
    }

    // Get user info
    const userInfoResult = await provider.getUserInfo(tokenResult.data)
    if (!userInfoResult.success || !userInfoResult.data) {
      return c.json({
        error: 'USER_INFO_ERROR',
        message: 'Failed to get user information'
      }, 400)
    }

    const userInfo = userInfoResult.data
    
    // Store destination
    const destinationId = await storageService.storeDestination(
      state, // Using state as user ID
      'google_drive',
      `${userInfo.name} (Google Drive)`,
      tokenResult.data,
      {
        email: userInfo.email,
        quotaTotal: userInfo.quotaTotal,
        quotaUsed: userInfo.quotaUsed
      }
    )

    // Clean up PKCE data
    await c.env.BSR_CACHE.delete(`pkce:${state}:google_drive`)

    return c.json({
      success: true,
      destinationId,
      userInfo: {
        name: userInfo.name,
        email: userInfo.email
      }
    })

  } catch (error) {
    console.error('Google Drive callback error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'OAuth callback failed'
    }, 500)
  }
})

// Dropbox OAuth routes
storage.get('/dropbox/auth', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const storageService = createStorageService(c.env)
    const provider = storageService.getProvider('dropbox') as DropboxProvider
    
    const { authUrl, pkceData } = await provider.generateAuthUrl(user.id)
    
    await c.env.BSR_CACHE.put(
      `pkce:${user.id}:dropbox`,
      JSON.stringify(pkceData),
      { expirationTtl: 10 * 60 }
    )
    
    return c.json({
      authUrl,
      state: pkceData.state
    })

  } catch (error) {
    console.error('Dropbox auth URL error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to generate auth URL'
    }, 500)
  }
})

storage.get('/dropbox/callback', async (c) => {
  try {
    const code = c.req.query('code')
    const state = c.req.query('state')
    
    if (!code || !state) {
      return c.json({
        error: 'MISSING_PARAMETERS',
        message: 'Missing authorization code or state'
      }, 400)
    }

    const pkceData = await c.env.BSR_CACHE.get(`pkce:${state}:dropbox`)
    if (!pkceData) {
      return c.json({
        error: 'INVALID_STATE',
        message: 'Invalid or expired OAuth state'
      }, 400)
    }

    const pkce = JSON.parse(pkceData)
    const storageService = createStorageService(c.env)
    const provider = storageService.getProvider('dropbox') as DropboxProvider
    
    const tokenResult = await provider.exchangeCodeForTokens(code, pkce)
    
    if (!tokenResult.success || !tokenResult.data) {
      return c.json({
        error: tokenResult.error?.code || 'TOKEN_EXCHANGE_ERROR',
        message: tokenResult.error?.message || 'Failed to exchange code for tokens'
      }, 400)
    }

    const userInfoResult = await provider.getUserInfo(tokenResult.data)
    if (!userInfoResult.success || !userInfoResult.data) {
      return c.json({
        error: 'USER_INFO_ERROR',
        message: 'Failed to get user information'
      }, 400)
    }

    const userInfo = userInfoResult.data
    
    const destinationId = await storageService.storeDestination(
      state,
      'dropbox',
      `${userInfo.name} (Dropbox)`,
      tokenResult.data,
      {
        email: userInfo.email,
        quotaTotal: userInfo.quotaTotal,
        quotaUsed: userInfo.quotaUsed
      }
    )

    await c.env.BSR_CACHE.delete(`pkce:${state}:dropbox`)

    return c.json({
      success: true,
      destinationId,
      userInfo: {
        name: userInfo.name,
        email: userInfo.email
      }
    })

  } catch (error) {
    console.error('Dropbox callback error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'OAuth callback failed'
    }, 500)
  }
})

// OneDrive OAuth routes
storage.get('/onedrive/auth', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const storageService = createStorageService(c.env)
    const provider = storageService.getProvider('onedrive') as OneDriveProvider
    
    const { authUrl, pkceData } = await provider.generateAuthUrl(user.id)
    
    await c.env.BSR_CACHE.put(
      `pkce:${user.id}:onedrive`,
      JSON.stringify(pkceData),
      { expirationTtl: 10 * 60 }
    )
    
    return c.json({
      authUrl,
      state: pkceData.state
    })

  } catch (error) {
    console.error('OneDrive auth URL error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to generate auth URL'
    }, 500)
  }
})

storage.get('/onedrive/callback', async (c) => {
  try {
    const code = c.req.query('code')
    const state = c.req.query('state')
    
    if (!code || !state) {
      return c.json({
        error: 'MISSING_PARAMETERS',
        message: 'Missing authorization code or state'
      }, 400)
    }

    const pkceData = await c.env.BSR_CACHE.get(`pkce:${state}:onedrive`)
    if (!pkceData) {
      return c.json({
        error: 'INVALID_STATE',
        message: 'Invalid or expired OAuth state'
      }, 400)
    }

    const pkce = JSON.parse(pkceData)
    const storageService = createStorageService(c.env)
    const provider = storageService.getProvider('onedrive') as OneDriveProvider
    
    const tokenResult = await provider.exchangeCodeForTokens(code, pkce)
    
    if (!tokenResult.success || !tokenResult.data) {
      return c.json({
        error: tokenResult.error?.code || 'TOKEN_EXCHANGE_ERROR',
        message: tokenResult.error?.message || 'Failed to exchange code for tokens'
      }, 400)
    }

    const userInfoResult = await provider.getUserInfo(tokenResult.data)
    if (!userInfoResult.success || !userInfoResult.data) {
      return c.json({
        error: 'USER_INFO_ERROR',
        message: 'Failed to get user information'
      }, 400)
    }

    const userInfo = userInfoResult.data
    
    const destinationId = await storageService.storeDestination(
      state,
      'onedrive',
      `${userInfo.name} (OneDrive)`,
      tokenResult.data,
      {
        email: userInfo.email,
        quotaTotal: userInfo.quotaTotal,
        quotaUsed: userInfo.quotaUsed
      }
    )

    await c.env.BSR_CACHE.delete(`pkce:${state}:onedrive`)

    return c.json({
      success: true,
      destinationId,
      userInfo: {
        name: userInfo.name,
        email: userInfo.email
      }
    })

  } catch (error) {
    console.error('OneDrive callback error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'OAuth callback failed'
    }, 500)
  }
})

// Test upload endpoint
storage.post('/test-upload/:destinationId', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const destinationId = c.req.param('destinationId')
    
    // Verify user owns destination
    const destination = await c.env.DB.prepare(`
      SELECT id FROM destinations 
      WHERE id = ? AND user_id = ?
    `).bind(destinationId, user.id).first()
    
    if (!destination) {
      return c.json({
        error: 'NOT_FOUND',
        message: 'Destination not found'
      }, 404)
    }

    // Create test file content
    const testContent = `Test file from BankStatementRetriever\nGenerated at: ${new Date().toISOString()}\nUser: ${user.email}`
    const testFileName = `BSR_Test_${Date.now()}.txt`
    
    // Upload to R2 temporarily
    const tempKey = `test/${testFileName}`
    await c.env.BSR_STORAGE.put(tempKey, testContent)

    // Queue for upload
    await c.env.BSR_QUEUE.send({
      type: 'storage_upload',
      destinationId,
      statementId: `test_${Date.now()}`,
      fileName: testFileName,
      fileSize: Buffer.byteLength(testContent),
      mimeType: 'text/plain',
      sourceKey: tempKey
    })

    return c.json({
      success: true,
      message: 'Test upload queued successfully',
      fileName: testFileName
    })

  } catch (error) {
    console.error('Test upload error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to queue test upload'
    }, 500)
  }
})

export { storage as storageRouter }