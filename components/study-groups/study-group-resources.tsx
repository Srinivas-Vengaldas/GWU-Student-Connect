"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, FileText, FolderPlus, ImageIcon, MoreHorizontal, Share2, Trash, Upload } from "lucide-react"

interface StudyGroupResourcesProps {
  groupId: string
  limit?: number
  showViewAll?: boolean
}

export function StudyGroupResources({ groupId, limit, showViewAll = false }: StudyGroupResourcesProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock resources data
  const resources = [
    {
      id: "1",
      name: "Integration Techniques Cheat Sheet",
      type: "pdf",
      size: "1.2 MB",
      uploadedBy: {
        id: "1",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "2 days ago",
      downloads: 15,
      tags: ["Calculus", "Integration"],
    },
    {
      id: "2",
      name: "Lecture Notes - Week 5",
      type: "pdf",
      size: "3.5 MB",
      uploadedBy: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "1 week ago",
      downloads: 12,
      tags: ["Lecture Notes", "Sequences"],
    },
    {
      id: "3",
      name: "Practice Problems - Series",
      type: "docx",
      size: "850 KB",
      uploadedBy: {
        id: "3",
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "3 days ago",
      downloads: 8,
      tags: ["Practice", "Series"],
    },
    {
      id: "4",
      name: "Midterm Study Guide",
      type: "pdf",
      size: "2.1 MB",
      uploadedBy: {
        id: "1",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "Yesterday",
      downloads: 20,
      tags: ["Study Guide", "Midterm"],
    },
    {
      id: "5",
      name: "Calculus Formulas",
      type: "png",
      size: "1.5 MB",
      uploadedBy: {
        id: "4",
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "5 days ago",
      downloads: 10,
      tags: ["Formulas", "Reference"],
    },
  ]

  // Filter resources based on search query and active tab
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "documents" && (resource.type === "pdf" || resource.type === "docx")) ||
      (activeTab === "images" && (resource.type === "png" || resource.type === "jpg"))

    return matchesSearch && matchesTab
  })

  // Limit the number of resources shown if limit is provided
  const displayedResources = limit ? filteredResources.slice(0, limit) : filteredResources

  const handleUpload = () => {
    // In a real app, you'd call an API to upload a file
    setShowUploadDialog(false)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "docx":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "png":
      case "jpg":
        return <ImageIcon className="h-6 w-6 text-green-500" />
      default:
        return <FileText className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Resources</CardTitle>
            <CardDescription>Shared notes and study materials</CardDescription>
          </div>
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Resource</DialogTitle>
                <DialogDescription>Share study materials with your group.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <Input id="file" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter a name for this resource" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="e.g., Calculus, Integration, Notes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="folder">Folder (optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input id="folder" placeholder="Select a folder" />
                    <Button variant="outline" size="icon">
                      <FolderPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} className="bg-[#0033A0] hover:bg-[#002180]">
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {!limit && (
            <div className="mb-4">
              <div className="relative mb-4">
                <Input
                  type="search"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}

          <div className="space-y-4">
            {displayedResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(resource.type)}
                  <div>
                    <h3 className="font-medium text-[#0033A0]">{resource.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{resource.type.toUpperCase()}</span>
                      <span>•</span>
                      <span>{resource.size}</span>
                      <span>•</span>
                      <span>{resource.downloads} downloads</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      {resource.uploadedBy.id === "1" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {filteredResources.length === 0 && (
              <div className="text-center py-4 text-gray-500">No resources found.</div>
            )}

            {showViewAll && resources.length > limit! && (
              <div className="text-center pt-2">
                <Link href={`/student/study-groups/${groupId}?tab=resources`}>
                  <Button variant="link" className="text-[#0033A0]">
                    View all {resources.length} resources
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
