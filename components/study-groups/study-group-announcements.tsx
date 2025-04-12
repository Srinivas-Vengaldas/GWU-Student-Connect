"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Pin, PinOff, Plus, Trash } from "lucide-react"

interface StudyGroupAnnouncementsProps {
  groupId: string
  limit?: number
  showViewAll?: boolean
}

export function StudyGroupAnnouncements({ groupId, limit, showViewAll = false }: StudyGroupAnnouncementsProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState("")

  // Mock announcements data
  const announcements = [
    {
      id: "1",
      content:
        "Welcome to our Calculus II study group! We'll be meeting every Thursday at 4 PM in the library to work through problem sets and prepare for exams. Feel free to bring any questions or topics you'd like to discuss.",
      author: {
        id: "1",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "admin",
      },
      createdAt: "March 15, 2024",
      isPinned: true,
    },
    {
      id: "2",
      content:
        "Important reminder: Our first midterm is coming up on April 5th. We'll be having an extra study session next Tuesday at 5 PM to review all the material covered so far.",
      author: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "admin",
      },
      createdAt: "March 20, 2024",
      isPinned: true,
    },
    {
      id: "3",
      content:
        "I've uploaded a set of practice problems for integration techniques in the resources section. These are similar to what we might see on the midterm.",
      author: {
        id: "3",
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "member",
      },
      createdAt: "March 22, 2024",
      isPinned: false,
    },
    {
      id: "4",
      content:
        "The professor just announced that he'll be holding extra office hours this Friday from 2-4 PM for anyone who has questions before the midterm.",
      author: {
        id: "4",
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "member",
      },
      createdAt: "March 25, 2024",
      isPinned: false,
    },
  ]

  // Limit the number of announcements shown if limit is provided
  const displayedAnnouncements = limit ? announcements.slice(0, limit) : announcements

  const handleCreateAnnouncement = () => {
    // In a real app, you'd call an API to create an announcement
    console.log("Creating announcement:", newAnnouncement)
    setNewAnnouncement("")
    setShowCreateDialog(false)
  }

  const togglePin = (id: string) => {
    // In a real app, you'd call an API to toggle pin status
    console.log("Toggling pin for announcement:", id)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Important updates from group admins</CardDescription>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
                <Plus className="h-4 w-4" />
                <span>Create</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
                <DialogDescription>Post an important update for all group members.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="announcement">Announcement</Label>
                  <Textarea
                    id="announcement"
                    placeholder="Write your announcement here..."
                    rows={5}
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateAnnouncement}
                  className="bg-[#0033A0] hover:bg-[#002180]"
                  disabled={!newAnnouncement.trim()}
                >
                  Post Announcement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayedAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className={`rounded-lg border p-4 ${announcement.isPinned ? "bg-amber-50 border-amber-200" : ""}`}
              >
                {announcement.isPinned && (
                  <div className="mb-2 flex items-center">
                    <Badge variant="outline" className="text-xs gap-1 border-amber-300 bg-amber-100 text-amber-800">
                      <Pin className="h-3 w-3" />
                      <span>Pinned Announcement</span>
                    </Badge>
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={announcement.author.avatar} alt={announcement.author.name} />
                      <AvatarFallback>{announcement.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{announcement.author.name}</span>
                        {announcement.author.role === "admin" && (
                          <Badge
                            variant="outline"
                            className="text-[10px] h-4 px-1 border-blue-200 bg-blue-50 text-blue-700"
                          >
                            Admin
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">{announcement.createdAt}</div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {announcement.isPinned ? (
                        <DropdownMenuItem onClick={() => togglePin(announcement.id)}>
                          <PinOff className="mr-2 h-4 w-4" />
                          Unpin
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => togglePin(announcement.id)}>
                          <Pin className="mr-2 h-4 w-4" />
                          Pin
                        </DropdownMenuItem>
                      )}
                      {announcement.author.id === "1" && (
                        <>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
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
                <p className="mt-2 text-gray-700">{announcement.content}</p>
              </div>
            ))}

            {announcements.length === 0 && <div className="text-center py-4 text-gray-500">No announcements yet.</div>}

            {showViewAll && announcements.length > limit! && (
              <div className="text-center pt-2">
                <Link href={`/student/study-groups/${groupId}?tab=announcements`}>
                  <Button variant="link" className="text-[#0033A0]">
                    View all {announcements.length} announcements
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
