import { PageHeader } from "@/components/page-header"
import { BackupWallet } from "@/components/settings/backup-wallet"

export default function BackupPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Backup Wallet" description="Securely backup your wallet with a recovery seed phrase" />
      <BackupWallet />
    </div>
  )
}
