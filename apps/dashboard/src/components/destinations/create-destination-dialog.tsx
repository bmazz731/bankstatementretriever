"use client"

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { useNotificationStore } from '@/stores/dashboard'
import apiClient from '@/lib/api'

interface CreateDestinationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const destinationTypes = [
  {
    type: 'google_drive',
    name: 'Google Drive',
    icon: Icons.globe,
    description: 'Store statements in Google Drive',
  },
  {
    type: 'dropbox',
    name: 'Dropbox',
    icon: Icons.upload,
    description: 'Store statements in Dropbox',
  },
  {
    type: 'onedrive',
    name: 'OneDrive',
    icon: Icons.upload,
    description: 'Store statements in Microsoft OneDrive',
  },
  {
    type: 'webhook',
    name: 'Webhook',
    icon: Icons.link,
    description: 'Send statements to a webhook URL',
  },
]

export function CreateDestinationDialog({ open, onOpenChange }: CreateDestinationDialogProps) {
  const [step, setStep] = useState<'select' | 'configure'>('select')
  const [selectedType, setSelectedType] = useState<string>('')
  const [name, setName] = useState('')
  const [folderPath, setFolderPath] = useState('/')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookSecret, setWebhookSecret] = useState('')
  
  const queryClient = useQueryClient()
  const { addNotification } = useNotificationStore()

  const createMutation = useMutation({
    mutationFn: (destination: any) => apiClient.createDestination(destination),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['destinations'] })
      addNotification({
        type: 'success',
        title: 'Destination created',
        description: 'Your destination has been successfully configured',
      })
      handleClose()
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Creation failed',
        description: error.message || 'Failed to create destination',
      })
    },
  })

  const handleClose = () => {
    setStep('select')
    setSelectedType('')
    setName('')
    setFolderPath('/')
    setWebhookUrl('')
    setWebhookSecret('')
    onOpenChange(false)
  }

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setStep('configure')
    
    // Set default name
    const typeConfig = destinationTypes.find(t => t.type === type)
    if (typeConfig) {
      setName(`My ${typeConfig.name}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      addNotification({
        type: 'error',
        title: 'Name required',
        description: 'Please provide a name for this destination',
      })
      return
    }

    let config: any = {}

    if (selectedType === 'webhook') {
      if (!webhookUrl || !webhookSecret) {
        addNotification({
          type: 'error',
          title: 'Webhook configuration incomplete',
          description: 'Please provide both URL and secret for webhook destination',
        })
        return
      }
      config = {
        url: webhookUrl,
        secret: webhookSecret,
        events: ['statement_delivered', 'statement_failed'],
      }
    } else {
      // For cloud storage, config would be set during OAuth flow
      config = {
        folder_path: folderPath,
      }
    }

    createMutation.mutate({
      type: selectedType,
      name: name.trim(),
      config,
      folder_path: folderPath,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 'select' ? (
          <>
            <DialogHeader>
              <DialogTitle>Add Destination</DialogTitle>
              <DialogDescription>
                Choose where you want your bank statements to be delivered
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              {destinationTypes.map((dest) => {
                const IconComponent = dest.icon
                return (
                  <button
                    key={dest.type}
                    onClick={() => handleTypeSelect(dest.type)}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{dest.name}</h4>
                      <p className="text-sm text-muted-foreground">{dest.description}</p>
                    </div>
                    <Icons.chevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Configure {destinationTypes.find(t => t.type === selectedType)?.name}</DialogTitle>
              <DialogDescription>
                Set up your destination configuration
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Destination Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a name for this destination"
                  required
                />
              </div>

              {selectedType !== 'webhook' && (
                <div className="space-y-2">
                  <label htmlFor="folder" className="text-sm font-medium">
                    Folder Path
                  </label>
                  <Input
                    id="folder"
                    value={folderPath}
                    onChange={(e) => setFolderPath(e.target.value)}
                    placeholder="/Bank Statements"
                  />
                  <p className="text-xs text-muted-foreground">
                    Statements will be stored in this folder
                  </p>
                </div>
              )}

              {selectedType === 'webhook' && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="webhook-url" className="text-sm font-medium">
                      Webhook URL
                    </label>
                    <Input
                      id="webhook-url"
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://your-app.com/webhooks/statements"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="webhook-secret" className="text-sm font-medium">
                      Webhook Secret
                    </label>
                    <Input
                      id="webhook-secret"
                      value={webhookSecret}
                      onChange={(e) => setWebhookSecret(e.target.value)}
                      placeholder="Enter a secret for HMAC signing"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This secret will be used to sign webhook payloads for security
                    </p>
                  </div>
                </>
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setStep('select')}>
                  Back
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Destination'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}