"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Plus, Bell, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()

  // Generate breadcrumb from pathname
  const generateBreadcrumb = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs = [{ name: "Admin", href: "/admin" }]

    let currentPath = ""
    for (let i = 1; i < paths.length; i++) {
      currentPath += `/${paths[i]}`
      const name = paths[i].charAt(0).toUpperCase() + paths[i].slice(1)
      breadcrumbs.push({
        name: name.replace(/-/g, " "),
        href: `/admin${currentPath}`,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumb()
  const isArticlesPage = pathname.includes("/articles")

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm flex-1 min-w-0">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                )}
                <Link
                  href={crumb.href}
                  className={
                    index === breadcrumbs.length - 1
                      ? "font-medium text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }
                >
                  {crumb.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Open Site Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href="/" target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Voir le site</span>
              </Link>
            </Button>

            {isArticlesPage && pathname === "/admin/articles" && (
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] hidden sm:inline-flex"
              >
                <Link href="/admin/articles/new">
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Nouvel article</span>
                  <span className="md:hidden">Nouveau</span>
                </Link>
              </Button>
            )}

            {/* Notifications (placeholder) */}
            <Button variant="ghost" size="sm" className="relative hidden sm:inline-flex">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
