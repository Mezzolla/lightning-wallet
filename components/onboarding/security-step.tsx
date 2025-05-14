"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Fingerprint, Lock, ShieldCheck } from "lucide-react"
import type { OnboardingData } from "./onboarding-flow"

interface SecurityStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

export function SecurityStep({ data, updateData }: SecurityStepProps) {
  const handleSecurityOptionChange = (option: keyof OnboardingData["securityOptions"], value: boolean) => {
    updateData({
      securityOptions: {
        ...data.securityOptions,
        [option]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Settings</h2>
        <p className="text-muted-foreground">Configure security options for your wallet</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <Fingerprint className="mr-2 h-4 w-4" />
              Biometric Authentication
            </CardTitle>
            <CardDescription>Use fingerprint or face ID to unlock your wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="biometric-auth">Enable</Label>
              <Switch
                id="biometric-auth"
                checked={data.securityOptions.biometricAuth}
                onCheckedChange={(checked) => handleSecurityOptionChange("biometricAuth", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <Lock className="mr-2 h-4 w-4" />
              Auto-Lock
            </CardTitle>
            <CardDescription>Automatically lock your wallet after a period of inactivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-lock">Enable</Label>
              <Switch
                id="auto-lock"
                checked={data.securityOptions.autoLock}
                onCheckedChange={(checked) => handleSecurityOptionChange("autoLock", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>Add an extra layer of security with 2FA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor-auth">Enable</Label>
              <Switch
                id="two-factor-auth"
                checked={data.securityOptions.twoFactorAuth}
                onCheckedChange={(checked) => handleSecurityOptionChange("twoFactorAuth", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="mb-2 font-medium">Security Recommendations</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✓</span>
            <span>Use a strong, unique password that you don't use elsewhere</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✓</span>
            <span>Enable biometric authentication for convenient and secure access</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✓</span>
            <span>Keep your recovery phrase in a secure, offline location</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✓</span>
            <span>Consider using a hardware wallet for large amounts</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2 text-green-500">✓</span>
            <span>Be cautious of phishing attempts and only use official wallet links</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
