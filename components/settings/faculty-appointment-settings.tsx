"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Calendar, Clock, Users, Video } from "lucide-react"
import Link from "next/link"

interface FacultyAppointmentSettingsProps {
  onSave: () => void
}

export function FacultyAppointmentSettings({ onSave }: FacultyAppointmentSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    acceptingAppointments: true,
    appointmentVisibility: "verified",
    appointmentDurations: ["15", "30", "60"],
    defaultDuration: "30",
    bufferTime: "15",
    advanceNotice: "24",
    maxPerDay: "5",
    maxPerWeek: "15",
    allowVirtual: true,
    allowInPerson: true,
    allowGroup: true,
    location: "Science & Engineering Hall, Room 4550",
    virtualMeetingLink: "https://gwu-edu.zoom.us/j/123456789",
    autoConfirm: false,
    sendReminders: true,
    availability: {
      monday: { enabled: true, start: "09:00", end: "12:00" },
      tuesday: { enabled: false, start: "09:00", end: "17:00" },
      wednesday: { enabled: true, start: "13:00", end: "16:00" },
      thursday: { enabled: false, start: "09:00", end: "17:00" },
      friday: { enabled: true, start: "10:00", end: "14:00" },
      saturday: { enabled: false, start: "09:00", end: "17:00" },
      sunday: { enabled: false, start: "09:00", end: "17:00" },
    },
  })

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleAvailabilityChange = (day: string, field: "enabled" | "start" | "end", value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day as keyof typeof prev.availability],
          [field]: value,
        },
      },
    }))
  }

  const handleDurationToggle = (duration: string) => {
    setSettings((prev) => {
      const currentDurations = [...prev.appointmentDurations]

      if (currentDurations.includes(duration)) {
        // Don't allow removing the last duration
        if (currentDurations.length > 1) {
          return {
            ...prev,
            appointmentDurations: currentDurations.filter((d) => d !== duration),
            // If we're removing the default duration, set a new default
            defaultDuration:
              prev.defaultDuration === duration
                ? currentDurations.filter((d) => d !== duration)[0]
                : prev.defaultDuration,
          }
        }
        return prev
      } else {
        return {
          ...prev,
          appointmentDurations: [...currentDurations, duration].sort((a, b) => Number.parseInt(a) - Number.parseInt(b)),
        }
      }
    })
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSave()
    }, 1000)
  }

  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ]

  const timeSlots = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4)
    const minute = (i % 4) * 15
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appointment Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your appointment preferences and availability.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Preferences</CardTitle>
          <CardDescription>Control your appointment settings and who can book time with you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Accepting Appointments</Label>
              <p className="text-sm text-muted-foreground">
                Toggle off to temporarily stop receiving new appointment requests
              </p>
            </div>
            <Switch
              checked={settings.acceptingAppointments}
              onCheckedChange={(checked) => handleChange("acceptingAppointments", checked)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="appointmentVisibility">Who can book appointments</Label>
            <Select
              value={settings.appointmentVisibility}
              onValueChange={(value) => handleChange("appointmentVisibility", value)}
            >
              <SelectTrigger id="appointmentVisibility">
                <SelectValue placeholder="Select who can book" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="verified">Verified GW Members Only</SelectItem>
                <SelectItem value="enrolled">Students Enrolled in My Courses</SelectItem>
                <SelectItem value="approved">Approved Students Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Available appointment durations</Label>
            <div className="flex flex-wrap gap-4 mt-2">
              {["15", "30", "45", "60", "90"].map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox
                    id={`duration-${duration}`}
                    checked={settings.appointmentDurations.includes(duration)}
                    onCheckedChange={() => handleDurationToggle(duration)}
                  />
                  <Label htmlFor={`duration-${duration}`} className="font-normal">
                    {duration} minutes
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultDuration">Default appointment duration</Label>
            <Select value={settings.defaultDuration} onValueChange={(value) => handleChange("defaultDuration", value)}>
              <SelectTrigger id="defaultDuration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {settings.appointmentDurations.map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration} minutes
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bufferTime">Buffer time between appointments</Label>
            <Select value={settings.bufferTime} onValueChange={(value) => handleChange("bufferTime", value)}>
              <SelectTrigger id="bufferTime">
                <SelectValue placeholder="Select buffer time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No buffer</SelectItem>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="advanceNotice">Advance notice required</Label>
            <Select value={settings.advanceNotice} onValueChange={(value) => handleChange("advanceNotice", value)}>
              <SelectTrigger id="advanceNotice">
                <SelectValue placeholder="Select notice period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No advance notice</SelectItem>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="3">3 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
                <SelectItem value="48">48 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxPerDay">Maximum appointments per day</Label>
              <Select value={settings.maxPerDay} onValueChange={(value) => handleChange("maxPerDay", value)}>
                <SelectTrigger id="maxPerDay">
                  <SelectValue placeholder="Select maximum" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPerWeek">Maximum appointments per week</Label>
              <Select value={settings.maxPerWeek} onValueChange={(value) => handleChange("maxPerWeek", value)}>
                <SelectTrigger id="maxPerWeek">
                  <SelectValue placeholder="Select maximum" />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 15, 20, 25, 30, 40, 50].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability Schedule</CardTitle>
          <CardDescription>Set your regular weekly availability for appointments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {days.map((day) => (
            <div key={day.id} className="flex items-start space-x-4">
              <div className="w-28 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={settings.availability[day.id as keyof typeof settings.availability].enabled}
                    onCheckedChange={(checked) => handleAvailabilityChange(day.id, "enabled", checked)}
                  />
                  <Label>{day.label}</Label>
                </div>
              </div>

              {settings.availability[day.id as keyof typeof settings.availability].enabled ? (
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${day.id}-start`}>Start Time</Label>
                    <Select
                      value={settings.availability[day.id as keyof typeof settings.availability].start}
                      onValueChange={(value) => handleAvailabilityChange(day.id, "start", value)}
                      disabled={!settings.availability[day.id as keyof typeof settings.availability].enabled}
                    >
                      <SelectTrigger id={`${day.id}-start`}>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={`${day.id}-start-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${day.id}-end`}>End Time</Label>
                    <Select
                      value={settings.availability[day.id as keyof typeof settings.availability].end}
                      onValueChange={(value) => handleAvailabilityChange(day.id, "end", value)}
                      disabled={!settings.availability[day.id as keyof typeof settings.availability].enabled}
                    >
                      <SelectTrigger id={`${day.id}-end`}>
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={`${day.id}-end-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center h-10 text-muted-foreground">Not available</div>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Options</CardTitle>
          <CardDescription>Configure your meeting preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Video className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Allow Virtual Meetings</Label>
                <p className="text-sm text-muted-foreground">Enable virtual meeting options (Zoom, Teams, etc.)</p>
              </div>
            </div>
            <Switch
              checked={settings.allowVirtual}
              onCheckedChange={(checked) => handleChange("allowVirtual", checked)}
            />
          </div>

          {settings.allowVirtual && (
            <div className="space-y-2 pl-8">
              <Label htmlFor="virtualMeetingLink">Default Virtual Meeting Link</Label>
              <Input
                id="virtualMeetingLink"
                value={settings.virtualMeetingLink}
                onChange={(e) => handleChange("virtualMeetingLink", e.target.value)}
                placeholder="https://zoom.us/j/123456789"
              />
              <p className="text-xs text-muted-foreground">
                This link will be automatically shared with students when they book a virtual appointment.
              </p>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Allow In-Person Meetings</Label>
                <p className="text-sm text-muted-foreground">Enable in-person meeting options</p>
              </div>
            </div>
            <Switch
              checked={settings.allowInPerson}
              onCheckedChange={(checked) => handleChange("allowInPerson", checked)}
            />
          </div>

          {settings.allowInPerson && (
            <div className="space-y-2 pl-8">
              <Label htmlFor="location">Office Location (for in-person)</Label>
              <Input
                id="location"
                value={settings.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Building and room number"
              />
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Allow Group Appointments</Label>
                <p className="text-sm text-muted-foreground">
                  Enable students to book group appointments (e.g., for project teams)
                </p>
              </div>
            </div>
            <Switch checked={settings.allowGroup} onCheckedChange={(checked) => handleChange("allowGroup", checked)} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
          <CardDescription>Configure additional appointment preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Auto-confirm Appointment Requests</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically confirm appointment requests that fit your availability
                </p>
              </div>
            </div>
            <Switch
              checked={settings.autoConfirm}
              onCheckedChange={(checked) => handleChange("autoConfirm", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Send Appointment Reminders</Label>
                <p className="text-sm text-muted-foreground">Send email reminders before scheduled appointments</p>
              </div>
            </div>
            <Switch
              checked={settings.sendReminders}
              onCheckedChange={(checked) => handleChange("sendReminders", checked)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/faculty/appointments">
            <Button variant="outline" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              View Appointments
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={isLoading} className="bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
