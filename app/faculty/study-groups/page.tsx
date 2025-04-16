"use client"

import { useState } from "react"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Calendar,
  Clock,
  Filter,
  Globe,
  Lock,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"

export default function FacultyStudyGroupsPage() {
  const [activeTab, setActiveTab] = useState("my-groups")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterVisible, setFilterVisible] = useState(false)

  // Mock data for faculty study groups
  const myGroups = [
    {
      id: "1",
      name: "Advanced Computer Science Concepts",
      description: "Discussion group for CS 4500 students focusing on advanced algorithms and data structures.",
      course: "CS 4500",
      subject: "Computer Science",
      members: 28,
      role: "admin",
      visibility: "course-enrolled",
      lastActive: "Today",
      unreadMessages: 5,
      upcomingEvents: 1,
    },
    {
      id: "2",
      name: "Research Methods in Psychology",
      description: "A group for PSYC 3100 students to discuss research methodologies and collaborate on projects.",
      course: "PSYC 3100",
      subject: "Psychology",
      members: 22,
      role: "admin",
      visibility: "public",
      lastActive: "Yesterday",
      unreadMessages: 0,
      upcomingEvents: 2,
    },
    {
      id: "3",
      name: "Quantum Physics Study Group",
      description: "Collaborative space for discussing quantum mechanics concepts and problem-solving.",
      course: "PHYS 4200",
      subject: "Physics",
      members: 15,
      role: "co-admin",
      visibility: "private",
      lastActive: "2 days ago",
      unreadMessages: 12,
      upcomingEvents: 0,
    },
  ]

  const allGroups = [
    ...myGroups,
    {
      id: "4",
      name: "Organic Chemistry Lab Preparation",
      description: "Preparation and discussion for CHEM 3310 laboratory experiments.",
      course: "CHEM 3310",
      subject: "Chemistry",
      members: 32,
      role: null,
      visibility: "public",
      lastActive: "Today",
      unreadMessages: 0,
      upcomingEvents: 1,
    },
    {
      id: "5",
      name: "Macroeconomics Discussion",
      description: "Group for discussing current economic trends and their relation to macroeconomic theory.",
      course: "ECON 2020",
      subject: "Economics",
      members: 45,
      role: null,
      visibility: "public",
      lastActive: "3 days ago",
      unreadMessages: 0,
      upcomingEvents: 0,
    },
  ]

  // Filter groups based on search query
  const filteredMyGroups = myGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAllGroups = allGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public":
        return <Globe className="h-4 w-4 text-green-500" title="Public Group" />
      case "private":
        return <Lock className="h-4 w-4 text-amber-500" title="Private Group" />
      case "course-enrolled":
        return <BookOpen className="h-4 w-4 text-blue-500" title="Course Enrolled Only" />
      default:
        return <Globe className="h-4 w-4 text-green-500" title="Public Group" />
    }
  }

  return (
    <PageLayout role="faculty">
      <div className="flex-1 space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Study Groups</h2>
          <Link href="/faculty/study-groups/create">
            <Button className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
              <Plus className="h-4 w-4" />
              <span>Create Group</span>
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search groups..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setFilterVisible(!filterVisible)}>
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        {filterVisible && (
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="">All Subjects</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Economics">Economics</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Visibility</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="">All Types</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="course-enrolled">Course Enrolled Only</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Sort By</label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="recent">Recently Active</option>
                    <option value="members">Most Members</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="created">Date Created</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
            <TabsTrigger value="all-groups">All Groups</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="my-groups" className="space-y-4 mt-6">
            {filteredMyGroups.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No study groups found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? "No groups match your search criteria."
                    : "You haven't created or joined any study groups yet."}
                </p>
                <Link href="/faculty/study-groups/create">
                  <Button className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
                    <Plus className="h-4 w-4" />
                    <span>Create Your First Group</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMyGroups.map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{group.name}</h3>
                          {getVisibilityIcon(group.visibility)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Group Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              <span>Manage Members</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <span>Leave Group</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{group.course}</span>
                          <Badge variant="outline">{group.subject}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{group.members} members</span>
                          <span className="text-gray-300">•</span>
                          <Clock className="h-4 w-4" />
                          <span>Active {group.lastActive}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {group.role === "admin" ? "Admin" : "Co-Admin"}
                        </Badge>
                        {group.unreadMessages > 0 && (
                          <Badge className="bg-red-500">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {group.unreadMessages}
                          </Badge>
                        )}
                        {group.upcomingEvents > 0 && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            <Calendar className="h-3 w-3 mr-1" />
                            {group.upcomingEvents}
                          </Badge>
                        )}
                      </div>
                      <Link href={`/faculty/study-groups/${group.id}`}>
                        <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                          View Group
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all-groups" className="space-y-4 mt-6">
            {filteredAllGroups.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No study groups found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? "No groups match your search criteria."
                    : "There are no study groups available at the moment."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAllGroups.map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{group.name}</h3>
                          {getVisibilityIcon(group.visibility)}
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{group.course}</span>
                          <Badge variant="outline">{group.subject}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{group.members} members</span>
                          <span className="text-gray-300">•</span>
                          <Clock className="h-4 w-4" />
                          <span>Active {group.lastActive}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex items-center gap-2">
                        {group.role && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {group.role === "admin" ? "Admin" : "Co-Admin"}
                          </Badge>
                        )}
                        {group.unreadMessages > 0 && (
                          <Badge className="bg-red-500">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {group.unreadMessages}
                          </Badge>
                        )}
                        {group.upcomingEvents > 0 && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            <Calendar className="h-3 w-3 mr-1" />
                            {group.upcomingEvents}
                          </Badge>
                        )}
                      </div>
                      <Link href={group.role ? `/faculty/study-groups/${group.id}` : "#"}>
                        <Button
                          size="sm"
                          className={group.role ? "bg-[#0033A0] hover:bg-[#002180]" : "bg-green-600 hover:bg-green-700"}
                        >
                          {group.role ? "View Group" : "Join Group"}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="invitations" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Invitations</CardTitle>
                <CardDescription>You have been invited to join these study groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Johnson" />
                          <AvatarFallback>DJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Molecular Biology Research Group</h4>
                          <p className="text-sm text-gray-500">Invited by Dr. Johnson • BIO 4400 • 18 members</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Decline
                        </Button>
                        <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Martinez" />
                          <AvatarFallback>DM</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Advanced Statistical Methods</h4>
                          <p className="text-sm text-gray-500">Invited by Dr. Martinez • STAT 5100 • 12 members</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Decline
                        </Button>
                        <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
