"use server"

import { prisma } from "@/lib/prisma"
import { requireRole } from "@/lib/auth-utils"

// Get audit logs with pagination and filtering
export async function getAuditLogs(
  page = 1,
  limit = 50,
  action = "",
  entity = ""
) {
  try {
    await requireRole("ADMIN")

    const skip = (page - 1) * limit

    const where: any = {}

    if (action) {
      where.action = action
    }

    if (entity) {
      where.entity = entity
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.auditLog.count({ where }),
    ])

    return {
      success: true,
      data: logs.map((log) => ({
        ...log,
        createdAt: log.createdAt.toISOString(),
      })),
      total,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error("Error fetching audit logs:", error)
    return { success: false, error: "Erreur lors de la récupération des logs" }
  }
}

// Get audit log statistics
export async function getAuditStats() {
  try {
    await requireRole("ADMIN")

    const [total, byAction, byEntity, recent] = await Promise.all([
      prisma.auditLog.count(),
      prisma.auditLog.groupBy({
        by: ["action"],
        _count: { action: true },
      }),
      prisma.auditLog.groupBy({
        by: ["entity"],
        _count: { entity: true },
      }),
      prisma.auditLog.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      }),
    ])

    return {
      success: true,
      data: {
        total,
        recent,
        byAction: byAction.map((item) => ({
          action: item.action,
          count: item._count.action,
        })),
        byEntity: byEntity.map((item) => ({
          entity: item.entity,
          count: item._count.entity,
        })),
      },
    }
  } catch (error) {
    console.error("Error fetching audit stats:", error)
    return { success: false, error: "Erreur lors de la récupération des statistiques" }
  }
}
