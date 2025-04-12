"use client"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin, Paperclip, Video } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AppointmentBookingDialogProps {
  person: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppointmentBookingDialog({ person, open, onOpenChange }: AppointmentBookingDialogProps) {
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [meetingFormat, setMeetingFormat] = useState<string>("virtual")
  const [topic, setTopic] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!person) return null

  // Mock time slots based on the selected date
  const getAvailableTimeSlots = () => {
    if (!date) return []

    const dayOfWeek = format(date, "EEEE")
    const availableTimes = person.availableTimes.filter((time) => time.toLowerCase().includes(dayOfWeek.toLowerCase()))

    if (availableTimes.length === 0) return []

    // Parse the time range and create 30-minute slots
    const timeSlots = []
    availableTimes.forEach((timeRange) => {
      const [day, range] = timeRange.split(" ")
      const [start, end] = range.split("-")

      // Simple parsing for demo purposes
      const startHour = Number.parseInt(start.split(" ")[0])
      const endHour = Number.parseInt(end.split(" ")[0])
      const startPeriod = start.includes("PM") ? "PM" : "AM"
      const endPeriod = end.includes("PM") ? "PM" : "AM"

      for (let hour = startHour; hour < endHour; hour++) {
        const period = hour < 12 ? startPeriod : endPeriod
        const displayHour = hour <= 12 ? hour : hour - 12

        timeSlots.push(`${displayHour}:00 ${period}`)
        timeSlots.push(`${displayHour}:30 ${period}`)
      }
    })

    return timeSlots
  }

  const timeSlots = getAvailableTimeSlots()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false)
        setStep(1)
        setDate(undefined)
        setTimeSlot("")
        setMeetingFormat("virtual")
        setTopic("")
        setNotes("")
        onOpenChange(false)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Book Appointment with {person.name}</DialogTitle>
              <DialogDescription>Schedule a meeting to discuss academic or career matters.</DialogDescription>
            </DialogHeader>

            <div className="flex items-center space-x-4 py-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                <AvatarFallback>
                  {person.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">{person.name}</h3>
                <div className="flex items-center">
                  <Badge variant={person.role === "Faculty" ? "default" : "secondary"} className="mr-2">
                    {person.role}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{person.department}</span>
                </div>
              </div>
            </div>

            <Tabs value={`step-${step}`} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="step-1" disabled>
                  1. Select Date & Time
                </TabsTrigger>
                <TabsTrigger value="step-2" disabled>
                  2. Meeting Details
                </TabsTrigger>
                <TabsTrigger value="step-3" disabled>
                  3. Confirm
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1" className={step === 1 ? "block" : "hidden"}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            // Disable weekends and past dates
                            const day = date.getDay()
                            const isPastDate = date < new Date()
                            return day === 0 || day === 6 || isPastDate
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="time">Time Slot</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.length > 0 ? (
                        timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={timeSlot === slot ? "default" : "outline"}
                            className={timeSlot === slot ? "bg-[#0033A0]" : ""}
                            onClick={() => setTimeSlot(slot)}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {slot}
                          </Button>
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-4 text-muted-foreground">
                          {date ? "No available time slots on this date" : "Select a date to see available times"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2" className={step === 2 ? "block" : "hidden"}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Meeting Topic/Purpose</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Career advice, Research feedback, Course selection"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="format">Meeting Format</Label>
                    <RadioGroup
                      value={meetingFormat}
                      onValueChange={setMeetingFormat}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="virtual" id="virtual" />
                        <Label htmlFor="virtual" className="flex items-center">
                          <Video className="mr-2 h-4 w-4" />
                          Virtual (Zoom/Google Meet)
                        </Label>
                      </div>
                      {person.location && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in-person" id="in-person" />
                          <Label htmlFor="in-person" className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            In-person ({person.location})
                          </Label>
                        </div>
                      )}
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Notes or Questions</Label>
                    <Textarea
                      id="notes"
                      placeholder="Share any specific questions or topics you'd like to discuss"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="attachment">Attach Files (Optional)</Label>
                    <div className="flex items-center space-x-2">
                      <Button type="button" variant="outline" size="sm">
                        <Paperclip className="mr-2 h-4 w-4" />
                        Attach File
                      </Button>
                      <span className="text-xs text-muted-foreground">Resume, project document, etc.</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-3" className={step === 3 ? "block" : "hidden"}>
                <div className="space-y-4 py-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Appointment Summary</h3>
                    <div className="mt-3 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">With:</span>
                        <span className="font-medium">{person.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{date ? format(date, "PPP") : "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span>{timeSlot || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format:</span>
                        <span>
                          {meetingFormat === "virtual" ? (
                            <span className="flex items-center">
                              <Video className="mr-1 h-4 w-4" />
                              Virtual
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              In-person
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Topic:</span>
                        <span>{topic || "Not specified"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">What happens next?</h3>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                          1
                        </span>
                        <span>Your request will be sent to {person.name} for approval</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                          2
                        </span>
                        <span>You'll receive a notification when they accept, reschedule, or decline</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                          3
                        </span>
                        <span>Once accepted, the appointment will appear in your calendar with any meeting links</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              {step > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  className="bg-[#0033A0] hover:bg-[#002180]"
                  onClick={handleNext}
                  disabled={(step === 1 && (!date || !timeSlot)) || (step === 2 && !topic)}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-[#0033A0] hover:bg-[#002180]"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending request..." : "Send Appointment Request"}
                </Button>
              )}
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold">Appointment Request Sent!</h2>
            <p className="mt-2 text-center text-muted-foreground">
              Your request has been sent to {person.name}. You'll receive a notification when they respond.
            </p>
            <Button className="mt-6 bg-[#0033A0] hover:bg-[#002180]" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
