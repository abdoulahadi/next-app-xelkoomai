"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
  helpText?: string
}

// Calculer le contraste WCAG entre deux couleurs
function getContrast(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff

    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const lum1 = getLuminance(hex1)
  const lum2 = getLuminance(hex2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

// G\u00e9n\u00e9rer une nuance plus fonc\u00e9e (pour hover)
function darken(hex: string, percent: number): string {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.max(0, ((num >> 16) & 0xff) * (1 - percent))
  const g = Math.max(0, ((num >> 8) & 0xff) * (1 - percent))
  const b = Math.max(0, (num & 0xff) * (1 - percent))

  return `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b))
    .toString(16)
    .slice(1)}`
}

export function ColorPicker({ label, value, onChange, helpText }: ColorPickerProps) {
  const [localValue, setLocalValue] = useState(value)
  const [contrastWithWhite, setContrastWithWhite] = useState(0)
  const [contrastWithBlack, setContrastWithBlack] = useState(0)

  useEffect(() => {
    setLocalValue(value)
    if (value && value.match(/^#[0-9A-F]{6}$/i)) {
      setContrastWithWhite(getContrast(value, "#FFFFFF"))
      setContrastWithBlack(getContrast(value, "#000000"))
    }
  }, [value])

  const handleChange = (newValue: string) => {
    setLocalValue(newValue)
    if (newValue.match(/^#[0-9A-F]{6}$/i)) {
      onChange(newValue)
      setContrastWithWhite(getContrast(newValue, "#FFFFFF"))
      setContrastWithBlack(getContrast(newValue, "#000000"))
    }
  }

  const getContrastBadge = (contrast: number) => {
    if (contrast >= 7) return { label: "AAA", color: "bg-green-600" }
    if (contrast >= 4.5) return { label: "AA", color: "bg-green-500" }
    if (contrast >= 3) return { label: "AA Large", color: "bg-yellow-500" }
    return { label: "Fail", color: "bg-red-500" }
  }

  const whiteContrast = getContrastBadge(contrastWithWhite)
  const blackContrast = getContrastBadge(contrastWithBlack)
  const hoverColor = darken(localValue, 0.15)

  return (
    <div className="space-y-3">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, "-")} className="text-sm font-medium">
        {label}
      </Label>

      <div className="flex gap-3 items-start">
        {/* Color preview with gradient */}
        <div className="flex flex-col gap-2">
          <div
            className="w-20 h-20 rounded-lg border-2 border-gray-200 shadow-sm transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${localValue} 0%, ${hoverColor} 100%)`,
            }}
            title={`Couleur: ${localValue}\nHover: ${hoverColor}`}
          />
          <input
            type="color"
            id={label.toLowerCase().replace(/\s+/g, "-")}
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            className="w-20 h-10 rounded cursor-pointer border-2 border-gray-200"
          />
        </div>

        {/* Input text + contrast info */}
        <div className="flex-1 space-y-2">
          <Input
            type="text"
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="var(--primary)"
            className="font-mono uppercase"
            maxLength={7}
          />

          {helpText && <p className="text-xs text-gray-500">{helpText}</p>}

          {/* WCAG Contrast badges */}
          {localValue.match(/^#[0-9A-F]{6}$/i) && (
            <div className="flex gap-2 flex-wrap text-xs">
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Sur blanc:</span>
                <span className={`${whiteContrast.color} text-white px-2 py-0.5 rounded font-semibold`}>
                  {whiteContrast.label}
                </span>
                <span className="text-gray-500">({contrastWithWhite.toFixed(2)}:1)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Sur noir:</span>
                <span className={`${blackContrast.color} text-white px-2 py-0.5 rounded font-semibold`}>
                  {blackContrast.label}
                </span>
                <span className="text-gray-500">({contrastWithBlack.toFixed(2)}:1)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
