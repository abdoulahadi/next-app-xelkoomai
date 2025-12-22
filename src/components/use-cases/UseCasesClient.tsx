"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ExternalLink, Sparkles } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface Realization {
  id: string
  title: string
  description: string
  benefits: string[]
  image: string
  link: string | null
  icon: string
}

interface UseCasesClientProps {
  realizations: Realization[]
}

export function UseCasesClient({ realizations }: UseCasesClientProps) {
  // Function to get icon component by name
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName]
    return Icon || Sparkles
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {realizations.map((realization, index) => {
            const IconComponent = getIcon(realization.icon)

            return (
              <motion.div
                key={realization.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={realization.image}
                      alt={realization.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 p-3 bg-white rounded-lg">
                      <IconComponent className="w-6 h-6 [color:var(--primary)]" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:[color:var(--primary)] transition-colors">
                    {realization.title}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {realization.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {realization.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 [color:var(--primary)] flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {realization.link && (
                    <Button
                      className="w-full bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)]"
                      asChild
                    >
                      <Link href={realization.link} target="_blank" rel="noopener noreferrer">
                        Visiter l'application
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        {realizations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune réalisation disponible pour le moment</p>
          </div>
        )}
      </div>
    </section>
  )
}
