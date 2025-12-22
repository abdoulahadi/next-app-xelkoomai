import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import { join } from "path"
import { requireAuth } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    // Authentification requise
    const session = await requireAuth()

    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 })
    }

    // Vérifier le type de fichier
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Type de fichier non autorisé. Formats acceptés: JPG, PNG, WebP, GIF" },
        { status: 400 }
      )
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Fichier trop volumineux. Taille maximale: 5MB" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${timestamp}_${originalName}`

    // Sauvegarder dans le dossier public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads")
    const filePath = join(uploadDir, filename)

    await writeFile(filePath, buffer)

    // URL publique
    const url = `/uploads/${filename}`

    // Créer l'entrée dans la base de données
    const media = await prisma.media.create({
      data: {
        filename,
        originalName: file.name,
        url,
        mimeType: file.type,
        size: file.size,
        uploadedById: session.user.id,
      },
    })

    // Logger l'action
    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "Media",
        entityId: media.id,
        userId: session.user.id,
        changes: JSON.stringify({ filename, originalName: file.name }),
      },
    })

    return NextResponse.json({ url, filename, id: media.id }, { status: 200 })
  } catch (error: unknown) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur lors de l'upload" },
      { status: 500 }
    )
  }
}
