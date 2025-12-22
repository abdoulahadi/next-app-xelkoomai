import { requireAuth } from "@/lib/auth-utils"
import { getAllArticles } from "@/lib/db/articles"
import { ArticlesTable } from "@/components/admin/ArticlesTable"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; status?: string }
}) {
  await requireAuth()

  const page = parseInt(searchParams.page || "1")
  const search = searchParams.search || ""
  const status = searchParams.status

  const published = status === "published" ? true : status === "draft" ? false : undefined

  const { data: articles, total, totalPages } = await getAllArticles(
    { search, published },
    { page, limit: 10 }
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500 mt-1">
            Gérez vos articles de blog
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)]"
        >
          <Link href="/admin/articles/new">
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </Link>
        </Button>
      </div>

      <ArticlesTable
        articles={articles}
        total={total}
        page={page}
        totalPages={totalPages}
      />
    </div>
  )
}
