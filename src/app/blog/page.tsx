import { getPublishedArticles, getAllTags } from "@/actions/articles"
import { getSettings } from "@/actions/settings"
import { BlogList } from "@/components/blog/BlogList"

export const metadata = {
  title: "Blog & Insights",
  description: "Découvrez nos derniers articles sur l'intelligence artificielle, les tendances tech et nos retours d'expérience"
}

export const revalidate = 60 // Revalidate every minute

interface SearchParams {
  page?: string
  search?: string
  tag?: string
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const search = params.search || ""
  const tag = params.tag || ""

  const result = await getPublishedArticles(page, 12, search, tag)
  const settings = await getSettings()
  const allTags = await getAllTags()

  return (
    <BlogList
      articles={result.articles}
      total={result.total}
      page={result.page}
      totalPages={result.totalPages}
      newsletterEnabled={settings.newsletterEnabled}
      allTags={allTags}
      currentSearch={search}
      currentTag={tag}
    />
  )
}
