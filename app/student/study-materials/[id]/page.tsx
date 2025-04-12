"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  BookOpen,
  Download,
  Edit,
  Eye,
  FileText,
  Flag,
  Heart,
  ImageIcon,
  MessageSquare,
  MoreHorizontal,
  Presentation,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from "lucide-react"

export default function StudyMaterialDetailPage() {
  const params = useParams()
  const router = useRouter()
  const materialId = params.id as string
  const [activeTab, setActiveTab] = useState("preview")
  const [isFavorite, setIsFavorite] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [userRating, setUserRating] = useState<number | null>(null)
  const [comment, setComment] = useState("")

  // Mock material data - in a real app, you'd fetch this based on the ID
  const material = {
    id: materialId,
    title: "Calculus I Final Exam Study Guide",
    description:
      "Comprehensive review of all topics covered in Calculus I, including limits, derivatives, and integrals. This study guide includes practice problems, key formulas, and step-by-step solutions to help you prepare for the final exam.",
    course: "MATH 1231",
    subject: "Mathematics",
    fileType: "pdf",
    fileSize: "2.4 MB",
    uploadDate: "May 10, 2024",
    downloads: 156,
    rating: 4.8,
    ratingCount: 32,
    uploader: {
      id: "1",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Calculus", "Final Exam", "Study Guide", "Mathematics", "Derivatives", "Integrals"],
    isOwner: true, // For demo purposes, assume the current user is the owner
    comments: [
      {
        id: "1",
        user: {
          id: "2",
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "This study guide was incredibly helpful for my final exam preparation. The practice problems were very similar to what appeared on the actual exam.",
        date: "May 12, 2024",
        rating: 5,
      },
      {
        id: "2",
        user: {
          id: "3",
          name: "Emily Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Great resource! The explanations are clear and concise. I especially appreciated the section on integration techniques.",
        date: "May 11, 2024",
        rating: 5,
      },
      {
        id: "3",
        user: {
          id: "4",
          name: "David Kim",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "Very comprehensive guide, but I found a few minor errors in the solutions to problems 7 and 12.",
        date: "May 10, 2024",
        rating: 4,
      },
    ],
    relatedMaterials: [
      {
        id: "5",
        title: "Calculus I Midterm Review",
        course: "MATH 1231",
        fileType: "pdf",
        downloads: 124,
        rating: 4.5,
      },
      {
        id: "6",
        title: "Derivatives Cheat Sheet",
        course: "MATH 1231",
        fileType: "pdf",
        downloads: 203,
        rating: 4.7,
      },
      {
        id: "7",
        title: "Integration Techniques Practice Problems",
        course: "MATH 1231",
        fileType: "pdf",
        downloads: 98,
        rating: 4.2,
      },
    ],
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "docx":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "pptx":
        return <Presentation className="h-10 w-10 text-orange-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-10 w-10 text-green-500" />
      default:
        return <BookOpen className="h-10 w-10 text-gray-500" />
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleDelete = () => {
    // In a real app, you'd call an API to delete the material
    console.log("Deleting material:", materialId)
    setShowDeleteDialog(false)
    router.push("/student/study-materials")
  }

  const handleReport = () => {
    // In a real app, you'd call an API to report the material
    console.log("Reporting material:", materialId, "Reason:", reportReason)
    setShowReportDialog(false)
    setReportReason("")
  }

  const handleRateResource = (rating: number) => {
    // In a real app, you'd call an API to rate the material
    console.log("Rating material:", materialId, "Rating:", rating)
    setUserRating(rating)
  }

  const handleSubmitComment = () => {
    if (comment.trim() && userRating) {
      // In a real app, you'd call an API to submit the comment
      console.log("Submitting comment:", comment, "Rating:", userRating)
      setComment("")
      // Optionally reset rating after submission
      // setUserRating(null)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="student" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-2">
              <Link href="/student/study-materials">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Materials
                </Button>
              </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{material.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge>{material.course}</Badge>
                  <Badge variant="outline">{material.subject}</Badge>
                  <Badge variant="secondary">{material.fileType.toUpperCase()}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1 ${isFavorite ? "text-red-500" : ""}`}
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500" : ""}`} />
                  <span>{isFavorite ? "Favorited" : "Add to Favorites"}</span>
                </Button>
                <Button size="sm" className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
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
                    {material.isOwner ? (
                      <>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => setShowDeleteDialog(true)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => setShowReportDialog(true)}>
                          <Flag className="mr-2 h-4 w-4" />
                          Report
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews ({material.comments.length})</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="preview" className="pt-4">
                      <div className="rounded-lg border p-4 bg-gray-50 flex flex-col items-center justify-center min-h-[400px]">
                        {getFileIcon(material.fileType)}
                        <h3 className="mt-4 font-medium">Document Preview</h3>
                        <p className="text-sm text-gray-500 mt-2">
                          Preview would be displayed here for {material.fileType.toUpperCase()} files.
                        </p>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="h-4 w-4" />
                            Open in Viewer
                          </Button>
                          <Button size="sm" className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="details" className="space-y-4 pt-4">
                      <div>
                        <h3 className="font-medium">Description</h3>
                        <p className="text-gray-700 mt-1">{material.description}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Tags</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {material.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium">File Information</h3>
                          <ul className="mt-1 space-y-1 text-sm text-gray-700">
                            <li>Type: {material.fileType.toUpperCase()}</li>
                            <li>Size: {material.fileSize}</li>
                            <li>Uploaded: {material.uploadDate}</li>
                            <li>Downloads: {material.downloads}</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium">Course Information</h3>
                          <ul className="mt-1 space-y-1 text-sm text-gray-700">
                            <li>Course: {material.course}</li>
                            <li>Subject: {material.subject}</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="reviews" className="space-y-4 pt-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold">{material.rating}</div>
                          <div className="flex items-center justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= Math.round(material.rating)
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{material.ratingCount} ratings</div>
                        </div>
                        <div className="flex-1">
                          <div className="space-y-1">
                            {[5, 4, 3, 2, 1].map((rating) => {
                              // Calculate percentage for each rating (mock data)
                              const percentage =
                                rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1
                              return (
                                <div key={rating} className="flex items-center gap-2">
                                  <div className="flex items-center w-12">
                                    <span className="text-sm">{rating}</span>
                                    <Star className="h-3 w-3 ml-1 text-yellow-500 fill-yellow-500" />
                                  </div>
                                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-yellow-500 rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <div className="w-8 text-xs text-gray-500">{percentage}%</div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-medium">Rate this resource</h3>
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => handleRateResource(rating)}
                              className="p-1 rounded-full hover:bg-gray-100"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  rating <= (userRating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                          <span className="ml-2 text-sm text-gray-500">
                            {userRating ? `You rated this ${userRating} stars` : "Click to rate"}
                          </span>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Textarea
                            placeholder="Write a review or comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                          />
                          <div className="flex justify-end">
                            <Button
                              onClick={handleSubmitComment}
                              disabled={!comment.trim() || !userRating}
                              className="bg-[#0033A0] hover:bg-[#002180]"
                            >
                              Submit Review
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="font-medium">Reviews & Comments</h3>
                        <div className="mt-4 space-y-4">
                          {material.comments.map((comment) => (
                            <div key={comment.id} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{comment.user.name}</div>
                                    <div className="text-xs text-gray-500">{comment.date}</div>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= comment.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 text-gray-700">{comment.text}</p>
                              <div className="mt-2 flex items-center gap-4">
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>Helpful</span>
                                </button>
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                                  <ThumbsDown className="h-3 w-3" />
                                  <span>Not Helpful</span>
                                </button>
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                                  <MessageSquare className="h-3 w-3" />
                                  <span>Reply</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Uploader</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={material.uploader.avatar} alt={material.uploader.name} />
                        <AvatarFallback>{material.uploader.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{material.uploader.name}</div>
                        <div className="text-sm text-gray-500">Uploaded on {material.uploadDate}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Material Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Downloads:</span>
                        <span className="font-medium">{material.downloads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rating:</span>
                        <span className="font-medium flex items-center">
                          {material.rating}
                          <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reviews:</span>
                        <span className="font-medium">{material.ratingCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">File Size:</span>
                        <span className="font-medium">{material.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">File Type:</span>
                        <span className="font-medium">{material.fileType.toUpperCase()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Related Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {material.relatedMaterials.map((related) => (
                        <Link key={related.id} href={`/student/study-materials/${related.id}`}>
                          <div className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50">
                            {getFileIcon(related.fileType)}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-[#0033A0] hover:underline truncate">{related.title}</div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{related.course}</span>
                                <span>•</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                                  <span>{related.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Study Material</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{material.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Study Material</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for reporting this material. Our moderators will review your report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Reason for reporting..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              rows={4}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReport}
              disabled={!reportReason.trim()}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Submit Report
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
