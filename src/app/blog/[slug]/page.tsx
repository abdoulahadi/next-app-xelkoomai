import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPublishedArticleBySlug, getPublishedArticles } from "@/actions/articles"
import { BlogPostContent } from "@/components/blog/BlogPostContent"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getPublishedArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article non trouvé",
    }
  }

  return {
    title: article.title,
    description: article.description,
  }
}

export async function generateStaticParams() {
  const result = await getPublishedArticles()

  return result.articles.map((article: any) => ({
    slug: article.slug,
  }))
}

export const revalidate = 60 

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const article = await getPublishedArticleBySlug(slug)

  if (!article) {
    notFound()
  }
  

  // Get related articles
  const allArticlesResult = await getPublishedArticles()
  const relatedArticles = allArticlesResult.articles
    .filter((a: any) => a.slug !== slug)
    .filter((a: any) => a.tags.some((tag: string) => article.tags.includes(tag)))
    .slice(0, 2)

  return <BlogPostContent article={article} relatedArticles={relatedArticles} articleId={article.id} />
}
