import { requireRole } from "@/lib/auth-utils"
import { UserManagement } from "@/components/admin/UserManagement"

export default async function UsersPage() {
  // Only ADMIN can access
  await requireRole("ADMIN")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-600 mt-1">
            Gérez les utilisateurs et leurs permissions
          </p>
        </div>
      </div>

      <UserManagement />
    </div>
  )
}
