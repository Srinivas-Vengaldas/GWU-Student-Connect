import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { EventRSVP } from "@/components/events/event-rsvp"
import { EventDiscussion } from "@/components/events/event-discussion"
import { EventOrganizer } from "@/components/events/event-organizer"
import { RelatedEvents } from "@/components/events/related-events"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, Download, ExternalLink, MapPin, Users } from "lucide-react"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // This would normally be fetched from an API based on the ID
  const event = {
    id: params.id,
    title: "Career Fair: Tech & Engineering",
    date: "May 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Marvin Center Grand Ballroom",
    locationUrl: "https://maps.google.com/?q=Marvin+Center+Grand+Ballroom+GWU",
    description:
      "Join us for the annual Tech & Engineering Career Fair! Connect with over 50 employers from various industries looking to hire GW students and alumni for internships and full-time positions. Bring multiple copies of your resume and dress professionally.",
    image: "/placeholder.svg?height=400&width=800",
    category: "Career",
    format: "In-Person",
    attendees: 245,
    organizer: {
      name: "GW Center for Career Services",
      image: "/placeholder.svg?height=100&width=100",
      department: "Student Affairs",
      email: "careers@gwu.edu",
    },
    isFeatured: true,
    isFree: true,
    requiresRSVP: true,
    resources: [
      {
        name: "Preparation Guide",
        url: "#",
        type: "pdf",
      },
      {
        name: "Participating Companies",
        url: "#",
        type: "pdf",
      },
    ],
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
            {/* Back Button */}
            <div>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link href="/student/events">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Events</span>
                </Link>
              </Button>
            </div>

            {/* Event Header */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <Badge className="mb-2 w-fit bg-[#0033A0]">{event.category}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{event.title}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Event Details */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-[#0033A0] mt-0.5" />
                        <div>
                          <h3 className="font-medium">Date</h3>
                          <p>{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#0033A0] mt-0.5" />
                        <div>
                          <h3 className="font-medium">Time</h3>
                          <p>{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#0033A0] mt-0.5" />
                        <div>
                          <h3 className="font-medium">Location</h3>
                          <p>{event.location}</p>
                          <Link
                            href={event.locationUrl}
                            target="_blank"
                            className="text-sm text-[#0033A0] hover:underline flex items-center gap-1 mt-1"
                          >
                            View on Map
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-[#0033A0] mt-0.5" />
                        <div>
                          <h3 className="font-medium">Attendees</h3>
                          <p>{event.attendees} people attending</p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                      <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                    </div>

                    {event.resources.length > 0 && (
                      <>
                        <Separator className="my-6" />

                        <div>
                          <h2 className="text-xl font-semibold mb-4">Event Resources</h2>
                          <div className="space-y-2">
                            {event.resources.map((resource, index) => (
                              <Button key={index} variant="outline" className="w-full justify-start gap-2" asChild>
                                <Link href={resource.url}>
                                  <Download className="h-4 w-4" />
                                  <span>{resource.name}</span>
                                  <Badge variant="outline" className="ml-auto">
                                    {resource.type.toUpperCase()}
                                  </Badge>
                                </Link>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Tabs for Discussion and More */}
                <Tabs defaultValue="discussion">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    <TabsTrigger value="attendees">Attendees</TabsTrigger>
                  </TabsList>

                  <TabsContent value="discussion" className="mt-4">
                    <EventDiscussion eventId={event.id} />
                  </TabsContent>

                  <TabsContent value="attendees" className="mt-4">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Attendees ({event.attendees})</h2>
                        <p className="text-gray-500">RSVP to this event to see who else is attending.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* RSVP Card */}
                <EventRSVP event={event} />

                {/* Organizer Card */}
                <EventOrganizer organizer={event.organizer} />

                {/* Related Events */}
                <RelatedEvents category={event.category} currentEventId={event.id} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
