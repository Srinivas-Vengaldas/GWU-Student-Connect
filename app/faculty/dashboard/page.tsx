import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function FacultyDashboard() {
  const courses = [
    {
      id: 1,
      code: "CS 101",
      name: "Introduction to Computer Science",
      students: 45,
      nextClass: "Monday, 10:00 AM",
    },
    {
      id: 2,
      code: "CS 250",
      name: "Data Structures",
      students: 32,
      nextClass: "Wednesday, 2:00 PM",
    },
    {
      id: 3,
      code: "CS 350",
      name: "Algorithms",
      students: 28,
      nextClass: "Thursday, 1:00 PM",
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "Final Exam Schedule",
      date: "Posted 2 days ago",
      content: "The final exam schedule has been published. Please check your email for details.",
    },
    {
      id: 2,
      title: "Research Grant Opportunity",
      date: "Posted 1 week ago",
      content: "New research grants are available for faculty members. Application deadline is June 15.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="faculty" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="faculty" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>My Courses</CardTitle>
                    <CardDescription>Manage your courses and student interactions</CardDescription>
                  </div>
                  <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Course
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-[#0033A0]">
                              {course.code}: {course.name}
                            </h3>
                            <p className="text-sm text-gray-500">{course.students} students enrolled</p>
                            <p className="text-sm text-gray-500">Next class: {course.nextClass}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Link href={`/faculty/courses/${course.id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                            <Link href={`/faculty/courses/${course.id}/materials`}>
                              <Button variant="outline" size="sm">
                                Materials
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Recent faculty announcements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div key={announcement.id} className="rounded-lg border p-3">
                        <h3 className="font-medium text-[#0033A0]">{announcement.title}</h3>
                        <p className="text-xs text-gray-500">{announcement.date}</p>
                        <p className="mt-2 text-sm">{announcement.content}</p>
                      </div>
                    ))}
                    <div className="mt-4 text-center">
                      <Link
                        href="/faculty/announcements"
                        className="text-sm font-medium text-[#0033A0] hover:underline"
                      >
                        View all announcements
                      </Link>
                    </div>
                  </div>
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
