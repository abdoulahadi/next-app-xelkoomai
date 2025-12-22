"use client"

import { SessionProvider } from "next-auth/react"
import { AdminShell } from "@/components/admin/AdminShell"
import { Toaster } from "@/components/admin/Toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
      <Toaster />
    </SessionProvider>
  )
}
