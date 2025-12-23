import { requireRole } from "@/lib/auth-utils"
import { getAuditLogs, getAuditStats } from "@/actions/audit"
import { AuditLogsTable } from "@/components/admin/AuditLogsTable"
import { Card, CardContent } from "@/components/ui/card"
import { StatsCard } from "@/components/admin/StatsCard"
import { Shield, Activity, Clock } from "lucide-react"
import Link from "next/link"

interface SearchParams {
  page?: string
  action?: string
  entity?: string
}

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  await requireRole("ADMIN")

  const params = await searchParams
  const page = Number(params.page) || 1
  const action = params.action || ""
  const entity = params.entity || ""

  const [logsResult, statsResult] = await Promise.all([
    getAuditLogs(page, 50, action, entity),
    getAuditStats(),
  ])

  if (!logsResult.success || !logsResult.data) {
    return <div>Erreur lors du chargement des logs</div>
  }

  const stats = statsResult.success ? statsResult.data : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Journal d&apos;Audit</h1>
        <p className="text-gray-500 mt-1">
          Historique complet des actions effectuées sur la plateforme
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total de logs"
            value={stats.total}
            icon={Shield}
            color="blue"
          />
          <StatsCard
            title="Actions (24h)"
            value={stats.recent}
            icon={Activity}
            color="green"
          />
          <StatsCard
            title="Types d'actions"
            value={stats.byAction.length}
            icon={Clock}
            color="blue"
          />
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Filtrer par action:</span>
            <Link
              href="/admin/audit"
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                !action
                  ? "[background:var(--primary)] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Toutes
            </Link>
            {["CREATE", "UPDATE", "DELETE", "LOGIN"].map((a) => (
              <Link
                key={a}
                href={`/admin/audit?action=${a}`}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  action === a
                    ? "[background:var(--primary)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {a}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-wrap mt-4">
            <span className="text-sm font-medium text-gray-700">Filtrer par entité:</span>
            <Link
              href="/admin/audit"
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                !entity
                  ? "[background:var(--primary)] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Toutes
            </Link>
            {["Article", "User", "Media", "Realization", "Comment"].map((e) => (
              <Link
                key={e}
                href={`/admin/audit?entity=${e}`}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  entity === e
                    ? "[background:var(--primary)] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {e}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logs table */}
      <AuditLogsTable
        logs={logsResult.data}
        total={logsResult.total}
        page={page}
        totalPages={logsResult.totalPages}
      />
    </div>
  )
}
