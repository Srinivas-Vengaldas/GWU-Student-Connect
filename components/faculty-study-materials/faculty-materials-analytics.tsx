"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Calendar,
  Download,
  Eye,
  FileText,
  LineChart,
  PieChart,
  Star,
  Users,
  FileVideo,
  FileSpreadsheet,
  FileIcon as FilePresentationIcon,
} from "lucide-react"

export function FacultyMaterialsAnalytics() {
  // Mock data for analytics
  const overviewStats = {
    totalViews: 2547,
    totalDownloads: 1247,
    averageRating: 4.6,
    activeStudents: 87,
    viewsThisWeek: 342,
    downloadsThisWeek: 156,
    commentsThisWeek: 28,
  }

  // Mock data for top materials
  const topMaterials = [
    {
      id: "1",
      title: "Lecture 1: Introduction to Data Structures",
      fileType: "pdf",
      views: 245,
      downloads: 178,
      rating: 4.8,
      course: "CS 250",
    },
    {
      id: "2",
      title: "Algorithm Analysis Techniques",
      fileType: "pptx",
      views: 198,
      downloads: 145,
      rating: 4.7,
      course: "CS 350",
    },
    {
      id: "3",
      title: "Data Structures Midterm Review",
      fileType: "pdf",
      views: 187,
      downloads: 132,
      rating: 4.9,
      course: "CS 250",
    },
    {
      id: "4",
      title: "Introduction to Programming Video Lecture",
      fileType: "mp4",
      views: 156,
      downloads: 89,
      rating: 4.6,
      course: "CS 101",
    },
    {
      id: "5",
      title: "Programming Assignment 1 Guidelines",
      fileType: "docx",
      views: 134,
      downloads: 112,
      rating: 4.2,
      course: "CS 101",
    },
  ]

  // Mock data for recent activity
  const recentActivity = [
    {
      id: "1",
      type: "download",
      material: "Lecture 1: Introduction to Data Structures",
      user: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "view",
      material: "Algorithm Analysis Techniques",
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: "3 hours ago",
    },
    {
      id: "3",
      type: "comment",
      material: "Data Structures Midterm Review",
      user: {
        name: "Jessica Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      comment: "This was really helpful for understanding red-black trees. Thank you!",
      timestamp: "5 hours ago",
    },
    {
      id: "4",
      type: "rating",
      material: "Introduction to Programming Video Lecture",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      timestamp: "1 day ago",
    },
    {
      id: "5",
      type: "download",
      material: "Programming Assignment 1 Guidelines",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: "1 day ago",
    },
  ]

  // Mock data for student engagement
  const studentEngagement = [
    {
      id: "1",
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      views: 32,
      downloads: 18,
      comments: 7,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      views: 28,
      downloads: 15,
      comments: 5,
      lastActive: "3 hours ago",
    },
    {
      id: "3",
      name: "Jessica Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      views: 25,
      downloads: 12,
      comments: 9,
      lastActive: "5 hours ago",
    },
    {
      id: "4",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      views: 22,
      downloads: 10,
      comments: 3,
      lastActive: "1 day ago",
    },
    {
      id: "5",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      views: 18,
      downloads: 8,
      comments: 2,
      lastActive: "1 day ago",
    },
  ]

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "pptx":
        return <FilePresentationIcon className="h-5 w-5 text-orange-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case "mp4":
      case "mov":
        return <FileVideo className="h-5 w-5 text-pink-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "download":
        return <Download className="h-4 w-4 text-blue-500" />
      case "view":
        return <Eye className="h-4 w-4 text-green-500" />
      case "comment":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "rating":
        return <Star className="h-4 w-4 text-yellow-500" />
      default:
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500">Track usage and engagement with your study materials</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-3xl font-bold">{overviewStats.totalViews}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span className="text-green-600 font-medium">+{overviewStats.viewsThisWeek}</span> this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Downloads</p>
                <p className="text-3xl font-bold">{overviewStats.totalDownloads}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Download className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span className="text-green-600 font-medium">+{overviewStats.downloadsThisWeek}</span> this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Rating</p>
                <p className="text-3xl font-bold">{overviewStats.averageRating}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 flex items-center">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500/60 mr-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Students</p>
                <p className="text-3xl font-bold">{overviewStats.activeStudents}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span className="text-green-600 font-medium">+{overviewStats.commentsThisWeek}</span> comments this week
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="materials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="materials" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Top Materials
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Recent Activity
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Student Engagement
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            Charts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Materials</CardTitle>
              <CardDescription>Your most viewed and downloaded study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex-1">Material</div>
                  <div className="w-24 text-center">Views</div>
                  <div className="w-24 text-center">Downloads</div>
                  <div className="w-24 text-center">Rating</div>
                </div>

                {topMaterials.map((material) => (
                  <div key={material.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-100">
                        {getFileIcon(material.fileType)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{material.title}</p>
                        <Badge variant="outline" className="mt-1">
                          {material.course}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-24 text-center flex items-center justify-center">
                      <Eye className="h-4 w-4 text-gray-400 mr-1" />
                      {material.views}
                    </div>
                    <div className="w-24 text-center flex items-center justify-center">
                      <Download className="h-4 w-4 text-gray-400 mr-1" />
                      {material.downloads}
                    </div>
                    <div className="w-24 text-center flex items-center justify-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      {material.rating}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest interactions with your study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 py-2 border-b">
                    <Avatar>
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.user.name}</span>
                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                          {getActivityIcon(activity.type)}
                          <span className="text-xs">
                            {activity.type === "download"
                              ? "downloaded"
                              : activity.type === "view"
                                ? "viewed"
                                : activity.type === "comment"
                                  ? "commented on"
                                  : "rated"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{activity.material}</p>
                      {activity.type === "comment" && (
                        <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded-md">{activity.comment}</p>
                      )}
                      {activity.type === "rating" && (
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (activity.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Engagement</CardTitle>
              <CardDescription>Students who interact most with your materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex-1">Student</div>
                  <div className="w-20 text-center">Views</div>
                  <div className="w-20 text-center">Downloads</div>
                  <div className="w-20 text-center">Comments</div>
                  <div className="w-32 text-right">Last Active</div>
                </div>

                {studentEngagement.map((student) => (
                  <div key={student.id} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Avatar>
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium truncate">{student.name}</p>
                    </div>
                    <div className="w-20 text-center">{student.views}</div>
                    <div className="w-20 text-center">{student.downloads}</div>
                    <div className="w-20 text-center">{student.comments}</div>
                    <div className="w-32 text-right text-sm text-gray-500">{student.lastActive}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Views & Downloads Over Time</CardTitle>
                <CardDescription>Trend of material usage over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <LineChart className="h-16 w-16 text-gray-300" />
                <p className="text-sm text-gray-500 ml-4">Chart visualization would appear here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Type Distribution</CardTitle>
                <CardDescription>Breakdown of your materials by file type</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <PieChart className="h-16 w-16 text-gray-300" />
                <p className="text-sm text-gray-500 ml-4">Chart visualization would appear here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Engagement by Course</CardTitle>
                <CardDescription>Which courses have the most active students</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <BarChart className="h-16 w-16 text-gray-300" />
                <p className="text-sm text-gray-500 ml-4">Chart visualization would appear here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Ratings</CardTitle>
                <CardDescription>Distribution of ratings across your materials</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <BarChart className="h-16 w-16 text-gray-300" />
                <p className="text-sm text-gray-500 ml-4">Chart visualization would appear here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
