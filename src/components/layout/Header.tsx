"use client"

import Link from "next/link"
import { Logo } from "@/components/common/logo"
import { MainNav } from "./navigation"
import { MobileNav } from "./mobile-nav"
import { Button } from "@/components/ui/button"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { User } from "lucide-react"

export function Header() {
  const scrolled = useScroll(10)
  const { data: session } = useSession()

  return (
    <header
      role="banner"
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md border-gray-200"
          : "bg-white border-gray-100"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <MainNav />

        <div className="flex items-center space-x-4">
          {session ? (
            <Button variant="outline" className="hidden md:inline-flex" asChild>
              <Link href="/admin">
                <User className="w-4 h-4 mr-2" />
                Profil
              </Link>
            </Button>
          ) : null}
          <Button className="hidden md:inline-flex group" asChild>
            <Link href="/contact">
              Demander une Démo
            </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
