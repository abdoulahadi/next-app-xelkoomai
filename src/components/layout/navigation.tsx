"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { mainNav } from "@/config/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale"
      className="hidden md:flex items-center space-x-8 text-sm font-medium"
    >
      {mainNav.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "transition-all duration-200 relative group",
              isActive
                ? "[color:var(--primary)]"
                : "text-gray-700 [&:hover]:[color:var(--primary)]"
            )}
          >
            {item.title}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -bottom-1 left-0 h-0.5 [background:var(--primary)] transition-all duration-300",
                isActive ? "w-full" : "w-0 group-hover:w-full"
              )}
            />
          </Link>
        )
      })}
    </nav>
  )
}
