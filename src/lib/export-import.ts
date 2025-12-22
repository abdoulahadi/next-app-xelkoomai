import { prisma } from "@/lib/prisma"

/**
 * Export/Import utilities for articles
 */

export interface ExportedArticle {
  slug: string
  title: string
  description: string
  content: string
  image: string
  tags: string[]
  readTime: string
  published: boolean
  featured: boolean
  publishedAt: string | null
  createdAt: string
  author: {
    email: string
    name: string | null
  }
}

/**
 * Export articles to JSON format
 */
export async function exportArticlesToJSON(articleIds?: string[]): Promise<string> {
  const where = articleIds ? { id: { in: articleIds } } : {}

  const articles = await prisma.article.findMany({
    where,
    include: {
      author: {
        select: {
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const exportData: ExportedArticle[] = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    content: article.content,
    image: article.image,
    tags: JSON.parse(article.tags),
    readTime: article.readTime,
    published: article.published,
    featured: article.featured,
    publishedAt: article.publishedAt?.toISOString() || null,
    createdAt: article.createdAt.toISOString(),
    author: {
      email: article.author.email,
      name: article.author.name,
    },
  }))

  return JSON.stringify(
    {
      version: "1.0",
      exportDate: new Date().toISOString(),
      articleCount: exportData.length,
      articles: exportData,
    },
    null,
    2
  )
}

/**
 * Export articles to Markdown format
 */
export async function exportArticlesToMarkdown(articleIds?: string[]): Promise<string> {
  const where = articleIds ? { id: { in: articleIds } } : {}

  const articles = await prisma.article.findMany({
    where,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  let markdown = `# Articles Export\n\n`
  markdown += `Export Date: ${new Date().toLocaleDateString("fr-FR")}\n`
  markdown += `Total Articles: ${articles.length}\n\n`
  markdown += `---\n\n`

  for (const article of articles) {
    markdown += `## ${article.title}\n\n`
    markdown += `**Slug:** ${article.slug}\n\n`
    markdown += `**Author:** ${article.author.name || "Unknown"}\n\n`
    markdown += `**Published:** ${article.published ? "Yes" : "No"}\n\n`
    markdown += `**Tags:** ${JSON.parse(article.tags).join(", ")}\n\n`
    markdown += `**Read Time:** ${article.readTime}\n\n`
    markdown += `**Date:** ${article.createdAt.toLocaleDateString("fr-FR")}\n\n`
    markdown += `### Description\n\n${article.description}\n\n`
    markdown += `### Content\n\n${stripHTML(article.content)}\n\n`
    markdown += `---\n\n`
  }

  return markdown
}

/**
 * Strip HTML tags from content
 */
function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, "")
}

/**
 * Import articles from JSON
 */
export async function importArticlesFromJSON(
  jsonData: string,
  userId: string
): Promise<{ success: boolean; imported: number; errors: string[] }> {
  try {
    const data = JSON.parse(jsonData)

    if (!data.articles || !Array.isArray(data.articles)) {
      return {
        success: false,
        imported: 0,
        errors: ["Format JSON invalide"],
      }
    }

    const errors: string[] = []
    let imported = 0

    for (const articleData of data.articles) {
      try {
        // Check if article with same slug exists
        const existing = await prisma.article.findUnique({
          where: { slug: articleData.slug },
        })

        if (existing) {
          errors.push(`Article avec le slug "${articleData.slug}" existe déjà`)
          continue
        }

        // Create article
        await prisma.article.create({
          data: {
            slug: articleData.slug,
            title: articleData.title,
            description: articleData.description,
            content: articleData.content,
            image: articleData.image,
            tags: JSON.stringify(articleData.tags),
            readTime: articleData.readTime,
            published: articleData.published || false,
            featured: articleData.featured || false,
            publishedAt: articleData.publishedAt
              ? new Date(articleData.publishedAt)
              : null,
            authorId: userId,
          },
        })

        imported++
      } catch (error) {
        errors.push(
          `Erreur lors de l'import de "${articleData.title}": ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        )
      }
    }

    return {
      success: true,
      imported,
      errors,
    }
  } catch (error) {
    return {
      success: false,
      imported: 0,
      errors: [
        error instanceof Error ? error.message : "Erreur lors de l'import",
      ],
    }
  }
}

/**
 * Download blob as file
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
