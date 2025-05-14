"use client"

import { useWallet } from "@/app/wallet-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ZapOff, ExternalLink } from "lucide-react"

export function LightningChannelsList() {
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
      <CardHeader>
        <CardTitle>Lightning Channels</CardTitle>
        <CardDescription>Manage your Lightning Network payment channels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {lightningChannels.map((channel) => (
            <div key={channel.id} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{channel.peer}</span>
                  {getStatusBadge(channel.status)}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <ZapOff className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                </div>
              </div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Channel ID</span>
                  <span className="font-mono">{channel.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity</span>
                  <span>{channel.capacity} sats</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime</span>
                  <span>{channel.uptime}</span>
                </div>
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
            <div className="py-8 text-center text-muted-foreground">
              No active channels. Open a channel to start using Lightning Network.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
