"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import {
  CheckCircle,
  XCircle,
  Trash,
  MessageSquare,
  CheckCheck,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import {
  approveComment,
  unapproveComment,
  deleteComment,
  bulkApproveComments,
  bulkDeleteComments,
} from "@/actions/comments"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface Comment {
  id: string
  content: string
  author: string
  email: string
  approved: boolean
  createdAt: string
  article: {
    title: string
    slug: string
  }
}

interface CommentsTableProps {
  comments: Comment[]
  total: number
  page: number
  totalPages: number
}

export function CommentsTable({ comments, total, page, totalPages }: CommentsTableProps) {
  const router = useRouter()
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null)
  const [bulkActionDialog, setBulkActionDialog] = useState<{
    open: boolean
    action: "approve" | "delete" | null
  }>({ open: false, action: null })

  const handleApprove = async (id: string) => {
    const result = await approveComment(id)
    if (result.success) {
      toast.success("Commentaire approuvé")
      router.refresh()
    } else {
      toast.error(result.error || "Erreur")
    }
  }

  const handleUnapprove = async (id: string) => {
    const result = await unapproveComment(id)
    if (result.success) {
      toast.success("Approbation retirée")
      router.refresh()
    } else {
      toast.error(result.error || "Erreur")
    }
  }

  const handleDelete = async () => {
    if (!commentToDelete) return

    const result = await deleteComment(commentToDelete)
    if (result.success) {
      toast.success("Commentaire supprimé")
      router.refresh()
    } else {
      toast.error(result.error || "Erreur")
    }
    setDeleteDialogOpen(false)
    setCommentToDelete(null)
  }

  const handleBulkAction = async () => {
    if (selectedComments.length === 0 || !bulkActionDialog.action) return

    if (bulkActionDialog.action === "approve") {
      const result = await bulkApproveComments(selectedComments)
      if (result.success) {
        toast.success(`${selectedComments.length} commentaire(s) approuvé(s)`)
        setSelectedComments([])
        router.refresh()
      } else {
        toast.error(result.error || "Erreur")
      }
    } else if (bulkActionDialog.action === "delete") {
      const result = await bulkDeleteComments(selectedComments)
      if (result.success) {
        toast.success(`${selectedComments.length} commentaire(s) supprimé(s)`)
        setSelectedComments([])
        router.refresh()
      } else {
        toast.error(result.error || "Erreur")
      }
    }

    setBulkActionDialog({ open: false, action: null })
  }

  const toggleSelection = (id: string) => {
    setSelectedComments((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedComments.length === comments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(comments.map((c) => c.id))
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Commentaires ({total})
            </CardTitle>

            {selectedComments.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedComments.length} sélectionné(s)
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setBulkActionDialog({ open: true, action: "approve" })}
                >
                  <CheckCheck className="w-4 h-4 mr-1" />
                  Approuver
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setBulkActionDialog({ open: true, action: "delete" })}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun commentaire trouvé</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg mb-2">
                <input
                  type="checkbox"
                  checked={selectedComments.length === comments.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-gray-700">Tout sélectionner</span>
              </div>

              {/* Comments list */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 rounded-lg border border-gray-200 hover:[border-color:var(--primary)] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedComments.includes(comment.id)}
                        onChange={() => toggleSelection(comment.id)}
                        className="w-4 h-4 mt-1"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {comment.author}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({comment.email})
                            </span>
                            {comment.approved ? (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Approuvé
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-orange-600 border-orange-600">
                                En attente
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-3">{comment.content}</p>

                        <div className="flex items-center justify-between">
                          <Link
                            href={`/blog/${comment.article.slug}`}
                            className="text-sm [color:var(--primary)] hover:underline"
                            target="_blank"
                          >
                            Sur: {comment.article.title}
                          </Link>

                          <div className="flex items-center gap-2">
                            {comment.approved ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUnapprove(comment.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Retirer
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApprove(comment.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approuver
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setCommentToDelete(comment.id)
                                setDeleteDialogOpen(true)
                              }}
                            >
                              <Trash className="w-4 h-4 mr-1" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => router.push(`/admin/comments?page=${page - 1}`)}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {page} sur {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => router.push(`/admin/comments?page=${page + 1}`)}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Supprimer le commentaire"
        description="Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action est irréversible."
        onConfirm={handleDelete}
        variant="destructive"
      />

      {/* Bulk action confirmation dialog */}
      <ConfirmDialog
        open={bulkActionDialog.open}
        onOpenChange={(open) => setBulkActionDialog({ open, action: null })}
        title={
          bulkActionDialog.action === "approve"
            ? "Approuver les commentaires"
            : "Supprimer les commentaires"
        }
        description={
          bulkActionDialog.action === "approve"
            ? `Voulez-vous approuver ${selectedComments.length} commentaire(s) ?`
            : `Êtes-vous sûr de vouloir supprimer ${selectedComments.length} commentaire(s) ? Cette action est irréversible.`
        }
        onConfirm={handleBulkAction}
        variant={bulkActionDialog.action === "delete" ? "destructive" : "default"}
      />
    </>
  )
}
