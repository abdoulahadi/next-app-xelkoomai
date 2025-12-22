"use server"

import { requireAuth } from "@/lib/auth-utils"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type Settings = {
  id: string
  siteName: string
  siteDescription: string
  siteUrl: string
  logoUrl: string | null
  seoTitle: string | null
  seoDescription: string | null
  seoKeywords: string | null
  twitterHandle: string | null
  facebookUrl: string | null
  linkedinUrl: string | null
  instagramUrl: string | null
  contactEmail: string | null
  contactPhone: string | null
  newsletterEnabled: boolean
  newsletterProvider: string | null
  newsletterApiKey: string | null
  emailjsEnabled: boolean
  emailjsServiceId: string | null
  emailjsTemplateId: string | null
  emailjsPublicKey: string | null
  // Couleurs
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  foregroundColor: string
  grayLightColor: string
  successColor: string
  errorColor: string
  warningColor: string
  infoColor: string
  textPrimaryColor: string
  textSecondaryColor: string
  textMutedColor: string
  adminSidebarColor: string
  adminAccentColor: string
  updatedAt: Date
}

export type UpdateSettingsInput = Omit<Partial<Settings>, "id" | "updatedAt">

/**
 * Get current site settings (creates default if doesn't exist)
 */
export async function getSettings(): Promise<Settings> {
  try {
    // Try to get existing settings
    let settings = await prisma.settings.findFirst()

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.settings.create({
        data: {},
      })
    }

    return settings
  } catch (error) {
    console.error("Error fetching settings:", error)
    throw new Error("Impossible de charger les paramètres")
  }
}

/**
 * Update site settings (ADMIN only)
 */
export async function updateSettings(
  data: UpdateSettingsInput
): Promise<Settings> {
  try {
    // Authentification requise
    const session = await requireAuth()

    // Only ADMIN can update settings
    if (session.user.role !== "ADMIN") {
      throw new Error("Seuls les administrateurs peuvent modifier les paramètres")
    }

    // Get existing settings
    let settings = await prisma.settings.findFirst()

    // Create if doesn't exist
    if (!settings) {
      settings = await prisma.settings.create({
        data: {},
      })
    }

    // Update settings
    const updated = await prisma.settings.update({
      where: { id: settings.id },
      data,
    })

    // Logger l'action (only if user exists in database)
    try {
      await prisma.auditLog.create({
        data: {
          action: "UPDATE",
          entity: "Settings",
          entityId: updated.id,
          userId: session.user.id,
          changes: JSON.stringify(data),
        },
      })
    } catch (auditError) {
      // Ignore audit log errors (user might not exist in DB yet)
      console.warn("Could not create audit log:", auditError)
    }

    // Revalidate pages that use settings
    revalidatePath("/")
    revalidatePath("/admin/settings")

    return updated
  } catch (error) {
    console.error("Error updating settings:", error)
    throw error instanceof Error
      ? error
      : new Error("Erreur lors de la mise à jour des paramètres")
  }
}
