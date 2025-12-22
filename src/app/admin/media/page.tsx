import { requireAuth } from "@/lib/auth-utils"
import { MediaLibrary } from "@/components/admin/MediaLibrary"

export default async function MediaPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Médiathèque</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos images et fichiers médias
          </p>
        </div>
      </div>

      <MediaLibrary />
    </div>
  )
}
