"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormData } from "@/lib/validations"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // First, validate with backend and get EmailJS config
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.emailjsConfig) {
        // EmailJS is configured - send email via EmailJS
        const { serviceId, templateId, publicKey } = result.emailjsConfig

        // Prepare template parameters
        const templateParams = {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || "Non fourni",
          company: data.company || "Non fourni",
          type: data.type,
          message: data.message,
          to_email: "contact@xelkoomai.sn", // Your receiving email
        }

        // Send via EmailJS
        await emailjs.send(serviceId, templateId, templateParams, publicKey)

        setSubmitStatus("success")
        reset()
      } else if (response.ok) {
        // Backend validated but EmailJS not configured
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative bg-black py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2000&q=80"
            alt="Contact us"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Contactez-nous</h1>
            <p className="text-xl text-gray-200">
              Une question ? Un projet ? N&apos;hésitez pas à nous contacter. 
              Notre équipe vous répondra dans les plus brefs délais.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Envoyez-nous un message</CardTitle>
                <CardDescription className="text-gray-600">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nom complet *
                      </label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Votre nom"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-required="true"
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="votre@email.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-required="true"
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="+221 78 174 35 59"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Entreprise
                      </label>
                      <Input
                        id="company"
                        {...register("company")}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium mb-2">
                      Type de demande *
                    </label>
                    <select
                      id="type"
                      {...register("type")}
                      className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:[--tw-ring-color:var(--primary)]"
                    >
                      <option value="devis">Demande de devis</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="information">Information</option>
                      <option value="support">Support</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Décrivez votre projet ou votre demande..."
                      rows={6}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      aria-required="true"
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      {...register("consent")}
                      className="mt-1 mr-2 [accent-color:var(--primary)]"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      aria-required="true"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      J&apos;accepte que mes données soient utilisées pour répondre à ma demande.
                      Voir notre <a href="/legal/confidentialite" className="[color:var(--primary)] hover:underline">politique de confidentialité</a>.
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" role="alert" className="text-red-500 text-sm">{errors.consent.message}</p>
                  )}

                  {submitStatus === "success" && (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="bg-green-50 border [border-color:var(--primary)] [color:var(--primary)] px-4 py-3 rounded"
                    >
                      Merci ! Votre message a été envoyé avec succès.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                    >
                      Une erreur s&apos;est produite. Veuillez réessayer.
                    </div>
                  )}

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 [color:var(--primary)] mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href="mailto:contact@xelkoomai.sn" 
                      className="text-gray-600 hover:[color:var(--primary)] transition-colors"
                    >
                      contact@xelkoomai.sn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 [color:var(--primary)] mt-1" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <a 
                      href="tel:+221781743559" 
                      className="text-gray-600 hover:[color:var(--primary)] transition-colors"
                    >
                      +221 78 174 35 59
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 [color:var(--primary)] mt-1" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-600">
                      Mbour 4, Thiès<br />
                      Sénégal
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horaires</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lundi - Vendredi<br />
                  9h00 - 18h00 GMT
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
