"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Megaphone, FileText, Calendar, BarChart4, MessageSquare, ThumbsUp, Download } from "lucide-react"

// Mock data for the activity feed
const activityItems = [
  {
    id: 1,
    type: "announcement",
    title: "Important: Final Exam Schedule Posted",
    content: "The final exam schedule for Spring 2023 has been posted. Please check your student portal for details.",
    author: {
      name: "Dr. Sarah Johnson",
      role: "Faculty",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    date: "2 hours ago",
    course: "CS 101",
    link: "/student/blogs/1",
  },
  {
    id: 2,
    type: "material",
    title: "Data Structures Study Guide",
    content: "A comprehensive study guide for the upcoming midterm exam.",
    author: {
      name: "Michael Chen",
      role: "Student",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    date: "Yesterday",
    course: "CS 202",
    downloads: 24,
    link: "/student/study-materials/2",
  },
  {
    id: 3,
    type: "event",
    title: "AI Research Symposium",
    content: "Join us for a day of presentations and discussions on the latest AI research.",
    date: "May 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Science Building, Room 305",
    attendees: 45,
    link: "/student/events/3",
  },
  {
    id: 4,
    type: "poll",
    title: "Preferred Study Group Meeting Time",
    options: [
      { id: 1, text: "Weekday evenings", votes: 12 },
      { id: 2, text: "Weekend mornings", votes: 8 },
      { id: 3, text: "Weekend afternoons", votes: 15 },
    ],
    totalVotes: 35,
    author: {
      name: "Study Group: Advanced Algorithms",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SG",
    },
    date: "2 days ago",
    link: "/student/study-groups/4",
  },
  {
    id: 5,
    type: "discussion",
    title: "Question about Neural Networks",
    content: "Can someone explain how backpropagation works in simple terms?",
    author: {
      name: "Emily Rodriguez",
      role: "Student",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    date: "3 days ago",
    comments: 8,
    likes: 12,
    link: "/student/blogs/5",
  },
]

export function ActivityFeed() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredItems = activeTab === "all" ? activityItems : activityItems.filter((item) => item.type === activeTab)

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Activity Feed</CardTitle>
      </CardHeader>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="px-4 sm:px-6 overflow-x-auto">
          <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 mb-4">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              All
            </TabsTrigger>
            <TabsTrigger value="announcement" className="text-xs sm:text-sm">
              Announcements
            </TabsTrigger>
            <TabsTrigger value="material" className="text-xs sm:text-sm">
              Materials
            </TabsTrigger>
            <TabsTrigger value="event" className="text-xs sm:text-sm">
              Events
            </TabsTrigger>
            <TabsTrigger value="poll" className="text-xs sm:text-sm">
              Polls
            </TabsTrigger>
            <TabsTrigger value="discussion" className="text-xs sm:text-sm">
              Discussions
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="m-0">
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <ActivityItem item={item} />
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No {activeTab} items to display</p>
                </div>
              )}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

function ActivityItem({ item }: { item: any }) {
  const [voted, setVoted] = useState<number | null>(null)

  const getIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return <Megaphone className="h-5 w-5 text-red-500" />
      case "material":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "poll":
        return <BarChart4 className="h-5 w-5 text-green-500" />
      case "discussion":
        return <MessageSquare className="h-5 w-5 text-amber-500" />
      default:
        return null
    }
  }

  const handleVote = (optionId: number, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking vote button
    setVoted(optionId)
  }

  return (
    <Link href={item.link} className="block">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
          {getIcon(item.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {item.course && (
              <Badge variant="outline" className="text-xs">
                {item.course}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">{item.date}</span>
          </div>

          <h3 className="font-medium text-[#0033A0] mt-1 hover:underline truncate">{item.title}</h3>

          {item.content && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.content}</p>}

          {item.type === "event" && (
            <div className="mt-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {item.date}, {item.time}
                </span>
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {item.attendees} attending
                </Badge>
              </div>
            </div>
          )}

          {item.type === "poll" && (
            <div className="mt-2 space-y-2">
              {item.options.map((option: any) => {
                const percentage = Math.round((option.votes / item.totalVotes) * 100)
                return (
                  <div key={option.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm truncate max-w-[70%]">{option.text}</span>
                      <span className="text-xs text-muted-foreground">{percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${voted === option.id ? "bg-[#0033A0]" : "bg-gray-300"}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    {voted === null && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1 h-7 text-xs"
                        onClick={(e) => handleVote(option.id, e)}
                      >
                        Vote
                      </Button>
                    )}
                  </div>
                )
              })}
              <div className="text-xs text-muted-foreground">{item.totalVotes} votes total</div>
            </div>
          )}

          {item.type === "discussion" && (
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center text-gray-600">
                <MessageSquare className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-xs">{item.comments} comments</span>
              </div>
              <div className="flex items-center text-gray-600">
                <ThumbsUp className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-xs">{item.likes} likes</span>
              </div>
            </div>
          )}

          {item.type === "material" && (
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-gray-600">
                <Download className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-xs">{item.downloads} downloads</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={(e) => {
                  e.preventDefault() // Prevent navigation
                  // Download logic would go here
                }}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>

        {item.author && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
              <AvatarFallback>{item.author.initials}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </Link>
  )
}
