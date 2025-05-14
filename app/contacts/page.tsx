import { PageHeader } from "@/components/page-header"
import { ContactsManager } from "@/components/contacts/contacts-manager"

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Contacts" description="Manage your saved contacts for quick payments" />
      <ContactsManager />
    </div>
  )
}
