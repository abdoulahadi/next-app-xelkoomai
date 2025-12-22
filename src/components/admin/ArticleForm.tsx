"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Article } from "@prisma/client"
import { Loader2, Save, Send, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { articleSchema, ArticleFormData } from "@/lib/validations/article"
import { createArticle, updateArticle } from "@/actions/articles"
import { generateSlug } from "@/lib/utils/slug"
import { calculateReadTime } from "@/lib/utils/readTime"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { ArticlePreview } from "@/components/admin/ArticlePreview"

interface ArticleFormProps {
  article?: Article
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const isEditing = !!article

  const defaultValues: Partial<ArticleFormData> = article
    ? {
        title: article.title,
        slug: article.slug,
        description: article.description,
        content: article.content,
        image: article.image,
        tags: JSON.parse(article.tags),
        readTime: article.readTime,
        published: article.published,
        featured: article.featured,
      }
    : {
        title: "",
        slug: "",
        description: "",
        content: "",
        image: "",
        tags: [],
        readTime: "5 min",
        published: false,
        featured: false,
      }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues,
  })

  const title = watch("title")
  const content = watch("content")
  const tags = watch("tags") || []

  const handleGenerateSlug = () => {
    if (title) {
      const slug = generateSlug(title)
      setValue("slug", slug)
    }
  }

  const handleCalculateReadTime = () => {
    if (content) {
      const readTime = calculateReadTime(content)
      setValue("readTime", readTime)
    }
  }

  const handleContentChange = (newContent: string) => {
    setValue("content", newContent)
    // Auto-calculate read time when content changes
    const readTime = calculateReadTime(newContent)
    setValue("readTime", readTime)
  }

  const onSubmit = async (data: ArticleFormData) => {
    setError(null)

    startTransition(async () => {
      const result = isEditing
        ? await updateArticle(article.id, data)
        : await createArticle(data)

      if (result.success) {
        router.push("/admin/articles")
        router.refresh()
      } else {
        setError(result.error || "Une erreur est survenue")
      }
    })
  }

  const [tagInput, setTagInput] = useState("")

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      const newTags = [...tags, tagInput.trim()]
      if (newTags.length <= 5) {
        setValue("tags", newTags)
        setTagInput("")
      }
    }
  }

  const removeTag = (index: number) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== index)
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informations Générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Titre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Ex: Introduction au Machine Learning"
              maxLength={200}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
            <p className="text-xs text-gray-500">{title?.length || 0}/200</p>
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                {...register("slug")}
                placeholder="introduction-machine-learning"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateSlug}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            {errors.slug && (
              <p className="text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Brève description de l'article..."
              className="w-full min-h-[100px] rounded-md border border-gray-300 px-3 py-2"
              maxLength={300}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
            <p className="text-xs text-gray-500">
              {watch("description")?.length || 0}/300
            </p>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>
              Image de l'article <span className="text-red-500">*</span>
            </Label>
            <ImageUpload
              value={watch("image")}
              onChange={(url) => setValue("image", url)}
              onRemove={() => setValue("image", "")}
            />
            {errors.image && (
              <p className="text-sm text-red-600">{errors.image.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contenu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>
              Contenu <span className="text-red-500">*</span>
            </Label>
            <RichTextEditor
              content={content}
              onChange={handleContentChange}
              placeholder="Commencez à écrire votre article..."
            />
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Métadonnées</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags (max 5)</Label>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              placeholder="Appuyez sur Entrée pour ajouter"
              disabled={tags.length >= 5}
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="[background:var(--primary)]/10 [color:var(--primary)] px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Read Time */}
          <div className="space-y-2">
            <Label htmlFor="readTime">Temps de lecture</Label>
            <Input
              id="readTime"
              {...register("readTime")}
              placeholder="5 min"
              readOnly
            />
            {errors.readTime && (
              <p className="text-sm text-red-600">{errors.readTime.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Calculé automatiquement à partir du contenu
            </p>
          </div>

          {/* Published */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              {...register("published")}
              className="w-4 h-4 rounded border-gray-300"
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publier immédiatement
            </Label>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              {...register("featured")}
              className="w-4 h-4 rounded border-gray-300"
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Article mis en avant
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-4 justify-between">
        <ArticlePreview
          data={{
            title: watch("title"),
            description: watch("description"),
            image: watch("image"),
            content: watch("content"),
            tags: watch("tags"),
            readTime: watch("readTime"),
          }}
        />
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="outline"
            disabled={isPending}
            onClick={() => setValue("published", false)}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Sauvegarder comme brouillon
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)]"
            disabled={isPending}
            onClick={() => setValue("published", true)}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {isEditing ? "Mettre à jour et publier" : "Créer et publier"}
          </Button>
        </div>
      </div>
    </form>
  )
}
