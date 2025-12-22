import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  company: z.string().optional(),
  type: z.enum(["devis", "partenariat", "information", "support", "autre"]),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
})

export const newsletterSchema = z.object({
  email: z.string().email("Email invalide"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
