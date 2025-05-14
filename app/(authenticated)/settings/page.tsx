import { PageHeader } from "@/components/page-header"
import { SettingsTabs } from "@/components/settings/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your wallet settings and preferences" />
      <SettingsTabs />
    </div>
  )
}
