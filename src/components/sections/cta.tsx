"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { useIntersection } from "@/hooks/use-intersection"

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(sectionRef, { threshold: 0.1 })

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=600&fit=crop&q=80"
          alt="Technology pattern"
          fill
          className="object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl mb-10 opacity-95 leading-relaxed max-w-2xl mx-auto">
            Discutons de votre projet et découvrez comment nos solutions IA peuvent 
            propulser votre business vers de nouveaux sommets.
          </p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white [color:var(--primary)] hover:bg-gray-100 border-0 font-semibold shadow-lg group"
              asChild
            >
              <Link href="/contact">
                <Mail className="mr-2 w-5 h-5" />
                Contactez-nous
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold backdrop-blur-sm"
              asChild
            >
              <Link href="/services">
                Découvrir nos solutions
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-12 pt-12 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-sm opacity-90 mb-3 font-medium">Contactez-nous directement</p>
            <a 
              href="mailto:contact@xelkoomai.sn" 
              className="text-lg md:text-xl font-semibold hover:underline inline-flex items-center group"
            >
              contact@xelkoomai.sn
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
