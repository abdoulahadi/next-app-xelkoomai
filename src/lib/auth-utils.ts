import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import bcrypt from 'bcryptjs'
import { Role } from '@prisma/client'

/**
 * Get the current session on the server side
 */
export async function getSession() {
  return await getServerSession(authOptions)
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth() {
  const session = await getSession()

  if (!session || !session.user) {
    throw new Error('Non autorisé')
  }

  return session
}

/**
 * Require specific role - throws if user doesn't have required role
 */
export async function requireRole(role: Role | Role[]) {
  const session = await requireAuth()
  const roles = Array.isArray(role) ? role : [role]

  if (!roles.includes(session.user.role)) {
    throw new Error('Permissions insuffisantes')
  }

  return session
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  try {
    const session = await getSession()
    return session?.user?.role === 'ADMIN'
  } catch {
    return false
  }
}

/**
 * Check if user is at least editor
 */
export async function canEdit() {
  try {
    const session = await getSession()
    return session?.user?.role === 'ADMIN' || session?.user?.role === 'EDITOR'
  } catch {
    return false
  }
}

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
