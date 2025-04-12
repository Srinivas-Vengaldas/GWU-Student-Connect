"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Edit, Search, Users, UserPlus } from "lucide-react"

interface MessageSidebarProps {
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  className?: string
}

export function MessageSidebar({ activeConversationId, onSelectConversation, className }: MessageSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock conversation data
  const conversations = [
    {
      id: "1",
      type: "direct",
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey, are you free to discuss the project tomorrow?",
      timestamp: "10:42 AM",
      unread: 2,
      online: true,
      lastSeen: "Active now",
    },
    {
      id: "2",
      type: "direct",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I've shared the notes from today's lecture",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
      lastSeen: "1 hour ago",
    },
    {
      id: "3",
      type: "group",
      name: "Physics 101 Study Group",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Michael: When are we meeting next?",
      timestamp: "Yesterday",
      unread: 5,
      members: 8,
    },
    {
      id: "4",
      type: "direct",
      name: "Prof. Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Please submit your assignment by Friday",
      timestamp: "Monday",
      unread: 0,
      online: false,
      lastSeen: "2 days ago",
    },
    {
      id: "5",
      type: "group",
      name: "CS Project Team",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Sarah: I've pushed the changes to GitHub",
      timestamp: "Monday",
      unread: 0,
      members: 5,
    },
  ]

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            value="direct"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0033A0] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Direct
          </TabsTrigger>
          <TabsTrigger
            value="groups"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0033A0] data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Groups
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

        <TabsContent value="direct" className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {filteredConversations
              .filter((c) => c.type === "direct")
              .map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeConversationId === conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {filteredConversations
              .filter((c) => c.type === "group")
              .map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={activeConversationId === conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                />
              ))}
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
          <AvatarImage src={conversation.avatar} alt={conversation.name} />
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
          <p className={cn("font-medium truncate", conversation.unread > 0 && "font-semibold")}>{conversation.name}</p>
          <span className="text-xs text-gray-500 whitespace-nowrap">{conversation.timestamp}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
          {conversation.unread > 0 && <Badge className="ml-2 bg-[#0033A0]">{conversation.unread}</Badge>}
        </div>
        {conversation.type === "direct" && !conversation.online && (
          <p className="text-xs text-gray-500">{conversation.lastSeen}</p>
        )}
        {conversation.type === "group" && <p className="text-xs text-gray-500">{conversation.members} members</p>}
      </div>
    </div>
  )
}
