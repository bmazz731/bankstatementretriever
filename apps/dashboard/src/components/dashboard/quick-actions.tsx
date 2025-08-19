"use client"

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { PlaidLinkButton } from '@/components/plaid/plaid-link-button'

export function QuickActions() {
  return (
    <div className="space-y-3">
      <PlaidLinkButton />
      
      <Button variant="outline" className="w-full justify-start">
        <Icons.upload className="mr-2 h-4 w-4" />
        Add Destination
      </Button>
      
      <Button variant="outline" className="w-full justify-start">
        <Icons.calendar className="mr-2 h-4 w-4" />
        Backfill Statements
      </Button>
      
      <Button variant="outline" className="w-full justify-start">
        <Icons.settings className="mr-2 h-4 w-4" />
        Notification Settings
      </Button>
      
      <Button variant="outline" className="w-full justify-start">
        <Icons.download className="mr-2 h-4 w-4" />
        Download Activity Report
      </Button>
    </div>
  )
}