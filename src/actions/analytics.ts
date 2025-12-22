"use server"

import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/lib/auth-utils"

export async function getDashboardAnalytics() {
  try {
    await requireAuth()

    // Articles stats
    const [totalArticles, publishedArticles, draftArticles] = await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { published: true } }),
      prisma.article.count({ where: { published: false } }),
    ])

    // Total views
    const viewsResult = await prisma.article.aggregate({
      _sum: { views: true },
    })
    const totalViews = viewsResult._sum.views || 0

    // Users stats
    const [totalUsers, adminUsers, editorUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { role: "EDITOR" } }),
    ])

    // Media stats
    const totalMedia = await prisma.media.count()
    const mediaSizeResult = await prisma.media.aggregate({
      _sum: { size: true },
    })
    const totalMediaSize = mediaSizeResult._sum.size || 0

    // Comments stats
    const [totalComments, approvedComments, pendingComments] = await Promise.all([
      prisma.comment.count(),
      prisma.comment.count({ where: { approved: true } }),
      prisma.comment.count({ where: { approved: false } }),
    ])

    // Realizations stats
    const [totalRealizations, publishedRealizations] = await Promise.all([
      prisma.realization.count(),
      prisma.realization.count({ where: { published: true } }),
    ])

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentArticles = await prisma.article.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    })

    const recentComments = await prisma.comment.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    })

    // Top articles by views
    const topArticles = await prisma.article.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        publishedAt: true,
      },
      where: { published: true },
      orderBy: { views: "desc" },
      take: 5,
    })

    // Recent comments
    const recentCommentsList = await prisma.comment.findMany({
      select: {
        id: true,
        content: true,
        author: true,
        approved: true,
        createdAt: true,
        article: {
          select: { title: true, slug: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    })

    // Growth data (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const dailyViews = await prisma.$queryRaw<
      Array<{ date: string; views: number }>
    >`
      SELECT
        DATE(createdAt) as date,
        COALESCE(SUM(views), 0) as views
      FROM articles
      WHERE createdAt >= ${sevenDaysAgo}
      GROUP BY DATE(createdAt)
      ORDER BY date ASC
    `

    return {
      success: true,
      data: {
        articles: {
          total: totalArticles,
          published: publishedArticles,
          drafts: draftArticles,
          recent: recentArticles,
        },
        views: {
          total: totalViews,
          topArticles: topArticles.map((a) => ({
            ...a,
            publishedAt: a.publishedAt?.toISOString(),
          })),
        },
        users: {
          total: totalUsers,
          admins: adminUsers,
          editors: editorUsers,
        },
        media: {
          total: totalMedia,
          totalSize: totalMediaSize,
          averageSize: totalMedia > 0 ? Math.round(totalMediaSize / totalMedia) : 0,
        },
        comments: {
          total: totalComments,
          approved: approvedComments,
          pending: pendingComments,
          recent: recentComments,
          recentList: recentCommentsList.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
          })),
        },
        realizations: {
          total: totalRealizations,
          published: publishedRealizations,
        },
        growth: {
          dailyViews: dailyViews.map((dv) => ({
            date: dv.date,
            views: Number(dv.views),
          })),
        },
      },
    }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return { success: false, error: "Erreur lors de la récupération des analytics" }
  }
}

// Get analytics for a specific date range
export async function getAnalyticsByDateRange(startDate: Date, endDate: Date) {
  try {
    await requireAuth()

    const articles = await prisma.article.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    const comments = await prisma.comment.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    const viewsResult = await prisma.article.aggregate({
      where: {
        publishedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: { views: true },
    })

    return {
      success: true,
      data: {
        articles,
        comments,
        views: viewsResult._sum.views || 0,
      },
    }
  } catch (error) {
    console.error("Error fetching date range analytics:", error)
    return { success: false, error: "Erreur lors de la récupération" }
  }
}
