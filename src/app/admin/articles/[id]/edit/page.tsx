import { requireAuth } from "@/lib/auth-utils"
import { getArticleById } from "@/lib/db/articles"
import { ArticleForm } from "@/components/admin/ArticleForm"
import { ArrowLeft, History } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAuth()
  const { id } = await params

  const article = await getArticleById(id)

  if (!article) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Éditer l'Article</h1>
            <p className="text-gray-500 mt-1 truncate max-w-2xl">
              {article.title}
            </p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/admin/articles/${id}/versions`}>
            <History className="w-4 h-4 mr-2" />
            Historique
          </Link>
        </Button>
      </div>

      <ArticleForm article={article} />
    </div>
  )
}
