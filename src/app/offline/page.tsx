"use client"

import { WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#F9FAFB] px-4">
      <div className="text-center max-w-md">
        <WifiOff className="w-24 h-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Vous êtes hors ligne</h1>
        <p className="text-lg text-gray-600 mb-8">
          Il semble que vous n'ayez pas de connexion Internet. Veuillez vérifier votre connexion
          et réessayer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] text-white"
          >
            Réessayer
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
