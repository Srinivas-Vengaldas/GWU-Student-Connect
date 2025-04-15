"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

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
}

interface MessagePanelProps {
  conversationId: string
  onMessagesInit?: (addMessage: (content: string) => void) => void
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
        ],
      }

      setMessages(mockMessages[conversationId] || [])
    }
  }, [conversationId])

  // Function to add a new message
  const addMessage = (content: string) => {
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
            <div>
              <div className={cn("rounded-lg p-3", message.isMe ? "bg-[#0033A0] text-white" : "bg-white border")}>
                <p className="text-sm">{message.content}</p>
              </div>
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
