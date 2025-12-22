"use client"

import { useState, useEffect } from "react"
import { getAllMedia, deleteMedia, searchMedia, getMediaStats } from "@/actions/media"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import {
  Search,
  Upload as UploadIcon,
  Trash2,
  Copy,
  Image as ImageIcon,
  HardDrive,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface Media {
  id: string
  filename: string
  originalName: string
  url: string
  mimeType: string
  size: number
  width: number | null
  height: number | null
  createdAt: string
  uploadedBy: {
    id: string
    name: string | null
    email: string
  }
}

export function MediaLibrary() {
  const router = useRouter()
  const [media, setMedia] = useState<Media[]>([])
  const [filteredMedia, setFilteredMedia] = useState<Media[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [stats, setStats] = useState({ total: 0, totalSize: "0" })

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<{ id: string; filename: string } | null>(null)

  useEffect(() => {
    loadMedia()
    loadStats()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery)
    } else {
      setFilteredMedia(media)
    }
  }, [searchQuery, media])

  const loadMedia = async () => {
    setIsLoading(true)
    const result = await getAllMedia()
    if (result.success && result.data) {
      setMedia(result.data)
      setFilteredMedia(result.data)
    }
    setIsLoading(false)
  }

  const loadStats = async () => {
    const result = await getMediaStats()
    if (result.success && result.data) {
      setStats(result.data)
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredMedia(media)
      return
    }

    const result = await searchMedia(query)
    if (result.success && result.data) {
      setFilteredMedia(result.data)
    }
  }

  const handleDeleteClick = (id: string, filename: string) => {
    setMediaToDelete({ id, filename })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!mediaToDelete) return

    const result = await deleteMedia(mediaToDelete.id)
    if (result.success) {
      toast.success('Média supprimé avec succès')
      loadMedia()
      loadStats()
      router.refresh()
    } else {
      toast.error(result.error || "Erreur lors de la suppression")
    }
    setMediaToDelete(null)
  }

  const handleCopyUrl = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
    toast.success("URL copiée dans le presse-papiers!")
  }

  const handleUploadComplete = () => {
    setShowUpload(false)
    loadMedia()
    loadStats()
    router.refresh()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total médias</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Espace utilisé</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSize} MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bibliothèque de médias</CardTitle>
            <Button
              onClick={() => setShowUpload(!showUpload)}
              className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)]"
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Uploader
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Section */}
          {showUpload && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <ImageUpload
                value=""
                onChange={handleUploadComplete}
              />
            </div>
          )}

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Rechercher par nom de fichier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Media Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchQuery
                  ? "Aucun média trouvé"
                  : "Aucun média uploadé. Commencez par uploader une image!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={item.url}
                      alt={item.originalName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleCopyUrl(item.url)}
                      title="Copier l'URL"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteClick(item.id, item.filename)}
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Info */}
                  <div className="p-3 bg-white">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.originalName}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>{formatFileSize(item.size)}</span>
                      {item.width && item.height && (
                        <span>
                          {item.width} × {item.height}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Supprimer le média"
        description={`Êtes-vous sûr de vouloir supprimer ${mediaToDelete?.filename} ? Cette action est irréversible.`}
        onConfirm={handleDeleteConfirm}
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="destructive"
      />
    </div>
  )
}
