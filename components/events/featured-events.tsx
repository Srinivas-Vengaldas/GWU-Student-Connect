import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export function FeaturedEvents() {
  const featuredEvents = [
    {
      id: "1",
      title: "Career Fair: Tech & Engineering",
      date: "May 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Marvin Center Grand Ballroom",
      image: "/placeholder.svg?height=400&width=800",
      category: "Career",
      attendees: 245,
    },
    {
      id: "2",
      title: "Research Symposium: Undergraduate Projects",
      date: "May 20, 2024",
      time: "1:00 PM - 5:00 PM",
      location: "Science & Engineering Hall",
      image: "/placeholder.svg?height=400&width=800",
      category: "Academic",
      attendees: 120,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Featured Events</h2>
        <Link href="/student/events?filter=featured" className="text-sm font-medium text-[#0033A0] hover:underline">
          View all featured
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <Badge className="absolute top-3 right-3 bg-[#0033A0]">{event.category}</Badge>
            </div>
            <CardContent className="p-4">
              <Link href={`/student/events/${event.id}`}>
                <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors">{event.title}</h3>
              </Link>

              <div className="mt-3 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4 text-[#0033A0]" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4 text-[#0033A0]" />
                  <span>{event.time}</span>
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

              <div className="mt-4 flex items-center justify-between">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/student/events/${event.id}`}>View Details</Link>
                </Button>
                <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
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
