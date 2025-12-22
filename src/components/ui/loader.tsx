"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface LoaderProps {
  fullScreen?: boolean
}

export function Loader({ fullScreen = true }: LoaderProps) {
  return (
    <div
      className={`${
        fullScreen ? "fixed inset-0 z-50" : "relative w-full h-full"
      } bg-white flex items-center justify-center`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 [background:var(--primary)]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 [background:var(--secondary)]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Logo and spinner */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with pulse animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-24 h-24">
            <Image
              src="/logo-icone.png"
              alt="Xelkoom-AI"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border-4 [border-color:var(--primary)]/20 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent [border-top-color:var(--primary)] [border-right-color:var(--secondary)] rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner pulse */}
          <motion.div
            className="absolute inset-2 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/20 to-[var(--secondary)]/20 rounded-full"
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          className="mt-8 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-gray-600 font-medium">Chargement</span>
          <motion.div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 [background:var(--primary)] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// Page transition loader (smaller version)
export function PageLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="h-1 bg-gradient-to-r [--tw-gradient-from:var(--primary)] via-[var(--secondary)] [--tw-gradient-to:var(--primary)]"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
