import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function MyAppointmentsPage() {
  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: "1",
      faculty: {
        name: "Dr. Sarah Johnson",
        department: "Psychology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 15, 2024",
      time: "2:00 PM - 2:30 PM",
      location: "Science & Engineering Hall, Room 205",
      status: "confirmed",
      type: "Academic Advising",
    },
    {
      id: "2",
      faculty: {
        name: "Prof. Michael Chen",
        department: "Computer Science",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 22, 2024",
      time: "3:00 PM - 3:30 PM",
      location: "Virtual (Zoom)",
      status: "confirmed",
      type: "Research Discussion",
    },
  ]

  const pastAppointments = [
    {
      id: "3",
      faculty: {
        name: "Dr. Emily Parker",
        department: "Biology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "April 10, 2024",
      time: "1:00 PM - 1:30 PM",
      location: "Science & Engineering Hall, Room 300",
      status: "completed",
      type: "Academic Advising",
      feedback: "Great discussion about course selection for next semester.",
    },
    {
      id: "4",
      faculty: {
        name: "Prof. David Wilson",
        department: "Economics",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "March 28, 2024",
      time: "11:00 AM - 11:30 AM",
      location: "Virtual (Zoom)",
      status: "completed",
      type: "Career Guidance",
      feedback: "Provided valuable insights on internship opportunities.",
    },
  ]

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
                <p className="text-muted-foreground">View and manage your scheduled appointments</p>
              </div>
              <Link href="/student/appointments">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Appointments
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
                <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={appointment.faculty.avatar || "/placeholder.svg"}
                                  alt={appointment.faculty.name}
                                />
                                <AvatarFallback>
                                  {appointment.faculty.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{appointment.faculty.name}</h3>
                                <p className="text-sm text-gray-500">{appointment.faculty.department}</p>
                                <Badge className="mt-1">{appointment.type}</Badge>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-[#0033A0]" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-[#0033A0]" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-[#0033A0]" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Badge
                                variant="outline"
                                className={
                                  appointment.status === "confirmed"
                                    ? "bg-green-50 text-green-700 flex items-center gap-1"
                                    : "bg-yellow-50 text-yellow-700 flex items-center gap-1"
                                }
                              >
                                {appointment.status === "confirmed" ? (
                                  <CheckCircle className="h-3 w-3" />
                                ) : (
                                  <Clock className="h-3 w-3" />
                                )}
                                <span className="capitalize">{appointment.status}</span>
                              </Badge>
                              <div className="flex gap-2 mt-2">
                                <Button variant="outline" size="sm" className="w-full">
                                  Reschedule
                                </Button>
                                <Button variant="destructive" size="sm" className="w-full">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-500">You have no upcoming appointments.</p>
                      <Link href="/student/appointments">
                        <Button className="mt-4 bg-[#0033A0] hover:bg-[#002180]">Schedule an Appointment</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="past">
                {pastAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={appointment.faculty.avatar || "/placeholder.svg"}
                                  alt={appointment.faculty.name}
                                />
                                <AvatarFallback>
                                  {appointment.faculty.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{appointment.faculty.name}</h3>
                                <p className="text-sm text-gray-500">{appointment.faculty.department}</p>
                                <Badge className="mt-1">{appointment.type}</Badge>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-[#0033A0]" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-[#0033A0]" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-[#0033A0]" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 max-w-xs">
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                <span>Completed</span>
                              </Badge>
                              {appointment.feedback && (
                                <div className="mt-2">
                                  <p className="text-xs font-medium text-gray-500">Feedback:</p>
                                  <p className="text-sm">{appointment.feedback}</p>
                                </div>
                              )}
                              <Button variant="outline" size="sm" className="mt-2">
                                Schedule Follow-up
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-500">You have no past appointments.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
