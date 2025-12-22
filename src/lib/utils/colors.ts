/**
 * Utilitaires pour manipuler les couleurs et calculer les contrastes WCAG
 */

/**
 * Convertir hex en RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Convertir RGB en hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * Calculer la luminance relative d'une couleur (WCAG)
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0

  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculer le ratio de contraste entre deux couleurs (WCAG)
 * @returns Ratio de contraste (1-21)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1)
  const lum2 = getLuminance(hex2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)

  return (brightest + 0.05) / (darkest + 0.05)
}

/**
 * Vérifier si une couleur passe les tests WCAG
 */
export function checkWCAGCompliance(
  foreground: string,
  background: string
): {
  aa: boolean // 4.5:1 pour texte normal
  aaLarge: boolean // 3:1 pour texte large (18pt+ ou 14pt+ gras)
  aaa: boolean // 7:1 pour texte normal
}  {
  const ratio = getContrastRatio(foreground, background)

  return {
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
  }
}

/**
 * Assombrir une couleur
 */
export function darken(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const r = Math.max(0, Math.min(255, Math.round(rgb.r * (1 - percent))))
  const g = Math.max(0, Math.min(255, Math.round(rgb.g * (1 - percent))))
  const b = Math.max(0, Math.min(255, Math.round(rgb.b * (1 - percent))))

  return rgbToHex(r, g, b)
}

/**
 * Éclaircir une couleur
 */
export function lighten(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const r = Math.max(0, Math.min(255, Math.round(rgb.r + (255 - rgb.r) * percent)))
  const g = Math.max(0, Math.min(255, Math.round(rgb.g + (255 - rgb.g) * percent)))
  const b = Math.max(0, Math.min(255, Math.round(rgb.b + (255 - rgb.b) * percent)))

  return rgbToHex(r, g, b)
}

/**
 * Générer une palette de nuances à partir d'une couleur
 */
export function generateShades(hex: string): {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string // couleur de base
  600: string
  700: string
  800: string
  900: string
} {
  return {
    50: lighten(hex, 0.9),
    100: lighten(hex, 0.8),
    200: lighten(hex, 0.6),
    300: lighten(hex, 0.4),
    400: lighten(hex, 0.2),
    500: hex,
    600: darken(hex, 0.1),
    700: darken(hex, 0.2),
    800: darken(hex, 0.3),
    900: darken(hex, 0.4),
  }
}

/**
 * Obtenir une couleur de texte (noir ou blanc) avec le meilleur contraste
 */
export function getTextColor(backgroundColor: string): string {
  const contrastWithWhite = getContrastRatio(backgroundColor, "#FFFFFF")
  const contrastWithBlack = getContrastRatio(backgroundColor, "#000000")

  return contrastWithWhite > contrastWithBlack ? "#FFFFFF" : "#000000"
}

/**
 * Générer toutes les variantes d'une couleur pour l'interface
 */
export function generateColorVariants(hex: string) {
  const shades = generateShades(hex)
  const textColor = getTextColor(hex)

  return {
    ...shades,
    hover: darken(hex, 0.1),
    active: darken(hex, 0.15),
    disabled: lighten(hex, 0.6),
    textColor,
  }
}
