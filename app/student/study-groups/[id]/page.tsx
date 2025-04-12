"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { StudyGroupHeader } from "@/components/study-groups/study-group-header"
import { StudyGroupMembers } from "@/components/study-groups/study-group-members"
import { StudyGroupChat } from "@/components/study-groups/study-group-chat"
import { StudyGroupMeetings } from "@/components/study-groups/study-group-meetings"
import { StudyGroupResources } from "@/components/study-groups/study-group-resources"
import { StudyGroupCollaboration } from "@/components/study-groups/study-group-collaboration"
import { StudyGroupAnnouncements } from "@/components/study-groups/study-group-announcements"
import { StudyGroupPolls } from "@/components/study-groups/study-group-polls"
import { StudyGroupSettings } from "@/components/study-groups/study-group-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function StudyGroupPage() {
  const params = useParams()
  const groupId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the study group
  const studyGroup = {
    id: groupId,
    name: "Calculus II Study Group",
    description:
      "A group for students taking MATH 220 to collaborate on problem sets and prepare for exams. We meet weekly to work through challenging problems and discuss key concepts.",
    course: "MATH 220",
    subject: "Mathematics",
    members: 15,
    visibility: "public",
    creator: {
      id: "1",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    admins: [
      {
        id: "1",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    created: "March 15, 2024",
    lastActive: "2 hours ago",
    tags: ["Calculus", "Mathematics", "Problem Sets"],
    banner: "/placeholder.svg?height=200&width=800",
    isAdmin: true, // For demo purposes, assume the current user is an admin
    isMember: true, // For demo purposes, assume the current user is a member
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="student" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-2">
              <Link href="/student/study-groups">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Groups
                </Button>
              </Link>
            </div>

            <StudyGroupHeader group={studyGroup} />

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
                {studyGroup.isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <StudyGroupAnnouncements groupId={groupId} limit={3} showViewAll />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StudyGroupMeetings groupId={groupId} limit={2} showViewAll />
                  <StudyGroupMembers groupId={groupId} limit={5} showViewAll />
                </div>
                <StudyGroupResources groupId={groupId} limit={3} showViewAll />
              </TabsContent>

              <TabsContent value="members">
                <StudyGroupMembers groupId={groupId} />
              </TabsContent>

              <TabsContent value="chat">
                <StudyGroupChat groupId={groupId} />
              </TabsContent>

              <TabsContent value="meetings">
                <StudyGroupMeetings groupId={groupId} />
              </TabsContent>

              <TabsContent value="resources">
                <StudyGroupResources groupId={groupId} />
              </TabsContent>

              <TabsContent value="collaboration">
                <StudyGroupCollaboration groupId={groupId} />
              </TabsContent>

              <TabsContent value="announcements">
                <StudyGroupAnnouncements groupId={groupId} />
              </TabsContent>

              <TabsContent value="polls">
                <StudyGroupPolls groupId={groupId} />
              </TabsContent>

              {studyGroup.isAdmin && (
                <TabsContent value="settings">
                  <StudyGroupSettings groupId={groupId} group={studyGroup} />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
