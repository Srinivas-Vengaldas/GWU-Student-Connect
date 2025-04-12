import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { ProfileHeader } from "@/components/profile/profile-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookMarked, Users, FileText, Calendar } from "lucide-react"

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch user data based on the ID
  // For demo purposes, we'll use mock data
  const student = {
    id: params.id,
    name: "Sarah Williams",
    email: "sarah.williams@gwconnect.edu",
    gwid: "G87654321",
    school: "School of Engineering & Applied Science",
    program: "Computer Science",
    year: "Class of 2024",
    interests: ["Artificial Intelligence", "Web Development", "Data Structures", "Algorithms"],
    status: "Looking for study partners for the upcoming algorithms exam!",
    avatar: "/placeholder.svg?height=128&width=128",
    isCurrentUser: false,
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
          <div className="flex-1 space-y-6">
            <ProfileHeader student={student} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center">
                    <BookMarked className="mr-2 h-5 w-5 text-[#0033A0]" />
                    Study Materials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">This student's study materials will appear here.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="mr-2 h-5 w-5 text-[#0033A0]" />
                    Study Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">This student's study groups will appear here.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-[#0033A0]" />
                    Blogs & Polls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">This student's blogs and polls will appear here.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-[#0033A0]" />
                    Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">This student's events will appear here.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
