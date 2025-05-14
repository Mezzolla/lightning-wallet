"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Shield, Key, Download, Usb } from "lucide-react"

export function SettingsTabs() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="network">Network</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your wallet display preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Display Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-toggle">Dark Mode</Label>
              <Switch id="theme-toggle" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications-toggle">Enable Notifications</Label>
              <Switch id="notifications-toggle" defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your wallet security options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="auto-lock">Auto-lock Timeout (minutes)</Label>
              <Input id="auto-lock" type="number" defaultValue="15" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="biometric-toggle">Enable Biometric Authentication</Label>
              <Switch id="biometric-toggle" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="2fa-toggle">Two-Factor Authentication</Label>
              <Switch id="2fa-toggle" />
            </div>
            <div className="pt-4 space-y-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings/backup">
                  <Shield className="mr-2 h-4 w-4" />
                  Backup Wallet
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings/hardware-wallets">
                  <Usb className="mr-2 h-4 w-4" />
                  Hardware Wallets
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Key className="mr-2 h-4 w-4" />
                Export Private Keys
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export Wallet Data
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="network">
        <Card>
          <CardHeader>
            <CardTitle>Network Settings</CardTitle>
            <CardDescription>Configure your blockchain network connections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bitcoin-node">Bitcoin Node URL</Label>
              <Input id="bitcoin-node" placeholder="http://127.0.0.1:8332" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lightning-node">Lightning Node URL</Label>
              <Input id="lightning-node" placeholder="https://127.0.0.1:10009" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ethereum-node">Ethereum Node URL</Label>
              <Input id="ethereum-node" placeholder="https://mainnet.infura.io/v3/YOUR_API_KEY" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="use-tor-toggle">Use Tor for Connections</Label>
              <Switch id="use-tor-toggle" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="custom-fee-toggle">Custom Transaction Fees</Label>
              <Switch id="custom-fee-toggle" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="advanced">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Configure advanced wallet options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="log-level">Log Level</Label>
              <Select defaultValue="info">
                <SelectTrigger id="log-level">
                  <SelectValue placeholder="Select log level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-rpc">Custom RPC Commands</Label>
              <Textarea id="custom-rpc" placeholder="Enter custom RPC commands" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dev-mode-toggle">Developer Mode</Label>
              <Switch id="dev-mode-toggle" />
            </div>
            <div className="pt-4">
              <Button variant="destructive" className="w-full">
                Reset Wallet
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
