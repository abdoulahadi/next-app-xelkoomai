"use client"

import { Metadata } from "next"
import { motion } from "framer-motion"
import Link from "next/link"
import { Scale, Shield, FileText, Cookie, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function CookiesPage() {
  const legalPages = [
    { title: "Mentions Légales", href: "/legal/mentions-legales", icon: Scale },
    { title: "Confidentialité", href: "/legal/confidentialite", icon: Shield },
    { title: "Conditions d'utilisation", href: "/legal/conditions", icon: FileText },
    { title: "Cookies", href: "/legal/cookies", icon: Cookie, active: true },
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
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Politique de Cookies</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Informations sur l&apos;utilisation des cookies sur notre site
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
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile
                  lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos
                  actions et préférences pendant une certaine période.
                </p>
                <p>
                  Les cookies ne contiennent aucune information permettant de vous identifier personnellement,
                  mais les informations personnelles que nous stockons à votre sujet peuvent être liées aux
                  informations stockées dans les cookies et obtenues à partir de ceux-ci.
                </p>
              </div>
            </Card>

            {/* Section 2 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">2. Comment utilisons-nous les cookies ?</h2>
              <p className="text-gray-700">
                Nous utilisons des cookies pour diverses raisons détaillées ci-dessous.
                Dans la plupart des cas, il n&apos;existe pas d&apos;option standard pour désactiver les cookies
                sans désactiver complètement les fonctionnalités qu&apos;ils ajoutent à ce site.
              </p>
            </Card>

            {/* Section 3 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">3. Types de cookies utilisés</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Cookies essentiels
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Ces cookies sont strictement nécessaires au fonctionnement du site.
                    Ils ne peuvent pas être désactivés.
                  </p>
                  <ul className="text-gray-700 space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Session :</strong> maintien de votre session de navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Sécurité :</strong> protection contre les attaques CSRF</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Préférences :</strong> mémorisation de vos choix de cookies</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Cookies de performance
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Ces cookies nous permettent d&apos;analyser l&apos;utilisation du site et d&apos;améliorer ses performances.
                  </p>
                  <ul className="text-gray-700 space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Analytics :</strong> Google Analytics pour mesurer l&apos;audience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Performance :</strong> temps de chargement des pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Erreurs :</strong> détection des problèmes techniques</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Cookies fonctionnels
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Ces cookies permettent d&apos;améliorer votre expérience sur le site.
                  </p>
                  <ul className="text-gray-700 space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Préférences utilisateur :</strong> langue, région</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Interface :</strong> personnalisation de l&apos;affichage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Formulaires :</strong> mémorisation des données saisies</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Cookies marketing
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Ces cookies sont utilisés pour vous proposer des publicités pertinentes.
                  </p>
                  <ul className="text-gray-700 space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Publicité ciblée :</strong> affichage de publicités personnalisées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Remarketing :</strong> suivi des conversions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Réseaux sociaux :</strong> intégration des boutons de partage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Section 4 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">4. Cookies tiers</h2>
              <p className="text-gray-700 mb-6">
                Dans certains cas, nous utilisons également des cookies fournis par des tiers de confiance :
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Google Analytics</h3>
                  <p className="text-gray-700">
                    Nous utilisons Google Analytics pour analyser l&apos;utilisation de notre site.
                    Ces cookies collectent des informations anonymes sur la façon dont les visiteurs utilisent le site.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Réseaux sociaux</h3>
                  <p className="text-gray-700">
                    Les boutons de partage sur les réseaux sociaux peuvent déposer des cookies
                    permettant au réseau social de vous identifier.
                  </p>
                </div>
              </div>
            </Card>

            {/* Section 5 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">5. Durée de conservation</h2>
              <p className="text-gray-700 mb-4">
                La durée de conservation des cookies varie selon leur type :
              </p>
              <ul className="text-gray-700 space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span><strong>Cookies persistants :</strong> conservés de quelques jours à 13 mois maximum</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span><strong>Cookies analytics :</strong> 13 mois (Google Analytics)</span>
                </li>
              </ul>
            </Card>

            {/* Section 6 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-6">6. Gestion des cookies</h2>
              <p className="text-gray-700 mb-6">
                Vous pouvez gérer vos préférences de cookies de plusieurs façons :
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Paramètres du navigateur
                  </h3>
                  <p className="text-gray-700 mb-3">
                    La plupart des navigateurs vous permettent de :
                  </p>
                  <ul className="text-gray-700 space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span>Voir les cookies stockés et les supprimer individuellement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span>Bloquer les cookies tiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span>Bloquer les cookies de certains sites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span>Bloquer tous les cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span>Supprimer tous les cookies lors de la fermeture du navigateur</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 [background:var(--primary)] rounded-full" />
                    Liens utiles
                  </h3>
                  <ul className="text-gray-700 space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Google Chrome :</strong> chrome://settings/cookies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Mozilla Firefox :</strong> about:preferences#privacy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Safari :</strong> Préférences &gt; Confidentialité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full mt-2" />
                      <span><strong>Microsoft Edge :</strong> edge://settings/privacy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Section 7 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">7. Conséquences du refus des cookies</h2>
              <p className="text-gray-700 mb-4">
                Si vous choisissez de désactiver certains cookies :
              </p>
              <ul className="text-gray-700 space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Certaines fonctionnalités du site peuvent ne pas fonctionner correctement</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Votre expérience utilisateur peut être dégradée</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 [background:var(--primary)] rounded-full mt-2" />
                  <span>Vous devrez ressaisir vos préférences à chaque visite</span>
                </li>
              </ul>
            </Card>

            {/* Section 8 */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">8. Mises à jour</h2>
              <p className="text-gray-700">
                Cette politique de cookies peut être mise à jour régulièrement.
                Nous vous invitons à la consulter périodiquement pour rester informé de nos pratiques.
              </p>
            </Card>

            {/* Section 9 */}
            <Card className="p-6 md:p-8 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5 [border-color:var(--primary)]/20">
              <h2 className="text-2xl font-bold [color:var(--primary)] mb-4">9. Contact</h2>
              <p className="text-gray-700">
                Pour toute question concernant notre utilisation des cookies :<br />
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
