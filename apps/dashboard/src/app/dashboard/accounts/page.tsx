"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Icons } from '@/components/icons'
import { AccountActions } from '@/components/accounts/account-actions'
import { AccountStatementsDialog } from '@/components/accounts/account-statements-dialog'
import { BackfillDialog } from '@/components/accounts/backfill-dialog'
import { getStatusColor, formatRelativeTime, truncateText } from '@/lib/utils'
import apiClient from '@/lib/api'
import type { Account } from '@/types'

// Dynamic import with ssr: false to prevent server-side evaluation
const PlaidLinkButton = dynamic(() => import('@/components/plaid/plaid-link-button'), { 
  ssr: false,
  loading: () => (
    <Button disabled className="w-auto">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </Button>
  )
})

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [showStatements, setShowStatements] = useState(false)
  const [showBackfill, setShowBackfill] = useState(false)

  const { data: accounts, isLoading, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => apiClient.getAccounts(),
  })

  // Debug React Query state
  console.log('DEBUG - React Query isLoading:', isLoading)
  console.log('DEBUG - React Query error:', error)
  console.log('DEBUG - React Query accounts data:', accounts)

  // Defensive data access to handle various API response structures
  const getAccountsData = (apiResponse: any): any[] => {
    if (!apiResponse) return []
    
    // Handle direct array response
    if (Array.isArray(apiResponse)) return apiResponse
    
    // Handle nested data response
    if (Array.isArray(apiResponse.data)) return apiResponse.data
    
    // Handle accounts property (based on type definition)
    if (Array.isArray(apiResponse.accounts)) return apiResponse.accounts
    
    return []
  }

  const accountData = getAccountsData(accounts)

  // Debug logging to understand current data structure
  console.log('DEBUG - accounts:', accounts)
  console.log('DEBUG - accountData:', accountData)
  console.log('DEBUG - accountData length:', accountData.length)

  // Safe property access helper to prevent React crashes
  const safeAccess = <T>(obj: any, path: string[], defaultValue: T): T => {
    try {
      return path.reduce((current, key) => current?.[key], obj) ?? defaultValue
    } catch {
      return defaultValue
    }
  }

  const filteredAccounts = accountData.filter((account) => {
    if (!account) return false
    
    const accountName = safeAccess(account, ['name'], '')
    const institutionName = safeAccess(account, ['connection', 'institution_name'], '')
    
    const matchesSearch = accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institutionName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || safeAccess(account, ['status'], '') === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleViewStatements = (account: Account) => {
    setSelectedAccount(account)
    setShowStatements(true)
  }

  const handleBackfill = (account: Account) => {
    setSelectedAccount(account)
    setShowBackfill(true)
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bank Accounts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your connected bank accounts and statement delivery
          </p>
        </div>
        <div className="flex-shrink-0">
          <PlaidLinkButton />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Connected Accounts</CardTitle>
          <CardDescription>
            View and manage your bank account connections and statement delivery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Icons.search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 max-w-md"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icons.filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-5 w-5 bg-muted rounded"></div>
                          <div className="h-6 bg-muted rounded w-1/3"></div>
                          <div className="h-5 bg-muted rounded w-16"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <div className="h-3 bg-muted rounded w-20"></div>
                            <div className="h-4 bg-muted rounded w-32"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-muted rounded w-24"></div>
                            <div className="h-4 bg-muted rounded w-28"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredAccounts.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Icons.building className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {searchTerm || statusFilter !== 'all' ? 'No matching accounts found' : 'No bank accounts connected'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-md">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search terms or status filter to find your accounts'
                      : 'Connect your first bank account to start retrieving your statements automatically'
                    }
                  </p>
                  {(!searchTerm && statusFilter === 'all') && (
                    <PlaidLinkButton />
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredAccounts.map((account) => {
                  const statusColor = getStatusColor(account.status || 'unknown')
                  const connectionStatus = account.connection?.status || 'unknown'
                  const lastSync = account.last_statement_check || account.connection?.last_sync

                  return (
                    <Card key={account.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0 space-y-4">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  <Icons.building className="h-5 w-5 text-muted-foreground" />
                                  <h3 className="text-lg font-semibold">{account.name}</h3>
                                </div>
                                <Badge
                                  variant={
                                    statusColor === 'green' ? 'success' :
                                    statusColor === 'yellow' ? 'warning' :
                                    statusColor === 'red' ? 'error' : 'secondary'
                                  }
                                  className="ml-2"
                                >
                                  {account.status || 'unknown'}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Account Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Institution</p>
                                <p className="text-sm">{account.connection?.institution_name}</p>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                                <p className="text-sm">
                                  {account.type}
                                  {account.subtype && ` (${account.subtype})`}
                                  {account.mask && (
                                    <span className="text-muted-foreground ml-1">•••• {account.mask}</span>
                                  )}
                                </p>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Connection Status</p>
                                <div className={`inline-flex items-center space-x-2 ${
                                  connectionStatus === 'active' ? 'text-green-600' :
                                  connectionStatus === 'reauth_required' ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full ${
                                    connectionStatus === 'active' ? 'bg-green-500' :
                                    connectionStatus === 'reauth_required' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} />
                                  <span className="text-sm capitalize">{connectionStatus}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Statement Support</p>
                                <div className="flex items-center space-x-2">
                                  {account.statements_supported ? (
                                    <>
                                      <Icons.check className="h-4 w-4 text-green-500" />
                                      <span className="text-sm text-green-700">Supported</span>
                                    </>
                                  ) : (
                                    <>
                                      <Icons.x className="h-4 w-4 text-red-500" />
                                      <span className="text-sm text-red-700">Not supported</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              {lastSync && (
                                <div className="space-y-1 md:col-span-2">
                                  <p className="text-sm font-medium text-muted-foreground">Last Sync</p>
                                  <p className="text-sm">{formatRelativeTime(lastSync)}</p>
                                </div>
                              )}
                            </div>

                            {/* Error Message */}
                            {account.connection?.error_message && (
                              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                <div className="flex items-start space-x-2">
                                  <Icons.warning className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-red-800 dark:text-red-200">
                                    {truncateText(account.connection.error_message, 100)}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Actions */}
                          <div className="ml-6 flex-shrink-0">
                            <AccountActions
                              account={account}
                              onViewStatements={() => handleViewStatements(account)}
                              onBackfill={() => handleBackfill(account)}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedAccount && (
        <>
          <AccountStatementsDialog
            account={selectedAccount}
            open={showStatements}
            onOpenChange={setShowStatements}
          />
          <BackfillDialog
            account={selectedAccount}
            open={showBackfill}
            onOpenChange={setShowBackfill}
          />
        </>
      )}
    </div>
  )
}