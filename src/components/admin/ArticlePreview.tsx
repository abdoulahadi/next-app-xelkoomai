"use client"

import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { ArticleFormData } from "@/lib/validations/article"

interface ArticlePreviewProps {
  data: Partial<ArticleFormData>
}

export function ArticlePreview({ data }: ArticlePreviewProps) {
  const { title, description, image, content, tags, readTime } = data

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Prévisualiser
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Prévisualisation de l'article</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Image de couverture */}
          {image && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title || "Image de l'article"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Titre */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {title || "Titre de l'article"}
            </h1>
          </div>

          {/* Métadonnées */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {readTime && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {readTime}
              </span>
            )}
            {tags && tags.length > 0 && (
              <div className="flex gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="[background:var(--primary)]/10 [color:var(--primary)] px-3 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
          )}

          {/* Contenu */}
          {content && (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {/* Avertissement */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Ceci est une prévisualisation. L'apparence finale
              peut légèrement différer après publication.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
