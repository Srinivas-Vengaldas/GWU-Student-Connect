"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function EventsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get the current month and year
  const month = currentMonth.toLocaleString("default", { month: "long" })
  const year = currentMonth.getFullYear()

  // Navigate to previous month
  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  // Navigate to next month
  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const events = [
    { date: new Date(2025, 11, 15), count: 2 }, // December 15, 2025
    { date: new Date(2025, 11, 18), count: 1 }, // December 18, 2025
    { date: new Date(2025, 11, 20), count: 1 }, // December 20, 2025
    { date: new Date(2025, 11, 25), count: 1 }, // December 25, 2025
    { date: new Date(2026, 0, 5), count: 1 }, // January 5, 2026
  ]

  // Check if a day has events
  const hasEvents = (day: number | null) => {
    if (!day) return false

    const eventDate = new Date(currentMonth)
    eventDate.setDate(day)

    return events.some(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === eventDate.getMonth() &&
        event.date.getFullYear() === eventDate.getFullYear(),
    )
  }

  // Get event count for a day
  const getEventCount = (day: number | null) => {
    if (!day) return 0

    const eventDate = new Date(currentMonth)
    eventDate.setDate(day)

    const event = events.find(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === eventDate.getMonth() &&
        event.date.getFullYear() === eventDate.getFullYear(),
    )

    return event ? event.count : 0
  }

  // Check if a day is today
  const isToday = (day: number | null) => {
    if (!day) return false

    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    )
  }

  const calendarDays = generateCalendarDays()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {month} {year}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div key={day} className="text-center font-medium text-sm py-2">
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                min-h-[80px] p-1 border rounded-md relative
                ${!day ? "bg-gray-50" : "hover:bg-gray-50 cursor-pointer"}
                ${isToday(day) ? "border-[#0033A0]" : "border-gray-200"}
              `}
            >
              {day && (
                <>
                  <div
                    className={`
                    text-right p-1 font-medium text-sm
                    ${isToday(day) ? "text-[#0033A0]" : ""}
                  `}
                  >
                    {day}
                  </div>

                  {hasEvents(day) && (
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className="bg-[#0033A0]/10 text-[#0033A0] text-xs rounded p-1 text-center">
                        {getEventCount(day)} event{getEventCount(day) > 1 ? "s" : ""}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Click on a day with events to view details</p>
          <p className="mt-1">
            <Button variant="link" className="text-[#0033A0] p-0 h-auto">
              Connect to GW Calendar
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
