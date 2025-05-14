import type React from "react"
import Link from "next/link"
import { Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Zap className="h-5 w-5" />
          <span>Lightning Wallet</span>
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex-1">
        <div className="container flex h-full max-w-md flex-col items-center justify-center py-12">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
