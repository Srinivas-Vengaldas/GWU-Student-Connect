"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Clock, Download, Eye, RotateCcw } from "lucide-react"

type Version = {
  id: string
  version: number
  updatedAt: string
  updatedBy: {
    id: string
    name: string
    avatar: string
  }
  changeDescription: string
  fileSize: string
}

type MaterialVersionHistoryProps = {
  materialId: string
  materialName: string
  currentVersion: number
}

export function MaterialVersionHistory({ materialId, materialName, currentVersion }: MaterialVersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([
    {
      id: "1",
      version: 3,
      updatedAt: "2023-04-12T14:30:00Z",
      updatedBy: {
        id: "1",
        name: "Prof. Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      changeDescription: "Updated with latest research findings",
      fileSize: "4.2 MB",
    },
    {
      id: "2",
      version: 2,
      updatedAt: "2023-03-28T10:15:00Z",
      updatedBy: {
        id: "2",
        name: "Prof. Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      changeDescription: "Fixed typos and formatting issues",
      fileSize: "4.1 MB",
    },
    {
      id: "3",
      version: 1,
      updatedAt: "2023-03-15T09:00:00Z",
      updatedBy: {
        id: "3",
        name: "Prof. Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      changeDescription: "Initial upload",
      fileSize: "4.0 MB",
    },
  ])

  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null)
  const [compareDialogOpen, setCompareDialogOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const handleRestore = (version: Version) => {
    // In a real app, this would call an API to restore the version
    alert(`Restored to version ${version.version}`)
  }

  const handleCompare = (version: Version) => {
    setSelectedVersion(version)
    setCompareDialogOpen(true)
  }

  const handleDownload = (version: Version) => {
    // In a real app, this would download the specific version
    alert(`Downloading version ${version.version}`)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Version History
        </CardTitle>
        <CardDescription>Track changes made to "{materialName}" over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Version</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>By</TableHead>
              <TableHead>Changes</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((version) => (
              <TableRow key={version.id}>
                <TableCell>
                  {version.version === currentVersion ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      v{version.version} (Current)
                    </Badge>
                  ) : (
                    <Badge variant="outline">v{version.version}</Badge>
                  )}
                </TableCell>
                <TableCell>{formatDate(version.updatedAt)}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <img
                    src={version.updatedBy.avatar || "/placeholder.svg"}
                    alt={version.updatedBy.name}
                    className="h-6 w-6 rounded-full"
                  />
                  <span>{version.updatedBy.name}</span>
                </TableCell>
                <TableCell>{version.changeDescription}</TableCell>
                <TableCell>{version.fileSize}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(version)}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {version.version !== currentVersion && (
                      <Button variant="outline" size="sm" onClick={() => handleRestore(version)}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Restore
                      </Button>
                    )}
                    {version.version !== currentVersion && (
                      <Button variant="outline" size="sm" onClick={() => handleCompare(version)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Compare
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Compare Versions</DialogTitle>
            <DialogDescription>
              Comparing version {selectedVersion?.version} with current version {currentVersion}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border rounded-md p-4">
              <div className="font-medium mb-2">Version {selectedVersion?.version}</div>
              <div className="bg-muted/30 p-4 rounded h-[400px] overflow-auto">
                {/* This would show the content of the selected version */}
                <p>Content from version {selectedVersion?.version}</p>
                <p className="text-muted-foreground">
                  This is a placeholder for the actual document content comparison.
                </p>
              </div>
            </div>
            <div className="border rounded-md p-4">
              <div className="font-medium mb-2">Current Version {currentVersion}</div>
              <div className="bg-muted/30 p-4 rounded h-[400px] overflow-auto">
                {/* This would show the content of the current version */}
                <p>Content from current version</p>
                <p className="text-muted-foreground">
                  This is a placeholder for the actual document content comparison.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCompareDialogOpen(false)}>
              Close
            </Button>
            {selectedVersion && (
              <Button onClick={() => handleRestore(selectedVersion)}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Restore to This Version
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
