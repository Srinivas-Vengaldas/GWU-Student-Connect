import { DashboardHeader } from "@/components/dashboard-header"
import { MainNav } from "@/components/main-nav"
import { ProfileHeader } from "@/components/profile/profile-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileStudyMaterials } from "@/components/profile/profile-study-materials"
import { ProfileStudyGroups } from "@/components/profile/profile-study-groups"
import { ProfileBlogs } from "@/components/profile/profile-blogs"
import { ProfileEvents } from "@/components/profile/profile-events"
import { ProfileAchievements } from "@/components/profile/profile-achievements"
import { ProfileActivityFeed } from "@/components/profile/profile-activity-feed"
import { ProfilePersonalPosts } from "@/components/profile/profile-personal-posts"
import { ProfileAppointments } from "@/components/profile/profile-appointments"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <ProfileHeader
            name="John Doe"
            role="Student"
            department="Computer Science"
            year="Junior"
            bio="Passionate about technology and innovation. Looking to connect with peers and mentors in the field of AI and machine learning."
            interests={["Artificial Intelligence", "Web Development", "Data Science"]}
            avatar="/placeholder.svg?height=128&width=128"
            coverImage="/placeholder.svg?height=300&width=1200"
          />

          <Tabs defaultValue="activity" className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="materials">Study Materials</TabsTrigger>
              <TabsTrigger value="groups">Study Groups</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <ProfileActivityFeed />
            </TabsContent>
            <TabsContent value="posts">
              <ProfilePersonalPosts />
            </TabsContent>
            <TabsContent value="materials">
              <ProfileStudyMaterials />
            </TabsContent>
            <TabsContent value="groups">
              <ProfileStudyGroups />
            </TabsContent>
            <TabsContent value="blogs">
              <ProfileBlogs />
            </TabsContent>
            <TabsContent value="events">
              <ProfileEvents />
            </TabsContent>
            <TabsContent value="appointments">
              <ProfileAppointments />
            </TabsContent>
            <TabsContent value="achievements">
              <ProfileAchievements />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
