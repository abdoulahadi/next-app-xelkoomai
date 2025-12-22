"use client"

import Link from "next/link"
import { Logo } from "@/components/common/logo"
import { footerNav } from "@/config/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSettings } from "@/contexts/settings-context"
import { Twitter, Facebook, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const settings = useSettings()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription based on settings.newsletterProvider
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer role="contentinfo" className="border-t [background:var(--gray-light)]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 italic">
              {settings.siteDescription}
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              {settings.contactEmail && (
                <p className="flex items-center gap-2">
                  <span className="font-semibold">✉️</span> {settings.contactEmail}
                </p>
              )}
              {settings.contactPhone && (
                <p className="flex items-center gap-2">
                  <span className="font-semibold">📞</span> {settings.contactPhone}
                </p>
              )}
            </div>
            {/* Social Links */}
            <div className="flex space-x-4" role="group" aria-label="Réseaux sociaux">
              {settings.twitterHandle && (
                <a
                  href={`https://twitter.com/${settings.twitterHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-gray-600 hover:[color:var(--primary)] transition-colors"
                >
                  <Twitter className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-600 hover:[color:var(--primary)] transition-colors"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-600 hover:[color:var(--primary)] transition-colors"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-600 hover:[color:var(--primary)] transition-colors"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Entreprise</h3>
            <ul className="space-y-2">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:[color:var(--primary)] transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Services</h3>
            <ul className="space-y-2">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:[color:var(--primary)] transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          {settings.newsletterEnabled && (
            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">
                Restez informés de nos dernières innovations
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Adresse email pour la newsletter
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                />
                <Button type="submit" className="w-full" size="sm">
                  S&apos;inscrire
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} {settings.siteName}. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-gray-600 hover:[color:var(--primary)] transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
