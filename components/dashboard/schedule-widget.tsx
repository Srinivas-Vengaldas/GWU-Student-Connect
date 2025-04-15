"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarClock, Video, MapPin, CheckCircle, PinIcon } from "lucide-react"

// Mock data for today's schedule
const scheduleItems = [
  {
    id: 1,
    type: "appointment",
    title: "Office Hours with Dr. Johnson",
    time: "2:00 PM - 2:30 PM",
    format: "virtual",
    person: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    completed: false,
    pinned: true,
    link: "/student/appointments/1",
  },
  {
    id: 2,
    type: "study-group",
    title: "Advanced Algorithms Study Session",
    time: "4:00 PM - 5:30 PM",
    format: "in-person",
    location: "Library, Room 204",
    members: 6,
    completed: false,
    pinned: false,
    link: "/student/study-groups/2",
  },
  {
    id: 3,
    type: "event",
    title: "CS Department Mixer",
    time: "6:00 PM - 8:00 PM",
    format: "in-person",
    location: "Student Center, Main Hall",
    completed: false,
    pinned: false,
    link: "/student/events/3",
  },
]

export function ScheduleWidget() {
  const [schedule, setSchedule] = useState(scheduleItems)
  const completedCount = schedule.filter((item) => item.completed).length
  const progressPercentage = (completedCount / schedule.length) * 100

  const toggleCompleted = (id: number) => {
    setSchedule(schedule.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const togglePinned = (id: number) => {
    setSchedule(schedule.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item)))
  }

  // Sort items: pinned first, then by time
  const sortedSchedule = [...schedule].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return 0
  })

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/student/appointments/my-appointments">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Progress
              value={progressPercentage}
              className="h-16 w-16 [&>div]:bg-green-500"
              indicatorClassName="stroke-green-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium">
                {completedCount}/{schedule.length}
              </span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-medium">Tasks Completed Today</p>
            <p className="text-sm text-muted-foreground">
              {completedCount === schedule.length
                ? "All done! Great job!"
                : `${schedule.length - completedCount} items remaining`}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedSchedule.length > 0 ? (
            sortedSchedule.map((item) => (
              <Link href={item.link} key={item.id} className="block">
                <div
                  className={`flex items-start p-3 rounded-lg border ${
                    item.completed ? "bg-gray-50 border-gray-200" : "bg-white"
                  } ${item.pinned ? "border-[#0033A0]" : "border-gray-200"} hover:shadow-sm transition-all`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.time}</span>
                        {item.pinned && <PinIcon className="h-3 w-3 text-[#0033A0] flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.preventDefault()
                            togglePinned(item.id)
                          }}
                        >
                          <PinIcon className={`h-3 w-3 ${item.pinned ? "text-[#0033A0]" : "text-gray-400"}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleCompleted(item.id)
                          }}
                        >
                          <CheckCircle
                            className={`h-4 w-4 ${item.completed ? "text-green-500 fill-green-500" : "text-gray-400"}`}
                          />
                        </Button>
                      </div>
                    </div>

                    <h4 className={`font-medium truncate ${item.completed ? "line-through text-gray-500" : ""}`}>
                      {item.title}
                    </h4>

                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      {item.format === "virtual" ? (
                        <Video className="h-3 w-3 mr-1 flex-shrink-0" />
                      ) : (
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      )}
                      <span className="truncate">{item.format === "virtual" ? "Virtual Meeting" : item.location}</span>
                    </div>

                    {item.person && (
                      <div className="flex items-center mt-2">
                        <Avatar className="h-5 w-5 mr-1 flex-shrink-0">
                          <AvatarImage src={item.person.avatar || "/placeholder.svg"} alt={item.person.name} />
                          <AvatarFallback>{item.person.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs truncate">{item.person.name}</span>
                      </div>
                    )}

                    {item.type === "study-group" && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        {item.members} members
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CalendarClock className="h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-2 text-sm font-medium">No events today</h3>
              <p className="mt-1 text-xs text-muted-foreground">Your schedule is clear. Time to be productive!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
