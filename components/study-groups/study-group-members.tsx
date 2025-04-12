"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MoreHorizontal, UserPlus, MessageSquare, Shield, ShieldAlert, UserMinus, Crown } from "lucide-react"
import Link from "next/link"

interface StudyGroupMembersProps {
  groupId: string
  limit?: number
  showViewAll?: boolean
}

export function StudyGroupMembers({ groupId, limit, showViewAll = false }: StudyGroupMembersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")

  // Mock members data
  const members = [
    {
      id: "1",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "admin",
      creator: true,
      major: "Mathematics",
      year: "Junior",
      joinedDate: "Mar 15, 2024",
      online: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "admin",
      creator: false,
      major: "Computer Science",
      year: "Senior",
      joinedDate: "Mar 16, 2024",
      online: true,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      major: "Physics",
      year: "Sophomore",
      joinedDate: "Mar 18, 2024",
      online: false,
    },
    {
      id: "4",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      major: "Mathematics",
      year: "Junior",
      joinedDate: "Mar 20, 2024",
      online: false,
    },
    {
      id: "5",
      name: "Jessica Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      major: "Engineering",
      year: "Senior",
      joinedDate: "Mar 22, 2024",
      online: true,
    },
    {
      id: "6",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      major: "Mathematics",
      year: "Freshman",
      joinedDate: "Mar 25, 2024",
      online: false,
    },
    {
      id: "7",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      major: "Statistics",
      year: "Junior",
      joinedDate: "Mar 28, 2024",
      online: true,
    },
  ]

  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.year.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Limit the number of members shown if limit is provided
  const displayedMembers = limit ? filteredMembers.slice(0, limit) : filteredMembers

  const handleInvite = () => {
    // In a real app, you'd call an API to send an invitation
    console.log("Inviting:", inviteEmail)
    setInviteEmail("")
    setShowInviteDialog(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Members</CardTitle>
          <CardDescription>People in this study group</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
                <UserPlus className="h-4 w-4" />
                <span>Invite</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Members</DialogTitle>
                <DialogDescription>Send invitations to join this study group.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Or share this link</label>
                  <div className="flex items-center gap-2">
                    <Input readOnly value={`https://gwconnect.edu/study-groups/${groupId}/join`} />
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInvite} className="bg-[#0033A0] hover:bg-[#002180]">
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {!limit && (
          <div className="mb-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="space-y-4">
          {displayedMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {member.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{member.name}</span>
                    {member.creator && (
                      <Badge variant="outline" className="text-xs gap-1 border-amber-200 bg-amber-50 text-amber-700">
                        <Crown className="h-3 w-3" />
                        <span>Creator</span>
                      </Badge>
                    )}
                    {member.role === "admin" && !member.creator && (
                      <Badge variant="outline" className="text-xs gap-1 border-blue-200 bg-blue-50 text-blue-700">
                        <Shield className="h-3 w-3" />
                        <span>Admin</span>
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {member.major}, {member.year} • Joined {member.joinedDate}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/student/messages?user=${member.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {member.role !== "admin" && (
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Make Admin
                      </DropdownMenuItem>
                    )}
                    {member.role === "admin" && !member.creator && (
                      <DropdownMenuItem>
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Remove Admin
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-600">
                      <UserMinus className="mr-2 h-4 w-4" />
                      Remove from Group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {filteredMembers.length === 0 && (
            <div className="text-center py-4 text-gray-500">No members found matching your search.</div>
          )}

          {showViewAll && members.length > limit! && (
            <div className="text-center pt-2">
              <Link href={`/student/study-groups/${groupId}?tab=members`}>
                <Button variant="link" className="text-[#0033A0]">
                  View all {members.length} members
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
