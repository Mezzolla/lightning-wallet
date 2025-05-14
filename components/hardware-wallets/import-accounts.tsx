"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import type { HardwareWalletDevice, HardwareWalletAccount } from "@/components/hardware-wallets/hardware-wallet-manager"
import { Loader2, RefreshCw, Download, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ImportAccountsProps {
  connectedDevice: HardwareWalletDevice | null
}

export function ImportAccounts({ connectedDevice }: ImportAccountsProps) {
  const [accounts, setAccounts] = useState<HardwareWalletAccount[]>([])
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [derivationPath, setDerivationPath] = useState("m/84'/0'/0'/0")
  const [accountsToShow, setAccountsToShow] = useState(5)
  const { toast } = useToast()

  // Fetch accounts when device is connected or derivation path changes
  useEffect(() => {
    if (connectedDevice) {
      fetchAccounts()
    }
  }, [connectedDevice, derivationPath])

  const fetchAccounts = async () => {
    if (!connectedDevice) return

    setIsLoading(true)
    setAccounts([])

    try {
      // Simulate API call to fetch accounts from hardware wallet
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate mock accounts based on the device type and derivation path
      const mockAccounts: HardwareWalletAccount[] = Array.from({ length: accountsToShow }).map((_, index) => {
        const network = derivationPath.includes("'0'")
          ? "bitcoin"
          : derivationPath.includes("'60'")
            ? "ethereum"
            : derivationPath.includes("'2'")
              ? "litecoin"
              : "bitcoin"

        const addressPrefix =
          network === "bitcoin" ? "bc1q" : network === "ethereum" ? "0x" : network === "litecoin" ? "ltc1" : "bc1q"

        const randomAddress = `${addressPrefix}${Array.from({ length: 38 })
          .map(() => "0123456789abcdef"[Math.floor(Math.random() * 16)])
          .join("")}`

        const randomBalance = (Math.random() * (network === "ethereum" ? 10 : 1)).toFixed(8)

        return {
          id: `${network}-${index}`,
          path: `${derivationPath}/${index}`,
          address: randomAddress,
          balance: randomBalance,
          network,
          imported: Math.random() > 0.7, // Some accounts are already imported
        }
      })

      setAccounts(mockAccounts)
    } catch (error) {
      toast({
        title: "Failed to fetch accounts",
        description: "Could not retrieve accounts from your hardware wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const importSelectedAccounts = async () => {
    if (selectedAccounts.length === 0) {
      toast({
        title: "No accounts selected",
        description: "Please select at least one account to import.",
        variant: "destructive",
      })
      return
    }

    setIsImporting(true)

    try {
      // Simulate API call to import accounts
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update accounts to mark them as imported
      setAccounts(
        accounts.map((account) => (selectedAccounts.includes(account.id) ? { ...account, imported: true } : account)),
      )

      toast({
        title: "Accounts imported successfully",
        description: `${selectedAccounts.length} account(s) have been imported from your hardware wallet.`,
      })

      // Clear selection
      setSelectedAccounts([])
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to import accounts. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const toggleAccountSelection = (accountId: string) => {
    setSelectedAccounts((prev) =>
      prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId],
    )
  }

  const selectAll = () => {
    const notImportedAccounts = accounts.filter((account) => !account.imported).map((account) => account.id)
    setSelectedAccounts(notImportedAccounts)
  }

  const deselectAll = () => {
    setSelectedAccounts([])
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
    }

    return (
      <Badge variant="outline" className={`${color} text-xs`}>
        {network}
      </Badge>
    )
  }

  if (!connectedDevice) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ExternalLink className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">No Hardware Wallet Connected</h3>
        <p className="mt-2 text-sm text-muted-foreground">Connect a hardware wallet to import accounts.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="bitcoin">
        <TabsList>
          <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
          <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
          <TabsTrigger value="litecoin">Litecoin</TabsTrigger>
        </TabsList>

        <TabsContent value="bitcoin" className="space-y-4 pt-4">
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="btc-derivation-path">Derivation Path</Label>
              <Input
                id="btc-derivation-path"
                value={derivationPath}
                onChange={(e) => setDerivationPath(e.target.value)}
                placeholder="m/84'/0'/0'/0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accounts-to-show">Accounts</Label>
              <Input
                id="accounts-to-show"
                type="number"
                min="1"
                max="20"
                value={accountsToShow}
                onChange={(e) => setAccountsToShow(Number.parseInt(e.target.value))}
              />
            </div>
            <Button onClick={fetchAccounts} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>

          {renderAccountsList()}
        </TabsContent>

        <TabsContent value="ethereum" className="space-y-4 pt-4">
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="eth-derivation-path">Derivation Path</Label>
              <Input
                id="eth-derivation-path"
                value="m/44'/60'/0'/0"
                onChange={(e) => setDerivationPath(e.target.value)}
                placeholder="m/44'/60'/0'/0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accounts-to-show-eth">Accounts</Label>
              <Input
                id="accounts-to-show-eth"
                type="number"
                min="1"
                max="20"
                value={accountsToShow}
                onChange={(e) => setAccountsToShow(Number.parseInt(e.target.value))}
              />
            </div>
            <Button onClick={fetchAccounts} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>

          {renderAccountsList()}
        </TabsContent>

        <TabsContent value="litecoin" className="space-y-4 pt-4">
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="ltc-derivation-path">Derivation Path</Label>
              <Input
                id="ltc-derivation-path"
                value="m/84'/2'/0'/0"
                onChange={(e) => setDerivationPath(e.target.value)}
                placeholder="m/84'/2'/0'/0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accounts-to-show-ltc">Accounts</Label>
              <Input
                id="accounts-to-show-ltc"
                type="number"
                min="1"
                max="20"
                value={accountsToShow}
                onChange={(e) => setAccountsToShow(Number.parseInt(e.target.value))}
              />
            </div>
            <Button onClick={fetchAccounts} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>

          {renderAccountsList()}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderAccountsList() {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
          <p className="text-center text-muted-foreground">Loading accounts from your hardware wallet...</p>
        </div>
      )
    }

    if (accounts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-center text-muted-foreground">
            No accounts found. Try changing the derivation path or refreshing.
          </p>
        </div>
      )
    }

    return (
      <>
        <div className="flex justify-between">
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={selectAll}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={deselectAll}>
              Deselect All
            </Button>
          </div>
          <Button onClick={importSelectedAccounts} disabled={isImporting || selectedAccounts.length === 0}>
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Import Selected ({selectedAccounts.length})
              </>
            )}
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className={`flex items-center justify-between p-4 ${account.imported ? "bg-muted/50" : ""}`}
                >
                  <div className="flex items-center space-x-4">
                    {!account.imported && (
                      <Checkbox
                        checked={selectedAccounts.includes(account.id)}
                        onCheckedChange={() => toggleAccountSelection(account.id)}
                        disabled={account.imported}
                      />
                    )}
                    {account.imported && <Badge className="bg-green-100 text-green-800">Imported</Badge>}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{account.path}</p>
                        {getNetworkBadge(account.network)}
                      </div>
                      <p className="text-xs font-mono text-muted-foreground truncate max-w-[300px]">
                        {account.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {account.balance}{" "}
                      {account.network === "bitcoin" ? "BTC" : account.network === "ethereum" ? "ETH" : "LTC"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </>
    )
  }
}
