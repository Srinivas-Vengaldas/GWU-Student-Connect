"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { useEvents } from "@/contexts/events-context"
import { PageLayout } from "@/components/page-layout"
import { useEffect, useState } from "react"
import type { Event } from "@/contexts/events-context"

export default function MyEventsPage() {
  const { myEvents, events } = useEvents()
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [myCreatedEvents, setMyCreatedEvents] = useState<Event[]>([])

  // Update the filtered events whenever myEvents or events change
  useEffect(() => {
    // Filter events by status for upcoming events
    const upcoming = myEvents.filter((event) => event.status === "going" || event.status === "maybe")
    setUpcomingEvents(upcoming)

    // In a real app, you'd filter based on date for past events
    setPastEvents([])

    // Filter events for created events
    const created = events.filter((event) => event.status === "active")
    setMyCreatedEvents(created)
  }, [myEvents, events])

  return (
    <PageLayout role="student">
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

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Events</h1>
            <p className="text-muted-foreground">Manage your events and RSVPs</p>
          </div>
          <Button asChild className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
            <Link href="/student/events/create">
              <Plus className="h-4 w-4" />
              <span>Create Event</span>
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastEvents.length})</TabsTrigger>
            <TabsTrigger value="created">My Created Events ({myCreatedEvents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} showStatus showActions />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No upcoming events"
                description="You haven't RSVP'd to any upcoming events yet."
                action={{
                  label: "Browse Events",
                  href: "/student/events",
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastEvents.length > 0 ? (
              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} showStatus showFeedback />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No past events"
                description="You haven't attended any events yet."
                action={{
                  label: "Browse Events",
                  href: "/student/events",
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="created" className="mt-6">
            {myCreatedEvents.length > 0 ? (
              <div className="space-y-4">
                {myCreatedEvents.map((event) => (
                  <EventCard key={event.id} event={event} showAttendees showManage />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No created events"
                description="You haven't created any events yet."
                action={{
                  label: "Create Event",
                  href: "/student/events/create",
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}

// Event Card Component
function EventCard({
  event,
  showStatus = false,
  showActions = false,
  showFeedback = false,
  showAttendees = false,
  showManage = false,
}: {
  event: Event
  showStatus?: boolean
  showActions?: boolean
  showFeedback?: boolean
  showAttendees?: boolean
  showManage?: boolean
}) {
  const getStatusBadge = () => {
    switch (event.status) {
      case "going":
        return <Badge className="bg-green-500">Going</Badge>
      case "maybe":
        return <Badge className="bg-yellow-500">Maybe</Badge>
      case "not-going":
        return <Badge className="bg-red-500">Not Going</Badge>
      case "attended":
        return <Badge className="bg-gray-500">Attended</Badge>
      case "active":
        return <Badge className="bg-[#0033A0]">Active</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 bg-gray-100 p-4 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r">
            <div className="text-2xl font-bold text-[#0033A0]">
              {event.date.split(", ")[0]?.split(" ")[1] || event.date}
            </div>
            <div className="text-lg font-medium">{event.date.split(", ")[0]?.split(" ")[0] || ""}</div>
            <div className="text-sm text-gray-500">{event.date.split(", ")[1] || ""}</div>
          </div>

          <div className="p-4 md:w-3/4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Link href={`/student/events/${event.id}`}>
                    <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors">{event.title}</h3>
                  </Link>
                  {showStatus && getStatusBadge()}
                </div>
                <Badge className="mt-1 bg-[#0033A0]">{event.category}</Badge>
              </div>

              <div className="flex items-center gap-2 mt-2 md:mt-0">
                {showActions && (
                  <>
                    <Button variant="outline" size="sm">
                      Change RSVP
                    </Button>
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                  </>
                )}

                {showFeedback && (
                  <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                    Leave Feedback
                  </Button>
                )}

                {showManage && (
                  <Button asChild size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                    <Link href={`/student/events/manage/${event.id}`}>Manage Event</Link>
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-2 h-4 w-4 text-[#0033A0]" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="mr-2 h-4 w-4 text-[#0033A0]" />
                <span>{event.location}</span>
              </div>
              {showAttendees && (
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4 text-[#0033A0]" />
                  <span>{event.attendees} attending</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Empty State Component
function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action: { label: string; href: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Calendar className="h-12 w-12 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 mb-6 max-w-md">{description}</p>
      <Button asChild className="bg-[#0033A0] hover:bg-[#002180]">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    </div>
  )
}
