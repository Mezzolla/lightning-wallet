import { PageHeader } from "@/components/page-header"
import { HardwareWalletManager } from "@/components/hardware-wallets/hardware-wallet-manager"

export default function HardwareWalletsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hardware Wallets"
        description="Connect and manage your hardware wallets for enhanced security"
      />
      <HardwareWalletManager />
    </div>
  )
}
