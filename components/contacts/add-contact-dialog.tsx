"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, X } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  notes: z.string().optional(),
})

interface AddContactDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddContact: (contact: any) => void
}

export function AddContactDialog({ open, onOpenChange, onAddContact }: AddContactDialogProps) {
  const [addresses, setAddresses] = useState<Array<{ network: string; address: string }>>([
    { network: "bitcoin", address: "" },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      notes: "",
    },
  })

  const addAddress = () => {
    setAddresses([...addresses, { network: "bitcoin", address: "" }])
  }

  const removeAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index))
  }

  const updateAddress = (index: number, field: "network" | "address", value: string) => {
    const newAddresses = [...addresses]
    newAddresses[index][field] = value
    setAddresses(newAddresses)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    try {
      // Validate addresses
      const validAddresses = addresses.filter((addr) => addr.address.trim() !== "")

      if (validAddresses.length === 0) {
        form.setError("root", {
          message: "At least one valid address is required",
        })
        setIsLoading(false)
        return
      }

      // Create new contact
      const newContact = {
        ...values,
        addresses: validAddresses,
      }

      onAddContact(newContact)
      onOpenChange(false)

      // Reset form
      form.reset()
      setAddresses([{ network: "bitcoin", address: "" }])
    } catch (error) {
      console.error("Error adding contact:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>Add a new contact to your address book for quick payments</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Addresses</FormLabel>
                <Button type="button" variant="outline" size="sm" onClick={addAddress}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Address
                </Button>
              </div>

              {addresses.map((address, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Select value={address.network} onValueChange={(value) => updateAddress(index, "network", value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bitcoin">Bitcoin</SelectItem>
                      <SelectItem value="bitcoin-ln">Lightning</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="litecoin">Litecoin</SelectItem>
                      <SelectItem value="monero">Monero</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex-1">
                    <Input
                      placeholder="Address"
                      value={address.address}
                      onChange={(e) => updateAddress(index, "address", e.target.value)}
                    />
                  </div>
                  {addresses.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeAddress(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional information about this contact" {...field} />
                  </FormControl>
                  <FormDescription>Optional notes about this contact</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Contact"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
