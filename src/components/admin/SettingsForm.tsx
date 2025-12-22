"use client"

import { useState } from "react"
import { updateSettings, type Settings } from "@/actions/settings"
import { showToast } from "@/lib/toast"
import { ColorPicker } from "@/components/admin/ColorPicker"

export function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState(initialSettings)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      await updateSettings({
        siteName: formData.get("siteName") as string,
        siteDescription: formData.get("siteDescription") as string,
        siteUrl: formData.get("siteUrl") as string,
        logoUrl: formData.get("logoUrl") as string || null,
        seoTitle: formData.get("seoTitle") as string || null,
        seoDescription: formData.get("seoDescription") as string || null,
        seoKeywords: formData.get("seoKeywords") as string || null,
        twitterHandle: formData.get("twitterHandle") as string || null,
        facebookUrl: formData.get("facebookUrl") as string || null,
        linkedinUrl: formData.get("linkedinUrl") as string || null,
        instagramUrl: formData.get("instagramUrl") as string || null,
        contactEmail: formData.get("contactEmail") as string || null,
        contactPhone: formData.get("contactPhone") as string || null,
        newsletterEnabled: formData.get("newsletterEnabled") === "on",
        newsletterProvider: formData.get("newsletterProvider") as string || null,
        newsletterApiKey: formData.get("newsletterApiKey") as string || null,
        emailjsEnabled: formData.get("emailjsEnabled") === "on",
        emailjsServiceId: formData.get("emailjsServiceId") as string || null,
        emailjsTemplateId: formData.get("emailjsTemplateId") as string || null,
        emailjsPublicKey: formData.get("emailjsPublicKey") as string || null,
        // All 14 color fields
        primaryColor: settings.primaryColor,
        secondaryColor: settings.secondaryColor,
        accentColor: settings.accentColor,
        backgroundColor: settings.backgroundColor,
        foregroundColor: settings.foregroundColor,
        grayLightColor: settings.grayLightColor,
        successColor: settings.successColor,
        errorColor: settings.errorColor,
        warningColor: settings.warningColor,
        infoColor: settings.infoColor,
        textPrimaryColor: settings.textPrimaryColor,
        textSecondaryColor: settings.textSecondaryColor,
        textMutedColor: settings.textMutedColor,
        adminSidebarColor: settings.adminSidebarColor,
        adminAccentColor: settings.adminAccentColor,
      })

      showToast.success("Paramètres mis à jour avec succès")
    } catch (error) {
      console.error("Error updating settings:", error)
      showToast.error(
        error instanceof Error ? error.message : "Erreur lors de la mise à jour"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Site Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Informations du site
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="siteName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nom du site
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.siteName}
              required
            />
          </div>
          <div>
            <label
              htmlFor="siteDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="siteDescription"
              name="siteDescription"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              rows={3}
              defaultValue={settings.siteDescription}
              required
            />
          </div>
          <div>
            <label
              htmlFor="siteUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              URL du site
            </label>
            <input
              type="url"
              id="siteUrl"
              name="siteUrl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.siteUrl}
              required
            />
          </div>
          <div>
            <label
              htmlFor="logoUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              URL du logo (optionnel)
            </label>
            <input
              type="url"
              id="logoUrl"
              name="logoUrl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.logoUrl || ""}
              placeholder="/logo-icone.png"
            />
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Configuration SEO
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="seoTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Titre SEO (optionnel)
            </label>
            <input
              type="text"
              id="seoTitle"
              name="seoTitle"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.seoTitle || ""}
              placeholder="Laissez vide pour utiliser le nom du site"
            />
          </div>
          <div>
            <label
              htmlFor="seoDescription"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Meta description
            </label>
            <textarea
              id="seoDescription"
              name="seoDescription"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              rows={2}
              defaultValue={settings.seoDescription || ""}
              placeholder="Description pour les moteurs de recherche"
            />
          </div>
          <div>
            <label
              htmlFor="seoKeywords"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mots-clés SEO (séparés par des virgules)
            </label>
            <input
              type="text"
              id="seoKeywords"
              name="seoKeywords"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.seoKeywords || ""}
              placeholder="IA, Machine Learning, Sénégal"
            />
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Réseaux sociaux
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="twitterHandle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Twitter / X (handle)
            </label>
            <input
              type="text"
              id="twitterHandle"
              name="twitterHandle"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.twitterHandle || ""}
              placeholder="@xelkoomai"
            />
          </div>
          <div>
            <label
              htmlFor="facebookUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Facebook (URL)
            </label>
            <input
              type="url"
              id="facebookUrl"
              name="facebookUrl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.facebookUrl || ""}
              placeholder="https://facebook.com/xelkoomai"
            />
          </div>
          <div>
            <label
              htmlFor="linkedinUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              LinkedIn (URL)
            </label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.linkedinUrl || ""}
              placeholder="https://linkedin.com/company/xelkoomai"
            />
          </div>
          <div>
            <label
              htmlFor="instagramUrl"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Instagram (URL)
            </label>
            <input
              type="url"
              id="instagramUrl"
              name="instagramUrl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.instagramUrl || ""}
              placeholder="https://instagram.com/xelkoomai"
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Contact
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email de contact
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.contactEmail || ""}
              placeholder="contact@xelkoomai.sn"
            />
          </div>
          <div>
            <label
              htmlFor="contactPhone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Téléphone
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.contactPhone || ""}
              placeholder="+221 XX XXX XX XX"
            />
          </div>
        </div>
      </div>

      {/* EmailJS Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Configuration EmailJS
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailjsEnabled"
              name="emailjsEnabled"
              className="w-4 h-4 [color:var(--primary)] border-gray-300 rounded focus:[--tw-ring-color:var(--primary)]"
              defaultChecked={settings.emailjsEnabled}
            />
            <label
              htmlFor="emailjsEnabled"
              className="ml-2 block text-sm text-gray-900"
            >
              Activer EmailJS pour le formulaire de contact
            </label>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              📧 <strong>EmailJS</strong> permet d&apos;envoyer des emails directement depuis le formulaire de contact.
              <a
                href="https://www.emailjs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-600 hover:underline"
              >
                Créer un compte EmailJS →
              </a>
            </p>
          </div>
          <div>
            <label
              htmlFor="emailjsServiceId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Service ID
            </label>
            <input
              type="text"
              id="emailjsServiceId"
              name="emailjsServiceId"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.emailjsServiceId || ""}
              placeholder="service_xxxxxxx"
            />
            <p className="text-xs text-gray-500 mt-1">
              Trouvez votre Service ID dans EmailJS Dashboard → Email Services
            </p>
          </div>
          <div>
            <label
              htmlFor="emailjsTemplateId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Template ID
            </label>
            <input
              type="text"
              id="emailjsTemplateId"
              name="emailjsTemplateId"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.emailjsTemplateId || ""}
              placeholder="template_xxxxxxx"
            />
            <p className="text-xs text-gray-500 mt-1">
              Trouvez votre Template ID dans EmailJS Dashboard → Email Templates
            </p>
          </div>
          <div>
            <label
              htmlFor="emailjsPublicKey"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Public Key
            </label>
            <input
              type="text"
              id="emailjsPublicKey"
              name="emailjsPublicKey"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.emailjsPublicKey || ""}
              placeholder="xxxxxxxxxxxxxx"
            />
            <p className="text-xs text-gray-500 mt-1">
              Trouvez votre Public Key dans EmailJS Dashboard → Account → General
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Newsletter
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletterEnabled"
              name="newsletterEnabled"
              className="w-4 h-4 [color:var(--primary)] border-gray-300 rounded focus:[--tw-ring-color:var(--primary)]"
              defaultChecked={settings.newsletterEnabled}
            />
            <label
              htmlFor="newsletterEnabled"
              className="ml-2 block text-sm text-gray-900"
            >
              Activer la newsletter
            </label>
          </div>
          <div>
            <label
              htmlFor="newsletterProvider"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Provider
            </label>
            <select
              id="newsletterProvider"
              name="newsletterProvider"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.newsletterProvider || ""}
            >
              <option value="">Sélectionner un provider</option>
              <option value="mailchimp">Mailchimp</option>
              <option value="sendgrid">SendGrid</option>
              <option value="sendinblue">Sendinblue</option>
              <option value="convertkit">ConvertKit</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="newsletterApiKey"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              API Key
            </label>
            <input
              type="password"
              id="newsletterApiKey"
              name="newsletterApiKey"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:[--tw-ring-color:var(--primary)] focus:border-transparent"
              defaultValue={settings.newsletterApiKey || ""}
              placeholder="••••••••••••••••"
            />
          </div>
        </div>
      </div>

      {/* Appearance - Couleurs principales */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Couleurs principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Couleur primaire"
            value={settings.primaryColor}
            onChange={(value) => setSettings({ ...settings, primaryColor: value })}
            helpText="Couleur principale de la marque (boutons, liens, etc.)"
          />
          <ColorPicker
            label="Couleur secondaire"
            value={settings.secondaryColor}
            onChange={(value) => setSettings({ ...settings, secondaryColor: value })}
            helpText="Couleur secondaire pour les éléments complémentaires"
          />
          <ColorPicker
            label="Couleur d'accent"
            value={settings.accentColor}
            onChange={(value) => setSettings({ ...settings, accentColor: value })}
            helpText="Couleur d'accentuation pour attirer l'attention"
          />
        </div>
      </div>

      {/* Couleurs de base */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Couleurs de base
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Arrière-plan"
            value={settings.backgroundColor}
            onChange={(value) => setSettings({ ...settings, backgroundColor: value })}
            helpText="Couleur de fond principale du site"
          />
          <ColorPicker
            label="Premier plan"
            value={settings.foregroundColor}
            onChange={(value) => setSettings({ ...settings, foregroundColor: value })}
            helpText="Couleur de contraste pour le fond"
          />
          <ColorPicker
            label="Gris clair"
            value={settings.grayLightColor}
            onChange={(value) => setSettings({ ...settings, grayLightColor: value })}
            helpText="Couleur grise claire pour les arrière-plans subtils"
          />
        </div>
      </div>

      {/* Couleurs sémantiques */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Couleurs sémantiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Succès"
            value={settings.successColor}
            onChange={(value) => setSettings({ ...settings, successColor: value })}
            helpText="Messages de succès et validations"
          />
          <ColorPicker
            label="Erreur"
            value={settings.errorColor}
            onChange={(value) => setSettings({ ...settings, errorColor: value })}
            helpText="Messages d'erreur et alertes"
          />
          <ColorPicker
            label="Avertissement"
            value={settings.warningColor}
            onChange={(value) => setSettings({ ...settings, warningColor: value })}
            helpText="Avertissements et attention"
          />
          <ColorPicker
            label="Information"
            value={settings.infoColor}
            onChange={(value) => setSettings({ ...settings, infoColor: value })}
            helpText="Messages informatifs"
          />
        </div>
      </div>

      {/* Couleurs de texte */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Couleurs de texte
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Texte principal"
            value={settings.textPrimaryColor}
            onChange={(value) => setSettings({ ...settings, textPrimaryColor: value })}
            helpText="Couleur du texte principal"
          />
          <ColorPicker
            label="Texte secondaire"
            value={settings.textSecondaryColor}
            onChange={(value) => setSettings({ ...settings, textSecondaryColor: value })}
            helpText="Couleur pour le texte secondaire"
          />
          <ColorPicker
            label="Texte atténué"
            value={settings.textMutedColor}
            onChange={(value) => setSettings({ ...settings, textMutedColor: value })}
            helpText="Couleur pour les textes de moindre importance"
          />
        </div>
      </div>

      {/* Couleurs Admin */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Couleurs Admin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Sidebar Admin"
            value={settings.adminSidebarColor}
            onChange={(value) => setSettings({ ...settings, adminSidebarColor: value })}
            helpText="Couleur de la barre latérale admin"
          />
          <ColorPicker
            label="Accent Admin"
            value={settings.adminAccentColor}
            onChange={(value) => setSettings({ ...settings, adminAccentColor: value })}
            helpText="Couleur d'accent de l'interface admin"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 [background:var(--primary)] text-white rounded-lg hover:bg-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </div>
    </form>
  )
}
