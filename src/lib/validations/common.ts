import { z } from "zod"

/**
 * Common validation schemas for reuse across the application
 */

// Email validation
export const emailSchema = z
  .string()
  .email("Adresse email invalide")
  .toLowerCase()
  .trim()

// URL validation
export const urlSchema = z.string().url("URL invalide").trim()

// Optional URL (can be empty)
export const optionalUrlSchema = z.union([
  z.string().url("URL invalide").trim(),
  z.literal(""),
])

// Slug validation (lowercase, numbers, hyphens only)
export const slugSchema = z
  .string()
  .min(3, "Le slug doit contenir au moins 3 caractères")
  .max(100, "Le slug ne peut pas dépasser 100 caractères")
  .regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets")
  .trim()

// Phone number validation (French format)
export const phoneSchema = z
  .string()
  .regex(
    /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
    "Numéro de téléphone invalide"
  )
  .trim()

// Name validation
export const nameSchema = z
  .string()
  .min(2, "Le nom doit contenir au moins 2 caractères")
  .max(100, "Le nom ne peut pas dépasser 100 caractères")
  .trim()

// Title validation
export const titleSchema = z
  .string()
  .min(5, "Le titre doit contenir au moins 5 caractères")
  .max(200, "Le titre ne peut pas dépasser 200 caractères")
  .trim()

// Description validation
export const descriptionSchema = z
  .string()
  .min(20, "La description doit contenir au moins 20 caractères")
  .max(500, "La description ne peut pas dépasser 500 caractères")
  .trim()

// Short description
export const shortDescriptionSchema = z
  .string()
  .min(10, "La description doit contenir au moins 10 caractères")
  .max(160, "La description ne peut pas dépasser 160 caractères")
  .trim()

// Content validation (rich text)
export const contentSchema = z
  .string()
  .min(50, "Le contenu doit contenir au moins 50 caractères")
  .max(50000, "Le contenu ne peut pas dépasser 50000 caractères")

// Tags validation
export const tagsSchema = z
  .array(z.string().min(2).max(30))
  .max(10, "Maximum 10 tags")
  .optional()

// Boolean with default
export const booleanSchema = z.boolean().default(false)

// Positive integer
export const positiveIntSchema = z.number().int().positive()

// Non-negative integer
export const nonNegativeIntSchema = z.number().int().min(0)

// Pagination schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
})

export const sortOrderSchema = z.enum(["asc", "desc"]).default("desc")

// Date range validation
export const dateRangeSchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((data) => data.from <= data.to, {
    message: "La date de début doit être antérieure à la date de fin",
  })

// File upload validation
export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, "La taille du fichier ne peut pas dépasser 5MB")
  .refine(
    (file) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(
        file.type
      ),
    "Format de fichier non supporté. Utilisez JPG, PNG, WebP ou GIF"
  )

// Search query
export const searchQuerySchema = z
  .string()
  .min(2, "La recherche doit contenir au moins 2 caractères")
  .max(100, "La recherche ne peut pas dépasser 100 caractères")
  .trim()
  .optional()

// ID validation (CUID)
export const idSchema = z.string().cuid("ID invalide")

// Optional ID
export const optionalIdSchema = z.union([idSchema, z.literal("")])

// Color hex validation
export const hexColorSchema = z
  .string()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Code couleur hexadécimal invalide")

// Social media URLs
export const twitterUrlSchema = z
  .string()
  .url()
  .includes("twitter.com", { message: "URL Twitter invalide" })
  .or(z.string().url().includes("x.com", { message: "URL X invalide" }))
  .optional()

export const linkedinUrlSchema = z
  .string()
  .url()
  .includes("linkedin.com", { message: "URL LinkedIn invalide" })
  .optional()

export const githubUrlSchema = z
  .string()
  .url()
  .includes("github.com", { message: "URL GitHub invalide" })
  .optional()

/**
 * Helper function to validate data against a schema
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}

/**
 * Safe validation that returns result object instead of throwing
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  return { success: false, errors: result.error }
}
