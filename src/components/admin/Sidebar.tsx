"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  Sparkles,
  MessageSquare,
  Shield,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Articles", href: "/admin/articles", icon: FileText },
  { name: "Réalisations", href: "/admin/realizations", icon: Sparkles },
  { name: "Commentaires", href: "/admin/comments", icon: MessageSquare },
  { name: "Médias", href: "/admin/media", icon: ImageIcon },
  { name: "Réglages", href: "/admin/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isAdmin = user?.role === "ADMIN"

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Fermer le menu admin" : "Ouvrir le menu admin"}
          aria-expanded={isMobileOpen}
          aria-controls="admin-sidebar"
          className="bg-white shadow-md hover:bg-gray-50 min-w-[44px] min-h-[44px]"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        role="navigation"
        aria-label="Menu d'administration"
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Xelkoom-AI</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              // Hide Users menu if not admin
              if (item.name === "Utilisateurs" && !isAdmin) {
                return null
              }

              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}

            {isAdmin && (
              <>
                <Link
                  href="/admin/users"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    pathname === "/admin/users"
                      ? "bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Users className="w-5 h-5" />
                  Utilisateurs
                </Link>
                <Link
                  href="/admin/audit"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    pathname === "/admin/audit"
                      ? "bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Shield className="w-5 h-5" />
                  Logs d'Audit
                </Link>
              </>
            )}
          </nav>

          {/* User profile */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || user?.email}
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start lg:hidden"
              asChild
            >
              <Link href="/" target="_blank" onClick={() => setIsMobileOpen(false)}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Voir le site
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
