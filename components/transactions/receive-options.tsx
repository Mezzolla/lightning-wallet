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
import { QRCode } from "@/components/ui/qr-code"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Amount must be a positive number",
  }),
  network: z.string().min(1, "Network is required"),
  description: z.string().optional(),
  expiry: z.string().optional(),
})

export function ReceiveOptions() {
  const { toast } = useToast()
  const [generatedAddress, setGeneratedAddress] = useState("")
  const [generatedInvoice, setGeneratedInvoice] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      network: "bitcoin",
      description: "",
      expiry: "86400", // 24 hours in seconds
    },
  })

  function onSubmitAddress(values: z.infer<typeof formSchema>) {
    // In a real app, this would call your wallet API to generate an address
    const mockAddresses: Record<string, string> = {
      bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      ethereum: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      litecoin: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      monero: "44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A",
    }

    setGeneratedAddress(mockAddresses[values.network] || "")
  }

  function onSubmitLightning(values: z.infer<typeof formSchema>) {
    // In a real app, this would call your Lightning node API to generate an invoice
    setGeneratedInvoice(
      "lnbc10m1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl2pkx2ctnv5sxxmmwwd5kgetjypeh2ursdae8g6twvus8g6rfwvs8qun0dfjkxaq8rkx3yf5tcsyz3d73gafnh3cax9rn449d9p5uxz9ezhhypd0elx87sjle52x86fux2ypatgddc6k63n7erqz25le42c4u4ecky03ylcqca784w",
    )
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The address has been copied to your clipboard",
    })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="address" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="address">On-chain Address</TabsTrigger>
            <TabsTrigger value="lightning">Lightning Invoice</TabsTrigger>
          </TabsList>
          <TabsContent value="address" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitAddress)} className="space-y-6">
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
                          <SelectItem value="ethereum">Ethereum</SelectItem>
                          <SelectItem value="litecoin">Litecoin</SelectItem>
                          <SelectItem value="monero">Monero</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the blockchain network</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Generate Address
                </Button>
              </form>
            </Form>

            {generatedAddress && (
              <div className="mt-6 space-y-4">
                <div className="flex justify-center">
                  <QRCode value={generatedAddress} size={200} />
                </div>
                <div className="relative">
                  <Input value={generatedAddress} readOnly className="pr-10 font-mono text-sm" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => copyToClipboard(generatedAddress)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="lightning" className="pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitLightning)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (sats)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormDescription>Amount to request in satoshis</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Payment for..." {...field} />
                      </FormControl>
                      <FormDescription>Description for the invoice</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expiry time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3600">1 hour</SelectItem>
                          <SelectItem value="86400">24 hours</SelectItem>
                          <SelectItem value="604800">1 week</SelectItem>
                          <SelectItem value="2592000">30 days</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How long the invoice will be valid</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Generate Invoice
                </Button>
              </form>
            </Form>

            {generatedInvoice && (
              <div className="mt-6 space-y-4">
                <div className="flex justify-center">
                  <QRCode value={generatedInvoice} size={200} />
                </div>
                <div className="relative">
                  <Input value={generatedInvoice} readOnly className="pr-10 font-mono text-xs" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => copyToClipboard(generatedInvoice)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
