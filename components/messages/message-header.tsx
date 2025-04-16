"use client"

import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { ChevronLeft, MoreHorizontal, Phone, Video } from "lucide-react"
import Link from "next/link"

interface MessageHeaderProps {
  conversationId: string
  onBack?: () => void
  showBackButton?: boolean
  conversation?: {
    recipient: {
      id: string
      name: string
      avatar?: string
      status?: string
      isOnline?: boolean
    }
  }
}

export function MessageHeader({ conversationId, onBack, showBackButton, conversation }: MessageHeaderProps) {
  // Mock data for different conversations
  const mockConversations: Record<string, any> = {
    "1": {
      recipient: {
        id: "2",
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: true,
      },
    },
    "2": {
      recipient: {
        id: "3",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        isOnline: false,
      },
    },
    "3": {
      recipient: {
        id: "4",
        name: "Physics 101 Study Group",
        avatar: "/placeholder.svg?height=40&width=40",
        isGroup: true,
        members: 8,
      },
    },
  }

  // Get conversation data based on ID
  const currentConversation = conversation || mockConversations[conversationId]

  // Only destructure if conversation exists and has a recipient property
  const recipient = currentConversation?.recipient

  return (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button variant="ghost" size="icon" className="mr-1" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <UserAvatar user={recipient} showName={false} />
        <div>
          <Link href={`/student/profile/${recipient?.id}`} className="font-medium hover:text-[#0033A0]">
            {recipient?.name}
          </Link>
          <div className="flex items-center text-xs">
            {recipient?.isOnline ? (
              <span className="text-green-500">Online</span>
            ) : (
              <span className="text-gray-500">Offline</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
