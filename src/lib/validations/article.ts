import { z } from "zod"

export const articleSchema = z.object({
  title: z
    .string()
    .min(10, "Le titre doit contenir au moins 10 caractères")
    .max(200, "Le titre ne peut pas dépasser 200 caractères"),

  slug: z
    .string()
    .min(5, "Le slug doit contenir au moins 5 caractères")
    .max(100, "Le slug ne peut pas dépasser 100 caractères")
    .regex(/^[a-z0-9-]+$/, "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets"),

  description: z
    .string()
    .min(50, "La description doit contenir au moins 50 caractères")
    .max(300, "La description ne peut pas dépasser 300 caractères"),

  content: z
    .string()
    .min(100, "Le contenu doit contenir au moins 100 caractères"),

  image: z.string().url("L'URL de l'image est invalide"),

  tags: z
    .array(z.string())
    .max(5, "Vous ne pouvez ajouter que 5 tags maximum"),

  readTime: z
    .string()
    .regex(/^\d+\s?min$/, "Format invalide (ex: '5 min')"),

  published: z.boolean(),

  featured: z.boolean(),
})

export type ArticleFormData = z.infer<typeof articleSchema>

// Schema pour la mise à jour (tous les champs optionnels sauf id)
export const updateArticleSchema = articleSchema.partial().extend({
  id: z.string(),
})

export type UpdateArticleData = z.infer<typeof updateArticleSchema>
