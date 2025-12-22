"use client"

import { usePathname } from "next/navigation"
import { SessionProvider } from "next-auth/react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't show header/footer for admin routes
  const isAdminRoute = pathname?.startsWith("/admin")

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <SessionProvider>
      <Header />
      <main id="main-content" role="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </SessionProvider>
  )
}
