import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Users } from "lucide-react"

export function EventsList() {
  const events = [
    {
      id: "1",
      title: "Career Fair: Tech & Engineering",
      date: "May 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Marvin Center Grand Ballroom",
      category: "Career",
      attendees: 245,
      isFeatured: true,
    },
    {
      id: "2",
      title: "Research Symposium: Undergraduate Projects",
      date: "May 20, 2024",
      time: "1:00 PM - 5:00 PM",
      location: "Science & Engineering Hall",
      category: "Academic",
      attendees: 120,
      isFeatured: true,
    },
    {
      id: "3",
      title: "Alumni Networking Event",
      date: "June 5, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "University Hall",
      category: "Networking",
      attendees: 85,
      isFeatured: false,
    },
    {
      id: "4",
      title: "Workshop: Resume Building & Interview Skills",
      date: "May 18, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual (Zoom)",
      category: "Career",
      attendees: 62,
      isFeatured: false,
    },
    {
      id: "5",
      title: "Student Organization Fair",
      date: "May 25, 2024",
      time: "11:00 AM - 3:00 PM",
      location: "Kogan Plaza",
      category: "Clubs",
      attendees: 180,
      isFeatured: false,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Showing {events.length} events</p>
        <Select defaultValue="upcoming">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 bg-gray-100 p-4 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r">
                  <div className="text-2xl font-bold text-[#0033A0]">{event.date.split(", ")[0].split(" ")[1]}</div>
                  <div className="text-lg font-medium">{event.date.split(", ")[0].split(" ")[0]}</div>
                  <div className="text-sm text-gray-500">{event.date.split(", ")[1]}</div>
                </div>

                <div className="p-4 md:w-3/4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Link href={`/student/events/${event.id}`}>
                          <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors">
                            {event.title}
                          </h3>
                        </Link>
                        {event.isFeatured && (
                          <Badge variant="outline" className="bg-[#E8D4A3]/20 text-[#0033A0]">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <Badge className="mt-1 bg-[#0033A0]">{event.category}</Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/student/events/${event.id}`}>Details</Link>
                      </Button>
                      <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                        RSVP
                      </Button>
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
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="mr-2 h-4 w-4 text-[#0033A0]" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="outline">Load More Events</Button>
      </div>
    </div>
  )
}
