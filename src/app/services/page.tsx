import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Globe, Palette, MessageSquare, LineChart, Network, Code } from "lucide-react"

export const metadata: Metadata = {
  title: "Services",
  description: "Découvrez nos solutions digitales sur-mesure",
}

const services = [
  {
    icon: Globe,
    title: "Développement Web",
    description: "Un site web qui vous ressemble et qui convertit ! Nous concevons des plateformes ergonomiques, rapides et adaptées à tous les écrans.",
    features: [
      "Sites vitrines responsive",
      "Applications web sur-mesure",
      "E-commerce performant",
      "Optimisation SEO",
      "Performance et vitesse",
      "Maintenance et support"
    ],
    process: [
      "Analyse de vos besoins et objectifs",
      "Conception UX/UI et maquettes",
      "Développement avec technologies modernes",
      "Tests et optimisations",
      "Mise en ligne et formation"
    ]
  },
  {
    icon: Palette,
    title: "UX/UI Design",
    description: "Boostez l'engagement avec un design pensé pour l'utilisateur ! Nous façonnons des plateformes attractives et faciles à utiliser pour maximiser l'impact de votre projet.",
    features: [
      "Recherche utilisateur",
      "Wireframes et prototypes",
      "Design d'interface moderne",
      "Design system cohérent",
      "Tests d'utilisabilité",
      "Design responsive"
    ],
    process: [
      "Audit de l'expérience actuelle",
      "Recherche utilisateur et personas",
      "Création de wireframes",
      "Design des interfaces",
      "Validation et itérations"
    ]
  },
  {
    icon: MessageSquare,
    title: "Chatbots IA",
    description: "Automatisez et améliorez votre relation client avec nos chatbots IA intelligents et réactifs. Disponibles 24/7 pour répondre efficacement à vos utilisateurs !",
    features: [
      "Chatbots conversationnels",
      "Traitement du langage naturel",
      "Intégration multicanale",
      "Disponibilité 24/7",
      "Réponses personnalisées",
      "Analytics et optimisation"
    ],
    process: [
      "Analyse de vos besoins conversationnels",
      "Design des flux de dialogue",
      "Entraînement du modèle IA",
      "Intégration sur vos plateformes",
      "Amélioration continue"
    ]
  },
  {
    icon: LineChart,
    title: "Analyse de Données",
    description: "Prenez de meilleures décisions grâce à l'intelligence des données ! Nos solutions d'analyse vous apportent des informations clés pour optimiser vos stratégies.",
    features: [
      "Tableaux de bord interactifs",
      "Analyse prédictive",
      "Business Intelligence",
      "Visualisation de données",
      "Reporting automatisé",
      "Insights actionnables"
    ],
    process: [
      "Audit de vos données existantes",
      "Nettoyage et structuration",
      "Création de dashboards",
      "Mise en place d'indicateurs clés",
      "Formation de vos équipes"
    ]
  },
  {
    icon: Network,
    title: "Installation et Maintenance de Réseaux",
    description: "Assurez la stabilité et la sécurité de votre réseau informatique ! Nos experts déploient des solutions sur mesure pour garantir une connectivité fluide et efficace.",
    features: [
      "Architecture réseau sécurisée",
      "Configuration serveurs",
      "Virtualisation",
      "Pare-feu et sécurité",
      "Maintenance préventive",
      "Support technique 24/7"
    ],
    process: [
      "Audit de l'infrastructure existante",
      "Conception de l'architecture réseau",
      "Installation et configuration",
      "Tests de sécurité et performance",
      "Maintenance et monitoring continu"
    ]
  },
  {
    icon: Code,
    title: "Solutions sur Mesure",
    description: "Des solutions digitales personnalisées pour répondre à vos besoins spécifiques. De l'idée à la réalisation, nous vous accompagnons dans votre transformation numérique.",
    features: [
      "Applications métier",
      "APIs et intégrations",
      "Automatisation de processus",
      "Solutions cloud",
      "Migration de données",
      "Consulting technique"
    ],
    process: [
      "Analyse approfondie de vos besoins",
      "Conception de la solution",
      "Développement agile",
      "Tests et validation",
      "Déploiement et accompagnement"
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative bg-black py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=80"
            alt="Services digitaux"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Nos Services</h1>
            <p className="text-xl text-gray-200">
              Des solutions digitales complètes pour transformer 
              votre entreprise et accélérer votre croissance
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 container mx-auto px-4">
        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="flex-1">
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-3xl">{service.title}</CardTitle>
                      <CardDescription className="text-lg text-gray-600">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3">Fonctionnalités :</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full [background:var(--primary)] mr-2 mt-1.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button asChild>
                        <Link href="/contact">Demander un devis</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex-1">
                  <div className="[background:var(--gray-light)] p-8 rounded-xl">
                    <h3 className="text-2xl font-semibold mb-6">Notre Processus</h3>
                    <ol className="space-y-4">
                      {service.process.map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-bold text-sm">
                            {i + 1}
                          </div>
                          <p className="text-gray-600 pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à démarrer votre projet digital ?
          </h2>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour une consultation gratuite et découvrez comment 
            nous pouvons vous aider à atteindre vos objectifs
          </p>
          <Button size="lg" variant="outline" className="bg-white [color:var(--primary)] hover:bg-gray-100 border-0 shadow-lg font-semibold" asChild>
            <Link href="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
