"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, ArrowRight } from "lucide-react"

export function UseCasesHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5" />
      <div className="absolute -top-40 -right-40 w-80 h-80 [background:var(--primary)]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 [background:var(--secondary)]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border [border-color:var(--primary)]/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 [color:var(--primary)]" />
            <span className="text-sm font-medium [color:var(--primary)]">Cas d&apos;Usage</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nos{" "}
            <span className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
              Réalisations
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez nos applications innovantes dédiées au secteur agricole,
            conçues pour accompagner les acteurs du terrain au quotidien
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">
                <Zap className="w-5 h-5 mr-2" />
                Démarrer un projet
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                Nos services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
