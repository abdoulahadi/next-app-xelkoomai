import { User, Role } from '@prisma/client'

// User sans le mot de passe (safe pour le client)
export type SafeUser = Omit<User, 'password'>

// Rôles d'utilisateur
export { Role }

// Type pour le user dans la session
export type SessionUser = {
  id: string
  email: string
  name: string | null
  role: Role
  image: string | null
}

// Input pour créer un utilisateur
export type CreateUserInput = {
  email: string
  name: string
  password: string
  role: Role
}

// Input pour mettre à jour un utilisateur
export type UpdateUserInput = Partial<{
  name: string
  email: string
  password: string
  role: Role
  image: string
}>
