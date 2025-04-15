"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Edit, Filter, Search, Star, Users, UserPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FacultyMessageSidebarProps {
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  className?: string
}

export function FacultyMessageSidebar({
  activeConversationId,
  onSelectConversation,
  className,
}: FacultyMessageSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Mock conversation data
  const conversations = [
    {
      id: "1",
      type: "direct",
      category: "student",
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thank you for the feedback on my assignment, Professor.",
      timestamp: "10:42 AM",
      unread: 0,
      online: true,
      lastSeen: "Active now",
      course: "MATH 2230",
      starred: true,
    },
    {
      id: "2",
      type: "direct",
      category: "student",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I have a question about the upcoming exam",
      timestamp: "Yesterday",
      unread: 2,
      online: false,
      lastSeen: "1 hour ago",
      course: "MATH 2230",
      starred: false,
    },
    {
      id: "3",
      type: "group",
      category: "study-group",
      name: "MATH 2230 Study Group",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Michael: When is the next review session?",
      timestamp: "Yesterday",
      unread: 5,
      members: 18,
      course: "MATH 2230",
      starred: true,
    },
    {
      id: "4",
      type: "direct",
      category: "faculty",
      name: "Prof. Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can we discuss the department meeting agenda?",
      timestamp: "Monday",
      unread: 0,
      online: false,
      lastSeen: "2 days ago",
      starred: false,
    },
    {
      id: "5",
      type: "group",
      category: "study-group",
      name: "Advanced Calculus Project Team",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Sarah: I've shared the research paper",
      timestamp: "Monday",
      unread: 0,
      members: 5,
      course: "MATH 3330",
      starred: false,
    },
    {
      id: "6",
      type: "direct",
      category: "alumni",
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Would you be willing to write a recommendation letter?",
      timestamp: "Last week",
      unread: 1,
      online: false,
      lastSeen: "3 days ago",
      starred: false,
    },
  ]

  // Filter conversations based on search query and active filter
  const filteredConversations = conversations.filter((conversation) => {
    // Apply search filter
    const matchesSearch = conversation.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply category filter
    const matchesCategory = !activeFilter || conversation.category === activeFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className={cn("flex flex-col bg-white", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" title="New message">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="New group">
              <UserPlus className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="Filter messages">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveFilter(null)}>All Messages</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("student")}>Students Only</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("study-group")}>Study Groups</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("alumni")}>Alumni</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveFilter("faculty")}>Faculty</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {activeFilter && (
          <div className="mt-2 flex items-center">
            <Badge variant="outline" className="flex gap-1 items-center">
              {activeFilter === "student" && "Students Only"}
              {activeFilter === "study-group" && "Study Groups"}
              {activeFilter === "alumni" && "Alumni"}
              {activeFilter === "faculty" && "Faculty"}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setActiveFilter(null)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </Badge>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="flex-1">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4">
          <TabsTrigger
            value="all"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0033A0] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="unread"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0033A0] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Unread
          </TabsTrigger>
          <TabsTrigger
            value="starred"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0033A0] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Starred
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={activeConversationId === conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
              />
            ))}
            {filteredConversations.length === 0 && (
              <div className="p-4 text-center text-gray-500">No conversations found</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {filteredConversations
              .filter((c) => c.unread > 0)
              .map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeConversationId === conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                />
              ))}
            {filteredConversations.filter((c) => c.unread > 0).length === 0 && (
              <div className="p-4 text-center text-gray-500">No unread messages</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {filteredConversations
              .filter((c) => c.starred)
              .map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeConversationId === conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                />
              ))}
            {filteredConversations.filter((c) => c.starred).length === 0 && (
              <div className="p-4 text-center text-gray-500">No starred conversations</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ConversationItemProps {
  conversation: any
  isActive: boolean
  onClick: () => void
}

function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50",
        isActive && "bg-gray-50",
        conversation.unread > 0 && "bg-blue-50/50",
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.type === "direct" && conversation.online && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
        )}
        {conversation.type === "group" && (
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0033A0] text-[10px] text-white">
            <Users className="h-3 w-3" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className={cn("font-medium truncate", conversation.unread > 0 && "font-semibold")}>
              {conversation.name}
            </p>
            {conversation.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">{conversation.timestamp}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
          {conversation.unread > 0 && <Badge className="ml-2 bg-[#0033A0]">{conversation.unread}</Badge>}
        </div>
        {conversation.course && <p className="text-xs text-[#0033A0]">{conversation.course}</p>}
        {conversation.type === "direct" && !conversation.online && (
          <p className="text-xs text-gray-500">{conversation.lastSeen}</p>
        )}
        {conversation.type === "group" && <p className="text-xs text-gray-500">{conversation.members} members</p>}
      </div>
    </div>
  )
}
