import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

interface HealthStatus {
  status: "healthy" | "unhealthy" | "degraded"
  timestamp: string
  version: string
  services: {
    database: {
      status: "up" | "down"
      responseTime?: number
    }
    filesystem: {
      status: "up" | "down"
    }
  }
  uptime: number
  memory: {
    used: number
    total: number
    percentage: number
  }
}

export async function GET() {
  const startTime = Date.now()
  const timestamp = new Date().toISOString()

  try {
    // Check database connection
    const dbStart = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const dbResponseTime = Date.now() - dbStart

    // Check filesystem (check if uploads directory exists)
    let filesystemStatus: "up" | "down" = "up"
    try {
      const fs = require("fs")
      const uploadsPath = "./public/uploads"
      if (!fs.existsSync(uploadsPath)) {
        fs.mkdirSync(uploadsPath, { recursive: true })
      }
    } catch (error) {
      filesystemStatus = "down"
    }

    // Get memory usage
    const memoryUsage = process.memoryUsage()
    const totalMemory = memoryUsage.heapTotal
    const usedMemory = memoryUsage.heapUsed
    const memoryPercentage = Math.round((usedMemory / totalMemory) * 100)

    // Get uptime in seconds
    const uptime = process.uptime()

    const health: HealthStatus = {
      status: filesystemStatus === "up" && dbResponseTime < 1000 ? "healthy" : "degraded",
      timestamp,
      version: process.env.npm_package_version || "1.0.0",
      services: {
        database: {
          status: "up",
          responseTime: dbResponseTime,
        },
        filesystem: {
          status: filesystemStatus,
        },
      },
      uptime: Math.round(uptime),
      memory: {
        used: Math.round(usedMemory / 1024 / 1024), // MB
        total: Math.round(totalMemory / 1024 / 1024), // MB
        percentage: memoryPercentage,
      },
    }

    return NextResponse.json(health, {
      status: health.status === "healthy" ? 200 : 503,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Health check failed:", error)

    const health: HealthStatus = {
      status: "unhealthy",
      timestamp,
      version: process.env.npm_package_version || "1.0.0",
      services: {
        database: {
          status: "down",
        },
        filesystem: {
          status: "up",
        },
      },
      uptime: Math.round(process.uptime()),
      memory: {
        used: 0,
        total: 0,
        percentage: 0,
      },
    }

    return NextResponse.json(health, {
      status: 503,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    })
  }
}
