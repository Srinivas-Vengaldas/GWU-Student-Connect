"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  ChevronDown,
  Download,
  Edit,
  Eye,
  FileText,
  Folder,
  Grid,
  ImageIcon,
  List,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  Trash,
  Upload,
  FileVideo,
  FileSpreadsheet,
  FileIcon as FilePresentationIcon,
  Calendar,
  Filter,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  History,
  Copy,
  Share2,
  MessageSquare,
  Archive,
  BarChart,
} from "lucide-react"

export function FacultyMaterialsManage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [visibilityFilter, setVisibilityFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null)
  const [showCollectionDialog, setShowCollectionDialog] = useState(false)
  const [showVersionHistoryDialog, setShowVersionHistoryDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [dateFilter, setDateFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [showArchived, setShowArchived] = useState(false)
  const [bulkSelectMode, setBulkSelectMode] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showBulkActionMenu, setShowBulkActionMenu] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")
  const [collectionDescription, setCollectionDescription] = useState("")
  const [shareLink, setShareLink] = useState("")
  const [sharePassword, setSharePassword] = useState("")
  const [enablePassword, setEnablePassword] = useState(false)
  const [showStudentUploads, setShowStudentUploads] = useState(false)
  const [pendingApprovals, setPendingApprovals] = useState(2)

  // Mock study materials data
  const studyMaterials = [
    {
      id: "1",
      title: "Lecture 1: Introduction to Data Structures",
      description: "Overview of basic data structures and their applications in computer science.",
      course: "CS 250",
      department: "Computer Science",
      semester: "Fall 2024",
      fileType: "pdf",
      fileSize: "3.2 MB",
      uploadDate: "2 days ago",
      visibility: "course",
      downloads: 45,
      views: 78,
      rating: 4.5,
      ratingCount: 12,
      comments: 8,
      tags: ["Data Structures", "Lecture", "Introduction"],
      collections: ["Week 1 Materials"],
      linkedCourses: ["CS 250"],
      linkedGroups: ["Data Structures Weekly"],
    },
    {
      id: "2",
      title: "Algorithm Analysis Techniques",
      description: "Comprehensive guide to analyzing algorithm efficiency and complexity.",
      course: "CS 350",
      department: "Computer Science",
      semester: "Fall 2024",
      fileType: "pptx",
      fileSize: "5.7 MB",
      uploadDate: "1 week ago",
      visibility: "public",
      downloads: 87,
      views: 124,
      rating: 4.8,
      ratingCount: 23,
      comments: 15,
      tags: ["Algorithms", "Big O Notation", "Complexity Analysis"],
      collections: ["Midterm Review Materials"],
      linkedCourses: ["CS 350"],
      linkedGroups: ["Algorithm Masters"],
    },
    {
      id: "3",
      title: "Programming Assignment 1 Guidelines",
      description: "Instructions and requirements for the first programming assignment.",
      course: "CS 101",
      department: "Computer Science",
      semester: "Fall 2024",
      fileType: "docx",
      fileSize: "1.8 MB",
      uploadDate: "3 days ago",
      visibility: "course",
      downloads: 112,
      views: 156,
      rating: 4.2,
      ratingCount: 18,
      comments: 24,
      tags: ["Assignment", "Programming", "Guidelines"],
      collections: ["Assignments"],
      linkedCourses: ["CS 101"],
      linkedGroups: ["CS 101 Study Group"],
    },
    {
      id: "4",
      title: "Data Structures Midterm Review",
      description: "Comprehensive review materials for the midterm exam.",
      course: "CS 250",
      department: "Computer Science",
      semester: "Fall 2024",
      fileType: "pdf",
      fileSize: "4.5 MB",
      uploadDate: "5 days ago",
      visibility: "course",
      downloads: 98,
      views: 132,
      rating: 4.9,
      ratingCount: 27,
      comments: 12,
      tags: ["Midterm", "Review", "Data Structures"],
      collections: ["Midterm Review Materials", "Week 5 Materials"],
      linkedCourses: ["CS 250"],
      linkedGroups: ["Data Structures Weekly"],
    },
    {
      id: "5",
      title: "Introduction to Programming Video Lecture",
      description: "Recorded lecture covering the basics of programming concepts.",
      course: "CS 101",
      department: "Computer Science",
      semester: "Fall 2024",
      fileType: "mp4",
      fileSize: "78.3 MB",
      uploadDate: "1 week ago",
      visibility: "course",
      downloads: 67,
      views: 105,
      rating: 4.6,
      ratingCount: 14,
      comments: 9,
      tags: ["Video", "Lecture", "Programming Basics"],
      collections: ["Week 1 Materials", "Video Lectures"],
      linkedCourses: ["CS 101"],
      linkedGroups: ["CS 101 Study Group"],
    },
    {
      id: "6",
      title: "Algorithm Efficiency Spreadsheet",
      description: "Comparative analysis of different sorting algorithms with performance metrics.",
      course: "CS 350",
      department: "Computer Science",
      semester: "Fall 2024",
      fileType: "xlsx",
      fileSize: "2.1 MB",
      uploadDate: "2 weeks ago",
      visibility: "department",
      downloads: 43,
      views: 76,
      rating: 4.3,
      ratingCount: 8,
      comments: 5,
      tags: ["Algorithms", "Sorting", "Performance Analysis"],
      collections: ["Supplementary Materials"],
      linkedCourses: ["CS 350"],
      linkedGroups: [],
    },
  ]

  // Mock collections data
  const collections = [
    { id: "c1", name: "Week 1 Materials", count: 3 },
    { id: "c2", name: "Midterm Review Materials", count: 5 },
    { id: "c3", name: "Assignments", count: 4 },
    { id: "c4", name: "Supplementary Materials", count: 2 },
    { id: "c5", name: "Video Lectures", count: 3 },
  ]

  // Filter study materials based on search query and filters
  const filteredMaterials = studyMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCourse = courseFilter === "all" || material.course === courseFilter
    const matchesType = typeFilter === "all" || material.fileType === typeFilter
    const matchesVisibility = visibilityFilter === "all" || material.visibility === visibilityFilter

    // New filters
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && material.uploadDate.includes("day")) ||
      (dateFilter === "week" && !material.uploadDate.includes("week")) ||
      (dateFilter === "month" && true)

    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "4plus" && material.rating >= 4) ||
      (ratingFilter === "3plus" && material.rating >= 3) ||
      (ratingFilter === "below3" && material.rating < 3)

    const matchesArchived = !material.isArchived || showArchived

    const matchesStudentUploads = !material.isStudentUpload || showStudentUploads

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "collections" && material.collections.length > 0) ||
      (activeTab === "pending" && material.isPending) ||
      (activeTab === "shared" && material.linkedGroups.length > 0)

    return (
      matchesSearch &&
      matchesCourse &&
      matchesType &&
      matchesVisibility &&
      matchesDate &&
      matchesRating &&
      matchesArchived &&
      matchesStudentUploads &&
      matchesTab
    )
  })

  // Sort filtered materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    if (sortBy === "newest") {
      // This is a mock sort - in a real app, you'd use actual timestamps
      return a.uploadDate === "2 days ago" ? -1 : b.uploadDate === "2 days ago" ? 1 : -1
    } else if (sortBy === "oldest") {
      // This is a mock sort - in a real app, you'd use actual timestamps
      return a.uploadDate === "2 weeks ago" ? -1 : b.uploadDate === "2 weeks ago" ? 1 : -1
    } else if (sortBy === "downloads") {
      return b.downloads - a.downloads
    } else if (sortBy === "views") {
      return b.views - a.views
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "comments") {
      return b.comments - a.comments
    }
    return 0
  })

  // Get unique courses for filter
  const courses = Array.from(new Set(studyMaterials.map((material) => material.course)))

  // Get unique file types for filter
  const fileTypes = Array.from(new Set(studyMaterials.map((material) => material.fileType)))

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "docx":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "pptx":
        return <FilePresentationIcon className="h-10 w-10 text-orange-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-10 w-10 text-green-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-10 w-10 text-purple-500" />
      case "mp4":
      case "mov":
        return <FileVideo className="h-10 w-10 text-pink-500" />
      default:
        return <BookOpen className="h-10 w-10 text-gray-500" />
    }
  }

  const handleDeleteMaterial = (id: string) => {
    setMaterialToDelete(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    // In a real app, you'd call an API to delete the material
    console.log("Deleting material:", materialToDelete)
    setShowDeleteDialog(false)
    setMaterialToDelete(null)
  }

  const handleBulkSelect = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedItems.length === sortedMaterials.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(sortedMaterials.map((m) => m.id))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on:`, selectedItems)
    // In a real app, you'd call an API to perform the action

    // Reset selection after action
    setSelectedItems([])
    setBulkSelectMode(false)
    setShowBulkActionMenu(false)
  }

  const handleShowVersionHistory = (id: string) => {
    setSelectedMaterial(id)
    setShowVersionHistoryDialog(true)
  }

  const handleShowShareDialog = (id: string) => {
    setSelectedMaterial(id)
    setShareLink(`https://gwu-student-connect.edu/materials/${id}`)
    setShowShareDialog(true)
  }

  const handleShowAnalytics = (id: string) => {
    setSelectedMaterial(id)
    setShowAnalyticsDialog(true)
  }

  const handleCreateCollection = () => {
    // In a real app, you'd call an API to create the collection
    console.log("Creating collection:", {
      name: newCollectionName,
      description: collectionDescription,
    })
    setNewCollectionName("")
    setCollectionDescription("")
    setShowCollectionDialog(false)
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
    // In a real app, you'd show a toast notification
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search materials..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="File Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {fileTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-1 justify-between">
                    <div className="flex items-center">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      <span>
                        Sort:{" "}
                        {sortBy === "newest"
                          ? "Newest"
                          : sortBy === "oldest"
                            ? "Oldest"
                            : sortBy === "downloads"
                              ? "Most Downloads"
                              : sortBy === "views"
                                ? "Most Views"
                                : sortBy === "comments"
                                  ? "Most Comments"
                                  : "Highest Rated"}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Oldest
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("downloads")}>
                    <Download className="mr-2 h-4 w-4" />
                    Most Downloads
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("views")}>
                    <Eye className="mr-2 h-4 w-4" />
                    Most Views
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    <Star className="mr-2 h-4 w-4" />
                    Highest Rated
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("comments")}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Most Comments
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={showAdvancedFilters ? "bg-gray-100" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Advanced filters */}
          {showAdvancedFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm mb-2 block">Date Uploaded</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Date Uploaded" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Rating</Label>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4plus">4+ Stars</SelectItem>
                      <SelectItem value="3plus">3+ Stars</SelectItem>
                      <SelectItem value="below3">Below 3 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Visibility</Label>
                  <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Visibility</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="course">Course-specific</SelectItem>
                      <SelectItem value="department">Department-only</SelectItem>
                      <SelectItem value="invite">Invite-only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 flex items-center flex-wrap gap-4">
                <div className="flex items-center">
                  <Checkbox
                    id="show-archived"
                    checked={showArchived}
                    onCheckedChange={(checked) => setShowArchived(checked as boolean)}
                    className="mr-2"
                  />
                  <Label htmlFor="show-archived" className="text-sm">
                    Show archived materials
                  </Label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="show-student-uploads"
                    checked={showStudentUploads}
                    onCheckedChange={(checked) => setShowStudentUploads(checked as boolean)}
                    className="mr-2"
                  />
                  <Label htmlFor="show-student-uploads" className="text-sm">
                    Show student uploads
                  </Label>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="bulk-select"
                    checked={bulkSelectMode}
                    onCheckedChange={(checked) => {
                      setBulkSelectMode(checked as boolean)
                      if (!(checked as boolean)) {
                        setSelectedItems([])
                      }
                    }}
                    className="mr-2"
                  />
                  <Label htmlFor="bulk-select" className="text-sm">
                    Bulk select mode
                  </Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending
              {pendingApprovals > 0 && <Badge className="ml-1 bg-red-500 text-white">{pendingApprovals}</Badge>}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          {bulkSelectMode && selectedItems.length > 0 && (
            <DropdownMenu open={showBulkActionMenu} onOpenChange={setShowBulkActionMenu}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Actions ({selectedItems.length})
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkAction("download")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("collection")}>
                  <Folder className="mr-2 h-4 w-4" />
                  Add to Collection
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("share")}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Selected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("archive")}>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Selected
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleBulkAction("delete")} className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Selected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button variant="outline" size="sm" onClick={() => setShowCollectionDialog(true)}>
            <Folder className="mr-2 h-4 w-4" />
            Manage Collections
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className={viewMode === "grid" ? "bg-[#0033A0] hover:bg-[#002180]" : ""}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className={viewMode === "list" ? "bg-[#0033A0] hover:bg-[#002180]" : ""}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {activeTab === "collections" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {collections.map((collection) => (
            <Card key={collection.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="h-6 w-6 text-[#0033A0]" />
                    <h3 className="font-medium">{collection.name}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename Collection
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Materials
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Collection
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Collection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-gray-500 mt-2">{collection.count} materials</p>
              </CardContent>
            </Card>
          ))}
          <Card className="hover:shadow-md transition-shadow border-dashed">
            <CardContent className="p-4 flex items-center justify-center">
              <Button
                variant="ghost"
                className="h-full w-full flex flex-col gap-2 py-6"
                onClick={() => setShowCollectionDialog(true)}
              >
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="text-gray-500">Create New Collection</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "pending" && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              Materials Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-start justify-between p-3 border rounded-md">
                <div className="flex gap-3">
                  <FileText className="h-10 w-10 text-amber-500" />
                  <div>
                    <h4 className="font-medium">Organic Chemistry Lab Notes</h4>
                    <p className="text-sm text-gray-500">Uploaded by Emily Rodriguez • 2 days ago</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="outline">CHEM 2151</Badge>
                      <Badge variant="secondary">Student Upload</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-red-600">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>

              <div className="flex items-start justify-between p-3 border rounded-md">
                <div className="flex gap-3">
                  <FilePresentationIcon className="h-10 w-10 text-amber-500" />
                  <div>
                    <h4 className="font-medium">Physics Midterm Study Guide</h4>
                    <p className="text-sm text-gray-500">Uploaded by David Kim • 1 day ago</p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="outline">PHYS 1021</Badge>
                      <Badge variant="secondary">Student Upload</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-red-600">
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {viewMode === "list" ? (
        <div className="space-y-2">
          {bulkSelectMode && (
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md mb-2">
              <div className="flex items-center">
                <Checkbox
                  id="select-all"
                  checked={selectedItems.length === sortedMaterials.length && sortedMaterials.length > 0}
                  onCheckedChange={handleSelectAll}
                  className="mr-2"
                />
                <Label htmlFor="select-all" className="text-sm">
                  Select All
                </Label>
              </div>
              <div className="text-sm text-gray-500">
                {selectedItems.length} of {sortedMaterials.length} selected
              </div>
            </div>
          )}

          {sortedMaterials.map((material) => (
            <Card
              key={material.id}
              className={`hover:shadow-md transition-shadow ${material.isArchived ? "opacity-70" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {bulkSelectMode && (
                    <Checkbox
                      checked={selectedItems.includes(material.id)}
                      onCheckedChange={() => handleBulkSelect(material.id)}
                      className="mt-3"
                    />
                  )}
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-gray-100">
                    {getFileIcon(material.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[#0033A0]">{material.title}</h3>
                          {material.isStudentUpload && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              Student Upload
                            </Badge>
                          )}
                          {material.isArchived && (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700">
                              Archived
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-1">{material.description}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <Badge>{material.course}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {material.fileType.toUpperCase()} • {material.fileSize}
                          </Badge>
                          {material.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {material.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{material.tags.length - 2} more
                            </Badge>
                          )}
                          {material.collections.length > 0 && (
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              <Folder className="h-3 w-3" />
                              {material.collections.length} collections
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Upload className="mr-2 h-4 w-4" />
                              Replace File
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShowVersionHistory(material.id)}>
                              <History className="mr-2 h-4 w-4" />
                              Version History
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShowShareDialog(material.id)}>
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShowAnalytics(material.id)}>
                              <BarChart className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Folder className="mr-2 h-4 w-4" />
                              Add to Collection
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              {material.isArchived ? "Unarchive" : "Archive"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteMaterial(material.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500">Uploaded {material.uploadDate}</span>
                        <span className="text-xs text-gray-500">
                          Visibility:{" "}
                          {material.visibility === "public"
                            ? "Public"
                            : material.visibility === "course"
                              ? "Course-specific"
                              : material.visibility === "department"
                                ? "Department-only"
                                : "Invite-only"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs text-gray-500">
                            {material.rating} ({material.ratingCount})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500">{material.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500">{material.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500">{material.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMaterials.map((material) => (
            <Card
              key={material.id}
              className={`hover:shadow-md transition-shadow ${material.isArchived ? "opacity-70" : ""}`}
            >
              <CardContent className="p-4">
                {bulkSelectMode && (
                  <div className="flex justify-end mb-2">
                    <Checkbox
                      checked={selectedItems.includes(material.id)}
                      onCheckedChange={() => handleBulkSelect(material.id)}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getFileIcon(material.fileType)}
                    <Badge>{material.course}</Badge>
                  </div>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Upload className="mr-2 h-4 w-4" />
                        Replace File
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShowVersionHistory(material.id)}>
                        <History className="mr-2 h-4 w-4" />
                        Version History
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShowShareDialog(material.id)}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteMaterial(material.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="font-semibold text-[#0033A0] line-clamp-1">{material.title}</h3>
                {(material.isStudentUpload || material.isArchived) && (
                  <div className="flex gap-1 mt-1">
                    {material.isStudentUpload && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                        Student Upload
                      </Badge>
                    )}
                    {material.isArchived && (
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 text-xs">
                        Archived
                      </Badge>
                    )}
                  </div>
                )}
                <p className="text-sm text-gray-700 line-clamp-2 mt-1">{material.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {material.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Uploaded {material.uploadDate}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{material.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      <span>{material.downloads}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {sortedMaterials.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">No study materials found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search or filters, or upload a new study material.
          </p>
          <Button className="mt-4 bg-[#0033A0] hover:bg-[#002180]">
            <Upload className="mr-2 h-4 w-4" />
            Upload Material
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Study Material</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this study material? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Collection Dialog */}
      <AlertDialog open={showCollectionDialog} onOpenChange={setShowCollectionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Collection</AlertDialogTitle>
            <AlertDialogDescription>
              Collections help you organize your study materials for easier access and sharing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="collection-name">Collection Name</Label>
              <Input
                id="collection-name"
                placeholder="e.g., Midterm Review Materials"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collection-description">Description (Optional)</Label>
              <Textarea
                id="collection-description"
                placeholder="Describe what this collection contains"
                rows={3}
                value={collectionDescription}
                onChange={(e) => setCollectionDescription(e.target.value)}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateCollection}
              disabled={!newCollectionName.trim()}
              className="bg-[#0033A0] hover:bg-[#002180]"
            >
              Create Collection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Version History Dialog */}
      <AlertDialog open={showVersionHistoryDialog} onOpenChange={setShowVersionHistoryDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Version History</AlertDialogTitle>
            <AlertDialogDescription>View and manage previous versions of this material</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Current Version (v3)</p>
                  <p className="text-xs text-gray-500">Updated on May 10, 2024</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-2 rounded border">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm">Version 2</p>
                  <p className="text-xs text-gray-500">Updated on May 5, 2024</p>
                  <p className="text-xs text-gray-600 mt-1">Added solutions to problems 5-10</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-3 w-3 mr-1" />
                  Restore
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 rounded border">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm">Version 1 (Original)</p>
                  <p className="text-xs text-gray-500">Created on May 1, 2024</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-3 w-3 mr-1" />
                  Restore
                </Button>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Share Dialog */}
      <AlertDialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share Material</AlertDialogTitle>
            <AlertDialogDescription>Share this material with students or colleagues</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Share Link</Label>
              <div className="flex gap-2">
                <Input value={shareLink} readOnly />
                <Button variant="outline" onClick={copyShareLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="password-protect">Password protect</Label>
              <Checkbox
                id="password-protect"
                checked={enablePassword}
                onCheckedChange={(checked) => setEnablePassword(checked as boolean)}
              />
            </div>

            {enablePassword && (
              <div className="space-y-2">
                <Label htmlFor="share-password">Password</Label>
                <Input
                  id="share-password"
                  type="password"
                  value={sharePassword}
                  onChange={(e) => setSharePassword(e.target.value)}
                  placeholder="Enter a password"
                />
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <Label>Share with Study Groups</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-sg1" />
                  <Label htmlFor="share-sg1">Calculus Study Group</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-sg2" />
                  <Label htmlFor="share-sg2">Psychology Research Team</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-sg3" />
                  <Label htmlFor="share-sg3">Computer Science Club</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-sg4" />
                  <Label htmlFor="share-sg4">Chemistry Lab Partners</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Share with Courses</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-cs101" />
                  <Label htmlFor="share-cs101">CS 101</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-cs250" />
                  <Label htmlFor="share-cs250">CS 250</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="share-cs350" />
                  <Label htmlFor="share-cs350">CS 350</Label>
                </div>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-[#0033A0] hover:bg-[#002180]">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
