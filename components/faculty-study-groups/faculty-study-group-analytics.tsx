"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calendar, Download, FileText, LineChart, MessageSquare, PieChart, Users } from "lucide-react"

interface FacultyStudyGroupAnalyticsProps {
  groupId: string
}

export function FacultyStudyGroupAnalytics({ groupId }: FacultyStudyGroupAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30days")

  // Mock data for analytics
  const overviewData = {
    totalMembers: 28,
    activeMembers: 22,
    totalMessages: 156,
    totalResources: 12,
    totalMeetings: 8,
    averageAttendance: 18,
    engagementRate: 78,
    resourceDownloads: 87,
  }

  const memberEngagement = [
    { name: "Emily Rodriguez", avatar: "/placeholder.svg?height=40&width=40", engagement: 95 },
    { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40", engagement: 88 },
    { name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40", engagement: 85 },
    { name: "Jessica Thompson", avatar: "/placeholder.svg?height=40&width=40", engagement: 72 },
    { name: "Olivia Martinez", avatar: "/placeholder.svg?height=40&width=40", engagement: 65 },
  ]

  const inactiveMembers = [
    { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", lastActive: "2 days ago" },
    { name: "Ryan Wilson", avatar: "/placeholder.svg?height=40&width=40", lastActive: "5 days ago" },
    { name: "Sophia Lee", avatar: "/placeholder.svg?height=40&width=40", lastActive: "1 week ago" },
  ]

  const popularResources = [
    { name: "Advanced Algorithms Cheat Sheet", downloads: 24, rating: 4.8 },
    { name: "Red-Black Trees Visualization", downloads: 21, rating: 4.6 },
    { name: "Time Complexity Analysis Guide", downloads: 18, rating: 4.5 },
    { name: "Practice Problems Set 1", downloads: 15, rating: 4.2 },
  ]

  const meetingAttendance = [
    { name: "Algorithm Efficiency Discussion", date: "Oct 5", attendance: 22, percentage: 79 },
    { name: "Red-Black Trees Workshop", date: "Sep 28", attendance: 19, percentage: 68 },
    { name: "Problem Solving Session", date: "Sep 21", attendance: 24, percentage: 86 },
    { name: "Midterm Review", date: "Sep 14", attendance: 26, percentage: 93 },
  ]

  const handleExportData = () => {
    // In a real app, you'd generate a CSV or PDF report
    console.log("Exporting analytics data")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Group Analytics</h2>
          <p className="text-gray-500">Track engagement and activity in your study group</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="alltime">All time</option>
          </select>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Member Engagement</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{overviewData.totalMembers}</div>
                  <Users className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-xs text-gray-500 mt-1">{overviewData.activeMembers} active in the last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{overviewData.totalMessages}</div>
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(overviewData.totalMessages / 30)} messages per day on average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Resources Shared</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{overviewData.totalResources}</div>
                  <FileText className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-xs text-gray-500 mt-1">{overviewData.resourceDownloads} total downloads</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Meetings Held</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{overviewData.totalMeetings}</div>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-xs text-gray-500 mt-1">{overviewData.averageAttendance} attendees on average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>Group activity and participation metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Overall Engagement Rate</div>
                    <div className="text-sm font-medium">{overviewData.engagementRate}%</div>
                  </div>
                  <Progress value={overviewData.engagementRate} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    Percentage of members actively participating in group activities
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-medium mb-4">Activity Distribution</h4>
                    <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                      <PieChart className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Activity chart would render here</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-4">Engagement Trend</h4>
                    <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                      <LineChart className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Trend chart would render here</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Most Engaged Members</CardTitle>
                <CardDescription>Members with highest participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberEngagement.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-gray-500">
                            {member.engagement >= 80
                              ? "Very Active"
                              : member.engagement >= 60
                                ? "Active"
                                : "Moderately Active"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{member.engagement}%</div>
                        <Progress value={member.engagement} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inactive Members</CardTitle>
                <CardDescription>Members with low participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inactiveMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-gray-500">Last active: {member.lastActive}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Breakdown</CardTitle>
              <CardDescription>Member participation by activity type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                <BarChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Engagement chart would render here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Performance</CardTitle>
              <CardDescription>Most downloaded and highest rated materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{resource.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {resource.downloads} downloads
                        </Badge>
                        <div className="flex items-center text-xs">
                          <span className="text-amber-500 mr-1">★</span>
                          <span>{resource.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Engagement</CardTitle>
              <CardDescription>How students interact with shared materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                <BarChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Resource engagement chart would render here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Attendance</CardTitle>
              <CardDescription>Participation rates for recent meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetingAttendance.map((meeting, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{meeting.name}</div>
                        <div className="text-xs text-gray-500">{meeting.date}</div>
                      </div>
                      <div className="text-sm font-medium">
                        {meeting.attendance}/{overviewData.totalMembers} ({meeting.percentage}%)
                      </div>
                    </div>
                    <Progress value={meeting.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meeting Engagement Trend</CardTitle>
              <CardDescription>Attendance patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Attendance trend chart would render here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
