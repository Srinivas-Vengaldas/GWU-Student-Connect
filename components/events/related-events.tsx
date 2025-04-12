import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

interface RelatedEventsProps {
  category: string
  currentEventId: string
}

export function RelatedEvents({ category, currentEventId }: RelatedEventsProps) {
  // Sample related events data
  const relatedEvents = [
    {
      id: "3",
      title: "Alumni Networking Event",
      date: "June 5, 2024",
      time: "6:00 PM - 8:00 PM",
      category: "Networking",
    },
    {
      id: "4",
      title: "Workshop: Resume Building & Interview Skills",
      date: "May 18, 2024",
      time: "2:00 PM - 4:00 PM",
      category: "Career",
    },
  ].filter((event) => event.id !== currentEventId)

  if (relatedEvents.length === 0) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Similar Events</h3>

        <div className="space-y-4">
          {relatedEvents.map((event) => (
            <div key={event.id} className="border rounded-md p-3 hover:bg-gray-50">
              <Link href={`/student/events/${event.id}`}>
                <h4 className="font-medium hover:text-[#0033A0] transition-colors">{event.title}</h4>
              </Link>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4 text-[#0033A0]" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4 text-[#0033A0]" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/student/events?category=${category}`}>View More {category} Events</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
