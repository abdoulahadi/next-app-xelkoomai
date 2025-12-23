"use server"

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"
import { revalidatePath } from "next/cache"
import { unlink } from "fs/promises"
import { join } from "path"

export async function getAllMedia() {
  try {
    await requireAuth()

    const media = await prisma.media.findMany({
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return {
      success: true,
      data: media.map(m => ({
        ...m,
        createdAt: m.createdAt.toISOString()
      }))
    }
  } catch (error) {
    console.error("Error fetching media:", error)
    return { success: false, error: "Erreur lors de la récupération des médias" }
  }
}

export async function getMediaById(id: string) {
  try {
    await requireAuth()

    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!media) {
      return { success: false, error: "Média introuvable" }
    }

    return { success: true, data: media }
  } catch (error) {
    console.error("Error fetching media:", error)
    return { success: false, error: "Erreur lors de la récupération du média" }
  }
}

export async function searchMedia(query: string) {
  try {
    await requireAuth()

    const media = await prisma.media.findMany({
      where: {
        OR: [
          { filename: { contains: query } },
          { originalName: { contains: query } },
        ],
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return {
      success: true,
      data: media.map(m => ({
        ...m,
        createdAt: m.createdAt.toISOString()
      }))
    }
  } catch (error) {
    console.error("Error searching media:", error)
    return { success: false, error: "Erreur lors de la recherche" }
  }
}

export async function deleteMedia(id: string) {
  try {
    const session = await requireAuth()

    // Récupérer le média pour obtenir le chemin du fichier
    const media = await prisma.media.findUnique({
      where: { id },
    })

    if (!media) {
      return { success: false, error: "Média introuvable" }
    }

    // Vérifier si le média est utilisé dans des articles
    const articlesUsingMedia = await prisma.article.findMany({
      where: {
        image: {
          contains: media.filename,
        },
      },
      select: {
        id: true,
        title: true,
      },
    })

    if (articlesUsingMedia.length > 0) {
      const titles = articlesUsingMedia.map((a) => a.title).join(", ")
      return {
        success: false,
        error: `Ce média est utilisé dans ${articlesUsingMedia.length} article(s): ${titles}`,
      }
    }

    // Supprimer le fichier physique
    try {
      const filePath = join(process.cwd(), "public", media.url)
      await unlink(filePath)
    } catch (fileError) {
      console.error("Error deleting file:", fileError)
      // Continue même si la suppression du fichier échoue
    }

    // Supprimer de la base de données
    await prisma.media.delete({
      where: { id },
    })

    // Logger l'action
    await prisma.auditLog.create({
      data: {
        action: "DELETE",
        entity: "Media",
        entityId: id,
        userId: session.user.id,
        changes: JSON.stringify({ filename: media.filename }),
      },
    })

    revalidatePath("/admin/media")

    return { success: true }
  } catch (error) {
    console.error("Error deleting media:", error)
    return { success: false, error: "Erreur lors de la suppression du média" }
  }
}

export async function getMediaStats() {
  try {
    await requireAuth()

    const [totalMedia, totalSize] = await Promise.all([
      prisma.media.count(),
      prisma.media.aggregate({
        _sum: {
          size: true,
        },
      }),
    ])

    const sizeInMB = totalSize._sum.size
      ? (totalSize._sum.size / (1024 * 1024)).toFixed(2)
      : "0"

    return {
      success: true,
      data: {
        total: totalMedia,
        totalSize: sizeInMB,
      },
    }
  } catch (error) {
    console.error("Error fetching media stats:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques",
    }
  }
}
