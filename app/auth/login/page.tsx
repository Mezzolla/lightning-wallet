import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/auth/auth-layout"
import Link from "next/link"

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" description="Enter your credentials to access your wallet">
      <LoginForm />
      <div className="mt-4 text-center text-sm">
        <Link href="/recovery" className="text-primary hover:underline">
          Recover wallet using seed phrase
        </Link>
      </div>
    </AuthLayout>
  )
}
