import { PageHeader } from "@/components/page-header"
import { TransactionsTable } from "@/components/transactions/transactions-table"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="View and manage your transaction history across all blockchains" />
      <TransactionsTable />
    </div>
  )
}
