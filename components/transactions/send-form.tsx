"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Usb } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheck } from "lucide-react"

const formSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  network: z.string().min(1, "Network is required"),
  memo: z.string().optional(),
  useHardwareWallet: z.boolean().optional(),
})

export function SendForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [useHardwareWallet, setUseHardwareWallet] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      amount: "",
      network: "bitcoin-ln",
      memo: "",
      useHardwareWallet: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (values.useHardwareWallet) {
        toast({
          title: "Confirm on hardware wallet",
          description: "Please review and confirm the transaction on your hardware wallet",
        })

        // Simulate hardware wallet confirmation
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }

      toast({
        title: "Payment sent",
        description: `Sent ${values.amount} to ${values.recipient}`,
      })

      form.reset()
    } catch (error) {
      toast({
        title: "Error sending payment",
        description: "There was an error sending your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="address" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="lightning">Lightning</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="address" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="network"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select network" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bitcoin">Bitcoin</SelectItem>
                          <SelectItem value="bitcoin-ln">Bitcoin (Lightning)</SelectItem>
                          <SelectItem value="ethereum">Ethereum</SelectItem>
                          <SelectItem value="litecoin">Litecoin</SelectItem>
                          <SelectItem value="monero">Monero</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the blockchain network for this transaction</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormDescription>The blockchain address of the recipient</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.0" step="0.00000001" {...field} />
                      </FormControl>
                      <FormDescription>Amount to send in the selected cryptocurrency</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="memo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Memo (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Add a note for this transaction" {...field} />
                      </FormControl>
                      <FormDescription>Personal note for your reference</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="useHardwareWallet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          <div className="flex items-center">
                            <Usb className="mr-2 h-4 w-4" />
                            Use Hardware Wallet
                          </div>
                        </FormLabel>
                        <FormDescription>Sign this transaction with your connected hardware wallet</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                            setUseHardwareWallet(checked)
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {useHardwareWallet && (
                  <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Hardware Wallet Required</AlertTitle>
                    <AlertDescription>
                      You will need to confirm this transaction on your hardware wallet device. Make sure your device is
                      connected and unlocked.
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {useHardwareWallet ? "Waiting for hardware wallet..." : "Sending..."}
                    </>
                  ) : (
                    "Send Payment"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="lightning" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lightning Invoice</FormLabel>
                      <FormControl>
                        <Input placeholder="lnbc..." {...field} />
                      </FormControl>
                      <FormDescription>Paste a BOLT11 invoice or BOLT12 offer</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="useHardwareWallet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          <div className="flex items-center">
                            <Usb className="mr-2 h-4 w-4" />
                            Use Hardware Wallet
                          </div>
                        </FormLabel>
                        <FormDescription>Sign this transaction with your connected hardware wallet</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked)
                            setUseHardwareWallet(checked)
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {useHardwareWallet && (
                  <Alert>
                    <ShieldCheck className="h-4 w-4" />
                    <AlertTitle>Hardware Wallet Required</AlertTitle>
                    <AlertDescription>
                      You will need to confirm this transaction on your hardware wallet device. Make sure your device is
                      connected and unlocked.
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {useHardwareWallet ? "Waiting for hardware wallet..." : "Paying..."}
                    </>
                  ) : (
                    "Pay Invoice"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="contact" className="pt-4">
            <div className="py-8 text-center text-muted-foreground">
              No contacts saved yet. Add contacts in the Contacts section.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
