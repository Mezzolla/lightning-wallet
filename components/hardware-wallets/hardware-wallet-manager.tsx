"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConnectHardwareWallet } from "@/components/hardware-wallets/connect-hardware-wallet"
import { ConnectedDevices } from "@/components/hardware-wallets/connected-devices"
import { ImportAccounts } from "@/components/hardware-wallets/import-accounts"

export function HardwareWalletManager() {
  const [activeTab, setActiveTab] = useState("connect")
  const [connectedDevice, setConnectedDevice] = useState<HardwareWalletDevice | null>(null)

  // Handle successful connection
  const handleDeviceConnected = (device: HardwareWalletDevice) => {
    setConnectedDevice(device)
    setActiveTab("accounts")
  }

  // Handle device disconnection
  const handleDeviceDisconnected = () => {
    setConnectedDevice(null)
    setActiveTab("connect")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hardware Wallet Integration</CardTitle>
        <CardDescription>Connect your hardware wallet to securely manage your crypto assets</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connect">Connect</TabsTrigger>
            <TabsTrigger value="devices" disabled={!connectedDevice}>
              Devices
            </TabsTrigger>
            <TabsTrigger value="accounts" disabled={!connectedDevice}>
              Accounts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connect" className="pt-6">
            <ConnectHardwareWallet onDeviceConnected={handleDeviceConnected} />
          </TabsContent>

          <TabsContent value="devices" className="pt-6">
            <ConnectedDevices connectedDevice={connectedDevice} onDeviceDisconnected={handleDeviceDisconnected} />
          </TabsContent>

          <TabsContent value="accounts" className="pt-6">
            <ImportAccounts connectedDevice={connectedDevice} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Types
export interface HardwareWalletDevice {
  id: string
  type: "ledger" | "trezor" | "keepkey" | "other"
  model: string
  firmware: string
  connected: boolean
  status: "connected" | "disconnected" | "error"
  errorMessage?: string
}

export interface HardwareWalletAccount {
  id: string
  path: string
  address: string
  balance: string
  network: string
  imported: boolean
}
