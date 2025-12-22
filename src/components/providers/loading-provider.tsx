"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Loader, PageLoader } from "@/components/ui/loader"
import { AnimatePresence, motion } from "framer-motion"

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPageTransition, setIsPageTransition] = useState(false)
  const pathname = usePathname()

  // Initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Durée du loader initial

    return () => clearTimeout(timer)
  }, [])

  // Page transitions
  useEffect(() => {
    if (!isLoading) {
      setIsPageTransition(true)
      const timer = setTimeout(() => {
        setIsPageTransition(false)
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [pathname, isLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {isPageTransition && <PageLoader />}

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
