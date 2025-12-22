import { z } from "zod"
import bcrypt from "bcryptjs"

/**
 * Strong password validation schema
 */
export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .max(100, "Le mot de passe ne peut pas dépasser 100 caractères")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
  .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
  .regex(
    /[^A-Za-z0-9]/,
    "Le mot de passe doit contenir au moins un caractère spécial"
  )

/**
 * Password strength levels
 */
export enum PasswordStrength {
  WEAK = "weak",
  MEDIUM = "medium",
  STRONG = "strong",
  VERY_STRONG = "very_strong",
}

/**
 * Check password strength
 */
export function checkPasswordStrength(password: string): {
  strength: PasswordStrength
  score: number
  feedback: string[]
} {
  let score = 0
  const feedback: string[] = []

  // Length check
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  else if (password.length < 8) {
    feedback.push("Le mot de passe devrait contenir au moins 8 caractères")
  }

  // Character variety
  if (/[a-z]/.test(password)) score += 1
  else feedback.push("Ajoutez des lettres minuscules")

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push("Ajoutez des lettres majuscules")

  if (/[0-9]/.test(password)) score += 1
  else feedback.push("Ajoutez des chiffres")

  if (/[^A-Za-z0-9]/.test(password)) score += 1
  else feedback.push("Ajoutez des caractères spéciaux (!@#$%^&*)")

  // Common patterns (decrease score)
  const commonPatterns = [
    /^123/,
    /abc/i,
    /password/i,
    /qwerty/i,
    /admin/i,
    /(.)\1{2,}/, // Repeated characters
  ]

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      score = Math.max(0, score - 1)
      feedback.push("Évitez les motifs courants ou répétitifs")
      break
    }
  }

  // Determine strength
  let strength: PasswordStrength
  if (score <= 3) {
    strength = PasswordStrength.WEAK
  } else if (score <= 5) {
    strength = PasswordStrength.MEDIUM
  } else if (score <= 6) {
    strength = PasswordStrength.STRONG
  } else {
    strength = PasswordStrength.VERY_STRONG
  }

  return { strength, score, feedback }
}

/**
 * Hash password using bcrypt (12 rounds)
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

/**
 * Verify password against hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

/**
 * Generate a random secure password
 */
export function generateRandomPassword(length: number = 16): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  const allChars = uppercase + lowercase + numbers + special

  let password = ""

  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("")
}

/**
 * Validate password change
 */
export async function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
  passwordHash: string
): Promise<{ valid: boolean; error?: string }> {
  // Verify current password
  const isCurrentValid = await verifyPassword(currentPassword, passwordHash)
  if (!isCurrentValid) {
    return { valid: false, error: "Mot de passe actuel incorrect" }
  }

  // Check if new password is same as current
  const isSame = await verifyPassword(newPassword, passwordHash)
  if (isSame) {
    return {
      valid: false,
      error: "Le nouveau mot de passe doit être différent de l'ancien",
    }
  }

  // Validate new password strength
  try {
    passwordSchema.parse(newPassword)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.issues[0].message }
    }
  }

  return { valid: true }
}

/**
 * Password validation for forms (with confirmation)
 */
export const passwordWithConfirmationSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })
