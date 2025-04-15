"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Download, ExternalLink, MapPin, Video } from "lucide-react"
import Link from "next/link"

export function FacultyAppointmentRequests() {
  const [autoAccept, setAutoAccept] = useState(false)

  // Mock data for appointment requests
  const pendingRequests = [
    {
      id: "1",
      student: {
        id: "s1",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
        year: "Junior",
      },
      requestedDate: "Tomorrow",
      requestedTime: "11:00 AM - 11:30 AM",
      type: "Career Advising",
      purpose: "Seeking advice on internship opportunities and resume review",
      preferredLocation: "In-person",
      hasAttachments: true,
      attachments: [{ name: "Resume_Michael_Chen.pdf", size: "420 KB", type: "pdf" }],
      requestedOn: "Today, 9:15 AM",
    },
    {
      id: "2",
      student: {
        id: "s2",
        name: "Jessica Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Data Science",
        year: "Senior",
      },
      requestedDate: "May 20, 2024",
      requestedTime: "2:00 PM - 3:00 PM",
      type: "Research Discussion",
      purpose: "Would like to discuss potential research opportunities for graduate school",
      preferredLocation: "Virtual",
      hasAttachments: false,
      requestedOn: "Yesterday, 3:45 PM",
    },
    {
      id: "3",
      student: {
        id: "s3",
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
        year: "Sophomore",
      },
      requestedDate: "May 22, 2024",
      requestedTime: "10:00 AM - 10:30 AM",
      type: "Office Hours",
      purpose: "Need help with the final project requirements and clarification on some concepts",
      preferredLocation: "In-person",
      hasAttachments: true,
      attachments: [
        { name: "Project_Outline.docx", size: "250 KB", type: "docx" },
        { name: "Questions.pdf", size: "180 KB", type: "pdf" },
      ],
      requestedOn: "May 15, 2024, 11:20 AM",
    },
    {
      id: "4",
      student: {
        id: "s4",
        name: "Sophia Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Cybersecurity",
        year: "Senior",
      },
      requestedDate: "May 25, 2024",
      requestedTime: "1:00 PM - 1:30 PM",
      type: "Recommendation Letter",
      purpose: "Would like to discuss a recommendation letter for graduate school applications",
      preferredLocation: "Virtual",
      hasAttachments: true,
      attachments: [
        { name: "CV_Sophia_Martinez.pdf", size: "380 KB", type: "pdf" },
        { name: "Statement_of_Purpose.pdf", size: "420 KB", type: "pdf" },
        { name: "Program_Details.pdf", size: "210 KB", type: "pdf" },
      ],
      requestedOn: "May 14, 2024, 2:30 PM",
    },
    {
      id: "5",
      student: {
        id: "s5",
        name: "James Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
        year: "Junior",
      },
      requestedDate: "May 18, 2024",
      requestedTime: "3:30 PM - 4:00 PM",
      type: "Project Feedback",
      purpose: "Would like feedback on my research project progress",
      preferredLocation: "In-person",
      hasAttachments: true,
      attachments: [{ name: "Project_Draft.pdf", size: "1.2 MB", type: "pdf" }],
      requestedOn: "May 13, 2024, 10:45 AM",
    },
  ]

  const handleAccept = (requestId: string) => {
    console.log(`Accepted request ${requestId}`)
    // In a real app, you would update the request status in the database
  }

  const handleReschedule = (requestId: string) => {
    console.log(`Reschedule request ${requestId}`)
    // In a real app, you would open a reschedule dialog
  }

  const handleDecline = (requestId: string) => {
    console.log(`Declined request ${requestId}`)
    // In a real app, you would update the request status in the database
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointment Requests</h1>
          <p className="text-muted-foreground">Review and manage incoming appointment requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="auto-accept-toggle" className="font-medium">
            Auto-Accept Requests
          </Label>
          <Switch id="auto-accept-toggle" checked={autoAccept} onCheckedChange={setAutoAccept} />
        </div>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="declined">Declined</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={request.student.avatar || "/placeholder.svg"} alt={request.student.name} />
                          <AvatarFallback>
                            {request.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{request.student.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {request.student.program}, {request.student.year}
                          </p>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline">{request.type}</Badge>
                            <span className="text-xs text-muted-foreground ml-2">Requested: {request.requestedOn}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/student/profile/${request.student.id}`}
                        className="text-sm text-blue-600 hover:underline flex items-center"
                      >
                        View Profile
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Requested Date:</span>
                          <span className="ml-2">{request.requestedDate}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Requested Time:</span>
                          <span className="ml-2">{request.requestedTime}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          {request.preferredLocation === "Virtual" ? (
                            <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                          ) : (
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-medium">Preferred Location:</span>
                          <span className="ml-2">{request.preferredLocation}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">Purpose:</h4>
                        <p className="text-sm text-muted-foreground">{request.purpose}</p>

                        {request.hasAttachments && (
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-1">Attachments:</h4>
                            <div className="space-y-1">
                              {request.attachments?.map((attachment, index) => (
                                <div key={index} className="flex items-center text-sm">
                                  <Button variant="ghost" size="sm" className="h-6 px-2">
                                    <Download className="mr-1 h-3 w-3" />
                                    {attachment.name} ({attachment.size})
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => handleDecline(request.id)}>
                        Decline
                      </Button>
                      <Button variant="outline" onClick={() => handleReschedule(request.id)}>
                        Reschedule
                      </Button>
                      <Button className="bg-[#0033A0] hover:bg-[#002180]" onClick={() => handleAccept(request.id)}>
                        Accept
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Accepted Requests</CardTitle>
              <CardDescription>Appointment requests you've accepted</CardDescription>
            </CardHeader>
            <CardContent className="py-4 text-center text-muted-foreground">
              <p>No accepted requests to display</p>
              <p className="text-sm">Accepted requests will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="declined" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Declined Requests</CardTitle>
              <CardDescription>Appointment requests you've declined</CardDescription>
            </CardHeader>
            <CardContent className="py-4 text-center text-muted-foreground">
              <p>No declined requests to display</p>
              <p className="text-sm">Declined requests will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
