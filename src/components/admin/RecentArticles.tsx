import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Eye, Edit, MoreVertical } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getRecentArticles } from "@/lib/db/stats"

export async function RecentArticles() {
  const articles = await getRecentArticles(5)

  if (articles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Articles Récents</CardTitle>
          <CardDescription>Vos derniers articles modifiés</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            Aucun article pour le moment
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles Récents</CardTitle>
        <CardDescription>Vos derniers articles modifiés</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {article.title}
                </h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    article.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {article.published ? "Publié" : "Brouillon"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views}
                  </span>
                  <span>
                    Modifié{" "}
                    {formatDistanceToNow(new Date(article.updatedAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/articles/${article.id}/edit`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href="/admin/articles">Voir tous les articles</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
