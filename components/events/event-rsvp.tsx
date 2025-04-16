"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEvents } from "@/contexts/events-context"
import type { EventStatus } from "@/contexts/events-context"

interface EventRSVPProps {
  event: any
}

export function EventRSVP({ event }: EventRSVPProps) {
  const [rsvpStatus, setRsvpStatus] = useState<EventStatus | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { rsvpToEvent } = useEvents()

  const handleRSVP = async () => {
    if (!rsvpStatus) {
      alert("Please select an RSVP option")
      return
    }

    setIsSubmitting(true)

    try {
      rsvpToEvent(event.id, rsvpStatus)
    } catch (error) {
      alert("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">RSVP to this Event</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#0033A0]" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#0033A0]" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#0033A0]" />
            <span className="text-sm">{event.attendees} attending</span>
          </div>

          <div className="pt-2">
            <Select onValueChange={(value) => setRsvpStatus(value as EventStatus)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your RSVP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="going">Going</SelectItem>
                <SelectItem value="maybe">Maybe</SelectItem>
                <SelectItem value="not-going">Not Going</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleRSVP}
            disabled={!rsvpStatus || isSubmitting}
            className="w-full bg-[#0033A0] hover:bg-[#002180]"
          >
            {isSubmitting ? "Submitting..." : "Submit RSVP"}
          </Button>

          {event.isFree ? (
            <p className="text-center text-sm text-green-600 font-medium">This is a free event</p>
          ) : (
            <p className="text-center text-sm text-gray-500">
              This event requires payment. You'll be directed to payment after RSVP.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
