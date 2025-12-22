import prisma from '../prisma'
import { ArticleFilters, PaginationParams } from '@/types/article'

export async function getAllArticles(
  filters: ArticleFilters = {},
  pagination: PaginationParams = {}
) {
  const {
    search,
    published,
    tags,
    authorId,
    featured,
  } = filters

  const {
    page = 1,
    limit = 10,
    sortBy = 'updatedAt',
    sortOrder = 'desc',
  } = pagination

  const where: any = {}

  // Apply filters
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ]
  }

  if (published !== undefined) {
    where.published = published
  }

  if (featured !== undefined) {
    where.featured = featured
  }

  if (authorId) {
    where.authorId = authorId
  }

  if (tags && tags.length > 0) {
    // SQLite doesn't support array operations, so we check with LIKE
    where.tags = {
      contains: tags[0], // Simple implementation
    }
  }

  // Get total count
  const total = await prisma.article.count({ where })

  // Get articles
  const articles = await prisma.article.findMany({
    where,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip: (page - 1) * limit,
    take: limit,
  })

  return {
    data: articles,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getArticleById(id: string) {
  return await prisma.article.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })
}

export async function getArticleBySlug(slug: string) {
  return await prisma.article.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  })
}
