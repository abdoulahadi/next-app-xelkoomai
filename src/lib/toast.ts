import toast from "react-hot-toast"

/**
 * Toast notification helpers
 */

export const showToast = {
  success: (message: string) => {
    toast.success(message)
  },

  error: (message: string) => {
    toast.error(message)
  },

  loading: (message: string) => {
    return toast.loading(message)
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    return toast.promise(promise, messages)
  },

  custom: (message: string, options?: any) => {
    toast(message, options)
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId)
  },
}

// Specific toast messages for common actions
export const toasts = {
  article: {
    created: () => showToast.success("Article créé avec succès"),
    updated: () => showToast.success("Article mis à jour"),
    deleted: () => showToast.success("Article supprimé"),
    published: () => showToast.success("Article publié"),
    unpublished: () => showToast.success("Article mis en brouillon"),
  },

  media: {
    uploaded: () => showToast.success("Fichier uploadé avec succès"),
    deleted: () => showToast.success("Média supprimé"),
    copied: () => showToast.success("URL copiée dans le presse-papier"),
  },

  user: {
    created: () => showToast.success("Utilisateur créé"),
    updated: () => showToast.success("Utilisateur mis à jour"),
    deleted: () => showToast.success("Utilisateur supprimé"),
    passwordReset: () => showToast.success("Mot de passe réinitialisé"),
  },

  auth: {
    loginSuccess: () => showToast.success("Connexion réussie"),
    loginError: () => showToast.error("Identifiants invalides"),
    logoutSuccess: () => showToast.success("Déconnexion réussie"),
    unauthorized: () => showToast.error("Accès non autorisé"),
  },

  general: {
    saved: () => showToast.success("Modifications sauvegardées"),
    error: (message?: string) =>
      showToast.error(message || "Une erreur est survenue"),
    loading: (message: string) => showToast.loading(message),
    copySuccess: () => showToast.success("Copié dans le presse-papier"),
  },
}
