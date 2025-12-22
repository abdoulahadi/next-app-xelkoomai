"use client"

import { useEffect, useState } from "react"

export function SkipLinks() {
  const [links, setLinks] = useState<Array<{ href: string; text: string }>>([])

  useEffect(() => {
    // Detect available landmarks on the page
    const availableLinks: Array<{ href: string; text: string }> = []

    if (document.getElementById("main-content")) {
      availableLinks.push({ href: "#main-content", text: "Aller au contenu principal" })
    }

    if (document.getElementById("main-navigation")) {
      availableLinks.push({ href: "#main-navigation", text: "Aller à la navigation" })
    }

    if (document.querySelector("footer")) {
      availableLinks.push({ href: "#footer", text: "Aller au pied de page" })
    }

    setLinks(availableLinks)
  }, [])

  if (links.length === 0) return null

  return (
    <div className="sr-only focus-within:not-sr-only">
      <nav
        aria-label="Liens d'accès rapide"
        className="fixed top-0 left-0 right-0 z-[9999] [background:var(--primary)] text-white shadow-xl"
      >
        <ul className="flex gap-4 p-4 justify-center">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-block px-6 py-3 bg-white [color:var(--primary)] font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white transition-all"
                onClick={(e) => {
                  e.preventDefault()
                  const target = document.querySelector(link.href)
                  if (target) {
                    target.setAttribute("tabindex", "-1")
                    ;(target as HTMLElement).focus()
                    target.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
