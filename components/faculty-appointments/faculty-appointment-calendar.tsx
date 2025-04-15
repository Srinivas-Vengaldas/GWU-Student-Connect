"use client"

import { useState } from "react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Clock, MapPin, Video } from "lucide-react"
import { AppointmentDetailsDialog } from "./appointment-details-dialog"

export function FacultyAppointmentCalendar() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Mock appointments data
  const appointments = [
    {
      id: "1",
      student: {
        id: "s1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
      },
      date: new Date(),
      startTime: "10:00 AM",
      endTime: "10:30 AM",
      type: "Office Hours",
      status: "confirmed",
      location: "Science & Engineering Hall, Room 4000",
      notes: "Discussing final project requirements",
      color: "blue",
    },
    {
      id: "2",
      student: {
        id: "s2",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Data Science",
      },
      date: new Date(),
      startTime: "2:00 PM",
      endTime: "2:30 PM",
      type: "Research Discussion",
      status: "confirmed",
      location: "Virtual (Zoom)",
      notes: "Review research proposal draft",
      color: "blue",
    },
    {
      id: "3",
      student: {
        id: "s3",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
      },
      date: addDays(new Date(), 1),
      startTime: "11:00 AM",
      endTime: "11:30 AM",
      type: "Career Advising",
      status: "pending",
      location: "Science & Engineering Hall, Room 4000",
      notes: "Discussing internship opportunities",
      color: "yellow",
    },
    {
      id: "4",
      student: {
        id: "s4",
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Cybersecurity",
      },
      date: addDays(new Date(), 2),
      startTime: "3:00 PM",
      endTime: "4:00 PM",
      type: "Thesis Review",
      status: "confirmed",
      location: "Virtual (Zoom)",
      notes: "Review thesis draft and provide feedback",
      color: "blue",
    },
    {
      id: "5",
      student: {
        id: "s5",
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
      },
      date: addDays(new Date(), -1),
      startTime: "1:00 PM",
      endTime: "1:30 PM",
      type: "Office Hours",
      status: "cancelled",
      location: "Science & Engineering Hall, Room 4000",
      notes: "Student cancelled due to illness",
      color: "red",
    },
  ]

  const handlePrevious = () => {
    if (view === "day") {
      setDate(addDays(date, -1))
    } else if (view === "week") {
      setDate(addDays(date, -7))
    } else {
      const prevMonth = new Date(date)
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      setDate(prevMonth)
    }
  }

  const handleNext = () => {
    if (view === "day") {
      setDate(addDays(date, 1))
    } else if (view === "week") {
      setDate(addDays(date, 7))
    } else {
      const nextMonth = new Date(date)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      setDate(nextMonth)
    }
  }

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment)
    setDetailsOpen(true)
  }

  // Get appointments for the selected day
  const getDayAppointments = (day: Date) => {
    return appointments.filter((appointment) => isSameDay(appointment.date, day))
  }

  // Get days for the week view
  const weekDays = eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  })

  // Time slots for day view
  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointment Calendar</h1>
          <p className="text-muted-foreground">View and manage your scheduled appointments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setDate(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Select value={view} onValueChange={(value: "day" | "week" | "month") => setView(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={view} onValueChange={(value: string) => setView(value as "day" | "week" | "month")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{format(date, "EEEE, MMMM d, yyyy")}</CardTitle>
              <CardDescription>{getDayAppointments(date).length} appointments scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeSlots.map((timeSlot) => {
                  const slotAppointments = getDayAppointments(date).filter(
                    (appointment) => appointment.startTime === timeSlot,
                  )

                  return (
                    <div key={timeSlot} className="flex">
                      <div className="w-20 py-2 text-sm text-muted-foreground">{timeSlot}</div>
                      <div className="flex-1 border-l pl-4">
                        {slotAppointments.length > 0 ? (
                          slotAppointments.map((appointment) => (
                            <div
                              key={appointment.id}
                              className={`
                                mb-2 rounded-md p-3 cursor-pointer
                                ${appointment.status === "confirmed" ? "bg-blue-50 border-blue-200 border" : ""}
                                ${appointment.status === "pending" ? "bg-yellow-50 border-yellow-200 border" : ""}
                                ${appointment.status === "cancelled" ? "bg-red-50 border-red-200 border" : ""}
                              `}
                              onClick={() => handleAppointmentClick(appointment)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage
                                      src={appointment.student.avatar || "/placeholder.svg"}
                                      alt={appointment.student.name}
                                    />
                                    <AvatarFallback>
                                      {appointment.student.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{appointment.student.name}</p>
                                    <p className="text-xs text-muted-foreground">{appointment.type}</p>
                                  </div>
                                </div>
                                <Badge
                                  variant={
                                    appointment.status === "confirmed"
                                      ? "default"
                                      : appointment.status === "pending"
                                        ? "outline"
                                        : "destructive"
                                  }
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>
                                  {appointment.startTime} - {appointment.endTime}
                                </span>
                                {appointment.location.includes("Virtual") ? (
                                  <Video className="ml-2 mr-1 h-3 w-3" />
                                ) : (
                                  <MapPin className="ml-2 mr-1 h-3 w-3" />
                                )}
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="h-12 flex items-center text-sm text-muted-foreground">No appointments</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {format(weekDays[0], "MMMM d")} - {format(weekDays[6], "MMMM d, yyyy")}
              </CardTitle>
              <CardDescription>Weekly appointment schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day) => (
                  <div key={day.toString()} className="space-y-2">
                    <div className="text-center">
                      <div className="text-sm font-medium">{format(day, "EEE")}</div>
                      <div
                        className={`
                        text-sm rounded-full w-8 h-8 flex items-center justify-center mx-auto
                        ${isSameDay(day, new Date()) ? "bg-[#0033A0] text-white" : ""}
                      `}
                      >
                        {format(day, "d")}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {getDayAppointments(day).map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`
                            rounded-md p-2 text-xs cursor-pointer
                            ${appointment.status === "confirmed" ? "bg-blue-50 border-blue-200 border" : ""}
                            ${appointment.status === "pending" ? "bg-yellow-50 border-yellow-200 border" : ""}
                            ${appointment.status === "cancelled" ? "bg-red-50 border-red-200 border" : ""}
                          `}
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="font-medium truncate">{appointment.student.name}</div>
                          <div className="text-muted-foreground">{appointment.startTime}</div>
                          <div className="truncate">{appointment.type}</div>
                        </div>
                      ))}
                      {getDayAppointments(day).length === 0 && (
                        <div className="h-20 flex items-center justify-center text-xs text-muted-foreground">
                          No appointments
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{format(date, "MMMM yyyy")}</CardTitle>
              <CardDescription>Monthly appointment overview</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border"
                components={{
                  DayContent: ({ day }) => {
                    const dayAppointments = getDayAppointments(day)
                    return (
                      <div className="flex flex-col h-full">
                        <div>{format(day, "d")}</div>
                        {dayAppointments.length > 0 && (
                          <div className="mt-auto flex flex-wrap gap-1">
                            {dayAppointments.map((appointment) => (
                              <div
                                key={appointment.id}
                                className={`
                                  w-2 h-2 rounded-full
                                  ${appointment.status === "confirmed" ? "bg-blue-500" : ""}
                                  ${appointment.status === "pending" ? "bg-yellow-500" : ""}
                                  ${appointment.status === "cancelled" ? "bg-red-500" : ""}
                                `}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAppointmentClick(appointment)
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  },
                }}
              />
              <div className="mt-4 space-y-2">
                <h3 className="font-medium">Appointments on {format(date, "MMMM d, yyyy")}</h3>
                {getDayAppointments(date).length > 0 ? (
                  <div className="space-y-2">
                    {getDayAppointments(date).map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`
                          rounded-md p-3 cursor-pointer
                          ${appointment.status === "confirmed" ? "bg-blue-50 border-blue-200 border" : ""}
                          ${appointment.status === "pending" ? "bg-yellow-50 border-yellow-200 border" : ""}
                          ${appointment.status === "cancelled" ? "bg-red-50 border-red-200 border" : ""}
                        `}
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={appointment.student.avatar || "/placeholder.svg"}
                                alt={appointment.student.name}
                              />
                              <AvatarFallback>
                                {appointment.student.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{appointment.student.name}</p>
                              <p className="text-xs text-muted-foreground">{appointment.type}</p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : appointment.status === "pending"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>
                            {appointment.startTime} - {appointment.endTime}
                          </span>
                          {appointment.location.includes("Virtual") ? (
                            <Video className="ml-2 mr-1 h-3 w-3" />
                          ) : (
                            <MapPin className="ml-2 mr-1 h-3 w-3" />
                          )}
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    No appointments scheduled for this day
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedAppointment && (
        <AppointmentDetailsDialog appointment={selectedAppointment} open={detailsOpen} onOpenChange={setDetailsOpen} />
      )}
    </div>
  )
}
