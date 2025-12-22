"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"
import { articleSchema } from "@/lib/validations/article"
import { ensureUniqueSlug } from "@/lib/utils/slug"
import { ArticleFormData } from "@/types/article"

export async function createArticle(data: ArticleFormData) {
  try {
    const session = await requireAuth()

    // Validate data
    const validated = articleSchema.parse(data)

    // Ensure slug is unique
    const uniqueSlug = await ensureUniqueSlug(validated.slug)

    // Create article
    const article = await prisma.article.create({
      data: {
        ...validated,
        slug: uniqueSlug,
        tags: JSON.stringify(validated.tags),
        authorId: session.user.id,
        publishedAt: validated.published ? new Date() : null,
      },
    })

    // Log action
    try {
      await prisma.auditLog.create({
        data: {
          action: "CREATE",
          entity: "Article",
          entityId: article.id,
          userId: session.user.id,
          changes: JSON.stringify({ title: validated.title, slug: uniqueSlug }),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/admin/articles")
    revalidatePath("/blog")

    return { success: true, articleId: article.id }
  } catch (error) {
    console.error("Create article error:", error)
    return { success: false, error: "Erreur lors de la création de l'article" }
  }
}

export async function updateArticle(id: string, data: Partial<ArticleFormData>) {
  try {
    const session = await requireAuth()

    // Check ownership or admin
    const existing = await prisma.article.findUnique({
      where: { id },
      select: { authorId: true },
    })

    if (!existing) {
      return { success: false, error: "Article non trouvé" }
    }

    if (existing.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return { success: false, error: "Non autorisé" }
    }

    // Validate data
    const validated = articleSchema.partial().parse(data)

    // Handle slug uniqueness if slug is being updated
    let uniqueSlug = validated.slug
    if (validated.slug) {
      uniqueSlug = await ensureUniqueSlug(validated.slug, id)
    }

    // Prepare update data
    const { tags, ...updateData } = validated

    // Update article
    const article = await prisma.article.update({
      where: { id },
      data: {
        ...updateData,
        ...(uniqueSlug && { slug: uniqueSlug }),
        ...(tags && { tags: JSON.stringify(tags) }),
        ...(validated.published !== undefined && {
          publishedAt: validated.published ? new Date() : null,
        }),
      },
    })

    // Create version history
    await prisma.articleVersion.create({
      data: {
        articleId: article.id,
        content: article.content,
        title: article.title,
        createdById: session.user.id,
      },
    })

    // Log action
    try {
      await prisma.auditLog.create({
        data: {
          action: "UPDATE",
          entity: "Article",
          entityId: article.id,
          userId: session.user.id,
          changes: JSON.stringify({ title: article.title, ...updateData }),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/admin/articles")
    revalidatePath(`/blog/${article.slug}`)

    return { success: true }
  } catch (error) {
    console.error("Update article error:", error)
    return { success: false, error: "Erreur lors de la mise à jour" }
  }
}

export async function deleteArticle(id: string) {
  try {
    const session = await requireAuth()

    // Check ownership or admin
    const existing = await prisma.article.findUnique({
      where: { id },
      select: { authorId: true, slug: true },
    })

    if (!existing) {
      return { success: false, error: "Article non trouvé" }
    }

    if (existing.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return { success: false, error: "Non autorisé" }
    }

    // Delete article (cascade will delete versions and comments)
    await prisma.article.delete({
      where: { id },
    })

    // Log action
    try {
      await prisma.auditLog.create({
        data: {
          action: "DELETE",
          entity: "Article",
          entityId: id,
          userId: session.user.id,
          changes: JSON.stringify({ slug: existing.slug }),
        },
      })
    } catch (auditError) {
      console.warn("Could not create audit log:", auditError)
    }

    revalidatePath("/admin/articles")
    revalidatePath("/blog")

    return { success: true }
  } catch (error) {
    console.error("Delete article error:", error)
    return { success: false, error: "Erreur lors de la suppression" }
  }
}

export async function togglePublished(id: string) {
  try {
    const session = await requireAuth()

    const article = await prisma.article.findUnique({
      where: { id },
      select: { published: true, authorId: true },
    })

    if (!article) {
      return { success: false, error: "Article non trouvé" }
    }

    if (article.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return { success: false, error: "Non autorisé" }
    }

    await prisma.article.update({
      where: { id },
      data: {
        published: !article.published,
        publishedAt: !article.published ? new Date() : null,
      },
    })

    revalidatePath("/admin/articles")
    revalidatePath("/blog")

    return { success: true }
  } catch (error) {
    console.error("Toggle published error:", error)
    return { success: false, error: "Erreur" }
  }
}

// PUBLIC ACTIONS - No authentication required

/**
 * Get all published articles for public blog with search and tag filtering
 */
export async function getPublishedArticles(
  page = 1,
  limit = 12,
  search = "",
  tag = ""
) {
  try {
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { published: true }

    // Add search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
        { content: { contains: search, mode: "insensitive" as const } },
      ]
    }

    // Add tag filter
    if (tag) {
      where.tags = { contains: tag, mode: "insensitive" as const }
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          image: true,
          tags: true,
          readTime: true,
          views: true,
          publishedAt: true,
          createdAt: true,
          author: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ])

    return {
      articles: articles.map((article: any) => ({
        ...article,
        tags: JSON.parse(article.tags) as string[],
        author: article.author.name || article.author.email,
      })),
      total,
      totalPages: Math.ceil(total / limit),
      page,
    }
  } catch (error) {
    console.error("Error fetching published articles:", error)
    return { articles: [], total: 0, totalPages: 0, page: 1 }
  }
}

/**
 * Get all unique tags from published articles
 */
export async function getAllTags() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { tags: true },
    })

    const tagsSet = new Set<string>()
    articles.forEach((article: any) => {
      const tags = JSON.parse(article.tags) as string[]
      tags.forEach((tag: string) => tagsSet.add(tag))
    })

    return Array.from(tagsSet).sort()
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}

/**
 * Get a single published article by slug for public view
 */
export async function getPublishedArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findFirst({
      where: {
        slug,
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    if (!article) {
      return null
    }

    // Increment view count
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    })

    return {
      ...article,
      tags: JSON.parse(article.tags) as string[],
      author: article.author.name || article.author.email,
      authorImage: article.author.image,
    }
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}
