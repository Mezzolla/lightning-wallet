"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { WelcomeStep } from "@/components/onboarding/welcome-step"
import { CreateWalletStep } from "@/components/onboarding/create-wallet-step"
import { SecurityStep } from "@/components/onboarding/security-step"
import { BackupStep } from "@/components/onboarding/backup-step"
import { NetworksStep } from "@/components/onboarding/networks-step"
import { CompletionStep } from "@/components/onboarding/completion-step"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export type OnboardingData = {
  walletName: string
  password: string
  seedPhrase: string
  securityOptions: {
    biometricAuth: boolean
    autoLock: boolean
    twoFactorAuth: boolean
  }
  networks: string[]
}

const initialData: OnboardingData = {
  walletName: "",
  password: "",
  seedPhrase: "",
  securityOptions: {
    biometricAuth: false,
    autoLock: true,
    twoFactorAuth: false,
  },
  networks: ["bitcoin", "lightning"],
}

export function OnboardingFlow() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<OnboardingData>(initialData)
  const router = useRouter()
  const { toast } = useToast()

  const steps = [
    { title: "Welcome", component: WelcomeStep },
    { title: "Create Wallet", component: CreateWalletStep },
    { title: "Security", component: SecurityStep },
    { title: "Backup", component: BackupStep },
    { title: "Networks", component: NetworksStep },
    { title: "Complete", component: CompletionStep },
  ]

  const totalSteps = steps.length
  const progress = ((step + 1) / totalSteps) * 100

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const completeOnboarding = () => {
    // In a real app, this would save the wallet configuration to a secure store
    toast({
      title: "Wallet created successfully",
      description: "Your wallet has been set up and is ready to use",
    })
    router.push("/")
  }

  const CurrentStepComponent = steps[step].component

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="bg-background py-4 shadow-sm">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl font-bold">Lightning Wallet Setup</h1>
          <div className="text-sm text-muted-foreground">
            Step {step + 1} of {totalSteps}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <Progress value={progress} className="h-2" />
            </div>

            <div className="rounded-lg border bg-background p-6 shadow-sm">
              <CurrentStepComponent data={data} updateData={updateData} onNext={handleNext} />
            </div>

            {step !== 0 && step !== totalSteps - 1 && (
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
