"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bell, ChevronRight, Edit, MessageSquare, Pin, Plus, ThumbsUp, Trash } from "lucide-react"
import Link from "next/link"

interface FacultyStudyGroupAnnouncementsProps {
  groupId: string
  limit?: number
  showViewAll?: boolean
}

export function FacultyStudyGroupAnnouncements({
  groupId,
  limit = 10,
  showViewAll = false,
}: FacultyStudyGroupAnnouncementsProps) {
  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      title: "Midterm Review Session",
      content:
        "We'll be holding a special review session for the midterm this Friday from 3-5pm in Room 305. Please bring your questions and review materials.",
      author: {
        name: "Dr. Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Professor",
      },
      date: "2 days ago",
      isPinned: true,
      isImportant: true,
      likes: 12,
      comments: 5,
    },
    {
      id: "2",
      title: "Assignment 3 Extended Deadline",
      content:
        "Due to the technical issues with the submission system, I'm extending the deadline for Assignment 3 until Sunday at midnight. Please make sure to submit your work by then.",
      author: {
        name: "Dr. Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Professor",
      },
      date: "1 week ago",
      isPinned: false,
      isImportant: true,
      likes: 24,
      comments: 8,
    },
    {
      id: "3",
      title: "Guest Speaker Next Week",
      content:
        "We'll have a guest speaker from Google joining us next Tuesday to discuss real-world applications of the algorithms we've been studying. Attendance is highly recommended.",
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Teaching Assistant",
      },
      date: "2 weeks ago",
      isPinned: false,
      isImportant: false,
      likes: 18,
      comments: 3,
    },
  ])

  // Limit the number of announcements if specified
  const displayedAnnouncements = limit ? announcements.slice(0, limit) : announcements

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Announcements</CardTitle>
          <CardDescription>Important updates and information for the study group</CardDescription>
        </div>
        <Button className="bg-[#0033A0] hover:bg-[#002180]">
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedAnnouncements.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-medium">No announcements yet</h3>
            <p className="text-sm text-gray-500 mt-1">Create an announcement to share important information</p>
          </div>
        ) : (
          displayedAnnouncements.map((announcement) => (
            <div key={announcement.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage
                      src={announcement.author.avatar || "/placeholder.svg"}
                      alt={announcement.author.name}
                    />
                    <AvatarFallback>{announcement.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{announcement.title}</h3>
                      {announcement.isPinned && <Pin className="h-3 w-3 text-gray-500" />}
                      {announcement.isImportant && (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          Important
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>{announcement.author.name}</span>
                      <span>•</span>
                      <span>{announcement.date}</span>
                    </div>
                    <p className="mt-2 text-gray-700">{announcement.content}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{announcement.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-gray-700">
                        <MessageSquare className="h-4 w-4" />
                        <span>{announcement.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-gray-700">
                        <Pin className="h-4 w-4" />
                        {announcement.isPinned ? "Unpin" : "Pin"}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-gray-700">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-red-500 hover:text-red-700">
                        <Trash className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
            </div>
          ))
        )}
      </CardContent>
      {showViewAll && announcements.length > limit && (
        <CardFooter>
          <Link href={`/faculty/study-groups/${groupId}/announcements`} className="w-full">
            <Button variant="outline" className="w-full">
              View All Announcements
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
