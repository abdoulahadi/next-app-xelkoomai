"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Edit, Eye, MoreVertical, Trash } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { ArticleWithAuthor } from "@/types/article"
import { togglePublished, deleteArticle } from "@/actions/articles"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface ArticlesTableProps {
  articles: ArticleWithAuthor[]
  total: number
  page: number
  totalPages: number
}

export function ArticlesTable({ articles, total, page, totalPages }: ArticlesTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null)

  const handleTogglePublish = async (id: string) => {
    await togglePublished(id)
    router.refresh()
    toast.success('Statut de publication mis à jour')
  }

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return

    setDeletingId(articleToDelete)
    const result = await deleteArticle(articleToDelete)

    if (result.success) {
      toast.success('Article supprimé avec succès')
      router.refresh()
    } else {
      toast.error(result.error || 'Erreur lors de la suppression')
    }
    setDeletingId(null)
    setArticleToDelete(null)
  }

  if (articles.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-500">Aucun article trouvé</p>
        <Button asChild className="mt-4">
          <Link href="/admin/articles/new">Créer votre premier article</Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => {
                const tags = JSON.parse(article.tags) as string[]

                return (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-gray-900 truncate">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            {tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs [background:var(--primary)]/10 [color:var(--primary)] px-2 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(article.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          article.published
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {article.published ? "Publié" : "Brouillon"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Eye className="w-4 h-4" />
                        {article.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDistanceToNow(new Date(article.updatedAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/articles/${article.id}/edit`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Éditer
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${article.slug}`} target="_blank">
                              <Eye className="w-4 h-4 mr-2" />
                              Voir
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteClick(article.id)}
                            disabled={deletingId === article.id}
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            {deletingId === article.id ? "Suppression..." : "Supprimer"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {page} sur {totalPages} • {total} articles au total
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Button variant="outline" asChild>
                <Link href={`/admin/articles?page=${page - 1}`}>
                  Précédent
                </Link>
              </Button>
            )}
            {page < totalPages && (
              <Button variant="outline" asChild>
                <Link href={`/admin/articles?page=${page + 1}`}>
                  Suivant
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Supprimer l'article"
        description="Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible."
        onConfirm={handleDeleteConfirm}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="destructive"
      />
    </div>
  )
}
