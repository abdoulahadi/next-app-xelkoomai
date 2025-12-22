"use server"

import { requireAuth } from "@/lib/auth-utils"
import {
  exportArticlesToJSON,
  exportArticlesToMarkdown,
  importArticlesFromJSON,
} from "@/lib/export-import"

export async function exportArticles(
  format: "json" | "markdown",
  articleIds?: string[]
) {
  try {
    await requireAuth()

    let content: string

    if (format === "json") {
      content = await exportArticlesToJSON(articleIds)
    } else {
      content = await exportArticlesToMarkdown(articleIds)
    }

    return { success: true, data: content }
  } catch (error) {
    console.error("Export error:", error)
    return { success: false, error: "Erreur lors de l'export des articles" }
  }
}

export async function importArticles(jsonData: string) {
  try {
    const session = await requireAuth()

    const result = await importArticlesFromJSON(jsonData, session.user.id)

    return {
      success: true,
      imported: result.imported,
      errors: result.errors,
    }
  } catch (error) {
    console.error("Import error:", error)
    return {
      success: false,
      imported: 0,
      errors: [
        error instanceof Error ? error.message : "Erreur lors de l'import",
      ],
    }
  }
}
