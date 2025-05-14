"use client"

import { useWallet } from "@/app/wallet-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

export function RecentTransactions() {
  const { transactions } = useWallet()

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="h-4 w-4 text-destructive" />
      case "receive":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      case "lightning":
        return <Zap className="h-4 w-4 text-yellow-500" />
      default:
        return <ArrowUpRight className="h-4 w-4" />
    }
  }

  const getNetworkBadge = (network: string) => {
    let color = "bg-gray-100 text-gray-800"

    switch (network) {
      case "bitcoin":
        color = "bg-orange-100 text-orange-800"
        break
      case "ethereum":
        color = "bg-blue-100 text-blue-800"
        break
      case "litecoin":
        color = "bg-slate-100 text-slate-800"
        break
      case "monero":
        color = "bg-orange-100 text-orange-800"
        break
    }

    return (
      <Badge variant="outline" className={`${color} text-xs`}>
        {network}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest activity</CardDescription>
        </div>
        <Link href="/transactions" className="text-sm text-primary">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  {getTransactionIcon(tx.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium leading-none">{tx.description}</p>
                    {getNetworkBadge(tx.network)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium leading-none">
                    {tx.type === "receive" ? "+" : "-"}
                    {tx.amount} {tx.currency}
                  </p>
                  <p className="text-xs text-muted-foreground">${tx.fiatAmount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
