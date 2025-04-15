"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Clock, CheckCircle } from "lucide-react"

interface Version {
  version: string
  date: string
  notes: string
  isCurrent?: boolean
}

interface MaterialVersionHistoryProps {
  versions: Version[]
}

export function MaterialVersionHistory({ versions }: MaterialVersionHistoryProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-medium mb-4">Version History</h3>
        <div className="space-y-4">
          {versions.map((version, index) => (
            <div
              key={version.version}
              className={`p-4 rounded-lg border ${
                version.isCurrent ? "border-blue-200 bg-blue-50" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Version {version.version}</h4>
                  {version.isCurrent && (
                    <Badge className="bg-blue-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Clock className="h-4 w-4 mr-1" />
                {version.date}
              </div>
              <p className="mt-2 text-sm">{version.notes}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
