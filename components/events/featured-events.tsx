"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users } from "lucide-react"
import { useEvents } from "@/contexts/events-context"

export function FeaturedEvents() {
  const { events, rsvpToEvent } = useEvents()

  // Get featured events
  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 2)

  const handleRSVP = (eventId: string) => {
    rsvpToEvent(eventId, "going")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Featured Events</h2>
        <Button asChild variant="outline" size="sm">
          <Link href="/student/events">View All Events</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={event.image || "/placeholder.svg?height=400&width=800"}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-[#0033A0]">{event.category}</Badge>
            </div>
            <CardContent className="p-6">
              <Link href={`/student/events/${event.id}`}>
                <h3 className="text-xl font-semibold mb-2 hover:text-[#0033A0] transition-colors">{event.title}</h3>
              </Link>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4 text-[#0033A0]" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-2 h-4 w-4 text-[#0033A0]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4 text-[#0033A0]" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/student/events/${event.id}`}>View Details</Link>
                </Button>
                <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]" onClick={() => handleRSVP(event.id)}>
                  RSVP
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
