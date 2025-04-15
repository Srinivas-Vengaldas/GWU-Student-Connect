"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { AlertCircle, Check, CheckCheck, Copy, Edit, MoreHorizontal, Reply, Star, Trash } from "lucide-react"

interface FacultyMessagePanelProps {
  conversationId: string
}

export function FacultyMessagePanel({ conversationId }: FacultyMessagePanelProps) {
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
            role: "student",
            course: "MATH 2230",
          },
          content: "Hello Professor, I wanted to thank you for the detailed feedback on my assignment.",
          timestamp: "10:30 AM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "You're welcome, Jamie. Your work showed a lot of improvement from the last assignment.",
          timestamp: "10:35 AM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "2",
            name: "Jamie Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 2230",
          },
          content:
            "I've been working on understanding the concepts better. Do you have any additional resources you could recommend?",
          timestamp: "10:38 AM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content:
            "I'd recommend checking out the supplementary materials I uploaded to the study group. There are some excellent practice problems there.",
          timestamp: "10:40 AM",
          status: "delivered",
        },
        {
          id: "5",
          sender: {
            id: "2",
            name: "Jamie Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 2230",
          },
          content: "Thank you! I'll take a look at those right away.",
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
            role: "student",
            course: "MATH 2230",
          },
          content: "Professor, I have a question about the upcoming exam.",
          timestamp: "Yesterday, 2:15 PM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "What's your question, Alex?",
          timestamp: "Yesterday, 2:20 PM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "3",
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 2230",
          },
          content:
            "Will the exam cover the material from Chapter 7? I'm finding those concepts particularly challenging.",
          timestamp: "Yesterday, 2:25 PM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "Yes, Chapter 7 will be included. I'd suggest focusing on sections 7.2 and 7.4 in particular.",
          timestamp: "Yesterday, 2:30 PM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "Here's a practice exam that might help you prepare.",
          timestamp: "Yesterday, 2:32 PM",
          status: "read",
          attachment: {
            type: "file",
            name: "Practice_Exam_MATH2230.pdf",
            size: "1.8 MB",
          },
        },
        {
          id: "6",
          sender: {
            id: "3",
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 2230",
          },
          content:
            "Thank you so much! Would it be possible to schedule a quick office hours appointment to go over a few problems?",
          timestamp: "Yesterday, 2:40 PM",
          status: "read",
          isUrgent: true,
        },
      ],
      "3": [
        {
          id: "1",
          sender: {
            id: "4",
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 2230",
          },
          content: "When is the next review session for the midterm?",
          timestamp: "Yesterday, 4:15 PM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "5",
            name: "Sarah Williams",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 2230",
          },
          content: "I'm also wondering about this. The exam is next week, right?",
          timestamp: "Yesterday, 4:20 PM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content:
            "Yes, the midterm is next Wednesday. I'll be holding a review session this Friday at 3 PM in Room 302.",
          timestamp: "Yesterday, 4:25 PM",
          status: "read",
          isPinned: true,
        },
        {
          id: "4",
          sender: {
            id: "6",
            name: "Emily Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 2230",
          },
          content: "Will the review session be recorded for those who can't attend?",
          timestamp: "Yesterday, 4:30 PM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "Yes, I'll record the session and post it to our study group resources section.",
          timestamp: "Yesterday, 4:35 PM",
          status: "read",
        },
        {
          id: "6",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "I've also uploaded last year's midterm with solutions for additional practice.",
          timestamp: "Yesterday, 4:36 PM",
          status: "read",
          attachment: {
            type: "file",
            name: "Last_Year_Midterm_Solutions.pdf",
            size: "2.2 MB",
          },
        },
        {
          id: "7",
          sender: {
            id: "5",
            name: "Sarah Williams",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 2230",
          },
          content: "Thank you, Professor! This is very helpful.",
          timestamp: "Yesterday, 4:40 PM",
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
            role: "faculty",
          },
          content: "Hello, I wanted to discuss the upcoming department meeting agenda.",
          timestamp: "Monday, 10:00 AM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "7",
            name: "Prof. Williams",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "Specifically, I'd like to propose some changes to the curriculum committee structure.",
          timestamp: "Monday, 10:01 AM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "That sounds interesting. I've been thinking about curriculum improvements as well.",
          timestamp: "Monday, 10:15 AM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "7",
            name: "Prof. Williams",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "Great. I've drafted a proposal. Would you mind reviewing it before I share it with the department?",
          timestamp: "Monday, 10:20 AM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "I'd be happy to review it. Please send it over when it's ready.",
          timestamp: "Monday, 10:25 AM",
          status: "read",
        },
        {
          id: "6",
          sender: {
            id: "7",
            name: "Prof. Williams",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "Thank you. I'll email it to you by the end of the day.",
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
            role: "student",
            course: "MATH 3330",
          },
          content: "Professor, I've shared the research paper we discussed for our project.",
          timestamp: "Monday, 3:15 PM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "8",
            name: "Sarah",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 3330",
          },
          content: "Here's the link to the paper: https://example.com/research-paper",
          timestamp: "Monday, 3:16 PM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "9",
            name: "David",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 3330",
          },
          content: "I've also added my notes on the methodology section to our shared document.",
          timestamp: "Monday, 3:20 PM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content: "Thank you both for your contributions. I'll review the paper and your notes this evening.",
          timestamp: "Monday, 3:25 PM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "10",
            name: "Jessica",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 3330",
          },
          content: "Professor, when should we schedule our next team meeting?",
          timestamp: "Monday, 3:30 PM",
          status: "read",
        },
        {
          id: "6",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content:
            "Let's meet this Thursday at 4 PM in my office. We can discuss the research findings and next steps.",
          timestamp: "Monday, 3:35 PM",
          status: "read",
          isPinned: true,
        },
        {
          id: "7",
          sender: {
            id: "8",
            name: "Sarah",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "student",
            course: "MATH 3330",
          },
          content: "Thursday at 4 PM works for me. I'll prepare a brief presentation of our findings.",
          timestamp: "Monday, 3:40 PM",
          status: "read",
        },
      ],
      "6": [
        {
          id: "1",
          sender: {
            id: "11",
            name: "David Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "alumni",
          },
          content:
            "Hello Professor, I hope you're doing well. I'm applying for a graduate program and was wondering if you would be willing to write a recommendation letter for me?",
          timestamp: "Last week, 2:15 PM",
          status: "read",
        },
        {
          id: "2",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content:
            "Hello David, it's good to hear from you. I'd be happy to write a recommendation letter. Which program are you applying to?",
          timestamp: "Last week, 2:30 PM",
          status: "read",
        },
        {
          id: "3",
          sender: {
            id: "11",
            name: "David Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "alumni",
          },
          content:
            "Thank you so much! I'm applying to the Applied Mathematics PhD program at MIT. The deadline is in three weeks.",
          timestamp: "Last week, 2:45 PM",
          status: "read",
        },
        {
          id: "4",
          sender: {
            id: "1",
            name: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "faculty",
          },
          content:
            "That's an excellent program. Please send me your CV, personal statement, and any other relevant materials that might help me write a strong letter.",
          timestamp: "Last week, 3:00 PM",
          status: "read",
        },
        {
          id: "5",
          sender: {
            id: "11",
            name: "David Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "alumni",
          },
          content: "I'll send everything by tomorrow. Thank you again for your support!",
          timestamp: "Last week, 3:15 PM",
          status: "read",
        },
        {
          id: "6",
          sender: {
            id: "11",
            name: "David Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "alumni",
          },
          content: "Professor, I just wanted to follow up. Did you receive the materials I sent last week?",
          timestamp: "Yesterday, 10:30 AM",
          status: "read",
          isUrgent: true,
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
            <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
            <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div className="space-y-1">
          <div className="flex items-end gap-2">
            {!isCurrentUser && (
              <div className="flex flex-col">
                <span className="text-xs font-medium">{message.sender.name}</span>
                {message.sender.course && <span className="text-xs text-[#0033A0]">{message.sender.course}</span>}
              </div>
            )}
            <div
              className={cn(
                "rounded-lg px-3 py-2 text-sm group relative",
                isCurrentUser ? "bg-[#0033A0] text-white" : "bg-gray-100 text-gray-900",
                message.isPinned && "border-2 border-yellow-400",
                message.isUrgent && !isCurrentUser && "border-2 border-red-400",
              )}
            >
              {message.isPinned && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-0.5">
                  <Star className="h-3 w-3 text-white" />
                </div>
              )}
              {message.isUrgent && !isCurrentUser && (
                <div className="absolute -top-2 -left-2 bg-red-400 rounded-full p-0.5">
                  <AlertCircle className="h-3 w-3 text-white" />
                </div>
              )}
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
          {!message.isPinned && (
            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              Pin Message
            </DropdownMenuItem>
          )}
          {message.isPinned && (
            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              Unpin Message
            </DropdownMenuItem>
          )}
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
