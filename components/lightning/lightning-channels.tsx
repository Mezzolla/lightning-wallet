"use client"

import {useWallet} from '@/app/(authenticated)/wallet-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function LightningChannels() {
  const { lightningChannels } = useWallet()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Lightning Channels</CardTitle>
          <CardDescription>Your active Lightning Network channels</CardDescription>
        </div>
        <Link href="/lightning" className="text-sm text-primary">
          Manage
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lightningChannels.slice(0, 3).map((channel) => (
            <div key={channel.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{channel.peer}</span>
                  {getStatusBadge(channel.status)}
                </div>
                <span className="text-sm text-muted-foreground">{channel.capacity} sats</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Local: {channel.localBalance} sats</span>
                  <span>Remote: {channel.remoteBalance} sats</span>
                </div>
                <Progress value={(channel.localBalance / channel.capacity) * 100} />
              </div>
            </div>
          ))}
          {lightningChannels.length === 0 && (
            <div className="py-4 text-center text-muted-foreground">
              No active channels. Open a channel to start using Lightning Network.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
