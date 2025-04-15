"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Download, ExternalLink, MapPin, MessageSquare, Video } from "lucide-react"
import Link from "next/link"

interface AppointmentDetailsDialogProps {
  appointment: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppointmentDetailsDialog({ appointment, open, onOpenChange }: AppointmentDetailsDialogProps) {
  const [notes, setNotes] = useState(appointment?.notes || "")

  if (!appointment) return null

  const handleSaveNotes = () => {
    console.log("Saving notes:", notes)
    // In a real app, you would save the notes to the database
    onOpenChange(false)
  }

  const handleCancel = () => {
    console.log("Cancelling appointment:", appointment.id)
    // In a real app, you would update the appointment status in the database
    onOpenChange(false)
  }

  const handleReschedule = () => {
    console.log("Rescheduling appointment:", appointment.id)
    // In a real app, you would open a reschedule dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>View and manage appointment information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={appointment.student.avatar || "/placeholder.svg"} alt={appointment.student.name} />
                <AvatarFallback>
                  {appointment.student.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{appointment.student.name}</h3>
                <p className="text-sm text-muted-foreground">{appointment.student.program}</p>
                <div className="flex items-center mt-1">
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
                  <Badge variant="outline" className="ml-2">
                    {appointment.type}
                  </Badge>
                </div>
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
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Date:</span>
                <span className="ml-2">
                  {appointment.date instanceof Date ? appointment.date.toLocaleDateString() : appointment.date}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Time:</span>
                <span className="ml-2">
                  {appointment.startTime} - {appointment.endTime}
                </span>
              </div>
              <div className="flex items-center text-sm">
                {appointment.location.includes("Virtual") ? (
                  <>
                    <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">{appointment.location}</span>
                    <Button variant="link" size="sm" className="h-6 px-2 text-blue-600">
                      Join Meeting
                    </Button>
                  </>
                ) : (
                  <>
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">{appointment.location}</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Notes:</h4>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this appointment..."
                className="h-24"
              />
            </div>
          </div>

          {appointment.attachments && appointment.attachments.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-1">Attachments:</h4>
                <div className="space-y-1">
                  {appointment.attachments.map((attachment: any, index: number) => (
                    <div key={index} className="flex items-center text-sm">
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Download className="mr-1 h-3 w-3" />
                        {attachment.name} ({attachment.size})
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel Appointment
            </Button>
            <Button variant="outline" onClick={handleReschedule}>
              Reschedule
            </Button>
          </div>
          <Button onClick={handleSaveNotes} className="bg-[#0033A0] hover:bg-[#002180]">
            Save Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
