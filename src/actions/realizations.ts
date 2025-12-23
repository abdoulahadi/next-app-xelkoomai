"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"
import { z } from "zod"

// Validation schema
const realizationSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  benefits: z.array(z.string()).min(1, "Au moins un bénéfice est requis"),
  image: z.string().url("L'URL de l'image est invalide"),
  link: z.string().url("L'URL du lien est invalide").optional().or(z.literal("")),
  icon: z.string().min(1, "L'icône est requise"),
  published: z.boolean(),
  order: z.number().int().min(0),
})

export type RealizationFormData = z.infer<typeof realizationSchema>

// Get all realizations (admin)
export async function getAllRealizations(page = 1, limit = 10, search = "") {
  try {
    await requireAuth()

    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}

    const [realizations, total] = await Promise.all([
      prisma.realization.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.realization.count({ where }),
    ])

    return {
      success: true,
      data: realizations.map((r) => ({
        ...r,
        benefits: JSON.parse(r.benefits) as string[],
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })),
      total,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error("Error fetching realizations:", error)
    return { success: false, error: "Erreur lors de la récupération" }
  }
}

// Get published realizations (public)
export async function getPublishedRealizations() {
  try {
    const realizations = await prisma.realization.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })

    return realizations.map((r) => ({
      ...r,
      benefits: JSON.parse(r.benefits) as string[],
    }))
  } catch (error) {
    console.error("Error fetching published realizations:", error)
    return []
  }
}

// Get single realization
export async function getRealization(id: string) {
  try {
    await requireAuth()

    const realization = await prisma.realization.findUnique({
      where: { id },
    })

    if (!realization) {
      return { success: false, error: "Réalisation non trouvée" }
    }

    return {
      success: true,
      data: {
        ...realization,
        benefits: JSON.parse(realization.benefits) as string[],
      },
    }
  } catch (error) {
    console.error("Error fetching realization:", error)
    return { success: false, error: "Erreur lors de la récupération" }
  }
}

// Create realization
export async function createRealization(data: RealizationFormData) {
  try {
    const session = await requireAuth()

    const validated = realizationSchema.parse(data)

    const realization = await prisma.realization.create({
      data: {
        ...validated,
        benefits: JSON.stringify(validated.benefits),
        link: validated.link || null,
      },
    })

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: "CREATE",
          entity: "Realization",
          entityId: realization.id,
          userId: session.user.id,
          changes: JSON.stringify(validated),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/use-cases")
    revalidatePath("/admin/realizations")

    return { success: true, data: realization }
  } catch (error) {
    console.error("Error creating realization:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: "Erreur lors de la création" }
  }
}

// Update realization
export async function updateRealization(id: string, data: Partial<RealizationFormData>) {
  try {
    const session = await requireAuth()

    const validated = realizationSchema.partial().parse(data)

    const updateData: Record<string, unknown> = {}

    if (validated.title !== undefined) updateData.title = validated.title
    if (validated.description !== undefined) updateData.description = validated.description
    if (validated.image !== undefined) updateData.image = validated.image
    if (validated.icon !== undefined) updateData.icon = validated.icon
    if (validated.published !== undefined) updateData.published = validated.published
    if (validated.order !== undefined) updateData.order = validated.order
    if (validated.benefits !== undefined) updateData.benefits = JSON.stringify(validated.benefits)
    if (validated.link !== undefined) updateData.link = validated.link || null

    const realization = await prisma.realization.update({
      where: { id },
      data: updateData,
    })

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: "UPDATE",
          entity: "Realization",
          entityId: id,
          userId: session.user.id,
          changes: JSON.stringify(updateData),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/use-cases")
    revalidatePath("/admin/realizations")

    return { success: true, data: realization }
  } catch (error) {
    console.error("Error updating realization:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: "Erreur lors de la mise à jour" }
  }
}

// Delete realization
export async function deleteRealization(id: string) {
  try {
    const session = await requireAuth()

    const realization = await prisma.realization.findUnique({
      where: { id },
    })

    await prisma.realization.delete({
      where: { id },
    })

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: "DELETE",
          entity: "Realization",
          entityId: id,
          userId: session.user.id,
          changes: JSON.stringify({ title: realization?.title }),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/use-cases")
    revalidatePath("/admin/realizations")

    return { success: true }
  } catch (error) {
    console.error("Error deleting realization:", error)
    return { success: false, error: "Erreur lors de la suppression" }
  }
}

// Toggle published status
export async function togglePublished(id: string) {
  try {
    const session = await requireAuth()

    const realization = await prisma.realization.findUnique({
      where: { id },
      select: { published: true, title: true },
    })

    if (!realization) {
      return { success: false, error: "Réalisation non trouvée" }
    }

    const newStatus = !realization.published

    await prisma.realization.update({
      where: { id },
      data: { published: newStatus },
    })

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: "UPDATE",
          entity: "Realization",
          entityId: id,
          userId: session.user.id,
          changes: JSON.stringify({
            title: realization.title,
            published: newStatus
          }),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/use-cases")
    revalidatePath("/admin/realizations")

    return { success: true }
  } catch (error) {
    console.error("Error toggling published:", error)
    return { success: false, error: "Erreur lors de la mise à jour" }
  }
}
