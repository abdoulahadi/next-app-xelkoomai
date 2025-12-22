"use server"

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"
import { revalidatePath } from "next/cache"

// Create a new comment (public)
export async function createComment(articleId: string, author: string, email: string, content: string) {
  try {
    if (!author || !email || !content) {
      return { success: false, error: "Tous les champs sont requis" }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, error: "Email invalide" }
    }

    const comment = await prisma.comment.create({
      data: {
        articleId,
        author,
        email,
        content,
        approved: false, // Comments need approval by default
      },
    })

    revalidatePath("/blog/[slug]", "page")

    return {
      success: true,
      message: "Votre commentaire a été soumis et sera publié après modération",
    }
  } catch (error) {
    console.error("Error creating comment:", error)
    return { success: false, error: "Erreur lors de la création du commentaire" }
  }
}

// Get approved comments for an article (public)
export async function getArticleComments(articleId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        approved: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return {
      success: true,
      data: comments.map((c) => ({
        id: c.id,
        author: c.author,
        content: c.content,
        createdAt: c.createdAt.toISOString(),
      })),
    }
  } catch (error) {
    console.error("Error fetching article comments:", error)
    return { success: false, error: "Erreur lors de la récupération des commentaires" }
  }
}

// Get all comments with pagination
export async function getAllComments(page = 1, limit = 20, filter = "all") {
  try {
    await requireAuth()

    const skip = (page - 1) * limit

    const where =
      filter === "pending"
        ? { approved: false }
        : filter === "approved"
          ? { approved: true }
          : {}

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        include: {
          article: {
            select: {
              title: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.comment.count({ where }),
    ])

    return {
      success: true,
      data: comments.map((c) => ({
        ...c,
        createdAt: c.createdAt.toISOString(),
      })),
      total,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error("Error fetching comments:", error)
    return { success: false, error: "Erreur lors de la récupération des commentaires" }
  }
}

// Approve comment
export async function approveComment(id: string) {
  try {
    const session = await requireAuth()

    const comment = await prisma.comment.update({
      where: { id },
      data: { approved: true },
    })

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: "UPDATE",
          entity: "Comment",
          entityId: id,
          userId: session.user.id,
          changes: JSON.stringify({ approved: true, author: comment.author }),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/admin/comments")
    revalidatePath("/blog/[slug]", "page")

    return { success: true }
  } catch (error) {
    console.error("Error approving comment:", error)
    return { success: false, error: "Erreur lors de l'approbation du commentaire" }
  }
}

// Reject/Unapprove comment
export async function unapproveComment(id: string) {
  try {
    const session = await requireAuth()

    const comment = await prisma.comment.update({
      where: { id },
      data: { approved: false },
    })

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: "UPDATE",
          entity: "Comment",
          entityId: id,
          userId: session.user.id,
          changes: JSON.stringify({ approved: false, author: comment.author }),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/admin/comments")
    revalidatePath("/blog/[slug]", "page")

    return { success: true }
  } catch (error) {
    console.error("Error unapproving comment:", error)
    return { success: false, error: "Erreur lors du rejet du commentaire" }
  }
}

// Delete comment
export async function deleteComment(id: string) {
  try {
    const session = await requireAuth()

    const comment = await prisma.comment.findUnique({
      where: { id },
      select: { author: true, content: true },
    })

    await prisma.comment.delete({
      where: { id },
    })

    // Audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: "DELETE",
          entity: "Comment",
          entityId: id,
          userId: session.user.id,
          changes: JSON.stringify({ author: comment?.author }),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/admin/comments")
    revalidatePath("/blog/[slug]", "page")

    return { success: true }
  } catch (error) {
    console.error("Error deleting comment:", error)
    return { success: false, error: "Erreur lors de la suppression du commentaire" }
  }
}

// Bulk approve comments
export async function bulkApproveComments(ids: string[]) {
  try {
    await requireAuth()

    await prisma.comment.updateMany({
      where: { id: { in: ids } },
      data: { approved: true },
    })

    revalidatePath("/admin/comments")
    revalidatePath("/blog/[slug]", "page")

    return { success: true }
  } catch (error) {
    console.error("Error bulk approving comments:", error)
    return { success: false, error: "Erreur lors de l'approbation en masse" }
  }
}

// Bulk delete comments
export async function bulkDeleteComments(ids: string[]) {
  try {
    await requireAuth()

    await prisma.comment.deleteMany({
      where: { id: { in: ids } },
    })

    revalidatePath("/admin/comments")
    revalidatePath("/blog/[slug]", "page")

    return { success: true }
  } catch (error) {
    console.error("Error bulk deleting comments:", error)
    return { success: false, error: "Erreur lors de la suppression en masse" }
  }
}
