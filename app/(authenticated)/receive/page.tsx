import { ReceiveOptions } from "@/components/transactions/receive-options"
import { PageHeader } from "@/components/page-header"

export default function ReceivePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Receive Payment" description="Generate addresses or Lightning invoices to receive funds" />
      <div className="mx-auto max-w-2xl">
        <ReceiveOptions />
      </div>
    </div>
  )
}
