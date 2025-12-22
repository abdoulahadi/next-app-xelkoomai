"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { createUser } from "@/actions/users"
import toast from "react-hot-toast"

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateUserDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateUserDialogProps) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "VIEWER" as "ADMIN" | "EDITOR" | "VIEWER",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const roleLabels = {
    ADMIN: "Administrateur",
    EDITOR: "Éditeur",
    VIEWER: "Lecteur",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.name || !formData.password) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    if (formData.password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères")
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createUser(formData)

      if (result.success) {
        toast.success("Utilisateur créé avec succès")
        setFormData({
          email: "",
          name: "",
          password: "",
          role: "VIEWER",
        })
        onOpenChange(false)
        onSuccess()
      } else {
        toast.error(result.error || "Erreur lors de la création")
      }
    } catch (error) {
      toast.error("Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
          <DialogDescription>
            Ajoutez un nouvel utilisateur au système
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                autoFocus
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="user@example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Min. 8 caractères"
              />
            </div>

            <div className="grid gap-2">
              <Label>Rôle</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {roleLabels[formData.role]}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem
                    onClick={() => setFormData({ ...formData, role: "ADMIN" })}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">Administrateur</span>
                      <span className="text-xs text-gray-500">
                        Accès complet au système
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFormData({ ...formData, role: "EDITOR" })}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">Éditeur</span>
                      <span className="text-xs text-gray-500">
                        Peut créer et modifier du contenu
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setFormData({ ...formData, role: "VIEWER" })}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">Lecteur</span>
                      <span className="text-xs text-gray-500">
                        Accès en lecture seule
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer l'utilisateur"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
