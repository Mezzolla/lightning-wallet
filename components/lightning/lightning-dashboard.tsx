"use client"

import { useState } from "react"
import {useWallet} from '@/app/(authenticated)/wallet-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, ZapOff } from "lucide-react"
import { LightningChannelsList } from "@/components/lightning/lightning-channels-list"
import { OpenChannelDialog } from "@/components/lightning/open-channel-dialog"

export function LightningDashboard() {
  const { lightningBalance } = useWallet()
  const [openChannelDialogOpen, setOpenChannelDialogOpen] = useState(false)

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lightning Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lightningBalance.toFixed(8)} BTC</div>
            <p className="text-xs text-muted-foreground">≈ ${(lightningBalance * 60000).toFixed(2)} USD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Channel Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500,000 sats</div>
            <p className="text-xs text-muted-foreground">Across 3 active channels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button size="sm" onClick={() => setOpenChannelDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Open Channel
            </Button>
            <Button size="sm" variant="outline">
              <ZapOff className="mr-2 h-4 w-4" />
              Close Channel
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="channels" className="mt-6">
        <TabsList>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="routing">Routing</TabsTrigger>
        </TabsList>
        <TabsContent value="channels" className="mt-4">
          <LightningChannelsList />
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lightning Payments</CardTitle>
              <CardDescription>Your recent Lightning Network payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-4 text-center text-muted-foreground">No recent Lightning payments</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="routing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Routing Summary</CardTitle>
              <CardDescription>Statistics about your node's routing activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-4 text-center text-muted-foreground">Your node hasn't routed any payments yet</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <OpenChannelDialog open={openChannelDialogOpen} onOpenChange={setOpenChannelDialogOpen} />
    </>
  )
}
