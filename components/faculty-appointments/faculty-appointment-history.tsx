"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Download, ExternalLink, FileText, MapPin, MessageSquare, Search, Video } from "lucide-react"
import { format, subDays } from "date-fns"
import Link from "next/link"
import { AppointmentDetailsDialog } from "./appointment-details-dialog"

export function FacultyAppointmentHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Mock data for past appointments
  const pastAppointments = [
    {
      id: "1",
      student: {
        id: "s1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
      },
      date: subDays(new Date(), 2),
      startTime: "10:00 AM",
      endTime: "10:30 AM",
      type: "Office Hours",
      status: "completed",
      location: "Science & Engineering Hall, Room 4000",
      notes: "Discussed final project requirements. Student is making good progress.",
      followUp: "None required",
      hasAttachments: false,
    },
    {
      id: "2",
      student: {
        id: "s2",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Data Science",
      },
      date: subDays(new Date(), 5),
      startTime: "2:00 PM",
      endTime: "2:30 PM",
      type: "Research Discussion",
      status: "completed",
      location: "Virtual (Zoom)",
      notes: "Reviewed research proposal. Suggested some improvements to methodology section.",
      followUp: "Student will submit revised proposal next week",
      hasAttachments: true,
      attachments: [
        { name: "Research_Proposal_Draft.pdf", size: "1.2 MB", type: "pdf" },
        { name: "Feedback_Notes.docx", size: "250 KB", type: "docx" },
      ],
    },
    {
      id: "3",
      student: {
        id: "s3",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
      },
      date: subDays(new Date(), 7),
      startTime: "11:00 AM",
      endTime: "11:30 AM",
      type: "Career Advising",
      status: "completed",
      location: "Science & Engineering Hall, Room 4000",
      notes: "Discussed internship opportunities and resume review. Suggested improvements to resume format.",
      followUp: "Student will send updated resume for review",
      hasAttachments: true,
      attachments: [{ name: "Resume_Michael_Chen.pdf", size: "380 KB", type: "pdf" }],
    },
    {
      id: "4",
      student: {
        id: "s4",
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Cybersecurity",
      },
      date: subDays(new Date(), 10),
      startTime: "3:00 PM",
      endTime: "4:00 PM",
      type: "Thesis Review",
      status: "completed",
      location: "Virtual (Zoom)",
      notes:
        "Comprehensive review of thesis draft. Identified several areas for improvement in the literature review and methodology sections.",
      followUp: "Student will revise and send updated draft in 2 weeks",
      hasAttachments: true,
      attachments: [
        { name: "Thesis_Draft_v1.pdf", size: "2.4 MB", type: "pdf" },
        { name: "Feedback_Summary.pdf", size: "450 KB", type: "pdf" },
      ],
    },
    {
      id: "5",
      student: {
        id: "s5",
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
      },
      date: subDays(new Date(), 14),
      startTime: "1:00 PM",
      endTime: "1:30 PM",
      type: "Office Hours",
      status: "cancelled",
      location: "Science & Engineering Hall, Room 4000",
      notes: "Student cancelled due to illness",
      followUp: "None required",
      hasAttachments: false,
    },
  ]

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment)
    setDetailsOpen(true)
  }

  const handleExportHistory = () => {
    console.log("Exporting appointment history")
    // In a real app, you would generate a CSV or PDF file
  }

  // Filter appointments based on search query
  const filteredAppointments = pastAppointments.filter((appointment) => {
    const searchString = searchQuery.toLowerCase()
    return (
      appointment.student.name.toLowerCase().includes(searchString) ||
      appointment.type.toLowerCase().includes(searchString) ||
      appointment.status.toLowerCase().includes(searchString)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointment History</h1>
          <p className="text-muted-foreground">View and manage your past appointments</p>
        </div>
        <Button variant="outline" onClick={handleExportHistory}>
          <FileText className="mr-2 h-4 w-4" />
          Export History
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search appointments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="office-hours">Office Hours</SelectItem>
              <SelectItem value="research">Research Discussion</SelectItem>
              <SelectItem value="career">Career Advising</SelectItem>
              <SelectItem value="thesis">Thesis Review</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Past Appointments</CardTitle>
          <CardDescription>Your appointment history with students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="rounded-md border p-4">
                  <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={appointment.student.avatar || "/placeholder.svg"}
                          alt={appointment.student.name}
                        />
                        <AvatarFallback>
                          {appointment.student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">{appointment.student.name}</h3>
                          <Badge
                            variant={appointment.status === "completed" ? "default" : "destructive"}
                            className="ml-2"
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.student.program}</p>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{format(appointment.date, "MMMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {appointment.startTime} - {appointment.endTime}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {appointment.location.includes("Virtual") ? (
                          <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                        ) : (
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{appointment.location}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/student/profile/${appointment.student.id}`}>
                          <ExternalLink className="mr-1 h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/faculty/messages?to=${appointment.student.id}`}>
                          <MessageSquare className="mr-1 h-4 w-4" />
                          Message
                        </Link>
                      </Button>
                      <Button
                        className="bg-[#0033A0] hover:bg-[#002180]"
                        size="sm"
                        onClick={() => handleViewDetails(appointment)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-4 rounded-md bg-muted p-3">
                      <h4 className="text-sm font-medium">Notes:</h4>
                      <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                      {appointment.followUp && (
                        <div className="mt-2">
                          <h4 className="text-sm font-medium">Follow-up:</h4>
                          <p className="text-sm text-muted-foreground">{appointment.followUp}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {appointment.hasAttachments && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium">Attachments:</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {appointment.attachments?.map((attachment, index) => (
                          <Button key={index} variant="outline" size="sm" className="h-8">
                            <Download className="mr-1 h-3 w-3" />
                            {attachment.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No appointments found matching your search criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedAppointment && (
        <AppointmentDetailsDialog appointment={selectedAppointment} open={detailsOpen} onOpenChange={setDetailsOpen} />
      )}
    </div>
  )
}
