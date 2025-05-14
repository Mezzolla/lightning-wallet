import { RecoveryForm } from "@/components/recovery/recovery-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function RecoveryPage() {
  return (
    <AuthLayout title="Recover Wallet" description="Restore your wallet using your backup seed phrase">
      <RecoveryForm />
    </AuthLayout>
  )
}
