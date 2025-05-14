"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"

const recoverySchema = z
  .object({
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
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function RecoveryForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof recoverySchema>>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      seedPhrase: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof recoverySchema>) {
    setIsLoading(true)

    try {
      // Simulate API call to recover wallet
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Wallet recovered successfully",
        description: "Your wallet has been restored from your seed phrase",
      })

      // Redirect to dashboard
      router.push("/")
    } catch (error) {
      toast({
        title: "Recovery failed",
        description: "There was an error recovering your wallet. Please check your seed phrase and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Security Warning</AlertTitle>
        <AlertDescription>
          Make sure you are on the correct website and no one is watching your screen before entering your seed phrase.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
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
                  Enter the seed phrase you received when you first created your wallet or during backup.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>Create a new password for your recovered wallet.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Recovering Wallet...
              </>
            ) : (
              "Recover Wallet"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
