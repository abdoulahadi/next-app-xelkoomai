"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background avec image */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&q=80"
          alt="Technology background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Gradient overlay subtil */}
      <div className="absolute inset-0 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 via-transparent to-[var(--secondary)]/5" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu textuel */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 [background:var(--gray-light)] border [border-color:var(--primary)]/20 [color:var(--primary)] px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Solutions Digitales & IA</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Votre Partenaire <span className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">Digital & IA</span> au Sénégal
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Développement web, UX/UI design, chatbots IA et analyse de données. 
              Faire de l&apos;IA une réalité concrète et accessible à tous les Sénégalais.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button size="lg" asChild className="group">
                <Link href="/contact">
                  Demander une Démo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Découvrir nos Solutions</Link>
              </Button>
            </motion.div>

            {/* Statistiques */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { value: "4+", label: "Projets réalisés" },
                { value: "98%", label: "Satisfaction client" },
                { value: "24/7", label: "Support dédié" },
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-default">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image principale */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=1000&fit=crop&q=80"
                alt="Intelligence Artificielle - Technologie moderne"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t [--tw-gradient-from:var(--primary)]/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-black">100%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
