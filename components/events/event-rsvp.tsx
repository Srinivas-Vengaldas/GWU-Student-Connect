"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Check, Clock, Share2, Users, X } from "lucide-react"

interface EventRSVPProps {
  event: {
    id: string
    title: string
    date: string
    time: string
    isFree: boolean
    requiresRSVP: boolean
    attendees: number
  }
}

export function EventRSVP({ event }: EventRSVPProps) {
  const [rsvpStatus, setRsvpStatus] = useState<"none" | "going" | "maybe" | "declined">("none")

  const handleRSVP = (status: "going" | "maybe" | "declined") => {
    setRsvpStatus(status)
    // In a real app, you would send this to your backend
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">RSVP to this Event</h3>
            {event.isFree ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Free
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Paid
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{event.attendees} attending</span>
          </div>

          {rsvpStatus !== "none" && (
            <div className="bg-gray-50 rounded-md p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {rsvpStatus === "going" && (
                  <>
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">You're going</span>
                  </>
                )}
                {rsvpStatus === "maybe" && (
                  <>
                    <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span className="font-medium">Maybe</span>
                  </>
                )}
                {rsvpStatus === "declined" && (
                  <>
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                      <X className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="font-medium">Not going</span>
                  </>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setRsvpStatus("none")} className="h-7 text-xs">
                Change
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 px-6 pb-6 pt-0">
        {rsvpStatus === "none" && (
          <>
            <Button className="w-full bg-[#0033A0] hover:bg-[#002180]" onClick={() => handleRSVP("going")}>
              RSVP - Going
            </Button>
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button variant="outline" className="w-full" onClick={() => handleRSVP("maybe")}>
                Maybe
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleRSVP("declined")}>
                Decline
              </Button>
            </div>
          </>
        )}

        <Button variant="outline" className="w-full gap-2">
          <Calendar className="h-4 w-4" />
          <span>Add to Calendar</span>
        </Button>

        <Button variant="outline" className="w-full gap-2">
          <Share2 className="h-4 w-4" />
          <span>Share Event</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
