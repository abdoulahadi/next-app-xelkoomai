import { requireAuth } from "@/lib/auth-utils"
import { getArticleById } from "@/lib/db/articles"
import { getArticleVersions } from "@/actions/versions"
import { ArticleVersions } from "@/components/admin/ArticleVersions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export default async function ArticleVersionsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAuth()

  const { id } = await params

  const [article, versionsResult] = await Promise.all([
    getArticleById(id),
    getArticleVersions(id),
  ])

  if (!article) {
    notFound()
  }

  const versions = versionsResult.success && versionsResult.data ? versionsResult.data : []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/articles/${id}/edit`}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historique des versions</h1>
          <p className="text-gray-600 mt-1">{article.title}</p>
        </div>
      </div>

      <ArticleVersions articleId={id} versions={versions} />
    </div>
  )
}
