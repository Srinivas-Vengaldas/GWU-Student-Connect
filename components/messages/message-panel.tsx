"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Check, CheckCheck, Copy, Edit, MoreHorizontal, Reply, Trash } from "lucide-react"

interface MessagePanelProps {
  conversationId: string
}

export function MessagePanel({ conversationId }: MessagePanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<any[]>([])

  // Mock data for different conversations
  useEffect(() => {
    // In a real app, you'd fetch messages from an API
    const mockMessages = {
      "1": [
        {
          id: "1",
          sender: {
            id: "2",
            name: "Jamie Smith",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Hey, are you free to discuss the project tomorrow?",
          timestamp: "10:30 AM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Sure, what time works for you?",
          timestamp: "10:35 AM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "2",
            name: "Jamie Smith",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "How about 3 PM at the library?",
          timestamp: "10:38 AM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "That works for me. I'll bring my notes.",
          timestamp: "10:40 AM",
          status: "delivered",
        },
        {
          id: "5",
          sender: {
            id: "2",
            name: "Jamie Smith",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Great! See you then.",
          timestamp: "10:42 AM",
          status: "sent",
        },
      ],
      "2": [
        {
          id: "1",
          sender: {
            id: "3",
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Hi there! Did you attend today's lecture?",
          timestamp: "Yesterday, 2:15 PM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Yes, I did. It was really informative.",
          timestamp: "Yesterday, 2:20 PM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "3",
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "I missed it due to a doctor's appointment. Could you share your notes?",
          timestamp: "Yesterday, 2:25 PM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Of course! Here you go.",
          timestamp: "Yesterday, 2:30 PM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "I've shared the notes from today's lecture",
          timestamp: "Yesterday, 2:32 PM",
          status: "read",
          attachment: {
            type: "file",
            name: "Lecture_Notes_Week5.pdf",
            size: "2.4 MB",
          },
        },
        {
          id: "6",
          sender: {
            id: "3",
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Thank you so much! You're a lifesaver.",
          timestamp: "Yesterday, 2:40 PM",
          status: "read",
        },
      ],
      "3": [
        {
          id: "1",
          sender: {
            id: "4",
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Hey everyone! When are we meeting next for our study session?",
          timestamp: "Yesterday, 4:15 PM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "5",
            name: "Sarah Williams",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "I'm free on Thursday evening or Friday afternoon.",
          timestamp: "Yesterday, 4:20 PM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Thursday works better for me. Around 6 PM?",
          timestamp: "Yesterday, 4:25 PM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "6",
            name: "Emily Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Thursday at 6 PM works for me too!",
          timestamp: "Yesterday, 4:30 PM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "4",
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Great! Let's meet at the library, same spot as last time.",
          timestamp: "Yesterday, 4:35 PM",
          status: "read",
        },
        {
          id: "6",
          sender: {
            id: "4",
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Don't forget to bring your textbooks and the problem sets.",
          timestamp: "Yesterday, 4:36 PM",
          status: "read",
        },
        {
          id: "7",
          sender: {
            id: "5",
            name: "Sarah Williams",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "I'll bring some snacks too!",
          timestamp: "Yesterday, 4:40 PM",
          status: "read",
        },
        {
          id: "8",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Sounds good! See you all on Thursday.",
          timestamp: "Yesterday, 4:45 PM",
          status: "read",
        },
      ],
      "4": [
        {
          id: "1",
          sender: {
            id: "7",
            name: "Prof. Williams",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Hello, I wanted to remind you about the upcoming assignment deadline.",
          timestamp: "Monday, 10:00 AM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "7",
            name: "Prof. Williams",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Please submit your assignment by Friday, 11:59 PM.",
          timestamp: "Monday, 10:01 AM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Thank you for the reminder, Professor. I'll make sure to submit it on time.",
          timestamp: "Monday, 10:15 AM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "7",
            name: "Prof. Williams",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Great. Let me know if you have any questions about the assignment.",
          timestamp: "Monday, 10:20 AM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content:
            "Actually, I do have a question about the third problem. Could I stop by your office hours tomorrow?",
          timestamp: "Monday, 10:25 AM",
          status: "read",
        },
        {
          id: "6",
          sender: {
            id: "7",
            name: "Prof. Williams",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Of course. My office hours are from 2-4 PM tomorrow. Feel free to drop by.",
          timestamp: "Monday, 10:30 AM",
          status: "read",
        },
      ],
      "5": [
        {
          id: "1",
          sender: {
            id: "8",
            name: "Sarah",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Hey team, I've pushed the latest changes to our GitHub repository.",
          timestamp: "Monday, 3:15 PM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "8",
            name: "Sarah",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Here's the link to the PR: https://github.com/team/project/pull/42",
          timestamp: "Monday, 3:16 PM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "9",
            name: "David",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Thanks Sarah! I'll review it this evening.",
          timestamp: "Monday, 3:20 PM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Great work! I'll check it out too.",
          timestamp: "Monday, 3:25 PM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "10",
            name: "Jessica",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "When is our next team meeting?",
          timestamp: "Monday, 3:30 PM",
          status: "read",
        },
        {
          id: "6",
          sender: {
            id: "9",
            name: "David",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "We're meeting on Wednesday at 4 PM in the CS lab.",
          timestamp: "Monday, 3:35 PM",
          status: "read",
        },
        {
          id: "7",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "I'll prepare a demo of the new features for the meeting.",
          timestamp: "Monday, 3:40 PM",
          status: "read",
        },
      ],
    }

    setMessages(mockMessages[conversationId as keyof typeof mockMessages] || [])
  }, [conversationId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

interface MessageItemProps {
  message: any
}

function MessageItem({ message }: MessageItemProps) {
  const isCurrentUser = message.sender.id === "1"

  return (
    <div className={cn("flex", isCurrentUser ? "justify-end" : "justify-start")}>
      <div className={cn("flex max-w-[80%]", isCurrentUser ? "flex-row-reverse" : "flex-row")}>
        {!isCurrentUser && (
          <Avatar className="h-8 w-8 mr-2 mt-1">
            <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div className="space-y-1">
          <div className="flex items-end gap-2">
            {!isCurrentUser && <span className="text-xs font-medium">{message.sender.name}</span>}
            <div
              className={cn(
                "rounded-lg px-3 py-2 text-sm",
                isCurrentUser ? "bg-[#0033A0] text-white" : "bg-gray-100 text-gray-900",
              )}
            >
              <div>{message.content}</div>
              {message.attachment && (
                <div className="mt-2 flex items-center gap-2 rounded-md bg-white/20 p-2 text-xs">
                  <div className="rounded-md bg-white/30 p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="flex-1 truncate">{message.attachment.name}</div>
                  <div>{message.attachment.size}</div>
                </div>
              )}
            </div>
            <MessageActions message={message} isCurrentUser={isCurrentUser} />
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{message.timestamp}</span>
            {isCurrentUser && (
              <span>
                {message.status === "sent" && <Check className="h-3 w-3" />}
                {message.status === "delivered" && <CheckCheck className="h-3 w-3" />}
                {message.status === "read" && <CheckCheck className="h-3 w-3 text-blue-500" />}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MessageActionsProps {
  message: any
  isCurrentUser: boolean
}

function MessageActions({ message, isCurrentUser }: MessageActionsProps) {
  return (
    <TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isCurrentUser ? "end" : "start"}>
          <DropdownMenuItem>
            <Reply className="mr-2 h-4 w-4" />
            Reply
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </DropdownMenuItem>
          {isCurrentUser && (
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )}
          {isCurrentUser && (
            <DropdownMenuItem className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}
