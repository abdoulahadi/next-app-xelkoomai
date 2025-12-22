"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { History, RotateCcw, Trash, Eye } from "lucide-react"
import { restoreArticleVersion, deleteVersion } from "@/actions/versions"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Version {
  id: string
  title: string
  content: string
  createdAt: string
}

interface ArticleVersionsProps {
  articleId: string
  versions: Version[]
}

export function ArticleVersions({ articleId, versions }: ArticleVersionsProps) {
  const router = useRouter()
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null)

  const handleRestore = async () => {
    if (!selectedVersion) return

    const result = await restoreArticleVersion(articleId, selectedVersion.id)
    if (result.success) {
      toast.success("Version restaurée avec succès")
      router.refresh()
    } else {
      toast.error(result.error || "Erreur")
    }
    setRestoreDialogOpen(false)
    setSelectedVersion(null)
  }

  const handleDelete = async () => {
    if (!selectedVersion) return

    const result = await deleteVersion(selectedVersion.id)
    if (result.success) {
      toast.success("Version supprimée")
      router.refresh()
    } else {
      toast.error(result.error || "Erreur")
    }
    setDeleteDialogOpen(false)
    setSelectedVersion(null)
  }

  const handlePreview = (version: Version) => {
    setSelectedVersion(version)
    setPreviewDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Historique des versions ({versions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {versions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Aucune version enregistrée</p>
              <p className="text-sm mt-1">
                Les versions sont créées automatiquement lors des modifications
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((version, index) => (
                <div
                  key={version.id}
                  className="p-4 rounded-lg border border-gray-200 hover:[border-color:var(--primary)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900 truncate">
                          {version.title}
                        </h4>
                        {index === 0 && (
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            Plus récente
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {new Date(version.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(version)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedVersion(version)
                          setRestoreDialogOpen(true)
                        }}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Restaurer
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedVersion(version)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Restore confirmation */}
      <ConfirmDialog
        open={restoreDialogOpen}
        onOpenChange={setRestoreDialogOpen}
        title="Restaurer cette version"
        description={`Êtes-vous sûr de vouloir restaurer l'article à cette version ? L'état actuel sera sauvegardé dans l'historique.`}
        onConfirm={handleRestore}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Supprimer cette version"
        description="Êtes-vous sûr de vouloir supprimer cette version ? Cette action est irréversible."
        onConfirm={handleDelete}
        variant="destructive"
      />

      {/* Preview dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu de la version</DialogTitle>
          </DialogHeader>
          {selectedVersion && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-xl mb-2">{selectedVersion.title}</h3>
                <div className="text-sm text-gray-500 mb-4">
                  Créée le{" "}
                  {new Date(selectedVersion.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedVersion.content }} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
