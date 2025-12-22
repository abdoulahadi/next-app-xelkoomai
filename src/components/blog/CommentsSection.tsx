"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send } from "lucide-react"
import { createComment, getArticleComments } from "@/actions/comments"
import toast from "react-hot-toast"

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

interface CommentsSectionProps {
  articleId: string
}

export function CommentsSection({ articleId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    author: "",
    email: "",
    content: "",
  })

  useEffect(() => {
    loadComments()
  }, [articleId])

  const loadComments = async () => {
    setLoading(true)
    const result = await getArticleComments(articleId)
    if (result.success && result.data) {
      setComments(result.data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.author || !formData.email || !formData.content) {
      toast.error("Tous les champs sont requis")
      return
    }

    setSubmitting(true)

    const result = await createComment(
      articleId,
      formData.author,
      formData.email,
      formData.content
    )

    setSubmitting(false)

    if (result.success) {
      toast.success(result.message || "Commentaire soumis avec succès")
      setFormData({ author: "", email: "", content: "" })
    } else {
      toast.error(result.error || "Erreur lors de l'envoi du commentaire")
    }
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <MessageSquare className="w-8 h-8 [color:var(--primary)]" />
          Commentaires ({comments.length})
        </h2>

        {/* Comment Form */}
        <Card className="p-6 md:p-8 mb-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Laisser un commentaire</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <Input
                  id="author"
                  type="text"
                  placeholder="Votre nom"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire *
              </label>
              <Textarea
                id="content"
                placeholder="Votre commentaire..."
                rows={5}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                disabled={submitting}
                className="resize-none"
              />
            </div>
            <p className="text-sm text-gray-500">
              Votre commentaire sera publié après modération.
            </p>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] text-white"
            >
              {submitting ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer le commentaire
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Comments List */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Chargement des commentaires...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun commentaire pour le moment.</p>
            <p className="text-gray-400 text-sm mt-2">Soyez le premier à commenter !</p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                      <time className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
