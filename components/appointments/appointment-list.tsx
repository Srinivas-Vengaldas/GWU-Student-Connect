"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MapPin, Video } from "lucide-react"
import { AppointmentBookingDialog } from "./appointment-booking-dialog"

// Mock data for faculty and alumni
const people = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    role: "Faculty",
    department: "Computer Science",
    expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
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
    expertise: ["Finance", "Investment Banking", "Corporate Strategy"],
    avatar: "/placeholder.svg",
    availableTimes: ["Tuesday 10 AM-12 PM", "Thursday 3-5 PM"],
    location: "Duquès Hall, Room 651",
    virtualOption: true,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    role: "Faculty",
    department: "Psychology",
    expertise: ["Clinical Psychology", "Cognitive Behavioral Therapy", "Mental Health"],
    avatar: "/placeholder.svg",
    availableTimes: ["Monday 10 AM-12 PM", "Friday 1-3 PM"],
    location: "Phillips Hall, Room 412",
    virtualOption: true,
  },
  {
    id: "4",
    name: "James Wilson",
    role: "Alumni",
    department: "School of Engineering",
    graduationYear: "2018",
    currentPosition: "Senior Software Engineer at Google",
    expertise: ["Software Development", "Tech Interviews", "Career Advice"],
    avatar: "/placeholder.svg",
    availableTimes: ["Tuesday 6-8 PM", "Saturday 10 AM-12 PM"],
    virtualOption: true,
  },
  {
    id: "5",
    name: "Sophia Lee",
    role: "Alumni",
    department: "Elliott School of International Affairs",
    graduationYear: "2015",
    currentPosition: "Foreign Service Officer, U.S. Department of State",
    expertise: ["International Relations", "Diplomacy", "Government Careers"],
    avatar: "/placeholder.svg",
    availableTimes: ["Wednesday 7-9 PM", "Sunday 2-4 PM"],
    virtualOption: true,
  },
]

export function AppointmentList() {
  const [selectedPerson, setSelectedPerson] = useState<(typeof people)[0] | null>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)

  const handleBookAppointment = (person: (typeof people)[0]) => {
    setSelectedPerson(person)
    setBookingDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {people.map((person) => (
        <Card key={person.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{person.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Badge variant={person.role === "Faculty" ? "default" : "secondary"} className="mr-2">
                      {person.role}
                    </Badge>
                    {person.department}
                    {person.role === "Alumni" && ` (${person.graduationYear})`}
                  </CardDescription>
                </div>
              </div>
              <Button className="bg-[#0033A0] hover:bg-[#002180]" onClick={() => handleBookAppointment(person)}>
                Book Appointment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {person.role === "Alumni" && (
                <div className="text-sm text-muted-foreground">
                  <strong>Current:</strong> {person.currentPosition}
                </div>
              )}
              <div>
                <div className="text-sm font-medium">Expertise:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {person.expertise.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
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
          </CardFooter>
        </Card>
      ))}

      <AppointmentBookingDialog person={selectedPerson} open={bookingDialogOpen} onOpenChange={setBookingDialogOpen} />
    </div>
  )
}
