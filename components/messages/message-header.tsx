import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { MoreHorizontal, Phone, Video } from "lucide-react"
import Link from "next/link"

interface MessageHeaderProps {
  conversation: {
    recipient: {
      id: string
      name: string
      avatar?: string
      status?: string
      isOnline?: boolean
    }
  }
}

export function MessageHeader({ conversation }: MessageHeaderProps) {
  const { recipient } = conversation

  return (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-3">
        <UserAvatar user={recipient} showName={false} />
        <div>
          <Link href={`/student/profile/${recipient.id}`} className="font-medium hover:text-[#0033A0]">
            {recipient.name}
          </Link>
          <div className="flex items-center text-xs">
            {recipient.isOnline ? (
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
