import type { Metadata } from "next"
import Image from "next/image"
import { Users, Target, Globe, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez l'histoire, la mission et l'équipe de Xelkoom-AI",
}

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque projet que nous entreprenons"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Nous croyons en la force du travail d'équipe et du partenariat"
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "Nous repoussons constamment les limites de la technologie IA"
  },
  {
    icon: Award,
    title: "Intégrité",
    description: "Nous opérons avec transparence et éthique dans toutes nos actions"
  }
]

export default function AboutPage() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative bg-black py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">À propos de Xelkoom-AI</h1>
            <p className="text-xl text-gray-200">
              Pionniers de l&apos;intelligence artificielle au Sénégal, nous transformons 
              les défis business en opportunités grâce à des solutions IA innovantes.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Notre Histoire</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Fondée en 2023 et basée à Mbour 4 dans la région de Thiès, Xelkoom-AI est née de la vision 
              de faire de l&apos;IA une réalité concrète et accessible à tous les Sénégalais. 
              Notre équipe d&apos;experts passionnés combine expertise technique et compréhension profonde 
              des enjeux locaux.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Aujourd&apos;hui, nous sommes fiers d&apos;accompagner des dizaines d&apos;entreprises 
              dans leur transformation digitale, avec des solutions sur-mesure qui génèrent 
              des résultats mesurables.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 [background:var(--gray-light)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-l-4 [border-left-color:var(--primary)]">
              <CardHeader>
                <CardTitle className="text-3xl">Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Rendre l&apos;intelligence artificielle accessible et profitable pour toutes 
                  les entreprises, en développant des solutions innovantes qui résolvent 
                  des problèmes réels et créent de la valeur durable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[var(--secondary)]">
              <CardHeader>
                <CardTitle className="text-3xl">Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Devenir le leader africain des solutions d&apos;intelligence artificielle, 
                  en contribuant activement à l&apos;émergence d&apos;un écosystème tech dynamique 
                  et en formant la prochaine génération d&apos;experts en IA.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Nos Valeurs</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="text-center group hover:[border-color:var(--primary)] transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Localisation */}
      <section className="py-20 [background:var(--gray-light)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Basés à Mbour, Thiès</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Situés à Mbour 4 dans la région de Thiès au Sénégal, nous servons des clients dans toute la région 
              et au-delà, en combinant expertise internationale et connaissance locale.
            </p>
            <div className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] text-white p-8 rounded-lg shadow-lg">
              <p className="text-lg mb-4">Contactez-nous</p>
              <p className="text-2xl font-bold mb-2">+221 78 174 35 59</p>
              <p className="text-lg">contact@xelkoomai.sn</p>
              <p className="text-base mt-4 opacity-90">Mbour 4, Thiès, Sénégal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
