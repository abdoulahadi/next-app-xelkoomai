"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SessionUser } from "@/types/user"

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    user: session?.user as SessionUser | undefined,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    session,
  }
}

export function useRequireAuth(redirectTo = "/admin/login") {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  return { isAuthenticated, isLoading }
}
