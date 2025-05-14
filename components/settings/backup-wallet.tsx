"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Copy, Eye, EyeOff, Lock, RefreshCw, Shield } from "lucide-react"
import { SeedPhraseDisplay } from "@/components/recovery/seed-phrase-display"
import { SeedPhraseVerify } from "@/components/recovery/seed-phrase-verify"

// Mock function to generate a seed phrase
function generateSeedPhrase() {
  const words = [
    "abandon",
    "ability",
    "able",
    "about",
    "above",
    "absent",
    "absorb",
    "abstract",
    "absurd",
    "abuse",
    "access",
    "accident",
    "account",
    "accuse",
    "achieve",
    "acid",
    "acoustic",
    "acquire",
    "across",
    "act",
    "action",
    "actor",
    "actress",
    "actual",
    "adapt",
    "add",
    "addict",
    "address",
    "adjust",
    "admit",
    "adult",
    "advance",
    "advice",
    "aerobic",
    "affair",
    "afford",
    "afraid",
    "again",
    "age",
    "agent",
  ]

  const seedPhrase = []
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * words.length)
    seedPhrase.push(words[randomIndex])
  }

  return seedPhrase.join(" ")
}

const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function BackupWallet() {
  const [step, setStep] = useState<"password" | "display" | "verify" | "success">("password")
  const [seedPhrase, setSeedPhrase] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  })

  async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    setIsLoading(true)

    try {
      // Simulate API call to verify password
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate seed phrase
      const generatedSeedPhrase = generateSeedPhrase()
      setSeedPhrase(generatedSeedPhrase)

      setStep("display")
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your password and try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleCopySeedPhrase() {
    navigator.clipboard.writeText(seedPhrase)
    toast({
      title: "Copied to clipboard",
      description: "Seed phrase copied to clipboard. Store it securely!",
    })
  }

  function handleVerificationSuccess() {
    setStep("success")
    toast({
      title: "Backup successful",
      description: "Your wallet has been successfully backed up",
    })
  }

  function handleRegenerateSeedPhrase() {
    const newSeedPhrase = generateSeedPhrase()
    setSeedPhrase(newSeedPhrase)
    toast({
      title: "New seed phrase generated",
      description: "Please back up your new seed phrase securely",
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Backup Your Wallet</CardTitle>
        <CardDescription>Create a backup of your wallet by saving your recovery seed phrase</CardDescription>
      </CardHeader>
      <CardContent>
        {step === "password" && (
          <>
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important security information</AlertTitle>
              <AlertDescription>
                You will need to verify your password to view your recovery seed phrase. Make sure no one is watching
                your screen.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Continue"}
                </Button>
              </form>
            </Form>
          </>
        )}

        {step === "display" && (
          <div className="space-y-6">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Critical security warning</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Never share your seed phrase with anyone.</li>
                  <li>Never enter it on any website.</li>
                  <li>Store it in a secure, offline location.</li>
                  <li>Anyone with this phrase can access your funds.</li>
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
                  <Button variant="outline" size="sm" onClick={handleRegenerateSeedPhrase}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="relative">
                {!showSeedPhrase && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm rounded-md z-10">
                    <Button variant="outline" onClick={() => setShowSeedPhrase(true)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Click to reveal seed phrase
                    </Button>
                  </div>
                )}
                <SeedPhraseDisplay seedPhrase={seedPhrase} />
              </div>

              <div className="pt-4">
                <Button onClick={() => setStep("verify")} className="w-full">
                  I've saved my seed phrase
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-6">
            <Alert className="mb-6">
              <Shield className="h-4 w-4" />
              <AlertTitle>Verify your backup</AlertTitle>
              <AlertDescription>
                To ensure you've correctly saved your seed phrase, please verify it by selecting the words in the
                correct order.
              </AlertDescription>
            </Alert>

            <SeedPhraseVerify
              seedPhrase={seedPhrase}
              onSuccess={handleVerificationSuccess}
              onBack={() => setStep("display")}
            />
          </div>
        )}

        {step === "success" && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Lock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-medium">Backup Complete!</h3>
            <p className="text-muted-foreground">
              Your wallet has been successfully backed up. Keep your seed phrase in a secure location.
            </p>
            <Alert>
              <AlertTitle>Remember</AlertTitle>
              <AlertDescription>
                Your seed phrase is the only way to recover your wallet if you lose access to your device or forget your
                password.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === "display" && (
          <Button variant="outline" onClick={() => setStep("password")}>
            Back
          </Button>
        )}
        {step === "success" && (
          <Button className="w-full" onClick={() => (window.location.href = "/settings")}>
            Return to Settings
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
