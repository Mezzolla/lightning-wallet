"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import type { HardwareWalletDevice } from "@/components/hardware-wallets/hardware-wallet-manager"
import { Loader2, Info, RefreshCw, ShieldCheck, Unplug } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ConnectedDevicesProps {
  connectedDevice: HardwareWalletDevice | null
  onDeviceDisconnected: () => void
}

export function ConnectedDevices({ connectedDevice, onDeviceDisconnected }: ConnectedDevicesProps) {
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showDeviceInfo, setShowDeviceInfo] = useState(false)
  const { toast } = useToast()

  if (!connectedDevice) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShieldCheck className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">No Hardware Wallet Connected</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect a hardware wallet to manage your crypto assets securely.
        </p>
      </div>
    )
  }

  const disconnectDevice = async () => {
    setIsDisconnecting(true)

    try {
      // Simulate API call to disconnect hardware wallet
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Hardware wallet disconnected",
        description: `Your ${connectedDevice.type} device has been successfully disconnected.`,
      })

      onDeviceDisconnected()
    } catch (error) {
      toast({
        title: "Disconnection failed",
        description: "Failed to disconnect hardware wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDisconnecting(false)
    }
  }

  const refreshDeviceStatus = async () => {
    setIsRefreshing(true)

    try {
      // Simulate API call to refresh device status
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Device status refreshed",
        description: "Your hardware wallet connection status has been refreshed.",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Failed to refresh device status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const getDeviceTypeLabel = (type: string) => {
    switch (type) {
      case "ledger":
        return "Ledger"
      case "trezor":
        return "Trezor"
      case "keepkey":
        return "KeepKey"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {getDeviceTypeLabel(connectedDevice.type)} {connectedDevice.model}
              </CardTitle>
              <CardDescription>Connected hardware wallet</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">Connected</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Device Type</p>
                <p className="font-medium">{getDeviceTypeLabel(connectedDevice.type)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Model</p>
                <p className="font-medium">{connectedDevice.model}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Firmware Version</p>
                <p className="font-medium">{connectedDevice.firmware}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{connectedDevice.status}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowDeviceInfo(true)}>
              <Info className="mr-2 h-4 w-4" />
              Device Info
            </Button>
            <Button variant="outline" size="sm" onClick={refreshDeviceStatus} disabled={isRefreshing}>
              {isRefreshing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>
          <Button variant="destructive" size="sm" onClick={disconnectDevice} disabled={isDisconnecting}>
            {isDisconnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Disconnecting...
              </>
            ) : (
              <>
                <Unplug className="mr-2 h-4 w-4" />
                Disconnect
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDeviceInfo} onOpenChange={setShowDeviceInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hardware Wallet Details</DialogTitle>
            <DialogDescription>Technical information about your connected hardware wallet</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Device Information</h4>
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Device Type:</span>
                  <span className="text-sm font-medium">{getDeviceTypeLabel(connectedDevice.type)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Model:</span>
                  <span className="text-sm font-medium">{connectedDevice.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Firmware:</span>
                  <span className="text-sm font-medium">{connectedDevice.firmware}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Device ID:</span>
                  <span className="text-sm font-mono">{connectedDevice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Connection Status:</span>
                  <span className="text-sm font-medium capitalize">{connectedDevice.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Supported Features</h4>
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bitcoin:</span>
                  <span className="text-sm font-medium">Supported</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ethereum:</span>
                  <span className="text-sm font-medium">Supported</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Lightning Network:</span>
                  <span className="text-sm font-medium">
                    {connectedDevice.type === "ledger" ? "Limited Support" : "Not Supported"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Multisig:</span>
                  <span className="text-sm font-medium">Supported</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowDeviceInfo(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
