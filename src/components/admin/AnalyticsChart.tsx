"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DataPoint {
  date: string
  views: number
}

interface AnalyticsChartProps {
  data: DataPoint[]
  title: string
}

export function AnalyticsChart({ data, title }: AnalyticsChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Aucune donnée disponible</p>
        </CardContent>
      </Card>
    )
  }

  const maxValue = Math.max(...data.map((d) => d.views))
  const chartHeight = 200

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Simple bar chart */}
          <div className="flex items-end justify-between gap-2 h-[200px]">
            {data.map((point, index) => {
              const height = maxValue > 0 ? (point.views / maxValue) * chartHeight : 0
              const date = new Date(point.date)
              const dayName = date.toLocaleDateString("fr-FR", { weekday: "short" })

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <span className="text-xs font-medium text-gray-700 mb-1">
                      {point.views}
                    </span>
                    <div
                      className="w-full [background:var(--primary)] hover:bg-[var(--primary)] rounded-t transition-all"
                      style={{ height: `${height}px`, minHeight: point.views > 0 ? "4px" : "0" }}
                      title={`${point.views} vues le ${date.toLocaleDateString("fr-FR")}`}
                    />
                  </div>
                  <span className="text-xs text-gray-500 capitalize">{dayName}</span>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 [background:var(--primary)] rounded" />
              <span>Vues quotidiennes</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
