import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Calendar, Clock, MapPin, Users } from "lucide-react"

interface ProfileEventsProps {
  student: any
  limit?: number
}

export function ProfileEvents({ student, limit }: ProfileEventsProps) {
  // This would be fetched from an API in a real app
  const events = [
    {
      id: "1",
      title: "Psychology Department Research Symposium",
      date: "May 15, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Science & Engineering Hall, Room 205",
      category: "Academic",
      attendees: 65,
      isOrganizer: true,
      status: "attending",
      upcoming: true,
    },
    {
      id: "2",
      title: "Career Panel: Careers in Clinical Psychology",
      date: "May 22, 2024",
      time: "3:00 PM - 5:00 PM",
      location: "Marvin Center",
      category: "Career",
      attendees: 48,
      isOrganizer: false,
      status: "attending",
      upcoming: true,
    },
    {
      id: "3",
      title: "Guest Lecture: Advances in Neuroscience Research",
      date: "June 5, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Phillips Hall, Room 102",
      category: "Academic",
      attendees: 35,
      isOrganizer: false,
      status: "interested",
      upcoming: true,
    },
    {
      id: "4",
      title: "Psychology Student Association Mixer",
      date: "April 12, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Student Center",
      category: "Social",
      attendees: 72,
      isOrganizer: true,
      status: "attended",
      upcoming: false,
    },
    {
      id: "5",
      title: "Workshop: Using R for Psychological Research",
      date: "March 28, 2024",
      time: "1:00 PM - 4:00 PM",
      location: "Gelman Library, Room 301",
      category: "Workshop",
      attendees: 42,
      isOrganizer: false,
      status: "attended",
      upcoming: false,
    },
  ]

  const upcomingEvents = events.filter((event) => event.upcoming)
  const pastEvents = events.filter((event) => !event.upcoming)

  const getDisplayEvents = (eventList: typeof events) => {
    return limit ? eventList.slice(0, limit) : eventList
  }

  const displayUpcomingEvents = getDisplayEvents(upcomingEvents)
  const displayPastEvents = getDisplayEvents(pastEvents)

  const renderEventList = (eventList: typeof events) => {
    return eventList.length > 0 ? (
      <div className="space-y-4">
        {eventList.map((event) => (
          <Link key={event.id} href={`/student/events/${event.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/5 bg-gray-100 p-4 flex flex-col justify-center items-center text-center border-b sm:border-b-0 sm:border-r">
                    <div className="text-xl font-bold text-[#0033A0]">{event.date.split(", ")[0].split(" ")[1]}</div>
                    <div className="text-sm font-medium">{event.date.split(", ")[0].split(" ")[0]}</div>
                    <div className="text-xs text-gray-500">
                      {event.date.includes(", ") ? event.date.split(", ")[1] : ""}
                    </div>
                  </div>

                  <div className="p-4 sm:w-4/5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[#0033A0]">{event.title}</h3>
                          {event.isOrganizer && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Organizer
                            </Badge>
                          )}
                        </div>
                        <Badge className="mt-1 bg-[#0033A0]">{event.category}</Badge>
                      </div>

                      <Badge
                        variant="outline"
                        className={
                          event.status === "attending"
                            ? "bg-green-50 text-green-700"
                            : event.status === "interested"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-50 text-gray-700"
                        }
                      >
                        {event.status === "attending"
                          ? "Attending"
                          : event.status === "interested"
                            ? "Interested"
                            : "Attended"}
                      </Badge>
                    </div>

                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3 text-[#0033A0]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="mr-1 h-3 w-3 text-[#0033A0]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="mr-1 h-3 w-3 text-[#0033A0]" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {limit && upcomingEvents.length + pastEvents.length > limit && (
          <div className="pt-2 text-center">
            <Link href={`/student/events?user=${student.id}`}>
              <Button variant="outline" size="sm">
                View All ({upcomingEvents.length + pastEvents.length}) Events
              </Button>
            </Link>
          </div>
        )}
      </div>
    ) : (
      <div className="py-6 text-center text-gray-500">
        <p>No events found</p>
      </div>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-[#0033A0]" />
          Events
          <Badge className="ml-2">{events.length}</Badge>
        </CardTitle>
        {limit && events.length > limit && (
          <Link href={`/student/events?user=${student.id}`}>
            <Button variant="ghost" className="h-8 w-8 p-0" title="View all events">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          limit ? (
            renderEventList(getDisplayEvents(events))
          ) : (
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
                <TabsTrigger value="past">Past ({pastEvents.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="pt-4">
                {renderEventList(displayUpcomingEvents)}
              </TabsContent>
              <TabsContent value="past" className="pt-4">
                {renderEventList(displayPastEvents)}
              </TabsContent>
            </Tabs>
          )
        ) : (
          <div className="py-12 text-center text-gray-500">
            <Calendar className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No events yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
