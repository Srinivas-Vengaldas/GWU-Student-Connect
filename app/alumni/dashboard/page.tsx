import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AlumniDashboard() {
  const networkingEvents = [
    {
      id: 1,
      title: "Alumni Networking Mixer",
      date: "June 15, 2024",
      location: "University Hall",
      attendees: 45,
    },
    {
      id: 2,
      title: "Industry Panel Discussion",
      date: "July 10, 2024",
      location: "Business School Auditorium",
      attendees: 78,
    },
  ]

  const mentorshipOpportunities = [
    {
      id: 1,
      program: "Career Mentorship Program",
      description: "Guide current students in their career path and professional development.",
      commitment: "2 hours per month",
      openings: 5,
    },
    {
      id: 2,
      program: "Research Mentorship",
      description: "Mentor students on research projects in your field of expertise.",
      commitment: "4 hours per month",
      openings: 3,
    },
  ]

  const alumniSpotlights = [
    {
      id: 1,
      name: "Sarah Johnson",
      graduation: "Class of 2015",
      position: "Senior Software Engineer at Google",
      avatar: "/placeholder.svg?height=60&width=60",
      initials: "SJ",
      achievement: "Led the development of a major feature in Google Maps",
    },
    {
      id: 2,
      name: "Michael Chen",
      graduation: "Class of 2012",
      position: "Founder & CEO of TechStart",
      avatar: "/placeholder.svg?height=60&width=60",
      initials: "MC",
      achievement: "Raised $5M in Series A funding for his startup",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="alumni" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="alumni" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Alumni Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Networking Events</CardTitle>
                  <CardDescription>Upcoming alumni networking opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {networkingEvents.map((event) => (
                      <div key={event.id} className="rounded-lg border p-3">
                        <h3 className="font-medium text-[#0033A0]">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.date}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                        <p className="text-sm text-gray-500">{event.attendees} attending</p>
                        <div className="mt-2">
                          <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                            RSVP
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 text-center">
                      <Link href="/alumni/events" className="text-sm font-medium text-[#0033A0] hover:underline">
                        View all events
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Mentorship Opportunities</CardTitle>
                  <CardDescription>Ways to give back to the student community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mentorshipOpportunities.map((opportunity) => (
                      <div key={opportunity.id} className="rounded-lg border p-3">
                        <h3 className="font-medium text-[#0033A0]">{opportunity.program}</h3>
                        <p className="text-sm">{opportunity.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <Badge variant="outline" className="mr-2">
                              {opportunity.commitment}
                            </Badge>
                            <Badge variant="outline">{opportunity.openings} openings</Badge>
                          </div>
                          <Button size="sm" variant="outline">
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 text-center">
                      <Link href="/alumni/mentorship" className="text-sm font-medium text-[#0033A0] hover:underline">
                        View all opportunities
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Alumni Spotlights</CardTitle>
                  <CardDescription>Celebrating alumni achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alumniSpotlights.map((spotlight) => (
                      <div key={spotlight.id} className="flex items-start space-x-4 rounded-lg border p-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={spotlight.avatar} alt={spotlight.name} />
                          <AvatarFallback>{spotlight.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-[#0033A0]">{spotlight.name}</h3>
                          <p className="text-sm text-gray-500">{spotlight.graduation}</p>
                          <p className="text-sm text-gray-500">{spotlight.position}</p>
                          <p className="mt-1 text-sm">{spotlight.achievement}</p>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 text-center">
                      <Link href="/alumni/spotlights" className="text-sm font-medium text-[#0033A0] hover:underline">
                        View all spotlights
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
