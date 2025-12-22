"use client"

import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Linkedin, Twitter, Github } from "lucide-react"

export function SocialLinks() {
  const socials = [
    { name: "LinkedIn", icon: Linkedin, href: siteConfig.links.linkedin },
    { name: "Twitter", icon: Twitter, href: siteConfig.links.twitter },
    { name: "GitHub", icon: Github, href: siteConfig.links.github },
  ]

  return (
    <div className="flex items-center space-x-4">
      {socials.map((social) => {
        const Icon = social.icon
        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:[color:var(--primary)] transition-colors duration-300 transform hover:scale-110"
            aria-label={social.name}
          >
            <Icon className="w-5 h-5" />
          </Link>
        )
      })}
    </div>
  )
}
