"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { FacultyStudyGroupHeader } from "@/components/faculty-study-groups/faculty-study-group-header"
import { FacultyStudyGroupMembers } from "@/components/faculty-study-groups/faculty-study-group-members"
import { FacultyStudyGroupChat } from "@/components/faculty-study-groups/faculty-study-group-chat"
import { FacultyStudyGroupMeetings } from "@/components/faculty-study-groups/faculty-study-group-meetings"
import { FacultyStudyGroupResources } from "@/components/faculty-study-groups/faculty-study-group-resources"
import { FacultyStudyGroupCollaboration } from "@/components/faculty-study-groups/faculty-study-group-collaboration"
import { FacultyStudyGroupAnnouncements } from "@/components/faculty-study-groups/faculty-study-group-announcements"
import { FacultyStudyGroupPolls } from "@/components/faculty-study-groups/faculty-study-group-polls"
import { FacultyStudyGroupSettings } from "@/components/faculty-study-groups/faculty-study-group-settings"
import { FacultyStudyGroupAnalytics } from "@/components/faculty-study-groups/faculty-study-group-analytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function FacultyStudyGroupPage() {
  const params = useParams()
  const groupId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the study group
  const studyGroup = {
    id: groupId,
    name: "Advanced Computer Science Concepts",
    description:
      "Discussion group for CS 4500 students focusing on advanced algorithms and data structures. We'll cover topics from the course in more depth and work through challenging problems together.",
    course: "CS 4500",
    subject: "Computer Science",
    members: 28,
    visibility: "course-enrolled",
    creator: {
      id: "1",
      name: "Dr. Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    admins: [
      {
        id: "1",
        name: "Dr. Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        name: "Michael Chen (TA)",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    created: "September 15, 2024",
    lastActive: "2 hours ago",
    tags: ["Algorithms", "Data Structures", "Programming"],
    banner: "/placeholder.svg?height=200&width=800",
    isAdmin: true, // For demo purposes, assume the current user is an admin
    isMember: true, // For demo purposes, assume the current user is a member
  }

  return (
    <PageLayout role="faculty">
      <div className="flex-1 space-y-4 pt-6">
        <div className="flex items-center space-x-2">
          <Link href="/faculty/study-groups">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Groups
            </Button>
          </Link>
        </div>

        <FacultyStudyGroupHeader group={studyGroup} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="polls">Polls</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            {studyGroup.isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <FacultyStudyGroupAnnouncements groupId={groupId} limit={3} showViewAll />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FacultyStudyGroupMeetings groupId={groupId} limit={2} showViewAll />
              <FacultyStudyGroupMembers groupId={groupId} limit={5} showViewAll />
            </div>
            <FacultyStudyGroupResources groupId={groupId} limit={3} showViewAll />
          </TabsContent>

          <TabsContent value="members">
            <FacultyStudyGroupMembers groupId={groupId} />
          </TabsContent>

          <TabsContent value="chat">
            <FacultyStudyGroupChat groupId={groupId} />
          </TabsContent>

          <TabsContent value="meetings">
            <FacultyStudyGroupMeetings groupId={groupId} />
          </TabsContent>

          <TabsContent value="resources">
            <FacultyStudyGroupResources groupId={groupId} />
          </TabsContent>

          <TabsContent value="collaboration">
            <FacultyStudyGroupCollaboration groupId={groupId} />
          </TabsContent>

          <TabsContent value="announcements">
            <FacultyStudyGroupAnnouncements groupId={groupId} />
          </TabsContent>

          <TabsContent value="polls">
            <FacultyStudyGroupPolls groupId={groupId} />
          </TabsContent>

          <TabsContent value="analytics">
            <FacultyStudyGroupAnalytics groupId={groupId} />
          </TabsContent>

          {studyGroup.isAdmin && (
            <TabsContent value="settings">
              <FacultyStudyGroupSettings groupId={groupId} group={studyGroup} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </PageLayout>
  )
}
