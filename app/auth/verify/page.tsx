import { VerifyForm } from "@/components/auth/verify-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function VerifyPage() {
  return (
    <AuthLayout title="Verify your account" description="Enter the verification code sent to your email or phone">
      <VerifyForm />
    </AuthLayout>
  )
}
