"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { List } from "lucide-react"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from article content
    const articleContent = document.querySelector(".article-content")
    if (!articleContent) return

    const headingElements = articleContent.querySelectorAll("h2, h3")
    const headingsData: Heading[] = []

    headingElements.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`
      if (!heading.id) {
        heading.id = id
      }

      headingsData.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.substring(1)),
      })
    })

    setHeadings(headingsData)

    // Set up intersection observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 1,
      }
    )

    headingElements.forEach((heading) => observer.observe(heading))

    return () => {
      headingElements.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  if (headings.length === 0) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <List className="w-5 h-5" />
          Table des matières
        </CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => handleClick(heading.id)}
              className={cn(
                "block text-left text-sm transition-colors w-full py-1 px-2 rounded hover:bg-gray-100",
                heading.level === 3 && "pl-6",
                activeId === heading.id
                  ? "[color:var(--primary)] font-medium [background:var(--primary)]/5"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
