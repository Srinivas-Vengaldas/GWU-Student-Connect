"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Video } from "lucide-react"
import { AppointmentBookingDialog } from "./appointment-booking-dialog"

// Mock data for available faculty and alumni on selected date
const mockAppointments = {
  "2023-05-15": [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Faculty",
      department: "Computer Science",
      expertise: ["Artificial Intelligence", "Machine Learning"],
      avatar: "/placeholder.svg",
      availableTimes: ["Monday 2-4 PM", "Wednesday 1-3 PM"],
      location: "Science & Engineering Hall, Room 4000",
      virtualOption: true,
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      role: "Faculty",
      department: "Business School",
      expertise: ["Finance", "Investment Banking"],
      avatar: "/placeholder.svg",
      availableTimes: ["Monday 10 AM-12 PM", "Thursday 3-5 PM"],
      location: "Duquès Hall, Room 651",
      virtualOption: true,
    },
  ],
  "2023-05-16": [
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      role: "Faculty",
      department: "Psychology",
      expertise: ["Clinical Psychology", "Mental Health"],
      avatar: "/placeholder.svg",
      availableTimes: ["Tuesday 10 AM-12 PM", "Friday 1-3 PM"],
      location: "Phillips Hall, Room 412",
      virtualOption: true,
    },
  ],
  "2023-05-17": [
    {
      id: "4",
      name: "James Wilson",
      role: "Alumni",
      department: "School of Engineering",
      expertise: ["Software Development", "Tech Interviews"],
      avatar: "/placeholder.svg",
      availableTimes: ["Wednesday 6-8 PM", "Saturday 10 AM-12 PM"],
      virtualOption: true,
    },
  ],
  "2023-05-18": [
    {
      id: "5",
      name: "Sophia Lee",
      role: "Alumni",
      department: "Elliott School of International Affairs",
      expertise: ["International Relations", "Diplomacy"],
      avatar: "/placeholder.svg",
      availableTimes: ["Thursday 7-9 PM", "Sunday 2-4 PM"],
      virtualOption: true,
    },
  ],
}

export function AppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
  }

  const handleBookAppointment = (person: any) => {
    setSelectedPerson(person)
    setBookingDialogOpen(true)
  }

  // Get available people for the selected date
  const getAvailablePeople = () => {
    if (!date) return []

    const dateString = date.toISOString().split("T")[0]
    return mockAppointments[dateString as keyof typeof mockAppointments] || []
  }

  const availablePeople = getAvailablePeople()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Select a Date</CardTitle>
          <CardDescription>Choose a date to see available faculty and alumni</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} className="rounded-md border" />
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {availablePeople.length > 0
            ? `Available on ${date?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}`
            : `No availability on ${date?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}`}
        </h3>

        {availablePeople.length > 0 ? (
          availablePeople.map((person) => (
            <Card key={person.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{person.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge variant={person.role === "Faculty" ? "default" : "secondary"} className="mr-2">
                          {person.role}
                        </Badge>
                        {person.department}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[#0033A0] hover:bg-[#002180]"
                    onClick={() => handleBookAppointment(person)}
                  >
                    Book
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 text-xs text-muted-foreground sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>Available: {person.availableTimes.join(", ")}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span>{person.location || "Virtual only"}</span>
                  </div>
                  {person.virtualOption && (
                    <div className="flex items-center">
                      <Video className="mr-1 h-3 w-3" />
                      <span>Virtual option available</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No faculty or alumni available on this date.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try selecting a different date.</p>
          </Card>
        )}
      </div>

      <AppointmentBookingDialog person={selectedPerson} open={bookingDialogOpen} onOpenChange={setBookingDialogOpen} />
    </div>
  )
}
