import { SendForm } from "@/components/transactions/send-form"
import { PageHeader } from "@/components/page-header"

export default function SendPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Send Payment" description="Send funds across multiple blockchains or via Lightning Network" />
      <div className="mx-auto max-w-2xl">
        <SendForm />
      </div>
    </div>
  )
}
