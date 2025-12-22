"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 [background:var(--primary)]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 [background:var(--secondary)]/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center px-4 relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[10rem] md:text-[12rem] font-bold bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent leading-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Page non trouvée
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="group">
              <Link href="/">
                <Home className="mr-2 w-5 h-5" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="group">
              <Link href="/services">
                <Search className="mr-2 w-5 h-5" />
                Découvrir nos services
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-sm text-gray-500">
            Besoin d&apos;aide ? <Link href="/contact" className="[color:var(--primary)] hover:underline font-medium">Contactez-nous</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
