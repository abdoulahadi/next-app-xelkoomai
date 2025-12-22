/**
 * Calculate estimated read time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadTime(content: string): string {
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '')

  // Count words
  const words = text.trim().split(/\s+/).length

  // Calculate minutes (round up)
  const minutes = Math.ceil(words / 200)

  return `${minutes} min`
}
