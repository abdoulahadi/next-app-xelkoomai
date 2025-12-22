import prisma from '../prisma'

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Replace accented characters
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-|-$/g, '')
}

/**
 * Ensure slug is unique by appending a number if necessary
 */
export async function ensureUniqueSlug(
  slug: string,
  excludeId?: string
): Promise<string> {
  let uniqueSlug = slug
  let counter = 2

  while (true) {
    const existing = await prisma.article.findUnique({
      where: { slug: uniqueSlug },
      select: { id: true },
    })

    // If no existing article or it's the same article we're editing, slug is unique
    if (!existing || (excludeId && existing.id === excludeId)) {
      return uniqueSlug
    }

    // Append counter and try again
    uniqueSlug = `${slug}-${counter}`
    counter++
  }
}
