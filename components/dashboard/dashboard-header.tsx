"use client"

import { useWallet } from "@/app/wallet-provider"
import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw } from "lucide-react"

export function DashboardHeader() {
  const { refreshBalances } = useWallet()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your multi-blockchain wallet</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={refreshBalances}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Funds
        </Button>
      </div>
    </div>
  )
}
