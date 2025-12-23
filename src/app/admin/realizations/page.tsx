import { requireAuth } from "@/lib/auth-utils"
import { getAllRealizations } from "@/actions/realizations"
import { RealizationsTable } from "@/components/admin/RealizationsTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search } from "lucide-react"
import Link from "next/link"

interface SearchParams {
  page?: string
  search?: string
}

export default async function RealizationsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  await requireAuth()

  const params = await searchParams
  const page = Number(params.page) || 1
  const search = params.search || ""

  const result = await getAllRealizations(page, 9, search)

  if (!result.success || !result.data) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Réalisations</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Erreur lors du chargement des réalisations</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Réalisations</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos cas d&apos;usage et portfolio
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/realizations/new">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle réalisation
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Rechercher</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="/admin/realizations" method="get">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  name="search"
                  placeholder="Rechercher par titre ou description..."
                  defaultValue={search}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Rechercher</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Table */}
      <RealizationsTable
        realizations={result.data}
        total={result.total || 0}
        page={page}
        totalPages={result.totalPages || 1}
      />
    </div>
  )
}
