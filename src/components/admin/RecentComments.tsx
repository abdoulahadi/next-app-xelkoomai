"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  content: string
  author: string
  approved: boolean
  createdAt: string
  article: {
    title: string
    slug: string
  }
}

interface RecentCommentsProps {
  comments: Comment[]
}

export function RecentComments({ comments }: RecentCommentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Commentaires récents
        </CardTitle>
      </CardHeader>
      <CardContent>
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">Aucun commentaire récent</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 rounded-lg border border-gray-200 hover:[border-color:var(--primary)] transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    {comment.approved ? (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approuvé
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        <Clock className="w-3 h-3 mr-1" />
                        En attente
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{comment.content}</p>

                <Link
                  href={`/blog/${comment.article.slug}`}
                  className="text-xs [color:var(--primary)] hover:underline inline-flex items-center gap-1"
                >
                  Sur: {comment.article.title}
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
