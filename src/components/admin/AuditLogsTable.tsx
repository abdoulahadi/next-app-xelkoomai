"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, User, FileText, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

interface AuditLog {
  id: string
  action: string
  entity: string
  entityId: string
  changes: string | null
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

interface AuditLogsTableProps {
  logs: AuditLog[]
  total: number
  page: number
  totalPages: number
}

const actionColors: Record<string, string> = {
  CREATE: "text-green-600 border-green-600",
  UPDATE: "text-blue-600 border-blue-600",
  DELETE: "text-red-600 border-red-600",
  LOGIN: "text-purple-600 border-purple-600",
}

const actionIcons: Record<string, any> = {
  CREATE: FileText,
  UPDATE: FileText,
  DELETE: FileText,
  LOGIN: User,
}

export function AuditLogsTable({ logs, total, page, totalPages }: AuditLogsTableProps) {
  const router = useRouter()
  const [detailsDialog, setDetailsDialog] = useState(false)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)

  const handlePageChange = (newPage: number) => {
    router.push(`/admin/audit?page=${newPage}`)
  }

  const getActionIcon = (action: string) => {
    const Icon = actionIcons[action] || Shield
    return <Icon className="w-4 h-4" />
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Journal d'Audit ({total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun log trouvé</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg border border-gray-200 hover:[border-color:var(--primary)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getActionIcon(log.action)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <Badge
                              variant="outline"
                              className={actionColors[log.action] || ""}
                            >
                              {log.action}
                            </Badge>
                            <span className="text-sm font-medium text-gray-900">
                              {log.entity}
                            </span>
                            {log.entityId && (
                              <span className="text-xs text-gray-500">
                                ID: {log.entityId.substring(0, 8)}...
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {log.user.name || log.user.email}
                            </span>
                            <span>
                              {new Date(log.createdAt).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          {log.changes && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                              {log.changes}
                            </p>
                          )}
                        </div>
                      </div>

                      {log.changes && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedLog(log)
                            setDetailsDialog(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {page} sur {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Details dialog */}
      <Dialog open={detailsDialog} onOpenChange={setDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails du log</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Action</span>
                  <p className="text-sm text-gray-900 mt-1">{selectedLog.action}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Entité</span>
                  <p className="text-sm text-gray-900 mt-1">{selectedLog.entity}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Utilisateur</span>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedLog.user.name || selectedLog.user.email}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Date</span>
                  <p className="text-sm text-gray-900 mt-1">
                    {new Date(selectedLog.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              {selectedLog.entityId && (
                <div>
                  <span className="text-sm font-medium text-gray-700">ID de l'entité</span>
                  <p className="text-sm text-gray-900 mt-1 font-mono">
                    {selectedLog.entityId}
                  </p>
                </div>
              )}
              {selectedLog.changes && (
                <div>
                  <span className="text-sm font-medium text-gray-700">Modifications</span>
                  <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">
                    {selectedLog.changes}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
