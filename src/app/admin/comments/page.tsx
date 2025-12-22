import { requireAuth } from "@/lib/auth-utils"
import { getAllComments } from "@/actions/comments"
import { CommentsTable } from "@/components/admin/CommentsTable"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

interface SearchParams {
  page?: string
  filter?: string
}

export default async function CommentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  await requireAuth()

  const params = await searchParams
  const page = Number(params.page) || 1
  const filter = params.filter || "all"

  const result = await getAllComments(page, 20, filter)

  if (!result.success || !result.data) {
    return <div>Erreur lors du chargement des commentaires</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Commentaires</h1>
        <p className="text-gray-500 mt-1">Gérez et modérez les commentaires</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par auteur, contenu..."
                className="pl-10"
                disabled
              />
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/admin/comments?filter=all"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "[background:var(--primary)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tous
              </Link>
              <Link
                href="/admin/comments?filter=pending"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "pending"
                    ? "[background:var(--primary)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                En attente
              </Link>
              <Link
                href="/admin/comments?filter=approved"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "approved"
                    ? "[background:var(--primary)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Approuvés
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments table */}
      <CommentsTable
        comments={result.data}
        total={result.total}
        page={page}
        totalPages={result.totalPages}
      />
    </div>
  )
}
