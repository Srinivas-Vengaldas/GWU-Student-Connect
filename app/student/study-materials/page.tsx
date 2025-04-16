"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MaterialCard } from "@/components/study-materials/material-card"
import { MaterialListItem } from "@/components/study-materials/material-list-item"
import { MaterialUploadDialog } from "@/components/study-materials/material-upload-dialog"
import { Grid, List, Search, SlidersHorizontal, Plus } from "lucide-react"

export default function StudyMaterialsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  // Mock data for study materials
  const materials = [
    {
      id: "1",
      title: "Calculus I Final Exam Study Guide",
      description:
        "Comprehensive review of all topics covered in Calculus I, including limits, derivatives, and integrals.",
      fileType: "pdf",
      uploadDate: "May 10, 2024",
      downloads: 156,
      views: 342,
      uploader: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      tags: ["Calculus", "Final Exam", "Study Guide", "Mathematics"],
      isFavorite: false,
      rating: 4.8,
      ratingCount: 24,
      fileSize: "2.4 MB",
    },
    {
      id: "2",
      title: "Introduction to Psychology Lecture Notes",
      description: "Detailed notes from the Introduction to Psychology course covering key concepts and theories.",
      fileType: "docx",
      uploadDate: "May 8, 2024",
      downloads: 98,
      views: 210,
      uploader: {
        name: "Michael Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      tags: ["Psychology", "Lecture Notes", "Introduction"],
      isFavorite: false,
      rating: 4.5,
      ratingCount: 18,
      fileSize: "1.8 MB",
    },
    {
      id: "3",
      title: "Organic Chemistry Lab Report Template",
      description: "Template for writing lab reports for Organic Chemistry experiments with proper formatting.",
      fileType: "docx",
      uploadDate: "May 5, 2024",
      downloads: 124,
      views: 189,
      uploader: {
        name: "Emily Chen",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      tags: ["Chemistry", "Lab Report", "Template", "Organic Chemistry"],
      isFavorite: false,
      rating: 4.7,
      ratingCount: 15,
      fileSize: "1.2 MB",
    },
    {
      id: "4",
      title: "American History Timeline Presentation",
      description: "Visual timeline of key events in American history from 1776 to present day.",
      fileType: "pptx",
      uploadDate: "May 3, 2024",
      downloads: 87,
      views: 156,
      uploader: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      tags: ["History", "American History", "Timeline", "Presentation"],
      isFavorite: false,
      rating: 4.3,
      ratingCount: 12,
      fileSize: "5.6 MB",
    },
    {
      id: "5",
      title: "Computer Science Data Structures Cheat Sheet",
      description: "Quick reference guide for common data structures used in computer science algorithms.",
      fileType: "pdf",
      uploadDate: "May 1, 2024",
      downloads: 215,
      views: 378,
      uploader: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      tags: ["Computer Science", "Data Structures", "Algorithms", "Cheat Sheet"],
      isFavorite: false,
      rating: 4.9,
      ratingCount: 32,
      fileSize: "1.5 MB",
    },
    {
      id: "6",
      title: "Spanish Verb Conjugation Tables",
      description: "Comprehensive tables of Spanish verb conjugations for different tenses and moods.",
      fileType: "pdf",
      uploadDate: "April 28, 2024",
      downloads: 143,
      views: 267,
      uploader: {
        name: "Sofia Martinez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      tags: ["Spanish", "Language", "Verb Conjugation", "Grammar"],
      isFavorite: false,
      rating: 4.6,
      ratingCount: 20,
      fileSize: "2.1 MB",
    },
    {
      id: "7",
      title: "Physics Formulas and Constants",
      description: "Collection of essential physics formulas and constants for quick reference during problem-solving.",
      fileType: "pdf",
      uploadDate: "April 25, 2024",
      downloads: 198,
      views: 312,
      uploader: {
        name: "James Thompson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      tags: ["Physics", "Formulas", "Constants", "Reference"],
      isFavorite: false,
      rating: 4.8,
      ratingCount: 25,
      fileSize: "1.8 MB",
    },
    {
      id: "8",
      title: "Business Ethics Case Studies",
      description: "Collection of real-world business ethics case studies with discussion questions.",
      fileType: "docx",
      uploadDate: "April 22, 2024",
      downloads: 76,
      views: 145,
      uploader: {
        name: "Olivia Brown",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      tags: ["Business", "Ethics", "Case Studies", "Management"],
      isFavorite: false,
      rating: 4.4,
      ratingCount: 16,
      fileSize: "3.2 MB",
    },
  ]

  // Filter materials based on search query
  const filteredMaterials = materials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <PageLayout role="student" showNavInHeader={true}>
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Study Materials</h2>
          <Button onClick={() => setUploadDialogOpen(true)} className="bg-[#0033A0] hover:bg-[#002180]">
            <Plus className="h-4 w-4 mr-1" />
            Upload Material
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search materials..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-gray-100" : ""}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setView("grid")}
              className={view === "grid" ? "bg-gray-100" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setView("list")}
              className={view === "list" ? "bg-gray-100" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium mb-1 block">Subject</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="language">Languages</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">File Type</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="docx">Word Documents</SelectItem>
                  <SelectItem value="pptx">Presentations</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Sort By</label>
              <Select defaultValue="recent">
                <SelectTrigger>
                  <SelectValue placeholder="Most Recent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="downloads">Most Downloads</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Time Period</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
            <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            {filteredMaterials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No materials found matching your search.</p>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMaterials.map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMaterials.map((material) => (
                  <MaterialListItem key={material.id} {...material} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="favorites" className="mt-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Your favorite materials will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent value="downloaded" className="mt-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Your downloaded materials will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent value="uploaded" className="mt-4">
            <div className="text-center py-12">
              <p className="text-gray-500">Materials you've uploaded will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <MaterialUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      <Footer />
    </PageLayout>
  )
}
