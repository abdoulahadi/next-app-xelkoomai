"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Scale, Shield, FileText, Cookie, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ConfidentialitePage() {
  const legalPages = [
    { title: "Mentions Légales", href: "/legal/mentions-legales", icon: Scale },
    { title: "Confidentialité", href: "/legal/confidentialite", icon: Shield, active: true },
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Politique de Confidentialité</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Protection de vos données personnelles et respect de votre vie privée
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
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">1. Introduction</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Xelkoom-AI accorde une grande importance à la protection de vos données personnelles.
                  Cette politique de confidentialité explique comment nous collectons, utilisons,
                  partageons et protégeons vos informations personnelles.
                </p>
                <p>
                  En utilisant notre site web et nos services, vous acceptez les pratiques décrites
                  dans cette politique de confidentialité.
                </p>
              </div>
            </Card>

            {/* Section 2 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">2. Données collectées</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Données que vous nous fournissez
                  </h3>
                  <ul className="text-gray-700 space-y-2 pl-4">
                    <li>Informations d'identification (nom, prénom, email)</li>
                    <li>Informations professionnelles (entreprise, fonction)</li>
                    <li>Données de contact (téléphone, adresse)</li>
                    <li>Contenu des messages et demandes envoyés via nos formulaires</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Données collectées automatiquement
                  </h3>
                  <ul className="text-gray-700 space-y-2 pl-4">
                    <li>Adresse IP</li>
                    <li>Type de navigateur et système d'exploitation</li>
                    <li>Pages visitées et temps passé sur le site</li>
                    <li>Données de navigation (cookies)</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Section 3 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">3. Utilisation des données</h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons vos données personnelles pour :
              </p>
              <ul className="text-gray-700 space-y-2 pl-4">
                <li>Répondre à vos demandes et vous fournir nos services</li>
                <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Analyser l'utilisation de notre site</li>
                <li>Respecter nos obligations légales</li>
                <li>Détecter et prévenir la fraude</li>
              </ul>
            </Card>

            {/* Section 4 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">4. Base légale du traitement</h2>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, nous traitons vos données personnelles sur les bases suivantes :
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Consentement :</strong> pour l'envoi de communications marketing</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Exécution du contrat :</strong> pour fournir nos services</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Intérêt légitime :</strong> pour améliorer nos services et prévenir la fraude</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Obligation légale :</strong> pour respecter nos obligations réglementaires</p>
                </div>
              </div>
            </Card>

            {/* Section 5 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">5. Partage des données</h2>
              <p className="text-gray-700 mb-4">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données avec :
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Prestataires de services :</strong> hébergement, analytics, marketing</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Autorités légales :</strong> si requis par la loi</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Partenaires commerciaux :</strong> avec votre consentement explicite</p>
                </div>
              </div>
            </Card>

            {/* Section 6 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">6. Sécurité des données</h2>
              <p className="text-gray-700 mb-4">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :
              </p>
              <ul className="text-gray-700 space-y-2 pl-4">
                <li>Chiffrement SSL/TLS pour toutes les transmissions</li>
                <li>Stockage sécurisé des données</li>
                <li>Accès limité aux données personnelles</li>
                <li>Audits de sécurité réguliers</li>
                <li>Formation du personnel à la protection des données</li>
              </ul>
            </Card>

            {/* Section 7 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">7. Conservation des données</h2>
              <p className="text-gray-700">
                Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux
                finalités pour lesquelles elles ont été collectées, ou conformément aux obligations légales.
              </p>
            </Card>

            {/* Section 8 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">8. Vos droits</h2>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Droit d'accès :</strong> obtenir une copie de vos données</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Droit de rectification :</strong> corriger vos données inexactes</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Droit à l'effacement :</strong> demander la suppression de vos données</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Droit à la limitation :</strong> limiter le traitement de vos données</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <p className="text-gray-700"><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</p>
                </div>
              </div>
              <p className="text-gray-700">
                Pour exercer vos droits, contactez-nous à : <strong>privacy@xelkoom-ai.com</strong>
              </p>
            </Card>

            {/* Section 9 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">9. Cookies</h2>
              <p className="text-gray-700">
                Notre site utilise des cookies pour améliorer votre expérience. Pour plus d'informations,
                consultez notre <Link href="/legal/cookies" className="[color:var(--primary)] hover:underline font-medium">politique de cookies</Link>.
              </p>
            </Card>

            {/* Section 10 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">10. Modifications</h2>
              <p className="text-gray-700">
                Nous pouvons modifier cette politique de confidentialité à tout moment.
                Les modifications seront publiées sur cette page avec une date de mise à jour.
              </p>
            </Card>

            {/* Section 11 */}
            <Card className="p-6 md:p-8 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5 [border-color:var(--primary)]/20">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">11. Contact</h2>
              <p className="text-gray-700">
                Pour toute question concernant cette politique de confidentialité :<br />
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
