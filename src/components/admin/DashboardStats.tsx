import { FileText, CheckCircle, FileEdit, Eye } from "lucide-react"
import { StatsCard } from "./StatsCard"
import { getArticleStats } from "@/lib/db/stats"

export async function DashboardStats() {
  const stats = await getArticleStats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Articles"
        value={stats.total}
        icon={FileText}
        color="blue"
      />
      <StatsCard
        title="Publiés"
        value={stats.published}
        icon={CheckCircle}
        color="green"
      />
      <StatsCard
        title="Brouillons"
        value={stats.drafts}
        icon={FileEdit}
        color="orange"
      />
      <StatsCard
        title="Total Vues"
        value={stats.totalViews.toLocaleString()}
        icon={Eye}
        color="red"
      />
    </div>
  )
}
