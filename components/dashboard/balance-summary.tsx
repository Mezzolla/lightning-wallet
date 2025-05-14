"use client"

import {useWallet} from '@/app/(authenticated)/wallet-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function BalanceSummary() {
  const { balances } = useWallet()

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Balance Summary</CardTitle>
        <CardDescription>Your current balances across all networks</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="total">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="total">Total</TabsTrigger>
            <TabsTrigger value="bitcoin">Bitcoin</TabsTrigger>
            <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="total" className="pt-4">
            <div className="text-3xl font-bold">${balances.totalFiat.toFixed(2)}</div>
            <div className="mt-1 text-sm text-muted-foreground">Total balance across all networks</div>
          </TabsContent>
          <TabsContent value="bitcoin" className="pt-4">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{balances.bitcoin.toFixed(8)} BTC</div>
              <div className="text-muted-foreground">${balances.bitcoinFiat.toFixed(2)}</div>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              On-chain: {balances.bitcoinOnChain.toFixed(8)} BTC | Lightning: {balances.bitcoinLightning.toFixed(8)} BTC
            </div>
          </TabsContent>
          <TabsContent value="ethereum" className="pt-4">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{balances.ethereum.toFixed(6)} ETH</div>
              <div className="text-muted-foreground">${balances.ethereumFiat.toFixed(2)}</div>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">+ {balances.erc20Tokens.length} ERC-20 tokens</div>
          </TabsContent>
          <TabsContent value="other" className="pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Litecoin (LTC)</span>
                <span className="font-medium">{balances.litecoin.toFixed(8)} LTC</span>
              </div>
              <div className="flex justify-between">
                <span>Monero (XMR)</span>
                <span className="font-medium">{balances.monero.toFixed(8)} XMR</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
