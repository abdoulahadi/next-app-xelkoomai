import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UseCasesClient } from "@/components/use-cases/UseCasesClient"
import { UseCasesHero } from "@/components/use-cases/UseCasesHero"
import { getPublishedRealizations } from "@/actions/realizations"
import { TrendingUp, ArrowRight } from "lucide-react"

export default async function UseCasesPage() {
  const realizations = await getPublishedRealizations()

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Hero Section */}
      <UseCasesHero />

      {/* Use Cases Grid */}
      <UseCasesClient realizations={realizations} />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r [--tw-gradient-from:var(--primary)]/95 to-[var(--secondary)]/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Un projet en tête ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Nos experts sont à votre écoute pour transformer votre vision en réalité
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="outline" className="bg-white [color:var(--primary)] hover:bg-white/90 border-white" asChild>
                <Link href="/contact">
                  Demander une démo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10 border-white" asChild>
                <Link href="/technology">
                  Notre technologie
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
