"use client"

import { useState, useEffect } from "react"
import { getAllUsers, deleteUser, resetUserPassword, getUserStats } from "@/actions/users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { PasswordDialog } from "@/components/ui/password-dialog"
import { CreateUserDialog } from "@/components/admin/CreateUserDialog"
import {
  Users as UsersIcon,
  Shield,
  Edit3,
  UserCog,
  Trash2,
  Key,
  UserPlus,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toasts } from "@/lib/toast"

interface User {
  id: string
  email: string
  name: string | null
  role: "ADMIN" | "EDITOR" | "VIEWER"
  image: string | null
  createdAt: string
  updatedAt: string
  _count: {
    articles: number
  }
}

interface Stats {
  total: number
  admins: number
  editors: number
  viewers: number
}

export function UserManagement() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, admins: 0, editors: 0, viewers: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // Dialog states
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{ id: string; email: string } | null>(null)
  const [generatedPassword, setGeneratedPassword] = useState("")

  useEffect(() => {
    loadUsers()
    loadStats()
  }, [])

  const loadUsers = async () => {
    setIsLoading(true)
    const result = await getAllUsers()
    if (result.success && result.data) {
      setUsers(result.data)
    }
    setIsLoading(false)
  }

  const loadStats = async () => {
    const result = await getUserStats()
    if (result.success && result.data) {
      setStats(result.data)
    }
  }

  const handleDeleteClick = (id: string, email: string) => {
    setSelectedUser({ id, email })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return

    const result = await deleteUser(selectedUser.id)
    if (result.success) {
      toasts.user.deleted()
      loadUsers()
      loadStats()
      router.refresh()
    } else {
      toasts.general.error(result.error)
    }
    setSelectedUser(null)
  }

  const handleResetPasswordClick = (id: string, email: string) => {
    setSelectedUser({ id, email })
    setResetPasswordDialogOpen(true)
  }

  const handleResetPasswordConfirm = async () => {
    if (!selectedUser) return

    const result = await resetUserPassword(selectedUser.id)
    if (result.success && result.password) {
      setGeneratedPassword(result.password)
      setPasswordDialogOpen(true)
      toasts.user.passwordReset()
    } else {
      toasts.general.error(result.error)
    }
    setSelectedUser(null)
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      ADMIN: "bg-red-100 text-red-800 border-red-200",
      EDITOR: "bg-blue-100 text-blue-800 border-blue-200",
      VIEWER: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return (
      <Badge className={`${variants[role as keyof typeof variants]} border`}>
        {role}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Éditeurs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.editors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <UserCog className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Viewers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.viewers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Liste des utilisateurs</CardTitle>
            <Button
              className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)]"
              onClick={() => setCreateUserDialogOpen(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Nouvel utilisateur
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun utilisateur trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-gray-700">Utilisateur</th>
                    <th className="text-left p-4 font-medium text-gray-700">Email</th>
                    <th className="text-left p-4 font-medium text-gray-700">Rôle</th>
                    <th className="text-left p-4 font-medium text-gray-700">Articles</th>
                    <th className="text-left p-4 font-medium text-gray-700">Créé le</th>
                    <th className="text-right p-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                          </div>
                          <span className="font-medium">{user.name || "Sans nom"}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4">{getRoleBadge(user.role)}</td>
                      <td className="p-4 text-gray-600">{user._count.articles}</td>
                      <td className="p-4 text-gray-600">{formatDate(user.createdAt)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResetPasswordClick(user.id, user.email)}
                            title="Réinitialiser le mot de passe"
                          >
                            <Key className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClick(user.id, user.email)}
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Supprimer l'utilisateur"
        description={`Êtes-vous sûr de vouloir supprimer l'utilisateur ${selectedUser?.email} ? Cette action est irréversible.`}
        onConfirm={handleDeleteConfirm}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="destructive"
      />

      {/* Reset Password Confirmation Dialog */}
      <ConfirmDialog
        open={resetPasswordDialogOpen}
        onOpenChange={setResetPasswordDialogOpen}
        title="Réinitialiser le mot de passe"
        description={`Réinitialiser le mot de passe de ${selectedUser?.email} ? Un nouveau mot de passe aléatoire sera généré.`}
        onConfirm={handleResetPasswordConfirm}
        confirmText="Réinitialiser"
        cancelText="Annuler"
        variant="default"
      />

      {/* Password Display Dialog */}
      <PasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        email={selectedUser?.email || ""}
        password={generatedPassword}
      />

      {/* Create User Dialog */}
      <CreateUserDialog
        open={createUserDialogOpen}
        onOpenChange={setCreateUserDialogOpen}
        onSuccess={() => {
          loadUsers()
          loadStats()
          router.refresh()
        }}
      />
    </div>
  )
}
