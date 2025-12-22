import { requireAuth } from "@/lib/auth-utils"
import { RealizationForm } from "@/components/admin/RealizationForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewRealizationPage() {
  await requireAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/realizations">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle réalisation</h1>
          <p className="text-gray-600 mt-1">
            Ajoutez une nouvelle réalisation à votre portfolio
          </p>
        </div>
      </div>

      <RealizationForm />
    </div>
  )
}
