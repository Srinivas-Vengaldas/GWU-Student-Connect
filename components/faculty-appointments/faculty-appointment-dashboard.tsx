"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, Users, Calendar, Settings } from "lucide-react"

export function FacultyAppointmentDashboard() {
  const [acceptingAppointments, setAcceptingAppointments] = useState(true)

  // Mock data
  const upcomingAppointments = [
    {
      id: "1",
      student: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Computer Science",
      },
      date: "Today",
      time: "2:00 PM - 2:30 PM",
      type: "Office Hours",
      status: "confirmed",
      location: "Science & Engineering Hall, Room 4000",
    },
    {
      id: "2",
      student: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        program: "Data Science",
      },
      date: "Tomorrow",
      time: "10:30 AM - 11:00 AM",
      type: "Research Discussion",
      status: "confirmed",
      location: "Virtual (Zoom)",
    },
  ]

  const stats = {
    today: 2,
    thisWeek: 8,
    pending: 5,
    waiting: 3,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, Dr. Smith!</h1>
          <p className="text-muted-foreground">Manage your appointments with students and alumni</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="accepting-toggle" className="font-medium">
            Accepting Appointments
          </Label>
          <Switch id="accepting-toggle" checked={acceptingAppointments} onCheckedChange={setAcceptingAppointments} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.today}</div>
            <p className="text-xs text-muted-foreground">Appointments scheduled today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek}</div>
            <p className="text-xs text-muted-foreground">Appointments this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending appointment requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waiting</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.waiting}</div>
            <p className="text-xs text-muted-foreground">Students waiting for response</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your next scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start space-x-4 rounded-md border p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={appointment.student.avatar || "/placeholder.svg"} alt={appointment.student.name} />
                  <AvatarFallback>
                    {appointment.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{appointment.student.name}</p>
                    <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{appointment.student.program}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    <span>
                      {appointment.date}, {appointment.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline">{appointment.type}</Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/faculty/appointments/details/${appointment.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/faculty/appointments?tab=calendar">View All Appointments</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your appointments and availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-[#0033A0] hover:bg-[#002180]" asChild>
              <Link href="/faculty/appointments?tab=availability">
                <Calendar className="mr-2 h-4 w-4" />
                Set Availability
              </Link>
            </Button>
            <Button className="w-full" asChild>
              <Link href="/faculty/appointments?tab=requests">
                <Clock className="mr-2 h-4 w-4" />
                View Pending Requests ({stats.pending})
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/faculty/appointments?tab=calendar">
                <CalendarDays className="mr-2 h-4 w-4" />
                View Calendar
              </Link>
            </Button>
            <Separator />
            <Button variant="outline" className="w-full" asChild>
              <Link href="/faculty/appointments?tab=preferences">
                <Settings className="mr-2 h-4 w-4" />
                Appointment Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
