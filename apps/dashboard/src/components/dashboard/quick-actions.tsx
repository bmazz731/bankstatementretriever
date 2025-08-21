"use client"

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useRouter } from 'next/navigation'

export function QuickActions() {
  const router = useRouter()
  
  return (
    <div className="space-y-3">
      <Button 
        onClick={() => router.push('/dashboard/accounts')}
        className="w-full justify-start"
      >
        <Icons.plus className="mr-2 h-4 w-4" />
        Connect Bank Account
      </Button>
      
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