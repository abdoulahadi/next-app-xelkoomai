import prisma from '../prisma'
import { Article } from '@prisma/client'

export async function getArticleStats() {
  const [total, published, drafts, viewsAggregate] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.article.count({ where: { published: false } }),
    prisma.article.aggregate({
      _sum: {
        views: true,
      },
    }),
  ])

  return {
    total,
    published,
    drafts,
    totalViews: viewsAggregate._sum.views || 0,
  }
}

export async function getRecentArticles(limit: number = 5): Promise<Article[]> {
  return await prisma.article.findMany({
    take: limit,
    orderBy: {
      updatedAt: 'desc',
    },
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
