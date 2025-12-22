"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createRealization, updateRealization, type RealizationFormData } from "@/actions/realizations"
import { Plus, X, Save } from "lucide-react"
import toast from "react-hot-toast"

interface RealizationFormProps {
  realization?: RealizationFormData & { id: string }
  isEdit?: boolean
}

const iconOptions = [
  "Bot", "Users", "Tractor", "FileText", "Sparkles", "Rocket",
  "Zap", "Target", "TrendingUp", "Award", "Star", "Heart"
]

export function RealizationForm({ realization, isEdit = false }: RealizationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<RealizationFormData>({
    title: realization?.title || "",
    description: realization?.description || "",
    benefits: realization?.benefits || [""],
    image: realization?.image || "",
    link: realization?.link || "",
    icon: realization?.icon || "Sparkles",
    published: realization?.published ?? true,
    order: realization?.order || 0,
  })

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, ""],
    })
  }

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    })
  }

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits]
    newBenefits[index] = value
    setFormData({
      ...formData,
      benefits: newBenefits,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Filter out empty benefits
      const cleanedData = {
        ...formData,
        benefits: formData.benefits.filter(b => b.trim() !== ""),
      }

      if (cleanedData.benefits.length === 0) {
        toast.error("Au moins un bénéfice est requis")
        setIsSubmitting(false)
        return
      }

      const result = isEdit && realization?.id
        ? await updateRealization(realization.id, cleanedData)
        : await createRealization(cleanedData)

      if (result.success) {
        toast.success(isEdit ? "Réalisation mise à jour" : "Réalisation créée avec succès")
        router.push("/admin/realizations")
        router.refresh()
      } else {
        toast.error(result.error || "Une erreur est survenue")
      }
    } catch (error) {
      toast.error("Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="image">URL de l'image *</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              required
            />
            {formData.image && (
              <div className="mt-2 relative h-32 w-full rounded-lg overflow-hidden">
                <img src={formData.image} alt="Preview" className="object-cover w-full h-full" />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="link">Lien vers l'application (optionnel)</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="icon">Icône</Label>
              <select
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="order">Ordre d'affichage</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                min={0}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publier cette réalisation
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bénéfices</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={benefit}
                onChange={(e) => updateBenefit(index, e.target.value)}
                placeholder={`Bénéfice ${index + 1}`}
              />
              {formData.benefits.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeBenefit(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/realizations")}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}
