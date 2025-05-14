"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import type { HardwareWalletDevice } from "@/components/hardware-wallets/hardware-wallet-manager"
import { Loader2, AlertTriangle, ExternalLink, ShieldCheck } from "lucide-react"
import Image from "next/image"

interface ConnectHardwareWalletProps {
  onDeviceConnected: (device: HardwareWalletDevice) => void
}

export function ConnectHardwareWallet({ onDeviceConnected }: ConnectHardwareWalletProps) {
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Mock function to simulate connecting to a hardware wallet
  const connectToDevice = async (type: "ledger" | "trezor" | "keepkey") => {
    setIsConnecting(type)
    setError(null)

    try {
      // Simulate API call to connect to hardware wallet
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3

      if (!success && type === "ledger") {
        throw new Error(
          "Unable to connect to Ledger device. Please ensure the device is unlocked and the Bitcoin app is open.",
        )
      }

      if (!success && type === "trezor") {
        throw new Error("Trezor connection failed. Please ensure your browser supports WebUSB and try again.")
      }

      if (!success && type === "keepkey") {
        throw new Error("KeepKey connection failed. Please check your connection and try again.")
      }

      // Create mock device object
      const device: HardwareWalletDevice = {
        id: `${type}-${Date.now()}`,
        type: type,
        model: type === "ledger" ? "Nano X" : type === "trezor" ? "Model T" : "KeepKey",
        firmware: "2.0.0",
        connected: true,
        status: "connected",
      }

      toast({
        title: "Hardware wallet connected",
        description: `Your ${type} device has been successfully connected.`,
      })

      onDeviceConnected(device)
    } catch (err: any) {
      setError(err.message || "Failed to connect to hardware wallet")
      toast({
        title: "Connection failed",
        description: err.message || "Failed to connect to hardware wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(null)
    }
  }

  return (
    <div className="space-y-6">
      <Alert>
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>Enhanced Security</AlertTitle>
        <AlertDescription>
          Hardware wallets provide the highest level of security by keeping your private keys offline. Always verify
          transaction details on your hardware wallet screen before confirming.
        </AlertDescription>
      </Alert>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">Ledger</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <div className="relative h-32 w-32">
              <Image src="/placeholder.svg?height=128&width=128" alt="Ledger device" width={128} height={128} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => connectToDevice("ledger")} disabled={!!isConnecting}>
              {isConnecting === "ledger" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Ledger"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">Trezor</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <div className="relative h-32 w-32">
              <Image src="/placeholder.svg?height=128&width=128" alt="Trezor device" width={128} height={128} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => connectToDevice("trezor")} disabled={!!isConnecting}>
              {isConnecting === "trezor" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Trezor"
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">KeepKey</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <div className="relative h-32 w-32">
              <Image src="/placeholder.svg?height=128&width=128" alt="KeepKey device" width={128} height={128} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => connectToDevice("keepkey")} disabled={!!isConnecting}>
              {isConnecting === "keepkey" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect KeepKey"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium">Connection Instructions</h3>

        <div className="rounded-md border p-4">
          <h4 className="font-medium">Ledger</h4>
          <ol className="ml-6 mt-2 list-decimal text-sm text-muted-foreground">
            <li>Connect your Ledger device to your computer</li>
            <li>Enter your PIN on the device</li>
            <li>Open the Bitcoin or Ethereum app on your Ledger</li>
            <li>Click the "Connect Ledger" button above</li>
            <li>Follow the prompts on your device to allow the connection</li>
          </ol>
        </div>

        <div className="rounded-md border p-4">
          <h4 className="font-medium">Trezor</h4>
          <ol className="ml-6 mt-2 list-decimal text-sm text-muted-foreground">
            <li>Connect your Trezor device to your computer</li>
            <li>Click the "Connect Trezor" button above</li>
            <li>A new tab will open with the Trezor Connect interface</li>
            <li>Follow the instructions to authorize the connection</li>
            <li>Return to this tab after authorization is complete</li>
          </ol>
        </div>

        <div className="rounded-md border p-4">
          <h4 className="font-medium">KeepKey</h4>
          <ol className="ml-6 mt-2 list-decimal text-sm text-muted-foreground">
            <li>Connect your KeepKey device to your computer</li>
            <li>Ensure your device is unlocked</li>
            <li>Click the "Connect KeepKey" button above</li>
            <li>Follow the prompts to allow the connection</li>
          </ol>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <a href="https://support.ledger.com/hc/en-us" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Hardware Wallet Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
