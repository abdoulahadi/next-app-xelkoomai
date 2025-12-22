"use client"

import { useState, useEffect } from "react"
import { getAllMedia, searchMedia } from "@/actions/media"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Search, Image as ImageIcon, Check } from "lucide-react"
import Image from "next/image"

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
}

interface MediaPickerProps {
  onSelect: (url: string) => void
  selectedUrl?: string
  triggerButton?: React.ReactNode
}

export function MediaPicker({
  onSelect,
  selectedUrl,
  triggerButton,
}: MediaPickerProps) {
  const [open, setOpen] = useState(false)
  const [media, setMedia] = useState<Media[]>([])
  const [filteredMedia, setFilteredMedia] = useState<Media[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | undefined>(selectedUrl)

  useEffect(() => {
    if (open) {
      loadMedia()
    }
  }, [open])

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

  const handleSelect = (url: string) => {
    setSelectedImage(url)
  }

  const handleConfirm = () => {
    if (selectedImage) {
      onSelect(selectedImage)
      setOpen(false)
    }
  }

  const handleUploadComplete = (url: string) => {
    setSelectedImage(url)
    loadMedia()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button type="button" variant="outline">
            <ImageIcon className="w-4 h-4 mr-2" />
            Choisir une image
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Sélectionner une image</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="library" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">Bibliothèque</TabsTrigger>
            <TabsTrigger value="upload">Upload nouveau</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="flex-1 flex flex-col min-h-0 mt-4">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher par nom de fichier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Media Grid */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {isLoading ? (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
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
                      : "Aucun média disponible"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 pb-4">
                  {filteredMedia.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.url)}
                      className={`group relative bg-white border-2 rounded-lg overflow-hidden transition-all ${
                        selectedImage === item.url
                          ? "[border-color:var(--primary)] ring-2 [--tw-ring-color:var(--primary)]/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {/* Image */}
                      <div className="aspect-square relative bg-gray-100">
                        <Image
                          src={item.url}
                          alt={item.originalName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 33vw, 25vw"
                        />
                      </div>

                      {/* Selected Indicator */}
                      {selectedImage === item.url && (
                        <div className="absolute top-2 right-2 w-6 h-6 [background:var(--primary)] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}

                      {/* Info Overlay */}
                      <div className="p-2 bg-white border-t">
                        <p className="text-xs text-gray-900 truncate">
                          {item.originalName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(item.size)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="flex-1 mt-4">
            <ImageUpload value={selectedImage} onChange={handleUploadComplete} />
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedImage}
            className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)]"
          >
            Utiliser cette image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
