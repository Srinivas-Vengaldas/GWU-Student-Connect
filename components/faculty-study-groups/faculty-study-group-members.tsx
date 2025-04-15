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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  UserPlus,
  MessageSquare,
  Shield,
  ShieldAlert,
  UserMinus,
  Crown,
  Mail,
  Download,
  Filter,
} from "lucide-react"
import Link from "next/link"

interface FacultyStudyGroupMembersProps {
  groupId: string
  limit?: number
  showViewAll?: boolean
}

export function FacultyStudyGroupMembers({ groupId, limit, showViewAll = false }: FacultyStudyGroupMembersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilterOptions, setShowFilterOptions] = useState(false)

  // Mock members data
  const members = [
    {
      id: "1",
      name: "Dr. Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "admin",
      creator: true,
      department: "Computer Science",
      position: "Professor",
      joinedDate: "Sep 15, 2024",
      online: true,
      lastActive: "Now",
      engagement: "high",
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "co-admin",
      creator: false,
      department: "Computer Science",
      position: "Teaching Assistant",
      joinedDate: "Sep 16, 2024",
      online: true,
      lastActive: "5 min ago",
      engagement: "high",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      department: "Computer Science",
      year: "Senior",
      joinedDate: "Sep 18, 2024",
      online: false,
      lastActive: "1 hour ago",
      engagement: "medium",
    },
    {
      id: "4",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      department: "Computer Science",
      year: "Junior",
      joinedDate: "Sep 20, 2024",
      online: false,
      lastActive: "3 hours ago",
      engagement: "high",
    },
    {
      id: "5",
      name: "Jessica Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      department: "Computer Science",
      year: "Senior",
      joinedDate: "Sep 22, 2024",
      online: true,
      lastActive: "30 min ago",
      engagement: "low",
    },
    {
      id: "6",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      department: "Computer Science",
      year: "Freshman",
      joinedDate: "Sep 25, 2024",
      online: false,
      lastActive: "2 days ago",
      engagement: "low",
    },
    {
      id: "7",
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      creator: false,
      department: "Computer Science",
      year: "Junior",
      joinedDate: "Sep 28, 2024",
      online: true,
      lastActive: "15 min ago",
      engagement: "medium",
    },
  ]

  // Filter members based on search query and active tab
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.department && member.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.position && member.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.year && member.year.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "admins" && (member.role === "admin" || member.role === "co-admin")) ||
      (activeTab === "students" && member.role === "member") ||
      (activeTab === "active" && member.engagement !== "low") ||
      (activeTab === "inactive" && member.engagement === "low")

    return matchesSearch && matchesTab
  })

  // Limit the number of members shown if limit is provided
  const displayedMembers = limit ? filteredMembers.slice(0, limit) : filteredMembers

  const handleInvite = () => {
    // In a real app, you'd call an API to send an invitation
    console.log("Inviting:", inviteEmail)
    setInviteEmail("")
    setShowInviteDialog(false)
  }

  const handleExportMembers = () => {
    // In a real app, you'd generate a CSV file with member data
    console.log("Exporting member list")
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bulk Invite</label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Mail className="h-4 w-4" />
                      <span>Email Class List</span>
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
          <>
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search members..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={handleExportMembers}>
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>

            {showFilterOptions && (
              <div className="mb-4 p-4 border rounded-md bg-gray-50">
                <h4 className="font-medium mb-2">Filter Options</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Year</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">All Years</option>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Role</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">All Roles</option>
                      <option value="admin">Admin</option>
                      <option value="co-admin">Co-Admin</option>
                      <option value="member">Member</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Activity</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                      <option value="">All Activity Levels</option>
                      <option value="high">High Engagement</option>
                      <option value="medium">Medium Engagement</option>
                      <option value="low">Low Engagement</option>
                    </select>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="outline" className="mr-2">
                    Reset
                  </Button>
                  <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="w-full">
                <TabsTrigger value="all">All Members</TabsTrigger>
                <TabsTrigger value="admins">Admins</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
          </>
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
                    {member.role === "co-admin" && (
                      <Badge variant="outline" className="text-xs gap-1 border-green-200 bg-green-50 text-green-700">
                        <ShieldAlert className="h-3 w-3" />
                        <span>Co-Admin</span>
                      </Badge>
                    )}
                    {member.engagement === "low" && (
                      <Badge variant="outline" className="text-xs gap-1 border-red-200 bg-red-50 text-red-700">
                        <span>Inactive</span>
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {member.position || member.year} • {member.department} • Last active: {member.lastActive}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/faculty/messages?user=${member.id}`}>
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
                    <DropdownMenuItem>Send Email</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {member.role === "member" && (
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Make Co-Admin
                      </DropdownMenuItem>
                    )}
                    {member.role === "co-admin" && (
                      <DropdownMenuItem>
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Remove Co-Admin
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
              <Link href={`/faculty/study-groups/${groupId}?tab=members`}>
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
