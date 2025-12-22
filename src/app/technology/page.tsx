"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Code2, 
  Palette, 
  Bot, 
  Database,
  Network,
  Cloud,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle2,
  Layers,
  Workflow
} from "lucide-react"

export default function TechnologyPage() {
  const technologies = [
    {
      icon: Code2,
      title: "Développement Web Moderne",
      description: "Stack technologique de pointe pour des sites web rapides, sécurisés et évolutifs",
      features: ["Next.js & React", "TypeScript", "Tailwind CSS"]
    },
    {
      icon: Palette,
      title: "Outils de Design UX/UI",
      description: "Suite complète d'outils professionnels pour créer des expériences utilisateur exceptionnelles",
      features: ["Figma & Adobe XD", "Prototypage interactif", "Design Systems"]
    },
    {
      icon: Bot,
      title: "Intelligence Artificielle",
      description: "Technologies IA de pointe pour chatbots intelligents et analyse de données",
      features: ["OpenAI & GPT", "Machine Learning", "NLP & Analyse"]
    },
    {
      icon: Database,
      title: "Bases de Données",
      description: "Systèmes de gestion de données robustes et performants pour tous vos besoins",
      features: ["PostgreSQL", "MongoDB", "Redis Cache"]
    },
    {
      icon: Network,
      title: "Infrastructure Réseau",
      description: "Solutions réseau professionnelles pour une connectivité fiable et sécurisée",
      features: ["Cisco & MikroTik", "VPN & Firewall", "Load Balancing"]
    },
    {
      icon: Cloud,
      title: "Cloud & Hébergement",
      description: "Déploiement sur des infrastructures cloud hautement disponibles et scalables",
      features: ["AWS & Azure", "Docker & Kubernetes", "CDN Global"]
    }
  ]

  const stack = [
    {
      category: "Frontend",
      technologies: ["React", "Next.js", "Angular", "Tailwind CSS"]
    },
    {
      category: "Backend",
      technologies: ["Node.js/Express.js", "FastAPI/Django", "Laravel", "Spring Boot"]
    },
    {
      category: "IA & Chatbots",
      technologies: ["OpenAI", "Dialogflow", "TensorFlow", "Hugging Face"]
    },
    {
      category: "DevOps",
      technologies: ["Docker", "Kubernetes", "AWS", "GitHub Actions"]
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Hero Section */}
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
              <Code2 className="w-4 h-4 [color:var(--primary)]" />
              <span className="text-sm font-medium [color:var(--primary)]">Technologies</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Une{" "}
              <span className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                Stack Technologique
              </span>
              {" "}Moderne
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Notre stack technologique combine les outils les plus performants 
              pour vous offrir des solutions digitales robustes, sécurisées et évolutives
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Zap className="w-5 h-5 mr-2" />
                  Discuter de votre projet
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/use-cases">
                  Cas d'usage
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] rounded-lg flex items-center justify-center mb-4">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">
                    {tech.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {tech.description}
                  </p>

                  <div className="space-y-2">
                    {tech.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 [color:var(--primary)] flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <Layers className="w-12 h-12 [color:var(--primary)] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Notre Stack Technologique
            </h2>
            <p className="text-lg text-gray-600">
              Des technologies éprouvées et modernes pour des résultats exceptionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stack.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4 [color:var(--primary)]">
                    {item.category}
                  </h3>
                  <div className="space-y-2">
                    {item.technologies.map((tech) => (
                      <div key={tech} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 [background:var(--primary)] rounded-full" />
                        {tech}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <Workflow className="w-12 h-12 [color:var(--primary)] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Infrastructure Performante & Sécurisée
            </h2>
            <p className="text-lg text-gray-600">
              Une architecture pensée pour la performance, la fiabilité et l&apos;évolutivité
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-96 rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80"
              alt="Architecture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg">
                  <Lock className="w-8 h-8 [color:var(--primary)] mb-2" />
                  <div className="text-sm font-semibold">Sécurisé</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg">
                  <Zap className="w-8 h-8 [color:var(--primary)] mb-2" />
                  <div className="text-sm font-semibold">Performant</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg">
                  <Cloud className="w-8 h-8 [color:var(--primary)] mb-2" />
                  <div className="text-sm font-semibold">Évolutif</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1920&q=80"
            alt="Technology background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r [--tw-gradient-from:var(--primary)]/95 to-[var(--secondary)]/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Construisons ensemble votre solution digitale
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Notre équipe technique est prête à concrétiser vos projets les plus ambitieux
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="outline" className="bg-white [color:var(--primary)] hover:bg-white/90 border-white" asChild>
                <Link href="/contact">
                  Discuter de votre projet
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/10 border-white" asChild>
                <Link href="/services">
                  Nos services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
