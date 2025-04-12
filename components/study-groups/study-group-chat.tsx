"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  CheckCheck,
  Copy,
  Edit,
  FileUp,
  ImageIcon,
  MoreHorizontal,
  PaperclipIcon,
  Pin,
  Reply,
  Send,
  Smile,
  Trash,
} from "lucide-react"

interface StudyGroupChatProps {
  groupId: string
}

export function StudyGroupChat({ groupId }: StudyGroupChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock messages data
  useEffect(() => {
    // In a real app, you'd fetch messages from an API
    const mockMessages = [
      {
        id: "1",
        sender: {
          id: "1",
          name: "Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
        },
        content:
          "Welcome everyone to our Calculus II study group! Let's use this chat to coordinate our study sessions and help each other with problem sets.",
        timestamp: "March 15, 2:30 PM",
        status: "read",
        isPinned: true,
      },
      {
        id: "2",
        sender: {
          id: "3",
          name: "Emily Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        content:
          "Thanks for creating this group! I'm struggling with the integration techniques from last week's lecture.",
        timestamp: "March 15, 2:35 PM",
        status: "read",
      },
      {
        id: "3",
        sender: {
          id: "2",
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
        },
        content:
          "I can help with that. Let's schedule a session to go over integration by parts and trig substitution.",
        timestamp: "March 15, 2:40 PM",
        status: "read",
      },
      {
        id: "4",
        sender: {
          id: "4",
          name: "David Kim",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        content: "That would be great! How about tomorrow at 4 PM in the library?",
        timestamp: "March 15, 2:45 PM",
        status: "read",
      },
      {
        id: "5",
        sender: {
          id: "1",
          name: "Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
        },
        content: "4 PM works for me. I'll reserve a study room.",
        timestamp: "March 15, 2:50 PM",
        status: "read",
      },
      {
        id: "6",
        sender: {
          id: "5",
          name: "Jessica Thompson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        content: "I can join too! Also, here's a helpful resource for integration techniques that I found online.",
        timestamp: "March 15, 3:00 PM",
        status: "read",
      },
      {
        id: "7",
        sender: {
          id: "5",
          name: "Jessica Thompson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        content: "Check out this PDF with practice problems and solutions.",
        timestamp: "March 15, 3:01 PM",
        status: "read",
        attachment: {
          type: "file",
          name: "Integration_Techniques.pdf",
          size: "2.4 MB",
        },
      },
      {
        id: "8",
        sender: {
          id: "3",
          name: "Emily Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        content: "Thank you Jessica! This is exactly what I needed.",
        timestamp: "March 15, 3:05 PM",
        status: "read",
      },
      {
        id: "9",
        sender: {
          id: "2",
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "admin",
        },
        content:
          "Don't forget that we have a quiz next week. We should also review sequences and series during our session.",
        timestamp: "March 15, 3:10 PM",
        status: "read",
      },
      {
        id: "10",
        sender: {
          id: "1",
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        content: "I've been working on a cheat sheet for sequences and series. I'll bring it tomorrow.",
        timestamp: "Just now",
        status: "sent",
      },
    ]

    setMessages(mockMessages)
  }, [groupId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you'd send the message to your backend
      const newMessage = {
        id: String(messages.length + 1),
        sender: {
          id: "1",
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "member",
        },
        content: message,
        timestamp: "Just now",
        status: "sent",
      }

      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Pinned Messages */}
        {messages.some((m) => m.isPinned) && (
          <div className="border-b p-2 bg-amber-50">
            <div className="flex items-center gap-2 text-sm">
              <Pin className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-amber-800">Pinned Messages</span>
            </div>
            <div className="mt-1">
              {messages
                .filter((m) => m.isPinned)
                .map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center gap-2 text-sm text-gray-700 p-2 rounded-md bg-white/50"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                      <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{message.sender.name}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="truncate">{message.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-3">
          <div className="flex items-end gap-2">
            <div className="flex-1 rounded-md border">
              <Textarea
                placeholder="Type a message..."
                className="min-h-[80px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center justify-between border-t px-3 py-1.5">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <PaperclipIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ImageIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileUp className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 bg-[#0033A0] text-white hover:bg-[#002180]"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface MessageItemProps {
  message: any
}

function MessageItem({ message }: MessageItemProps) {
  const isCurrentUser = message.sender.name === "You"

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[80%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
        {!isCurrentUser && (
          <Avatar className="h-8 w-8 mr-2 mt-1">
            <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div className="space-y-1">
          <div className="flex items-end gap-2">
            {!isCurrentUser && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">{message.sender.name}</span>
                {message.sender.role === "admin" && (
                  <Badge variant="outline" className="text-[10px] h-4 px-1 border-blue-200 bg-blue-50 text-blue-700">
                    Admin
                  </Badge>
                )}
              </div>
            )}
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                isCurrentUser ? "bg-[#0033A0] text-white" : "bg-gray-100 text-gray-900"
              }`}
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
        <DropdownMenuItem>
          <Pin className="mr-2 h-4 w-4" />
          Pin Message
        </DropdownMenuItem>
        {isCurrentUser && (
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {(isCurrentUser || message.sender.role === "admin") && (
          <DropdownMenuItem className="text-red-600">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
