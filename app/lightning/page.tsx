import { PageHeader } from "@/components/page-header"
import { LightningDashboard } from "@/components/lightning/lightning-dashboard"

export default function LightningPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Lightning Network" description="Manage your Lightning Network channels and payments" />
      <LightningDashboard />
    </div>
  )
}
