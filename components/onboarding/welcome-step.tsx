"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Wallet, Coins } from "lucide-react"
import type { OnboardingData } from "./onboarding-flow"

interface WelcomeStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Zap className="h-10 w-10 text-primary" />
      </div>

      <div>
        <h2 className="text-2xl font-bold">Welcome to Lightning Wallet</h2>
        <p className="mt-2 text-muted-foreground">
          Your secure gateway to Bitcoin, Lightning Network, and multi-blockchain transactions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <Shield className="mb-2 h-8 w-8 text-primary" />
          <h3 className="font-medium">Secure</h3>
          <p className="text-sm text-muted-foreground">Your keys, your crypto. Full control of your assets.</p>
        </div>
        <div className="rounded-lg border p-4">
          <Wallet className="mb-2 h-8 w-8 text-primary" />
          <h3 className="font-medium">Multi-Chain</h3>
          <p className="text-sm text-muted-foreground">Support for Bitcoin, Ethereum, Litecoin, and more.</p>
        </div>
        <div className="rounded-lg border p-4">
          <Coins className="mb-2 h-8 w-8 text-primary" />
          <h3 className="font-medium">Lightning Fast</h3>
          <p className="text-sm text-muted-foreground">Instant payments with Lightning Network integration.</p>
        </div>
      </div>

      <div className="pt-4">
        <Button size="lg" onClick={onNext}>
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
