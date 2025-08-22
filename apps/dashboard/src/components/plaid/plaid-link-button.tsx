"use client"

import { useState, useEffect } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { useNotificationStore } from '@/stores/dashboard'
import apiClient from '@/lib/api'
import type { PlaidLinkSuccess } from '@/types'

export function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [isGeneratingToken, setIsGeneratingToken] = useState(false)
  const [showConsentDialog, setShowConsentDialog] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [connectionCompleted, setConnectionCompleted] = useState(false)
  const [consentData, setConsentData] = useState({
    authorizeRetrieval: false,
    hasAuthority: false,
    acknowledgeDestination: false,
    backfillMonths: 1,
    publicToken: null as string | null,
    metadata: null as PlaidLinkSuccess['metadata'] | null
  })
  const queryClient = useQueryClient()
  const { addNotification } = useNotificationStore()

  const exchangeMutation = useMutation({
    mutationFn: ({ publicToken, backfillMonths }: { publicToken: string; backfillMonths: number }) => 
      apiClient.exchangePublicToken(publicToken, backfillMonths),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      setShowConsentDialog(false)
      setConnectionCompleted(true)
      addNotification({
        type: 'success',
        title: 'Bank account connected',
        description: 'Your bank account has been successfully connected and statement retrieval will begin automatically.',
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
      // Store the public token temporarily and show consent dialog
      setConsentData(prev => ({ ...prev, publicToken: public_token, metadata: metadata }))
      setShowConsentDialog(true)
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

  // Track mount state for hydration safety
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Auto-open Plaid Link when token is ready and link is ready (but not after completion)
  useEffect(() => {
    if (hasMounted && linkToken && ready && !showConsentDialog && !exchangeMutation.isPending && !connectionCompleted) {
      open()
    }
  }, [hasMounted, linkToken, ready, open, showConsentDialog, exchangeMutation.isPending, connectionCompleted])

  const generateLinkToken = async () => {
    setIsGeneratingToken(true)
    try {
      console.log('Attempting to create link token...')
      const response = await apiClient.createLinkToken()
      console.log('Link token response:', response)
      
      if (response.error) {
        throw new Error(response.error)
      }
      
      if (response.data?.link_token) {
        setLinkToken(response.data.link_token)
        console.log('Link token set successfully')
      } else {
        throw new Error('No link token received from server')
      }
    } catch (error: any) {
      console.error('Link token generation failed:', error)
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
    // Reset completion state when starting a new connection
    setConnectionCompleted(false)
    
    if (linkToken && ready) {
      open()
    } else {
      generateLinkToken()
    }
  }

  const handleConsentConfirm = () => {
    if (!consentData.authorizeRetrieval || !consentData.hasAuthority || !consentData.acknowledgeDestination) {
      addNotification({
        type: 'error',
        title: 'Consent required',
        description: 'You must agree to all consent items to continue',
      })
      return
    }

    exchangeMutation.mutate({
      publicToken: consentData.publicToken as string,
      backfillMonths: consentData.backfillMonths
    })
  }

  const isConsentValid = consentData.authorizeRetrieval && consentData.hasAuthority && consentData.acknowledgeDestination

  return (
    <>
      <Button 
        onClick={handleClick}
        disabled={!hasMounted || isGeneratingToken || exchangeMutation.isPending}
        className="w-full justify-start"
        suppressHydrationWarning
      >
        <span suppressHydrationWarning>
          {(!hasMounted || isGeneratingToken || exchangeMutation.isPending) ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.add className="mr-2 h-4 w-4" />
          )}
        </span>
        <span suppressHydrationWarning>
          {!hasMounted ? 'Loading...' :
           isGeneratingToken ? 'Initializing...' : 
           exchangeMutation.isPending ? 'Connecting...' : 
           connectionCompleted ? 'Connect Another Account' :
           'Connect Bank Account'}
        </span>
      </Button>

      <Dialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] w-[calc(100vw-1rem)] sm:w-full flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Authorize Bank Statement Retrieval</DialogTitle>
            <DialogDescription>
              Review and confirm your authorization for automated statement retrieval from your selected accounts.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-6 pr-2 dialog-scroll">
            {/* Account Summary */}
            {consentData.metadata && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Connection Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Institution:</strong> {consentData.metadata.institution.name}</p>
                    <p><strong>Accounts to connect:</strong> {consentData.metadata.accounts.length}</p>
                    <div className="text-sm text-muted-foreground">
                      {consentData.metadata.accounts.map((account, index) => (
                        <div key={account.id}>
                          • {account.name} (...{account.mask}) - {account.type} ({account.subtype})
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Consent Checkboxes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Required Authorizations</CardTitle>
                <CardDescription>
                  Please review and confirm each authorization below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="authorize-retrieval"
                    checked={consentData.authorizeRetrieval}
                    onCheckedChange={(checked) => 
                      setConsentData(prev => ({ ...prev, authorizeRetrieval: !!checked }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="authorize-retrieval"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I authorize BankStatementRetriever to retrieve my monthly bank and credit card statements
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      This grants permission to automatically download your statements when they become available.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="has-authority"
                    checked={consentData.hasAuthority}
                    onCheckedChange={(checked) => 
                      setConsentData(prev => ({ ...prev, hasAuthority: !!checked }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="has-authority"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I confirm that I have the authority to access these accounts
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      You must be an authorized user or owner of these accounts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="acknowledge-destination"
                    checked={consentData.acknowledgeDestination}
                    onCheckedChange={(checked) => 
                      setConsentData(prev => ({ ...prev, acknowledgeDestination: !!checked }))
                    }
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="acknowledge-destination"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I understand that statements will be delivered to my configured destinations
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Statements will be sent to your cloud storage or webhook endpoints. Configure destinations after connecting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backfill Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Historical Statement Backfill</CardTitle>
                <CardDescription>
                  Choose how many months of historical statements to retrieve initially
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="backfill-months">Backfill Period</Label>
                  <Select 
                    value={consentData.backfillMonths.toString()} 
                    onValueChange={(value) => 
                      setConsentData(prev => ({ ...prev, backfillMonths: parseInt(value) }))
                    }
                  >
                    <SelectTrigger id="backfill-months">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No backfill - only new statements</SelectItem>
                      <SelectItem value="1">Last 1 month</SelectItem>
                      <SelectItem value="3">Last 3 months</SelectItem>
                      <SelectItem value="6">Last 6 months</SelectItem>
                      <SelectItem value="12">Last 12 months</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Backfill availability depends on your institution's statement history. 
                    You can manually request additional statements later.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="flex-shrink-0 flex justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowConsentDialog(false)}
              disabled={exchangeMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConsentConfirm}
              disabled={!isConsentValid || exchangeMutation.isPending}
            >
              {exchangeMutation.isPending ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect & Authorize'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Default export for dynamic imports
export default PlaidLinkButton