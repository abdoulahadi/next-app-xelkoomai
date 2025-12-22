import { requireAuth } from "@/lib/auth-utils"
import { ArticleForm } from "@/components/admin/ArticleForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewArticlePage() {
  await requireAuth()

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/articles">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvel Article</h1>
          <p className="text-gray-500 mt-1">
            Créez un nouvel article pour votre blog
          </p>
        </div>
      </div>

      <ArticleForm />
    </div>
  )
}
