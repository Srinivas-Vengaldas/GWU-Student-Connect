"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { ArrowLeft, Calendar, MoreHorizontal, Phone, Star, UserCircle, Users, Video } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FacultyMessageHeaderProps {
  conversationId: string
  onBack?: () => void
  showBackButton?: boolean
}

export function FacultyMessageHeader({ conversationId, onBack, showBackButton = false }: FacultyMessageHeaderProps) {
  const [conversation, setConversation] = useState<any>(null)
  const [isStarred, setIsStarred] = useState(false)

  // Mock data for different conversations
  useEffect(() => {
    // In a real app, you'd fetch conversation details from an API
    const mockConversations = {
      "1": {
        type: "direct",
        recipient: {
          id: "2",
          name: "Jamie Smith",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "Online",
          isOnline: true,
          role: "student",
          course: "MATH 2230",
          year: "Junior",
        },
      },
      "2": {
        type: "direct",
        recipient: {
          id: "3",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "Last seen 1 hour ago",
          isOnline: false,
          role: "student",
          course: "MATH 2230",
          year: "Sophomore",
        },
      },
      "3": {
        type: "group",
        name: "MATH 2230 Study Group",
        avatar: "/placeholder.svg?height=40&width=40",
        members: 18,
        course: "MATH 2230",
      },
      "4": {
        type: "direct",
        recipient: {
          id: "7",
          name: "Prof. Williams",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "Last seen 2 days ago",
          isOnline: false,
          role: "faculty",
          department: "Mathematics",
        },
      },
      "5": {
        type: "group",
        name: "Advanced Calculus Project Team",
        avatar: "/placeholder.svg?height=40&width=40",
        members: 5,
        course: "MATH 3330",
      },
      "6": {
        type: "direct",
        recipient: {
          id: "11",
          name: "David Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "Last seen 3 days ago",
          isOnline: false,
          role: "alumni",
          graduationYear: "2022",
          major: "Mathematics",
        },
      },
    }

    setConversation(mockConversations[conversationId as keyof typeof mockConversations] || null)

    // Set starred status based on conversation ID (mock data)
    setIsStarred(conversationId === "1" || conversationId === "3")
  }, [conversationId])

  if (!conversation) return null

  return (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-1">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        {conversation.type === "direct" ? (
          <>
            <UserAvatar user={conversation.recipient} showName={false} />
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/student/profile/${conversation.recipient.id}`}
                  className="font-medium hover:text-[#0033A0]"
                >
                  {conversation.recipient.name}
                </Link>
                <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={() => setIsStarred(!isStarred)}>
                  <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                </Button>
              </div>
              <div className="flex items-center text-xs">
                {conversation.recipient.isOnline ? (
                  <span className="text-green-500">Online</span>
                ) : (
                  <span className="text-gray-500">{conversation.recipient.status}</span>
                )}
              </div>
              {conversation.recipient.role === "student" && (
                <div className="flex items-center gap-2 text-xs text-[#0033A0]">
                  <span>{conversation.recipient.course}</span>
                  <span>•</span>
                  <span>{conversation.recipient.year}</span>
                </div>
              )}
              {conversation.recipient.role === "alumni" && (
                <div className="flex items-center gap-2 text-xs text-[#0033A0]">
                  <span>{conversation.recipient.major}</span>
                  <span>•</span>
                  <span>Class of {conversation.recipient.graduationYear}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="h-10 w-10 rounded-full bg-[#0033A0] flex items-center justify-center text-white">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{conversation.name}</span>
                <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={() => setIsStarred(!isStarred)}>
                  <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                </Button>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <span>{conversation.members} members</span>
              </div>
              {conversation.course && <div className="text-xs text-[#0033A0]">{conversation.course}</div>}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {conversation.type === "direct" && (
          <>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Video className="h-4 w-4" />
            </Button>
          </>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {conversation.type === "direct" && (
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
            )}
            {conversation.type === "direct" && conversation.recipient.role === "student" && (
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              {isStarred ? (
                <>
                  <Star className="mr-2 h-4 w-4" />
                  Remove from Starred
                </>
              ) : (
                <>
                  <Star className="mr-2 h-4 w-4" />
                  Add to Starred
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
            <DropdownMenuItem>Archive Conversation</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Block {conversation.type === "direct" ? "User" : "Group"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
