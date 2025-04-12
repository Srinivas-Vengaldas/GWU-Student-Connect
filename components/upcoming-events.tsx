import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Career Fair",
      date: "May 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Student Center",
    },
    {
      id: 2,
      title: "Research Symposium",
      date: "May 20, 2024",
      time: "1:00 PM - 5:00 PM",
      location: "Science Building",
    },
    {
      id: 3,
      title: "Alumni Networking Event",
      date: "June 5, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "University Hall",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Stay informed about campus events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <Link key={event.id} href={`/student/events/${event.id}`} className="block">
              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-[#0033A0]">{event.title}</div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">{event.location}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/student/events" className="text-sm font-medium text-[#0033A0] hover:underline">
            View all events
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
