import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BalanceSummary } from "@/components/dashboard/balance-summary"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { LightningChannels } from "@/components/lightning/lightning-channels"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { OnboardingBanner } from "@/components/onboarding/onboarding-banner"

export default function Home() {
  return (
    <div className="space-y-6">
      <OnboardingBanner />
      <DashboardHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BalanceSummary />
        <QuickActions />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecentTransactions />
        <LightningChannels />
      </div>
    </div>
  )
}
