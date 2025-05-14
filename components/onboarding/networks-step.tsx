"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, Zap, Coins, DollarSign } from "lucide-react"
import type { OnboardingData } from "./onboarding-flow"

interface NetworksStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

export function NetworksStep({ data, updateData }: NetworksStepProps) {
  const networks = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      description: "The original cryptocurrency",
      icon: Bitcoin,
      color: "text-orange-500",
    },
    {
      id: "lightning",
      name: "Lightning Network",
      description: "Fast Bitcoin payments with low fees",
      icon: Zap,
      color: "text-yellow-500",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      description: "Smart contracts and decentralized applications",
      icon: Coins,
      color: "text-blue-500",
    },
    {
      id: "litecoin",
      name: "Litecoin",
      description: "Faster transaction confirmations",
      icon: Coins,
      color: "text-slate-500",
    },
    {
      id: "monero",
      name: "Monero",
      description: "Privacy-focused cryptocurrency",
      icon: Coins,
      color: "text-orange-500",
    },
    {
      id: "stablecoins",
      name: "Stablecoins",
      description: "Cryptocurrencies pegged to fiat currencies",
      icon: DollarSign,
      color: "text-green-500",
    },
  ]

  const toggleNetwork = (networkId: string) => {
    const currentNetworks = [...data.networks]
    const index = currentNetworks.indexOf(networkId)

    if (index === -1) {
      currentNetworks.push(networkId)
    } else {
      currentNetworks.splice(index, 1)
    }

    updateData({ networks: currentNetworks })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Choose Networks</h2>
        <p className="text-muted-foreground">Select the blockchain networks you want to use</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {networks.map((network) => {
          const Icon = network.icon
          return (
            <Card key={network.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  <Icon className={`mr-2 h-5 w-5 ${network.color}`} />
                  {network.name}
                </CardTitle>
                <CardDescription>{network.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`network-${network.id}`}
                    checked={data.networks.includes(network.id)}
                    onCheckedChange={() => toggleNetwork(network.id)}
                  />
                  <Label htmlFor={`network-${network.id}`}>Enable {network.name}</Label>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-2 font-medium">Network Information</h3>
        <p className="text-sm text-muted-foreground">
          You can add or remove networks at any time from the settings page. Bitcoin and Lightning Network are
          recommended for all users.
        </p>
      </div>
    </div>
  )
}
