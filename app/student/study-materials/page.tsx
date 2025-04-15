"use client"

import { useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Grid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  Upload,
  Users,
  Clock,
  BookmarkPlus,
  Filter,
} from "lucide-react"
import { MaterialCard } from "@/components/study-materials/material-card"
import { MaterialListItem } from "@/components/study-materials/material-list-item"
import { MaterialUploadDialog } from "@/components/study-materials/material-upload-dialog"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function StudyMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [dateFilter, setDateFilter] = useState("all")
  const [uploaderFilter, setUploaderFilter] = useState("all")
  const [studyGroupFilter, setStudyGroupFilter] = useState("all")
  const [showRecentlyViewed, setShowRecentlyViewed] = useState(true)

  // Mock study materials data
  const studyMaterials = [
    {
      id: "1",
      title: "Calculus I Final Exam Study Guide",
      description:
        "Comprehensive review of all topics covered in Calculus I, including limits, derivatives, and integrals.",
      course: "MATH 1231",
      subject: "Mathematics",
      fileType: "pdf",
      fileSize: "2.4 MB",
      uploadDate: "2 days ago",
      downloads: 156,
      rating: 4.8,
      ratingCount: 32,
      uploader: {
        id: "1",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["Calculus", "Final Exam", "Study Guide"],
      isFavorite: true,
    },
    {
      id: "2",
      title: "Introduction to Psychology Lecture Notes",
      description:
        "Complete lecture notes for the Introduction to Psychology course, covering all major topics and theories.",
      course: "PSYC 1001",
      subject: "Psychology",
      fileType: "docx",
      fileSize: "1.8 MB",
      uploadDate: "1 week ago",
      downloads: 89,
      rating: 4.2,
      ratingCount: 15,
      uploader: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["Psychology", "Lecture Notes", "Behavioral Science"],
      isFavorite: false,
    },
    {
      id: "3",
      title: "Organic Chemistry Lab Procedures",
      description:
        "Step-by-step procedures for all organic chemistry lab experiments, including safety guidelines and expected results.",
      course: "CHEM 2151",
      subject: "Chemistry",
      fileType: "pdf",
      fileSize: "5.1 MB",
      uploadDate: "3 days ago",
      downloads: 112,
      rating: 4.9,
      ratingCount: 27,
      uploader: {
        id: "3",
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["Chemistry", "Lab", "Organic Chemistry"],
      isFavorite: true,
    },
    {
      id: "4",
      title: "American History Timeline Flashcards",
      description:
        "Comprehensive set of flashcards covering major events in American history from 1600 to present day.",
      course: "HIST 1011",
      subject: "History",
      fileType: "pptx",
      fileSize: "3.7 MB",
      uploadDate: "2 weeks ago",
      downloads: 76,
      rating: 4.0,
      ratingCount: 12,
      uploader: {
        id: "4",
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["History", "Flashcards", "American History"],
      isFavorite: false,
    },
    {
      id: "5",
      title: "Data Structures and Algorithms Cheat Sheet",
      description:
        "Quick reference guide for common data structures and algorithms, with time and space complexity analysis.",
      course: "CS 2113",
      subject: "Computer Science",
      fileType: "pdf",
      fileSize: "1.2 MB",
      uploadDate: "5 days ago",
      downloads: 203,
      rating: 4.7,
      ratingCount: 41,
      uploader: {
        id: "5",
        name: "Jessica Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["Computer Science", "Algorithms", "Data Structures"],
      isFavorite: true,
    },
    {
      id: "6",
      title: "Microeconomics Practice Problems",
      description:
        "Collection of practice problems for microeconomics, covering supply and demand, market structures, and consumer theory.",
      course: "ECON 1011",
      subject: "Economics",
      fileType: "pdf",
      fileSize: "2.9 MB",
      uploadDate: "1 month ago",
      downloads: 145,
      rating: 4.3,
      ratingCount: 22,
      uploader: {
        id: "6",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["Economics", "Practice Problems", "Microeconomics"],
      isFavorite: false,
    },
    {
      id: "7",
      title: "Physics Mechanics Formula Sheet",
      description:
        "Comprehensive formula sheet for physics mechanics, including kinematics, dynamics, and conservation laws.",
      course: "PHYS 1021",
      subject: "Physics",
      fileType: "pdf",
      fileSize: "0.8 MB",
      uploadDate: "3 weeks ago",
      downloads: 187,
      rating: 4.6,
      ratingCount: 35,
      uploader: {
        id: "7",
        name: "Olivia Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["Physics", "Formula Sheet", "Mechanics"],
      isFavorite: true,
    },
    {
      id: "8",
      title: "Spanish Verb Conjugation Tables",
      description: "Complete tables of Spanish verb conjugations for regular and irregular verbs in all tenses.",
      course: "SPAN 1001",
      subject: "Spanish",
      fileType: "docx",
      fileSize: "1.5 MB",
      uploadDate: "2 months ago",
      downloads: 98,
      rating: 4.1,
      ratingCount: 18,
      uploader: {
        id: "8",
        name: "Robert Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      tags: ["Spanish", "Language", "Verb Conjugation"],
      isFavorite: false,
    },
  ]

  // Mock study groups data
  const studyGroups = [
    { id: "sg1", name: "Calculus Study Group" },
    { id: "sg2", name: "Psychology Research Team" },
    { id: "sg3", name: "Computer Science Club" },
    { id: "sg4", name: "Chemistry Lab Partners" },
  ]

  // Mock recently viewed materials
  const recentlyViewed = [
    {
      id: "rv1",
      title: "Organic Chemistry Lab Procedures",
      course: "CHEM 2151",
      viewedAt: "Today at 2:30 PM",
    },
    {
      id: "rv2",
      title: "Data Structures and Algorithms Cheat Sheet",
      course: "CS 2113",
      viewedAt: "Yesterday at 7:15 PM",
    },
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

    // New filters
    const matchesUploader =
      uploaderFilter === "all" ||
      (uploaderFilter === "faculty" && ["1", "3", "5"].includes(material.uploader.id)) ||
      (uploaderFilter === "students" && ["2", "4", "6", "7", "8"].includes(material.uploader.id))

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && material.uploadDate.includes("day")) ||
      (dateFilter === "week" && !material.uploadDate.includes("month")) ||
      (dateFilter === "month" && true)

    const matchesStudyGroup =
      studyGroupFilter === "all" ||
      (material.id === "1" && studyGroupFilter === "sg1") ||
      (material.id === "2" && studyGroupFilter === "sg2") ||
      (material.id === "5" && studyGroupFilter === "sg3")

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "favorites" && material.isFavorite) ||
      (activeTab === "my-uploads" && material.uploader.id === "1") ||
      (activeTab === "study-groups" && ["1", "2", "5"].includes(material.id)) ||
      (activeTab === "downloads" && ["3", "5", "7"].includes(material.id))

    return (
      matchesSearch && matchesCourse && matchesType && matchesUploader && matchesDate && matchesStudyGroup && matchesTab
    )
  })

  // Sort filtered materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    if (sortBy === "newest") {
      // This is a mock sort - in a real app, you'd use actual timestamps
      return a.uploadDate === "2 days ago" ? -1 : b.uploadDate === "2 days ago" ? 1 : -1
    } else if (sortBy === "oldest") {
      // This is a mock sort - in a real app, you'd use actual timestamps
      return a.uploadDate === "2 months ago" ? -1 : b.uploadDate === "2 months ago" ? 1 : -1
    } else if (sortBy === "downloads") {
      return b.downloads - a.downloads
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    }
    return 0
  })

  // Get unique courses for filter
  const courses = Array.from(new Set(studyMaterials.map((material) => material.course)))

  // Get unique file types for filter
  const fileTypes = Array.from(new Set(studyMaterials.map((material) => material.fileType)))

  return (
    <PageLayout role="student" showNavInHeader={true}>
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Study Materials</h2>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create Collection</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button className="bg-[#0033A0] hover:bg-[#002180]" onClick={() => setShowUploadDialog(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">All Materials</TabsTrigger>
              <TabsTrigger value="favorites">My Favorites</TabsTrigger>
              <TabsTrigger value="my-uploads">My Uploads</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="study-groups">Study Groups</TabsTrigger>
            </TabsList>
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

          {/* Search and Filters */}
          <Card className="mt-4">
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
                      <DropdownMenuItem onClick={() => setSortBy("rating")}>
                        <Star className="mr-2 h-4 w-4" />
                        Highest Rated
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
                      <Label className="text-sm mb-2 block">Uploader Type</Label>
                      <Select value={uploaderFilter} onValueChange={setUploaderFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Uploader Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Uploaders</SelectItem>
                          <SelectItem value="faculty">Faculty Only</SelectItem>
                          <SelectItem value="students">Students Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">Study Group</Label>
                      <Select value={studyGroupFilter} onValueChange={setStudyGroupFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Study Group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Groups</SelectItem>
                          {studyGroups.map((group) => (
                            <SelectItem key={group.id} value={group.id}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Checkbox id="verified-only" className="mr-2" />
                    <Label htmlFor="verified-only" className="text-sm">
                      Show verified materials only
                    </Label>

                    <Separator orientation="vertical" className="mx-4 h-4" />

                    <Checkbox id="with-solutions" className="mr-2" />
                    <Label htmlFor="with-solutions" className="text-sm">
                      Has solutions/answers
                    </Label>

                    <Separator orientation="vertical" className="mx-4 h-4" />

                    <Checkbox id="downloadable" className="mr-2" />
                    <Label htmlFor="downloadable" className="text-sm">
                      Downloadable only
                    </Label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recently viewed section */}
          {showRecentlyViewed && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  Recently Viewed
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRecentlyViewed(false)}>
                  Hide
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {recentlyViewed.map((item) => (
                  <Link key={item.id} href={`/student/study-materials/${item.id}`}>
                    <Card className="hover:bg-gray-50 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-8 w-8 text-[#0033A0]" />
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Badge variant="outline" className="mr-2">
                                {item.course}
                              </Badge>
                              <span>{item.viewedAt}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <TabsContent value="all" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedMaterials.map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {sortedMaterials.map((material) => (
                  <MaterialListItem key={material.id} material={material} />
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
                <Button className="mt-4 bg-[#0033A0] hover:bg-[#002180]" onClick={() => setShowUploadDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Material
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedMaterials
                  .filter((m) => m.isFavorite)
                  .map((material) => (
                    <MaterialCard key={material.id} material={material} />
                  ))}
              </div>
            ) : (
              <div className="space-y-2">
                {sortedMaterials
                  .filter((m) => m.isFavorite)
                  .map((material) => (
                    <MaterialListItem key={material.id} material={material} />
                  ))}
              </div>
            )}

            {sortedMaterials.filter((m) => m.isFavorite).length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No favorite materials</h3>
                <p className="mt-2 text-sm text-gray-500">
                  You haven't added any study materials to your favorites yet.
                </p>
                <Link href="/student/study-materials">
                  <Button className="mt-4 bg-[#0033A0] hover:bg-[#002180]">Browse Materials</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-uploads" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedMaterials
                  .filter((m) => m.uploader.id === "1")
                  .map((material) => (
                    <MaterialCard key={material.id} material={material} isOwner={true} />
                  ))}
              </div>
            ) : (
              <div className="space-y-2">
                {sortedMaterials
                  .filter((m) => m.uploader.id === "1")
                  .map((material) => (
                    <MaterialListItem key={material.id} material={material} isOwner={true} />
                  ))}
              </div>
            )}

            {sortedMaterials.filter((m) => m.uploader.id === "1").length === 0 && (
              <div className="text-center py-12">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No uploaded materials</h3>
                <p className="mt-2 text-sm text-gray-500">You haven't uploaded any study materials yet.</p>
                <Button className="mt-4 bg-[#0033A0] hover:bg-[#002180]" onClick={() => setShowUploadDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Material
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="downloads" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedMaterials
                  .filter((m) => ["3", "5", "7"].includes(m.id))
                  .map((material) => (
                    <MaterialCard key={material.id} material={material} />
                  ))}
              </div>
            ) : (
              <div className="space-y-2">
                {sortedMaterials
                  .filter((m) => ["3", "5", "7"].includes(m.id))
                  .map((material) => (
                    <MaterialListItem key={material.id} material={material} />
                  ))}
              </div>
            )}

            {sortedMaterials.filter((m) => ["3", "5", "7"].includes(m.id)).length === 0 && (
              <div className="text-center py-12">
                <Download className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No downloaded materials</h3>
                <p className="mt-2 text-sm text-gray-500">You haven't downloaded any study materials yet.</p>
                <Link href="/student/study-materials">
                  <Button className="mt-4 bg-[#0033A0] hover:bg-[#002180]">Browse Materials</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="study-groups" className="mt-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-[#0033A0]" />
                Materials from Your Study Groups
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {studyGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-[#0033A0]" />
                          <h4 className="font-medium">{group.name}</h4>
                        </div>
                        <Badge variant="outline">
                          {group.id === "sg1" ? "3" : group.id === "sg2" ? "2" : group.id === "sg3" ? "5" : "0"} files
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="my-6" />
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedMaterials
                  .filter((m) => ["1", "2", "5"].includes(m.id))
                  .map((material) => (
                    <MaterialCard key={material.id} material={material} />
                  ))}
              </div>
            ) : (
              <div className="space-y-2">
                {sortedMaterials
                  .filter((m) => ["1", "2", "5"].includes(m.id))
                  .map((material) => (
                    <MaterialListItem key={material.id} material={material} />
                  ))}
              </div>
            )}

            {sortedMaterials.filter((m) => ["1", "2", "5"].includes(m.id)).length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No study group materials</h3>
                <p className="mt-2 text-sm text-gray-500">Your study groups haven't shared any materials yet.</p>
                <Link href="/student/study-groups">
                  <Button className="mt-4 bg-[#0033A0] hover:bg-[#002180]">Browse Study Groups</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />

      <MaterialUploadDialog open={showUploadDialog} onOpenChange={setShowUploadDialog} />
    </PageLayout>
  )
}
