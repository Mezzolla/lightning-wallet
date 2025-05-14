"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, Edit, Trash2, Send } from "lucide-react"
import { AddContactDialog } from "@/components/contacts/add-contact-dialog"
import { EditContactDialog } from "@/components/contacts/edit-contact-dialog"
import { useToast } from "@/hooks/use-toast"

// Mock data for contacts
const initialContacts = [
  {
    id: "1",
    name: "Alice",
    addresses: [
      { network: "bitcoin", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
      { network: "ethereum", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
    ],
    notes: "Friend",
  },
  {
    id: "2",
    name: "Bob's Coffee Shop",
    addresses: [{ network: "bitcoin-ln", address: "lnbc1..." }],
    notes: "Local coffee shop",
  },
  {
    id: "3",
    name: "Charlie",
    addresses: [{ network: "litecoin", address: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" }],
    notes: "Colleague",
  },
]

export function ContactsManager() {
  const [contacts, setContacts] = useState(initialContacts)
  const [searchQuery, setSearchQuery] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState<any>(null)
  const { toast } = useToast()

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.notes.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddContact = (newContact: any) => {
    setContacts([...contacts, { ...newContact, id: (contacts.length + 1).toString() }])
    toast({
      title: "Contact added",
      description: `${newContact.name} has been added to your contacts`,
    })
  }

  const handleEditContact = (updatedContact: any) => {
    setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))
    toast({
      title: "Contact updated",
      description: `${updatedContact.name} has been updated`,
    })
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
    toast({
      title: "Contact deleted",
      description: "The contact has been removed from your list",
    })
  }

  const openEditDialog = (contact: any) => {
    setCurrentContact(contact)
    setEditDialogOpen(true)
  }

  const getNetworkBadge = (network: string) => {
    let color = "bg-gray-100 text-gray-800"

    switch (network) {
      case "bitcoin":
        color = "bg-orange-100 text-orange-800"
        break
      case "bitcoin-ln":
        color = "bg-yellow-100 text-yellow-800"
        break
      case "ethereum":
        color = "bg-blue-100 text-blue-800"
        break
      case "litecoin":
        color = "bg-slate-100 text-slate-800"
        break
      case "monero":
        color = "bg-orange-100 text-orange-800"
        break
    }

    return (
      <Badge variant="outline" className={`${color} text-xs`}>
        {network === "bitcoin-ln" ? "Lightning" : network}
      </Badge>
    )
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Contacts</CardTitle>
            <CardDescription>Manage your saved contacts for quick payments</CardDescription>
          </div>
          <Button onClick={() => setAddDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Networks</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {contact.addresses.map((addr, idx) => (
                            <div key={idx}>{getNetworkBadge(addr.network)}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{contact.notes}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost" asChild>
                            <a href={`/send?contact=${contact.id}`}>
                              <Send className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => openEditDialog(contact)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteContact(contact.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No contacts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddContactDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onAddContact={handleAddContact} />

      {currentContact && (
        <EditContactDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          contact={currentContact}
          onEditContact={handleEditContact}
        />
      )}
    </>
  )
}
