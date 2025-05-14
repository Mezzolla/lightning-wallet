"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import type { OnboardingData } from "./onboarding-flow"

interface CreateWalletStepProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  onNext: () => void
}

const createWalletSchema = z
  .object({
    walletName: z.string().min(1, "Wallet name is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const importWalletSchema = z.object({
  seedPhrase: z
    .string()
    .min(1, "Seed phrase is required")
    .refine(
      (value) => {
        const words = value.trim().split(/\s+/)
        return words.length === 12 || words.length === 24
      },
      {
        message: "Seed phrase must contain 12 or 24 words separated by spaces",
      },
    ),
  walletName: z.string().min(1, "Wallet name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
})

export function CreateWalletStep({ data, updateData, onNext }: CreateWalletStepProps) {
  const [activeTab, setActiveTab] = useState<"create" | "import">("create")

  const createForm = useForm<z.infer<typeof createWalletSchema>>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: {
      walletName: data.walletName || "",
      password: data.password || "",
      confirmPassword: data.password || "",
    },
  })

  const importForm = useForm<z.infer<typeof importWalletSchema>>({
    resolver: zodResolver(importWalletSchema),
    defaultValues: {
      seedPhrase: data.seedPhrase || "",
      walletName: data.walletName || "",
      password: data.password || "",
      confirmPassword: data.password || "",
    },
  })

  function onCreateSubmit(values: z.infer<typeof createWalletSchema>) {
    // Generate a random seed phrase (in a real app, this would use a proper BIP39 library)
    const mockSeedPhrase =
      "abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire"

    updateData({
      walletName: values.walletName,
      password: values.password,
      seedPhrase: mockSeedPhrase,
    })

    onNext()
  }

  function onImportSubmit(values: z.infer<typeof importWalletSchema>) {
    updateData({
      walletName: values.walletName,
      password: values.password,
      seedPhrase: values.seedPhrase,
    })

    onNext()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create Your Wallet</h2>
        <p className="text-muted-foreground">Set up a new wallet or import an existing one</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "create" | "import")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create New Wallet</TabsTrigger>
          <TabsTrigger value="import">Import Existing Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4 pt-4">
          <Form {...createForm}>
            <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
              <FormField
                control={createForm.control}
                name="walletName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Lightning Wallet" {...field} />
                    </FormControl>
                    <FormDescription>Give your wallet a memorable name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Create a strong password with at least 8 characters, including numbers and symbols
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  You will need to back up your wallet in the next step. Make sure you have a secure place to store your
                  recovery phrase.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full">
                Create Wallet
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="import" className="space-y-4 pt-4">
          <Form {...importForm}>
            <form onSubmit={importForm.handleSubmit(onImportSubmit)} className="space-y-4">
              <FormField
                control={importForm.control}
                name="seedPhrase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recovery Seed Phrase</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your 12 or 24 word seed phrase, with words separated by spaces"
                        className="font-mono resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the seed phrase you received when you first created your wallet
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={importForm.control}
                name="walletName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Lightning Wallet" {...field} />
                    </FormControl>
                    <FormDescription>Give your wallet a memorable name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={importForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>Create a new password for your imported wallet</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={importForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Security Warning</AlertTitle>
                <AlertDescription>
                  Make sure you are on the correct website and no one is watching your screen before entering your seed
                  phrase.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full">
                Import Wallet
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
