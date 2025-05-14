"use client"

import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import type { OnboardingData } from "./onboarding-flow"

interface CompletionStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

export function CompletionStep({ data, onNext }: CompletionStepProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Check className="h-10 w-10 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold">Setup Complete!</h2>
        <p className="mt-2 text-muted-foreground">
          Your Lightning Wallet has been successfully set up and is ready to use
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <h3 className="font-medium">Wallet Summary</h3>
        <ul className="mt-4 space-y-3 text-left">
          <li className="flex items-start">
            <span className="mr-2 rounded-full bg-green-100 p-1">
              <Check className="h-3 w-3 text-green-600" />
            </span>
            <div>
              <span className="font-medium">Wallet Name:</span> {data.walletName}
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 rounded-full bg-green-100 p-1">
              <Check className="h-3 w-3 text-green-600" />
            </span>
            <div>
              <span className="font-medium">Security:</span>{" "}
              {Object.entries(data.securityOptions)
                .filter(([_, enabled]) => enabled)
                .map(([option]) => option.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()))
                .join(", ")}
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 rounded-full bg-green-100 p-1">
              <Check className="h-3 w-3 text-green-600" />
            </span>
            <div>
              <span className="font-medium">Networks:</span>{" "}
              {data.networks.map((n) => n.charAt(0).toUpperCase() + n.slice(1)).join(", ")}
            </div>
          </li>
          <li className="flex items-start">
            <span className="mr-2 rounded-full bg-green-100 p-1">
              <Check className="h-3 w-3 text-green-600" />
            </span>
            <div>
              <span className="font-medium">Backup:</span> Recovery seed phrase verified
            </div>
          </li>
        </ul>
      </div>

      <div className="space-y-4 pt-4">
        <p className="text-sm text-muted-foreground">
          You can now start using your wallet to send, receive, and manage your cryptocurrencies.
        </p>
        <Button size="lg" onClick={onNext}>
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
