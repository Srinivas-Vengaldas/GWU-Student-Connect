"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

interface EventRSVPProps {
  event: any
}

export function EventRSVP({ event }: EventRSVPProps) {
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleRSVP = async () => {
    if (!rsvpStatus) {
      toast({
        title: "Please select an RSVP option",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "RSVP successful!",
        description: `You've ${rsvpStatus} this event.`,
      })

      // Redirect to My Events page
      router.push("/student/events/my-events")
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
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
            <Select onValueChange={setRsvpStatus}>
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
