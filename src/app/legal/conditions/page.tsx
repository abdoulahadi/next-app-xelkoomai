"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Scale, Shield, FileText, Cookie, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ConditionsPage() {
  const legalPages = [
    { title: "Mentions Légales", href: "/legal/mentions-legales", icon: Scale },
    { title: "Confidentialité", href: "/legal/confidentialite", icon: Shield },
    { title: "Conditions d'utilisation", href: "/legal/conditions", icon: FileText, active: true },
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
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Conditions Générales d&apos;Utilisation</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Conditions d&apos;accès et d&apos;utilisation de nos services
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
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">1. Objet</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et
                  l&apos;utilisation du site web de Xelkoom-AI et de ses services.
                </p>
                <p>
                  En accédant au site, vous acceptez sans réserve les présentes CGU.
                  Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce site.
                </p>
              </div>
            </Card>

            {/* Section 2 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">2. Accès au site</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  L&apos;accès au site est gratuit. Toutefois, Xelkoom-AI se réserve le droit de
                  restreindre l&apos;accès à certaines parties du site.
                </p>
                <p className="font-medium">Vous êtes responsable de :</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                    <span>La protection de vos identifiants de connexion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                    <span>Toute activité effectuée via votre compte</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                    <span>La notification immédiate de toute utilisation non autorisée</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Section 3 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">3. Services proposés</h2>
              <p className="text-gray-700 mb-4">
                Xelkoom-AI propose les services suivants :
              </p>
              <ul className="text-gray-700 space-y-2 pl-4 mb-4">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Consultation d&apos;informations sur nos solutions d&apos;intelligence artificielle</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Demande de devis et de contact</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Inscription à notre newsletter</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Accès à notre blog et ressources</span>
                </li>
              </ul>
              <p className="text-gray-700">
                Xelkoom-AI s&apos;efforce de maintenir le site accessible en permanence,
                mais ne peut garantir une disponibilité continue.
              </p>
            </Card>

            {/* Section 4 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">4. Obligations de l&apos;utilisateur</h2>
              <p className="text-gray-700 mb-4">
                En utilisant ce site, vous vous engagez à :
              </p>
              <ul className="text-gray-700 space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Fournir des informations exactes et à jour</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Ne pas utiliser le site à des fins illégales ou non autorisées</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Ne pas porter atteinte aux droits de propriété intellectuelle</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Ne pas tenter de perturber le fonctionnement du site</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Ne pas diffuser de virus ou tout code malveillant</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Respecter les droits des autres utilisateurs</span>
                </li>
              </ul>
            </Card>

            {/* Section 5 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">5. Propriété intellectuelle</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Tous les éléments du site (textes, images, graphismes, logo, icônes, sons, logiciels)
                  sont la propriété exclusive de Xelkoom-AI ou de ses partenaires.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou
                  partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite,
                  sauf autorisation écrite préalable de Xelkoom-AI.
                </p>
              </div>
            </Card>

            {/* Section 6 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">6. Données personnelles</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Xelkoom-AI s&apos;engage à respecter la confidentialité de vos données personnelles
                  conformément au RGPD.
                </p>
                <p>
                  Pour plus d&apos;informations, consultez notre{" "}
                  <Link href="/legal/confidentialite" className="[color:var(--primary)] hover:underline font-medium">
                    politique de confidentialité
                  </Link>.
                </p>
              </div>
            </Card>

            {/* Section 7 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">7. Responsabilité</h2>
              <p className="text-gray-700 mb-4">
                Xelkoom-AI ne peut être tenu responsable :
              </p>
              <ul className="text-gray-700 space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Des interruptions ou dysfonctionnements du site</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Des dommages directs ou indirects résultant de l&apos;utilisation du site</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Du contenu des sites externes vers lesquels pointent nos liens</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>De l&apos;utilisation frauduleuse de vos identifiants</span>
                </li>
              </ul>
            </Card>

            {/* Section 8 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">8. Liens hypertextes</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Le site peut contenir des liens vers des sites tiers. Xelkoom-AI n&apos;exerce aucun
                  contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
                <p>
                  La création de liens hypertextes vers le site nécessite l&apos;autorisation préalable
                  écrite de Xelkoom-AI.
                </p>
              </div>
            </Card>

            {/* Section 9 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">9. Cookies</h2>
              <p className="text-gray-700">
                Le site utilise des cookies pour améliorer l&apos;expérience utilisateur.
                Pour plus d&apos;informations, consultez notre{" "}
                <Link href="/legal/cookies" className="[color:var(--primary)] hover:underline font-medium">
                  politique de cookies
                </Link>.
              </p>
            </Card>

            {/* Section 10 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">10. Modification des CGU</h2>
              <p className="text-gray-700">
                Xelkoom-AI se réserve le droit de modifier les présentes CGU à tout moment.
                Les modifications entrent en vigueur dès leur publication sur le site.
                Il est conseillé de consulter régulièrement cette page.
              </p>
            </Card>

            {/* Section 11 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">11. Droit applicable et juridiction</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les présentes CGU sont régies par le droit français.
                </p>
                <p>
                  En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
                  À défaut, les tribunaux français seront seuls compétents.
                </p>
              </div>
            </Card>

            {/* Section 12 */}
            <Card className="p-6 md:p-8 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5 [border-color:var(--primary)]/20">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">12. Contact</h2>
              <p className="text-gray-700">
                Pour toute question concernant ces CGU :<br />
                <strong>Email :</strong> contact@xelkoomai.sn<br />
                <strong>Adresse :</strong> Mbour 4, Thiès | Sénégal
              </p>
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
