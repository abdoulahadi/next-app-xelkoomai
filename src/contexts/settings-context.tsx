"use client"

import { createContext, useContext, ReactNode } from "react"
import type { Settings } from "@/actions/settings"

const SettingsContext = createContext<Settings | null>(null)

export function SettingsProvider({
  children,
  settings,
}: {
  children: ReactNode
  settings: Settings
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider")
  }
  return context
}
