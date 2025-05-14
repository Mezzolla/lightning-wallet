"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { SeedPhraseDisplay } from "@/components/recovery/seed-phrase-display"
import { SeedPhraseVerify } from "@/components/recovery/seed-phrase-verify"
import { AlertTriangle, Copy, Eye, EyeOff, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { OnboardingData } from "./onboarding-flow"

interface BackupStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

export function BackupStep({ data, onNext }: BackupStepProps) {
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [step, setStep] = useState<"display" | "verify">("display")
  const [verified, setVerified] = useState(false)
  const { toast } = useToast()

  const handleCopySeedPhrase = () => {
    navigator.clipboard.writeText(data.seedPhrase)
    toast({
      title: "Copied to clipboard",
      description: "Seed phrase copied to clipboard. Store it securely!",
    })
  }

  const handleVerificationSuccess = () => {
    setVerified(true)
    toast({
      title: "Verification successful",
      description: "You've successfully verified your seed phrase",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Backup Your Wallet</h2>
        <p className="text-muted-foreground">
          Your recovery seed phrase is the only way to recover your wallet if you lose access
        </p>
      </div>

      {step === "display" && (
        <>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical security warning</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-4 space-y-1">
                <li>Write down your seed phrase and keep it in a secure location.</li>
                <li>Never share your seed phrase with anyone.</li>
                <li>Anyone with this phrase can access your funds.</li>
                <li>Lightning Wallet will never ask for your seed phrase.</li>
                <li>If you lose your seed phrase, you will lose access to your funds.</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Your Recovery Seed Phrase</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowSeedPhrase(!showSeedPhrase)}>
                  {showSeedPhrase ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showSeedPhrase ? "Hide" : "Show"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopySeedPhrase}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            <Card className="p-4">
              <div className="relative">
                {!showSeedPhrase && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm rounded-md z-10">
                    <Button variant="outline" onClick={() => setShowSeedPhrase(true)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Click to reveal seed phrase
                    </Button>
                  </div>
                )}
                <SeedPhraseDisplay seedPhrase={data.seedPhrase} />
              </div>
            </Card>

            <div className="pt-4">
              <Button onClick={() => setStep("verify")} className="w-full">
                I've saved my seed phrase
              </Button>
            </div>
          </div>
        </>
      )}

      {step === "verify" && !verified && (
        <>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Verify your backup</AlertTitle>
            <AlertDescription>
              To ensure you've correctly saved your seed phrase, please verify it by selecting the words in the correct
              order.
            </AlertDescription>
          </Alert>

          <SeedPhraseVerify
            seedPhrase={data.seedPhrase}
            onSuccess={handleVerificationSuccess}
            onBack={() => setStep("display")}
          />
        </>
      )}

      {step === "verify" && verified && (
        <div className="space-y-6">
          <div className="rounded-full bg-green-100 w-12 h-12 mx-auto flex items-center justify-center">
            <Check className="h-6 w-6 text-green-600" />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-medium">Backup Verified!</h3>
            <p className="text-muted-foreground mt-2">
              You've successfully verified your recovery seed phrase. Keep it in a safe place.
            </p>
          </div>

          <Button onClick={onNext} className="w-full">
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}
