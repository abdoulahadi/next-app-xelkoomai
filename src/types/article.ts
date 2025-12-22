import { Article, User } from '@prisma/client'

// Article avec son auteur
export type ArticleWithAuthor = Article & {
  author: {
    id: string
    name: string | null
    email: string
    image: string | null
  }
}

// Input pour créer un article
export type CreateArticleInput = {
  title: string
  slug: string
  description: string
  content: string
  image: string
  tags: string[]
  readTime: string
  published?: boolean
  featured?: boolean
}

// Input pour mettre à jour un article
export type UpdateArticleInput = Partial<CreateArticleInput> & {
  id: string
}

// Données du formulaire d'article
export type ArticleFormData = {
  title: string
  slug: string
  description: string
  content: string
  image: string
  tags: string[]
  readTime: string
  published: boolean
  featured: boolean
}

// Filtres pour la liste d'articles
export type ArticleFilters = {
  search?: string
  published?: boolean
  tags?: string[]
  authorId?: string
  featured?: boolean
}

// Pagination
export type PaginationParams = {
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'views' | 'title'
  sortOrder?: 'asc' | 'desc'
}

// Résultat paginé
export type PaginatedResult<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
