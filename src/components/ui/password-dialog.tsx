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
import { Check, Copy } from "lucide-react"
import toast from "react-hot-toast"

interface PasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  password: string
}

export function PasswordDialog({
  open,
  onOpenChange,
  email,
  password,
}: PasswordDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    toast.success("Mot de passe copié dans le presse-papiers")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau mot de passe généré</DialogTitle>
          <DialogDescription>
            Mot de passe pour <strong>{email}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between gap-4">
              <code className="text-lg font-mono font-semibold text-gray-900 break-all">
                {password}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="flex-shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            ⚠️ Copiez ce mot de passe et partagez-le de manière sécurisée.
            Cette fenêtre ne sera pas affichée à nouveau.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
