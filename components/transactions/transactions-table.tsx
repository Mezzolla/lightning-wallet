"use client"

import { useState } from "react"
import {useWallet} from '@/app/(authenticated)/wallet-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownLeft, ArrowUpRight, Search, Zap } from "lucide-react"
import { format } from "date-fns"

export function TransactionsTable() {
  const { transactions } = useWallet()
  const [searchQuery, setSearchQuery] = useState("")
  const [networkFilter, setNetworkFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTransactions = transactions.filter((tx) => {
    // Apply search filter
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply network filter
    const matchesNetwork = networkFilter === "all" || tx.network === networkFilter

    // Apply type filter
    const matchesType = typeFilter === "all" || tx.type === typeFilter

    return matchesSearch && matchesNetwork && matchesType
  })

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View and filter your transaction history across all networks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={networkFilter} onValueChange={setNetworkFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Networks</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="litecoin">Litecoin</SelectItem>
                <SelectItem value="monero">Monero</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="send">Sent</SelectItem>
                <SelectItem value="receive">Received</SelectItem>
                <SelectItem value="lightning">Lightning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        {getTransactionIcon(tx.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{tx.description}</div>
                      <div className="text-xs text-muted-foreground">ID: {tx.id.substring(0, 8)}...</div>
                    </TableCell>
                    <TableCell>{getNetworkBadge(tx.network)}</TableCell>
                    <TableCell>
                      <div className={tx.type === "receive" ? "text-green-600" : ""}>
                        {tx.type === "receive" ? "+" : "-"}
                        {tx.amount} {tx.currency}
                      </div>
                      <div className="text-xs text-muted-foreground">${tx.fiatAmount.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(tx.timestamp), "MMM d, yyyy")}
                      <div className="text-xs text-muted-foreground">{format(new Date(tx.timestamp), "h:mm a")}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
