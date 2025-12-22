"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isLoading, isAuthenticated } = useAuth()
  const isLoginPage = pathname === "/admin/login"

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin [color:var(--primary)]" />
      </div>
    )
  }

  // Login page has its own layout
  if (isLoginPage) {
    return <>{children}</>
  }

  // Admin interface with sidebar
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
