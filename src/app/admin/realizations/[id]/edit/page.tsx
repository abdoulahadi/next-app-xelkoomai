import { requireAuth } from "@/lib/auth-utils"
import { getRealization } from "@/actions/realizations"
import { RealizationForm } from "@/components/admin/RealizationForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export default async function EditRealizationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAuth()

  const { id } = await params
  const result = await getRealization(id)

  if (!result.success || !result.data) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/realizations">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modifier la réalisation</h1>
          <p className="text-gray-600 mt-1">{result.data.title}</p>
        </div>
      </div>

      <RealizationForm realization={{ ...result.data, id, link: result.data.link || "" }} isEdit />
    </div>
  )
}
