"use server"

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"
import { revalidatePath } from "next/cache"

// Get all versions for an article
export async function getArticleVersions(articleId: string) {
  try {
    await requireAuth()

    const versions = await prisma.articleVersion.findMany({
      where: { articleId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    })

    return {
      success: true,
      data: versions.map((v) => ({
        ...v,
        createdAt: v.createdAt.toISOString(),
      })),
    }
  } catch (error) {
    console.error("Error fetching versions:", error)
    return { success: false, error: "Erreur lors de la récupération des versions" }
  }
}

// Get a specific version
export async function getVersion(versionId: string) {
  try {
    await requireAuth()

    const version = await prisma.articleVersion.findUnique({
      where: { id: versionId },
    })

    if (!version) {
      return { success: false, error: "Version non trouvée" }
    }

    return {
      success: true,
      data: {
        ...version,
        createdAt: version.createdAt.toISOString(),
      },
    }
  } catch (error) {
    console.error("Error fetching version:", error)
    return { success: false, error: "Erreur lors de la récupération de la version" }
  }
}

// Restore an article to a specific version
export async function restoreArticleVersion(articleId: string, versionId: string) {
  try {
    const session = await requireAuth()

    // Get the version to restore
    const version = await prisma.articleVersion.findUnique({
      where: { id: versionId },
    })

    if (!version) {
      return { success: false, error: "Version non trouvée" }
    }

    // Get current article state to create a new version before restoring
    const currentArticle = await prisma.article.findUnique({
      where: { id: articleId },
    })

    if (!currentArticle) {
      return { success: false, error: "Article non trouvé" }
    }

    // Create a version of current state before restoring
    await prisma.articleVersion.create({
      data: {
        articleId,
        title: currentArticle.title,
        content: currentArticle.content,
        createdById: session.user.id,
      },
    })

    // Restore the article to the selected version
    await prisma.article.update({
      where: { id: articleId },
      data: {
        title: version.title,
        content: version.content,
      },
    })

    // Log the action
    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "Article",
        entityId: articleId,
        changes: JSON.stringify({ restored: true, versionDate: version.createdAt.toISOString() }),
        userId: session.user.id,
      },
    })

    revalidatePath("/admin/articles")
    revalidatePath(`/admin/articles/${articleId}/edit`)
    revalidatePath("/blog/[slug]", "page")

    return { success: true }
  } catch (error) {
    console.error("Error restoring version:", error)
    return { success: false, error: "Erreur lors de la restauration de la version" }
  }
}

// Delete a version
export async function deleteVersion(versionId: string) {
  try {
    await requireAuth()

    await prisma.articleVersion.delete({
      where: { id: versionId },
    })

    return { success: true }
  } catch (error) {
    console.error("Error deleting version:", error)
    return { success: false, error: "Erreur lors de la suppression de la version" }
  }
}
