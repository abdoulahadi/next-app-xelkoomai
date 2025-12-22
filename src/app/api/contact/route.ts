import { NextResponse } from "next/server"
import { contactFormSchema } from "@/lib/validations"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactFormSchema.parse(body)

    // Get EmailJS settings from database
    const settings = await prisma.settings.findFirst()

    // Check if EmailJS is enabled and configured
    if (
      settings?.emailjsEnabled &&
      settings.emailjsServiceId &&
      settings.emailjsTemplateId &&
      settings.emailjsPublicKey
    ) {
      // EmailJS is configured in admin settings
      // The actual email sending happens on the client side via EmailJS SDK
      // This endpoint validates and can store the submission

      console.log("Contact form submission (EmailJS enabled):", validatedData)

      // Optionally: Store contact submissions in database for backup/tracking
      // await prisma.contactSubmission.create({ data: validatedData })

      return NextResponse.json(
        {
          message: "Message envoyé avec succès",
          emailjsConfig: {
            serviceId: settings.emailjsServiceId,
            templateId: settings.emailjsTemplateId,
            publicKey: settings.emailjsPublicKey,
          }
        },
        { status: 200 }
      )
    } else {
      // EmailJS not configured - fallback behavior
      console.log("Contact form submission (EmailJS not configured):", validatedData)

      return NextResponse.json(
        {
          message: "Message reçu. Veuillez configurer EmailJS dans les paramètres admin.",
          warning: "EmailJS n'est pas configuré"
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 400 }
    )
  }
}
