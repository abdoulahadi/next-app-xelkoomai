"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Globe, Palette, MessageSquare } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { useIntersection } from "@/hooks/use-intersection"

const services = [
  {
    icon: Globe,
    title: "Développement Web",
    description: "Un site web qui vous ressemble et qui convertit ! Nous concevons des plateformes ergonomiques, rapides et adaptées à tous les écrans.",
    features: ["Sites responsive", "Applications web", "E-commerce"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop&q=80"
  },
  {
    icon: Palette,
    title: "UX/UI Design",
    description: "Boostez l'engagement avec un design pensé pour l'utilisateur ! Nous façonnons des plateformes attractives et faciles à utiliser.",
    features: ["Design moderne", "Prototypage", "Tests utilisateur"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&q=80"
  },
  {
    icon: MessageSquare,
    title: "Chatbots IA",
    description: "Automatisez et améliorez votre relation client avec nos chatbots IA intelligents et réactifs. Disponibles 24/7 !",
    features: ["Disponibilité 24/7", "IA conversationnelle", "Multicanal"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&q=80"
  }
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(sectionRef, { threshold: 0.1 })

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Nos Services
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Des solutions digitales complètes pour transformer votre entreprise et booster votre présence en ligne
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="h-full overflow-hidden group hover:[border-color:var(--primary)]/30 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-black">{service.title}</CardTitle>
                    <CardDescription className="text-base text-gray-700">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full [background:var(--primary)] mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full group/btn" asChild>
                      <Link href="/services">
                        En savoir plus
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button size="lg" asChild className="group">
            <Link href="/services">
              Voir tous nos services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
