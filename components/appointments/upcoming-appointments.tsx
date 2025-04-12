import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Clock, MapPin, Video } from "lucide-react"

// Mock data for upcoming appointments
const upcomingAppointments = [
  {
    id: "1",
    person: {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Faculty",
      department: "Computer Science",
      avatar: "/placeholder.svg",
    },
    date: "May 15, 2023",
    time: "2:00 PM - 2:30 PM",
    format: "virtual",
    topic: "Research Project Feedback",
    status: "confirmed",
  },
  {
    id: "2",
    person: {
      id: "4",
      name: "James Wilson",
      role: "Alumni",
      department: "School of Engineering",
      avatar: "/placeholder.svg",
    },
    date: "May 18, 2023",
    time: "6:30 PM - 7:00 PM",
    format: "virtual",
    topic: "Career Advice in Tech",
    status: "pending",
  },
]

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled meetings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex flex-col space-y-2 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={appointment.person.avatar || "/placeholder.svg"} alt={appointment.person.name} />
                    <AvatarFallback>
                      {appointment.person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{appointment.person.name}</div>
                    <div className="text-xs text-muted-foreground">{appointment.person.department}</div>
                  </div>
                </div>
                <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                  {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <CalendarClock className="mr-1 h-3 w-3" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  {appointment.format === "virtual" ? (
                    <>
                      <Video className="mr-1 h-3 w-3" />
                      <span>Virtual Meeting</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>In-person</span>
                    </>
                  )}
                </div>
                <div className="font-medium">{appointment.topic}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CalendarClock className="h-8 w-8 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium">No upcoming appointments</h3>
            <p className="mt-1 text-xs text-muted-foreground">Book an appointment with faculty or alumni</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View All Appointments
        </Button>
      </CardFooter>
    </Card>
  )
}
