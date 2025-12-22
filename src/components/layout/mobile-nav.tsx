"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User } from "lucide-react"
import { mainNav } from "@/config/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open])

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="hover:bg-gray-100"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-16 z-40 bg-black/50 md:hidden animate-in fade-in duration-200"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div
            id="mobile-navigation"
            className="fixed inset-0 top-16 z-50 bg-white p-6 shadow-lg md:hidden animate-in slide-in-from-top duration-200 overflow-y-auto"
          >
            <nav
              role="navigation"
              aria-label="Navigation mobile"
              className="flex flex-col space-y-4"
            >
            {mainNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    isActive
                      ? "[color:var(--primary)]"
                      : "text-gray-700 [&:hover]:[color:var(--primary)]"
                  )}
                >
                  {item.title}
                </Link>
              )
            })}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {session && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin" onClick={() => setOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Profil
                  </Link>
                </Button>
              )}
              <Button className="w-full" asChild>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Demander une Démo
                </Link>
              </Button>
            </div>
          </nav>
        </div>
        </>
      )}
    </div>
  )
}
