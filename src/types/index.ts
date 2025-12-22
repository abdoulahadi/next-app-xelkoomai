export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface UseCase {
  id: string
  title: string
  client?: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  technologies: string[]
  image?: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  readTime: string
  tags: string[]
  image?: string
  content: string
}

export interface TeamMember {
  name: string
  role: string
  image?: string
  linkedin?: string
  bio: string
}
