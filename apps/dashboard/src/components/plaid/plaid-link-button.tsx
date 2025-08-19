"use client"

import { useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useNotificationStore } from '@/stores/dashboard'
import apiClient from '@/lib/api'
import type { PlaidLinkSuccess } from '@/types'

export function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [isGeneratingToken, setIsGeneratingToken] = useState(false)
  const queryClient = useQueryClient()
  const { addNotification } = useNotificationStore()

  const exchangeMutation = useMutation({
    mutationFn: (publicToken: string) => apiClient.exchangePublicToken(publicToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      addNotification({
        type: 'success',
        title: 'Bank account connected',
        description: 'Your bank account has been successfully connected',
      })
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Connection failed',
        description: error.message || 'Failed to connect bank account',
      })
    },
  })

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token: string, metadata: PlaidLinkSuccess['metadata']) => {
      exchangeMutation.mutate(public_token)
    },
    onExit: (err, metadata) => {
      if (err) {
        addNotification({
          type: 'error',
          title: 'Connection cancelled',
          description: err.error_message || 'Bank connection was cancelled',
        })
      }
    },
    onEvent: (eventName, metadata) => {
      // Log events for debugging
      console.log('Plaid Link event:', eventName, metadata)
    },
  })

  const generateLinkToken = async () => {
    setIsGeneratingToken(true)
    try {
      const response = await apiClient.createLinkToken()
      if (response.data?.link_token) {
        setLinkToken(response.data.link_token)
        // Auto-open once token is ready
        setTimeout(() => {
          if (ready) {
            open()
          }
        }, 100)
      } else {
        throw new Error('No link token received')
      }
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Failed to initialize',
        description: error.message || 'Failed to initialize bank connection',
      })
    } finally {
      setIsGeneratingToken(false)
    }
  }

  const handleClick = () => {
    if (linkToken && ready) {
      open()
    } else {
      generateLinkToken()
    }
  }

  return (
    <Button 
      onClick={handleClick}
      disabled={isGeneratingToken || exchangeMutation.isPending}
      className="w-full justify-start"
    >
      {(isGeneratingToken || exchangeMutation.isPending) ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.plus className="mr-2 h-4 w-4" />
      )}
      {isGeneratingToken ? 'Initializing...' : 
       exchangeMutation.isPending ? 'Connecting...' : 
       'Connect Bank Account'}
    </Button>
  )
}