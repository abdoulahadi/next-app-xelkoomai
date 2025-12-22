"use client"

import { Metadata } from "next"
import { motion } from "framer-motion"
import Link from "next/link"
import { Scale, Shield, FileText, Cookie, ArrowLeft, Mail, Phone, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { siteConfig } from "@/config/site"

export default function MentionsLegalesPage() {
  const legalPages = [
    { title: "Mentions Légales", href: "/legal/mentions-legales", icon: Scale, active: true },
    { title: "Confidentialité", href: "/legal/confidentialite", icon: Shield },
    { title: "Conditions d'utilisation", href: "/legal/conditions", icon: FileText },
    { title: "Cookies", href: "/legal/cookies", icon: Cookie },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5">
        <div className="absolute -top-40 -right-40 w-80 h-80 [background:var(--primary)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 [background:var(--secondary)]/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:[color:var(--primary)] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] rounded-2xl flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Mentions Légales</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Informations légales et réglementaires concernant Xelkoom-AI
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-4 sticky top-24">
              <h3 className="font-semibold mb-4 text-gray-900">Pages légales</h3>
              <nav className="space-y-2">
                {legalPages.map((page) => {
                  const Icon = page.icon
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        page.active
                          ? "[background:var(--primary)] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{page.title}</span>
                    </Link>
                  )
                })}
              </nav>
            </Card>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Section 1 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">1. Informations légales</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Éditeur du site
                  </h3>
                  <div className="text-gray-700 space-y-1 pl-4">
                    <p><strong>Nom de l'entreprise :</strong> {siteConfig.name}</p>
                    <p><strong>Email :</strong> {siteConfig.contact.email}</p>
                    <p><strong>Téléphone :</strong> {siteConfig.contact.phone}</p>
                    <p><strong>Adresse :</strong> {siteConfig.contact.address}</p>
                  </div>
                </div>
{/* 
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Hébergement
                  </h3>
                  <div className="text-gray-700 space-y-1 pl-4">
                    <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                    <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723</p>
                    <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="[color:var(--primary)] hover:underline">https://vercel.com</a></p>
                  </div>
                </div> */}
              </div>
            </Card>

            {/* Section 2 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">2. Propriété intellectuelle</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphiques, etc.) 
                  est la propriété exclusive de Xelkoom-AI ou de ses partenaires.
                </p>
                <p>
                  Toute reproduction, distribution, modification, adaptation, retransmission ou publication 
                  de ces différents éléments est strictement interdite sans l'accord exprès par écrit de Xelkoom-AI.
                </p>
              </div>
            </Card>

            {/* Section 3 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">3. Responsabilité</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Xelkoom-AI s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées 
                  sur ce site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu.
                </p>
                <p>
                  En conséquence, Xelkoom-AI décline toute responsabilité pour toute imprécision, 
                  inexactitude ou omission portant sur des informations disponibles sur ce site.
                </p>
              </div>
            </Card>

            {/* Section 4 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">4. Droit applicable</h2>
              <p className="text-gray-700 mb-4">
                Les présentes mentions légales sont régies par le droit français.
              </p>
              <p className="text-gray-700">
                En cas de litige et à défaut d'accord amiable, le litige sera porté devant les 
                tribunaux français conformément aux règles de compétence en vigueur.
              </p>
            </Card>

            {/* Contact Card */}
            <Card className="p-6 md:p-8 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5 [border-color:var(--primary)]/20">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">Nous contacter</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 [color:var(--primary)] mt-1" />
                  <div>
                    <p className="font-medium text-sm text-gray-600">Email</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="[color:var(--primary)] hover:underline">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 [color:var(--primary)] mt-1" />
                  <div>
                    <p className="font-medium text-sm text-gray-600">Téléphone</p>
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="[color:var(--primary)] hover:underline">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 [color:var(--primary)] mt-1" />
                  <div>
                    <p className="font-medium text-sm text-gray-600">Adresse</p>
                    <p className="text-gray-700">{siteConfig.contact.address}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Last Updated */}
            <p className="text-sm text-gray-500 text-center pt-4">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
