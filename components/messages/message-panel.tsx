"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { MessageAttachment } from "./message-composer"
import { FileIcon, ImageIcon, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar: string
  }
  timestamp: string
  status: "sent" | "delivered" | "read"
  isMe: boolean
  attachments?: MessageAttachment[]
}

interface MessagePanelProps {
  conversationId: string
  onMessagesInit?: (addMessage: (content: string, attachments?: MessageAttachment[]) => void) => void
}

export function MessagePanel({ conversationId, onMessagesInit }: MessagePanelProps) {
  // Mock conversation data - in a real app, this would be fetched from an API
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const conversationIdRef = useRef(conversationId)

  // Load initial messages based on conversation ID
  useEffect(() => {
    // Reset messages when conversation changes
    if (conversationIdRef.current !== conversationId) {
      conversationIdRef.current = conversationId

      // Mock data for different conversations
      const mockMessages: Record<string, Message[]> = {
        "1": [
          {
            id: "1",
            content: "Hey, are you free to discuss the project tomorrow?",
            sender: {
              id: "2",
              name: "Jamie Smith",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            timestamp: "10:42 AM",
            status: "read",
            isMe: false,
          },
          {
            id: "2",
            content: "Yes, I'm available after 2 PM. Does that work for you?",
            sender: {
              id: "1",
              name: "You",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            timestamp: "10:45 AM",
            status: "read",
            isMe: true,
          },
          {
            id: "3",
            content: "Here are the lecture notes from yesterday",
            sender: {
              id: "2",
              name: "Jamie Smith",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            timestamp: "10:50 AM",
            status: "read",
            isMe: false,
            attachments: [
              {
                id: "file-1",
                type: "file",
                name: "Physics_Lecture_Notes.pdf",
                url: "#",
                size: 2500000,
                extension: "pdf",
              },
            ],
          },
          {
            id: "4",
            content: "And here's the diagram we discussed",
            sender: {
              id: "2",
              name: "Jamie Smith",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            timestamp: "10:51 AM",
            status: "read",
            isMe: false,
            attachments: [
              {
                id: "img-1",
                type: "image",
                name: "Circuit_Diagram.jpg",
                url: "/placeholder.svg?height=300&width=400",
                size: 1200000,
                extension: "jpg",
              },
            ],
          },
        ],
        "2": [
          {
            id: "1",
            content: "Hi there! Did you attend today's lecture?",
            sender: {
              id: "3",
              name: "Alex Johnson",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            timestamp: "Yesterday, 2:15 PM",
            status: "read",
            isMe: false,
          },
          {
            id: "2",
            content: "Yes, I did. It was really informative.",
            sender: {
              id: "1",
              name: "You",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            timestamp: "Yesterday, 2:20 PM",
            status: "read",
            isMe: true,
          },
          {
            id: "3",
            content: "Here are some screenshots from the presentation",
            sender: {
              id: "3",
              name: "Alex Johnson",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            timestamp: "Yesterday, 2:25 PM",
            status: "read",
            isMe: false,
            attachments: [
              {
                id: "img-2",
                type: "image",
                name: "Slide1.jpg",
                url: "/placeholder.svg?height=200&width=300",
                size: 850000,
                extension: "jpg",
              },
              {
                id: "img-3",
                type: "image",
                name: "Slide2.jpg",
                url: "/placeholder.svg?height=200&width=300",
                size: 920000,
                extension: "jpg",
              },
            ],
          },
        ],
      }

      setMessages(mockMessages[conversationId] || [])
    }
  }, [conversationId])

  // Function to add a new message
  const addMessage = (content: string, attachments?: MessageAttachment[]) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: {
        id: "1",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
      isMe: true,
      attachments,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  // Expose the addMessage function to parent component
  useEffect(() => {
    if (onMessagesInit) {
      onMessagesInit(addMessage)
    }
  }, [onMessagesInit])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex gap-3 max-w-[80%]", message.isMe ? "ml-auto flex-row-reverse" : "")}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
              <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              {message.content && (
                <div className={cn("rounded-lg p-3", message.isMe ? "bg-[#0033A0] text-white" : "bg-white border")}>
                  <p className="text-sm">{message.content}</p>
                </div>
              )}

              {message.attachments && message.attachments.length > 0 && (
                <div className="space-y-2">
                  {message.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className={cn(
                        "rounded-lg p-3 flex flex-col",
                        message.isMe ? "bg-[#0033A0] text-white" : "bg-white border",
                      )}
                    >
                      {attachment.type === "image" ? (
                        <div className="space-y-2">
                          <div className="relative rounded-md overflow-hidden">
                            <img
                              src={attachment.url || "/placeholder.svg"}
                              alt={attachment.name}
                              className="max-w-full max-h-[300px] object-contain"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <ImageIcon className={cn("h-4 w-4", message.isMe ? "text-white" : "text-gray-500")} />
                              <span className="text-xs truncate max-w-[150px]">{attachment.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-6 w-6 rounded-full",
                                message.isMe ? "text-white hover:bg-[#002180]" : "text-gray-500 hover:bg-gray-100",
                              )}
                              title="Download"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "flex items-center justify-center w-10 h-10 rounded",
                                message.isMe ? "bg-[#002180]" : "bg-gray-100",
                              )}
                            >
                              <FileIcon className={cn("h-5 w-5", message.isMe ? "text-white" : "text-gray-500")} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium truncate max-w-[150px]">{attachment.name}</span>
                              {attachment.size && (
                                <span className={cn("text-xs", message.isMe ? "text-gray-200" : "text-gray-500")}>
                                  {formatFileSize(attachment.size)}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-8 w-8 rounded-full",
                              message.isMe ? "text-white hover:bg-[#002180]" : "text-gray-500 hover:bg-gray-100",
                            )}
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp}
                {message.isMe && (
                  <span className="ml-2">
                    {message.status === "sent" && "✓"}
                    {message.status === "delivered" && "✓✓"}
                    {message.status === "read" && "✓✓"}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
