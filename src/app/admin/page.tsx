import { requireAuth } from "@/lib/auth-utils"
import { DashboardStats } from "@/components/admin/DashboardStats"
import { RecentArticles } from "@/components/admin/RecentArticles"
import { getDashboardAnalytics } from "@/actions/analytics"
import { AnalyticsChart } from "@/components/admin/AnalyticsChart"
import { TopArticles } from "@/components/admin/TopArticles"
import { RecentComments } from "@/components/admin/RecentComments"
import { Users, MessageSquare, Image as ImageIcon, Sparkles } from "lucide-react"
import { StatsCard } from "@/components/admin/StatsCard"

export default async function AdminDashboard() {
  await requireAuth()

  const analyticsResult = await getDashboardAnalytics()
  const analytics = analyticsResult.success ? analyticsResult.data : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Analytics</h1>
        <p className="text-gray-500 mt-1">
          Vue d'ensemble complète de votre plateforme
        </p>
      </div>

      {/* Stats principales */}
      <DashboardStats />

      {/* Stats supplémentaires */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Utilisateurs"
            value={analytics.users.total}
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Commentaires"
            value={analytics.comments.total}
            icon={MessageSquare}
            color="green"
          />
          <StatsCard
            title="Médias"
            value={analytics.media.total}
            icon={ImageIcon}
            color="orange"
          />
          <StatsCard
            title="Réalisations"
            value={analytics.realizations.total}
            icon={Sparkles}
            color="red"
          />
        </div>
      )}

      {/* Graphique d'évolution */}
      {analytics && (
        <AnalyticsChart
          data={analytics.growth.dailyViews}
          title="Vues des 7 derniers jours"
        />
      )}

      {/* Grille avec articles et commentaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Articles récents */}
        <RecentArticles />

        {/* Top articles */}
        {analytics && <TopArticles articles={analytics.views.topArticles} />}
      </div>

      {/* Commentaires récents */}
      {analytics && analytics.comments.recentList.length > 0 && (
        <RecentComments comments={analytics.comments.recentList} />
      )}
    </div>
  )
}
