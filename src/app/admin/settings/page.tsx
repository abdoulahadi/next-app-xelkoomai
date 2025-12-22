import { requireAuth } from "@/lib/auth-utils"
import { getSettings } from "@/actions/settings"
import { SettingsForm } from "@/components/admin/SettingsForm"

export default async function SettingsPage() {
  await requireAuth()
  const settings = await getSettings()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Réglages</h1>
          <p className="text-gray-600 mt-1">
            Configuration générale du site
          </p>
        </div>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  )
}
