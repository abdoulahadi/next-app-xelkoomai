import { BlogListClient } from "./BlogListClient"

type Article = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  readTime: string
  publishedAt: Date | null
  author: string
}

interface BlogListProps {
  articles: Article[]
  total: number
  page: number
  totalPages: number
  newsletterEnabled: boolean
  allTags: string[]
  currentSearch: string
  currentTag: string
}

export function BlogList(props: BlogListProps) {
  return <BlogListClient {...props} />
}
