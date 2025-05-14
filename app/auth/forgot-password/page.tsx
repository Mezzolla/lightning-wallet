import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Forgot password" description="Enter your email to reset your password">
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
