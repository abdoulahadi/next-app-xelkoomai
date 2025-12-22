"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, MoreVertical, Trash, Eye, EyeOff } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { togglePublished, deleteRealization } from "@/actions/realizations"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface Realization {
  id: string
  title: string
  description: string
  benefits: string[]
  image: string
  link: string | null
  icon: string
  published: boolean
  order: number
  createdAt: string
  updatedAt: string
}

interface RealizationsTableProps {
  realizations: Realization[]
  total: number
  page: number
  totalPages: number
}

export function RealizationsTable({ realizations, total, page, totalPages }: RealizationsTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [realizationToDelete, setRealizationToDelete] = useState<string | null>(null)

  const handleTogglePublish = async (id: string) => {
    const result = await togglePublished(id)
    if (result.success) {
      toast.success('Statut de publication mis à jour')
      router.refresh()
    } else {
      toast.error(result.error || 'Erreur')
    }
  }

  const handleDeleteClick = (id: string) => {
    setRealizationToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!realizationToDelete) return

    setDeletingId(realizationToDelete)
    const result = await deleteRealization(realizationToDelete)

    if (result.success) {
      toast.success('Réalisation supprimée avec succès')
      router.refresh()
    } else {
      toast.error(result.error || 'Erreur lors de la suppression')
    }
    setDeletingId(null)
    setRealizationToDelete(null)
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="text-sm text-gray-600">
        {total} réalisation{total > 1 ? 's' : ''} au total
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {realizations.map((realization) => (
          <Card key={realization.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative h-48 bg-gray-100">
              <Image
                src={realization.image}
                alt={realization.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Badge variant={realization.published ? "default" : "secondary"}>
                  {realization.published ? "Publié" : "Brouillon"}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg line-clamp-1">{realization.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/realizations/${realization.id}/edit`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTogglePublish(realization.id)}>
                      {realization.published ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Dépublier
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Publier
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteClick(realization.id)}
                      disabled={deletingId === realization.id}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      {deletingId === realization.id ? "Suppression..." : "Supprimer"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {realization.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Ordre: {realization.order}</span>
                {realization.link && (
                  <a
                    href={realization.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="[color:var(--primary)] hover:underline"
                  >
                    Voir le site
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {realizations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune réalisation trouvée</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {page} sur {totalPages}
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Button variant="outline" asChild>
                <Link href={`/admin/realizations?page=${page - 1}`}>
                  Précédent
                </Link>
              </Button>
            )}
            {page < totalPages && (
              <Button variant="outline" asChild>
                <Link href={`/admin/realizations?page=${page + 1}`}>
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
        title="Supprimer la réalisation"
        description="Êtes-vous sûr de vouloir supprimer cette réalisation ? Cette action est irréversible."
        onConfirm={handleDeleteConfirm}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="destructive"
      />
    </div>
  )
}
