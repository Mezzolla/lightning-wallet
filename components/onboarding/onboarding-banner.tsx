"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ArrowRight } from "lucide-react"
import Link from "next/link"

export function OnboardingBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium">Welcome to Lightning Wallet</h3>
            <p className="text-sm text-muted-foreground">
              Complete the onboarding process to set up your wallet and start using it.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="default" size="sm">
              <Link href="/onboarding">
                Continue Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setDismissed(true)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
