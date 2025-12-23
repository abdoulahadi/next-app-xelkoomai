"use server"

import { prisma } from "@/lib/prisma"
import { requireRole } from "@/lib/auth-utils"
import { revalidatePath } from "next/cache"
import { hashPassword, generateRandomPassword } from "@/lib/password"
import { z } from "zod"
import { emailSchema, nameSchema } from "@/lib/validations/common"

// Validation schema for user creation
const createUserSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]),
  password: z.string().min(8),
})

const updateUserSchema = z.object({
  name: nameSchema.optional(),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).optional(),
  image: z.string().url().optional(),
})

export async function getAllUsers() {
  try {
    await requireRole("ADMIN")

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            articles: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return {
      success: true,
      data: users.map(u => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
        updatedAt: u.updatedAt.toISOString()
      }))
    }
  } catch (error) {
    console.error("Error fetching users:", error)
    return { success: false, error: "Erreur lors de la récupération des utilisateurs" }
  }
}

export async function createUser(data: z.infer<typeof createUserSchema>) {
  try {
    const session = await requireRole("ADMIN")

    // Validate data
    const validated = createUserSchema.parse(data)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (existingUser) {
      return { success: false, error: "Un utilisateur avec cet email existe déjà" }
    }

    // Hash password
    const hashedPassword = await hashPassword(validated.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        name: validated.name,
        role: validated.role,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    // Log action
    await prisma.auditLog.create({
      data: {
        action: "CREATE",
        entity: "User",
        entityId: user.id,
        userId: session.user.id,
        changes: JSON.stringify({ email: user.email, role: user.role }),
      },
    })

    revalidatePath("/admin/users")

    return { success: true, data: user }
  } catch (error) {
    console.error("Create user error:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: "Erreur lors de la création de l'utilisateur" }
  }
}

export async function updateUser(
  userId: string,
  data: z.infer<typeof updateUserSchema>
) {
  try {
    const session = await requireRole("ADMIN")

    // Validate data
    const validated = updateUserSchema.parse(data)

    // Cannot modify own role
    if (userId === session.user.id && validated.role) {
      return { success: false, error: "Vous ne pouvez pas modifier votre propre rôle" }
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: userId },
      data: validated,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
      },
    })

    // Log action
    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "User",
        entityId: user.id,
        userId: session.user.id,
        changes: JSON.stringify(validated),
      },
    })

    revalidatePath("/admin/users")

    return { success: true, data: user }
  } catch (error) {
    console.error("Update user error:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message }
    }
    return { success: false, error: "Erreur lors de la mise à jour de l'utilisateur" }
  }
}

export async function deleteUser(userId: string) {
  try {
    const session = await requireRole("ADMIN")

    // Cannot delete self
    if (userId === session.user.id) {
      return { success: false, error: "Vous ne pouvez pas supprimer votre propre compte" }
    }

    // Check if user has articles
    const articleCount = await prisma.article.count({
      where: { authorId: userId },
    })

    if (articleCount > 0) {
      return {
        success: false,
        error: `Cet utilisateur a ${articleCount} article(s). Supprimez-les d'abord ou réassignez-les.`,
      }
    }

    // Delete user
    await prisma.user.delete({
      where: { id: userId },
    })

    // Log action
    await prisma.auditLog.create({
      data: {
        action: "DELETE",
        entity: "User",
        entityId: userId,
        userId: session.user.id,
      },
    })

    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Delete user error:", error)
    return { success: false, error: "Erreur lors de la suppression de l'utilisateur" }
  }
}

export async function resetUserPassword(userId: string) {
  try {
    const session = await requireRole("ADMIN")

    // Generate random password
    const newPassword = generateRandomPassword(16)
    const hashedPassword = await hashPassword(newPassword)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    // Log action
    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "User",
        entityId: userId,
        userId: session.user.id,
        changes: JSON.stringify({ action: "password_reset" }),
      },
    })

    revalidatePath("/admin/users")

    return { success: true, password: newPassword }
  } catch (error) {
    console.error("Reset password error:", error)
    return {
      success: false,
      error: "Erreur lors de la réinitialisation du mot de passe",
    }
  }
}

export async function getUserStats() {
  try {
    await requireRole("ADMIN")

    const [total, admins, editors, viewers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { role: "EDITOR" } }),
      prisma.user.count({ where: { role: "VIEWER" } }),
    ])

    return {
      success: true,
      data: {
        total,
        admins,
        editors,
        viewers,
      },
    }
  } catch (error) {
    console.error("Error fetching user stats:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques",
    }
  }
}
