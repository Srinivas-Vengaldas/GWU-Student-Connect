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

interface FacultyStudyGroupResourcesProps {
  groupId: string
  limit?: number
  showViewAll?: boolean
}

export function FacultyStudyGroupResources({ groupId, limit, showViewAll = false }: FacultyStudyGroupResourcesProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [resourceName, setResourceName] = useState("")
  const [resourceDescription, setResourceDescription] = useState("")
  const [resourceTags, setResourceTags] = useState("")
  const [resourceVisibility, setResourceVisibility] = useState("all-members")

  // Mock resources data
  const resources = [
    {
      id: "1",
      name: "Advanced Algorithms Cheat Sheet",
      description: "A comprehensive reference for algorithm complexity and implementation details.",
      type: "pdf",
      size: "1.2 MB",
      uploadedBy: {
        id: "1",
        name: "Dr. Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "2 days ago",
      downloads: 24,
      views: 35,
      rating: 4.8,
      tags: ["Algorithms", "Reference"],
      visibility: "all-members",
    },
    {
      id: "2",
      name: "Red-Black Trees Visualization",
      description: "Interactive visualization of red-black tree operations and balancing.",
      type: "html",
      size: "3.5 MB",
      uploadedBy: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "1 week ago",
      downloads: 21,
      views: 30,
      rating: 4.6,
      tags: ["Data Structures", "Visualization"],
      visibility: "all-members",
    },
    {
      id: "3",
      name: "Time Complexity Analysis Guide",
      description: "Step-by-step guide for analyzing algorithm efficiency and optimization.",
      type: "docx",
      size: "850 KB",
      uploadedBy: {
        id: "1",
        name: "Dr. Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "3 days ago",
      downloads: 18,
      views: 26,
      rating: 4.5,
      tags: ["Algorithms", "Analysis"],
      visibility: "all-members",
    },
    {
      id: "4",
      name: "Practice Problems Set 1",
      description: "Collection of algorithm implementation challenges with solutions.",
      type: "pdf",
      size: "2.1 MB",
      uploadedBy: {
        id: "1",
        name: "Dr. Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "Yesterday",
      downloads: 15,
      views: 22,
      rating: 4.2,
      tags: ["Practice", "Problems"],
      visibility: "all-members",
    },
    {
      id: "5",
      name: "Algorithm Efficiency Comparison",
      description: "Visual comparison of different sorting and searching algorithms.",
      type: "png",
      size: "1.5 MB",
      uploadedBy: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadedAt: "5 days ago",
      downloads: 12,
      views: 19,
      rating: 4.0,
      tags: ["Algorithms", "Comparison"],
      visibility: "all-members",
    },
  ]

  // Filter resources based on search query and active tab
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "documents" && (resource.type === "pdf" || resource.type === "docx")) ||
      (activeTab === "images" && (resource.type === "png" || resource.type === "jpg")) ||
      (activeTab === "other" && resource.type === "html")

    return matchesSearch && matchesTab
  })

  // Limit the number of resources shown if limit is provided
  const displayedResources = limit ? filteredResources.slice(0, limit) : filteredResources

  const handleUpload = () => {
    // In a real app, you'd call an API to upload a file
    console.log("Uploading resource:", {
      name: resourceName,
      description: resourceDescription,
      tags: resourceTags.split(",").map((tag) => tag.trim()),
      visibility: resourceVisibility,
    })

    // Reset form fields
    setResourceName("")
    setResourceDescription("")
    setResourceTags("")
    setResourceVisibility("all-members")

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
      case "html":
        return <FileText className="h-6 w-6 text-orange-500" />
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
            <CardDescription>Shared materials and study resources</CardDescription>
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
                  <Input
                    id="name"
                    placeholder="Enter a name for this resource"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter a brief description"
                    value={resourceDescription}
                    onChange={(e) => setResourceDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., Algorithms, Data Structures, Reference"
                    value={resourceTags}
                    onChange={(e) => setResourceTags(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <select
                    id="visibility"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={resourceVisibility}
                    onChange={(e) => setResourceVisibility(e.target.value)}
                  >
                    <option value="all-members">All Group Members</option>
                    <option value="faculty-only">Faculty Only</option>
                    <option value="specific-members">Specific Members</option>
                  </select>
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
                  <TabsTrigger value="other">Other</TabsTrigger>
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
                    <p className="text-sm text-gray-500 line-clamp-1">{resource.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>{resource.type.toUpperCase()}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-amber-500">★</span>
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Download className="h-3 w-3" />
                        <span>{resource.downloads}</span>
                      </div>
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
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
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
                <Link href={`/faculty/study-groups/${groupId}?tab=resources`}>
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
