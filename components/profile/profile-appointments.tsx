import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, Calendar, Clock, MapPin, CheckCircle } from "lucide-react"

interface ProfileAppointmentsProps {
  student: any
  limit?: number
}

export function ProfileAppointments({ student, limit }: ProfileAppointmentsProps) {
  // This would be fetched from an API in a real app
  const appointments = [
    {
      id: "1",
      faculty: {
        name: "Dr. Sarah Johnson",
        department: "Psychology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 15, 2024",
      time: "2:00 PM - 2:30 PM",
      location: "Science & Engineering Hall, Room 205",
      status: "confirmed",
      type: "Academic Advising",
    },
    {
      id: "2",
      faculty: {
        name: "Prof. Michael Chen",
        department: "Computer Science",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "May 22, 2024",
      time: "3:00 PM - 3:30 PM",
      location: "Virtual (Zoom)",
      status: "confirmed",
      type: "Research Discussion",
    },
    {
      id: "3",
      faculty: {
        name: "Dr. Emily Parker",
        department: "Biology",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "June 5, 2024",
      time: "1:00 PM - 1:30 PM",
      location: "Science & Engineering Hall, Room 300",
      status: "pending",
      type: "Academic Advising",
    },
    {
      id: "4",
      faculty: {
        name: "Prof. David Wilson",
        department: "Economics",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "June 10, 2024",
      time: "11:00 AM - 11:30 AM",
      location: "Virtual (Zoom)",
      status: "pending",
      type: "Career Guidance",
    },
  ]

  const displayAppointments = limit ? appointments.slice(0, limit) : appointments

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-[#0033A0]" />
          Appointments
          <Badge className="ml-2">{appointments.length}</Badge>
        </CardTitle>
        {limit && appointments.length > limit && (
          <Link href="/student/appointments/my-appointments">
            <Button variant="ghost" className="h-8 w-8 p-0" title="View all appointments">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        {displayAppointments.length > 0 ? (
          <div className="space-y-4">
            {displayAppointments.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage
                        src={appointment.faculty.avatar || "/placeholder.svg"}
                        alt={appointment.faculty.name}
                      />
                      <AvatarFallback>
                        {appointment.faculty.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-[#0033A0]">{appointment.faculty.name}</h3>
                          <p className="text-xs text-gray-500">{appointment.faculty.department}</p>
                          <Badge className="mt-1">{appointment.type}</Badge>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            appointment.status === "confirmed"
                              ? "bg-green-50 text-green-700 flex items-center gap-1"
                              : "bg-yellow-50 text-yellow-700 flex items-center gap-1"
                          }
                        >
                          {appointment.status === "confirmed" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          <span className="capitalize">{appointment.status}</span>
                        </Badge>
                      </div>

                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="mr-1 h-3 w-3 text-[#0033A0]" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="mr-1 h-3 w-3 text-[#0033A0]" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3 text-[#0033A0]" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {limit && appointments.length > limit && (
              <div className="pt-2 text-center">
                <Link href="/student/appointments/my-appointments">
                  <Button variant="outline" size="sm">
                    View All ({appointments.length}) Appointments
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <Calendar className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No appointments scheduled</p>
            <Link href="/student/appointments">
              <Button variant="outline" size="sm" className="mt-4">
                Schedule an Appointment
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
