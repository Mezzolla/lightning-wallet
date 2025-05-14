import { RegisterForm } from "@/components/auth/register-form"
import { AuthLayout } from "@/components/auth/auth-layout"

export default function RegisterPage() {
  return (
    <AuthLayout title="Create an account" description="Enter your details to create a new wallet">
      <RegisterForm />
    </AuthLayout>
  )
}
