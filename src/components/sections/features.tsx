"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Shield, Rocket } from "lucide-react"
import { useIntersection } from "@/hooks/use-intersection"
import { useRef } from "react"

const features = [
  {
    icon: Brain,
    title: "IA Avancée",
    description: "Solutions d'intelligence artificielle de pointe utilisant les dernières technologies ML et Deep Learning pour résoudre vos défis les plus complexes"
  },
  {
    icon: Zap,
    title: "Performance Optimale",
    description: "Systèmes hautement performants et scalables conçus pour répondre à vos besoins les plus exigeants avec une efficacité maximale"
  },
  {
    icon: Shield,
    title: "Sécurité Garantie",
    description: "Protection maximale de vos données avec les meilleurs standards de sécurité internationaux et conformité RGPD complète"
  },
  {
    icon: Rocket,
    title: "Innovation Continue",
    description: "Recherche et développement constant pour vous offrir les solutions les plus innovantes et rester à la pointe de la technologie"
  }
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(sectionRef, { threshold: 0.1 })

  return (
    <section ref={sectionRef} className="py-24 [background:var(--gray-light)]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Pourquoi choisir <span className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Xelkoom-AI</span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Une expertise reconnue et des solutions sur-mesure pour propulser votre entreprise vers le futur
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:[border-color:var(--primary)]/30 transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-black">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
