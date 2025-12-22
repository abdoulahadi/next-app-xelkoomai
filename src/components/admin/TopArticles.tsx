"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"
import Link from "next/link"

interface TopArticle {
  id: string
  title: string
  slug: string
  views: number
  publishedAt?: string | null
}

interface TopArticlesProps {
  articles: TopArticle[]
}

export function TopArticles({ articles }: TopArticlesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Articles les plus vus
        </CardTitle>
      </CardHeader>
      <CardContent>
        {articles.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun article publié</p>
        ) : (
          <div className="space-y-3">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full [background:var(--primary)] text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate group-hover:[color:var(--primary)] transition-colors">
                    {article.title}
                  </h4>
                  {article.publishedAt && (
                    <p className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">{article.views.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
