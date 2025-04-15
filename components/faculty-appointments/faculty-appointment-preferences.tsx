"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Save } from "lucide-react"

export function FacultyAppointmentPreferences() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    acceptingAppointments: true,
    appointmentVisibility: "verified",
    appointmentDuration: "30",
    bufferTime: "15",
    advanceNotice: "24",
    allowVirtual: true,
    allowInPerson: true,
    location: "Science & Engineering Hall, Room 4000",
    autoDecline: false,
    sendReminders: true,
    requireTopic: true,
    allowAnonymous: false,
    autoConfirm: false,
    allowGroup: true,
    appointmentTypes: {
      officeHours: true,
      research: true,
      career: true,
      recommendation: true,
      projectFeedback: true,
    },
    emailNotifications: true,
    reminderTime: "1hour",
    cancellationPolicy: "Students must cancel at least 2 hours before the scheduled appointment time.",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleAppointmentTypeChange = (type: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      appointmentTypes: {
        ...prev.appointmentTypes,
        [type]: checked,
      },
    }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Show success message or notification
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointment Preferences</h1>
          <p className="text-muted-foreground">Customize your appointment settings and availability</p>
        </div>
        <Button className="bg-[#0033A0] hover:bg-[#002180]" onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Control your appointment settings and who can book time with you</CardDescription>
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
                <SelectItem value="department">Students in my Department</SelectItem>
                <SelectItem value="classes">Students in my Classes</SelectItem>
                <SelectItem value="approved">Approved Students Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentDuration">Default appointment duration</Label>
            <Select
              value={settings.appointmentDuration}
              onValueChange={(value) => handleChange("appointmentDuration", value)}
            >
              <SelectTrigger id="appointmentDuration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Options</CardTitle>
          <CardDescription>Configure your meeting preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Allow Virtual Meetings</Label>
              <p className="text-sm text-muted-foreground">Enable virtual meeting options (Zoom, Teams, etc.)</p>
            </div>
            <Switch
              checked={settings.allowVirtual}
              onCheckedChange={(checked) => handleChange("allowVirtual", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Allow In-Person Meetings</Label>
              <p className="text-sm text-muted-foreground">Enable in-person meeting options</p>
            </div>
            <Switch
              checked={settings.allowInPerson}
              onCheckedChange={(checked) => handleChange("allowInPerson", checked)}
            />
          </div>

          {settings.allowInPerson && (
            <div className="space-y-2">
              <Label htmlFor="location">Office Location (for in-person)</Label>
              <Input
                id="location"
                value={settings.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
          )}

          <Separator />

          <div className="space-y-2">
            <Label className="text-base">Appointment Types</Label>
            <p className="text-sm text-muted-foreground mb-2">Select the types of appointments you offer</p>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="officeHours"
                  checked={settings.appointmentTypes.officeHours}
                  onCheckedChange={(checked) => handleAppointmentTypeChange("officeHours", checked as boolean)}
                />
                <Label htmlFor="officeHours">Office Hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="research"
                  checked={settings.appointmentTypes.research}
                  onCheckedChange={(checked) => handleAppointmentTypeChange("research", checked as boolean)}
                />
                <Label htmlFor="research">Research Discussion</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="career"
                  checked={settings.appointmentTypes.career}
                  onCheckedChange={(checked) => handleAppointmentTypeChange("career", checked as boolean)}
                />
                <Label htmlFor="career">Career Advising</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recommendation"
                  checked={settings.appointmentTypes.recommendation}
                  onCheckedChange={(checked) => handleAppointmentTypeChange("recommendation", checked as boolean)}
                />
                <Label htmlFor="recommendation">Recommendation Letter Consultation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="projectFeedback"
                  checked={settings.appointmentTypes.projectFeedback}
                  onCheckedChange={(checked) => handleAppointmentTypeChange("projectFeedback", checked as boolean)}
                />
                <Label htmlFor="projectFeedback">Project Feedback</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Requirements</CardTitle>
          <CardDescription>Set requirements for appointment bookings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Require Topic/Purpose</Label>
              <p className="text-sm text-muted-foreground">
                Require students to provide a topic or purpose when booking
              </p>
            </div>
            <Switch
              checked={settings.requireTopic}
              onCheckedChange={(checked) => handleChange("requireTopic", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Allow Anonymous Bookings</Label>
              <p className="text-sm text-muted-foreground">
                Allow students to book anonymously (e.g., for sensitive discussions)
              </p>
            </div>
            <Switch
              checked={settings.allowAnonymous}
              onCheckedChange={(checked) => handleChange("allowAnonymous", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Auto-Confirm Appointments</Label>
              <p className="text-sm text-muted-foreground">
                Automatically confirm appointment requests without manual approval
              </p>
            </div>
            <Switch
              checked={settings.autoConfirm}
              onCheckedChange={(checked) => handleChange("autoConfirm", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Allow Group Appointments</Label>
              <p className="text-sm text-muted-foreground">Allow multiple students to book the same appointment slot</p>
            </div>
            <Switch checked={settings.allowGroup} onCheckedChange={(checked) => handleChange("allowGroup", checked)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive email notifications for appointment activities</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleChange("emailNotifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Send Appointment Reminders</Label>
              <p className="text-sm text-muted-foreground">Send reminders before scheduled appointments</p>
            </div>
            <Switch
              checked={settings.sendReminders}
              onCheckedChange={(checked) => handleChange("sendReminders", checked)}
            />
          </div>

          {settings.sendReminders && (
            <div className="space-y-2">
              <Label htmlFor="reminderTime">Reminder Time</Label>
              <Select value={settings.reminderTime} onValueChange={(value) => handleChange("reminderTime", value)}>
                <SelectTrigger id="reminderTime">
                  <SelectValue placeholder="Select reminder time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15min">15 minutes before</SelectItem>
                  <SelectItem value="30min">30 minutes before</SelectItem>
                  <SelectItem value="1hour">1 hour before</SelectItem>
                  <SelectItem value="2hours">2 hours before</SelectItem>
                  <SelectItem value="1day">1 day before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cancellation Policy</CardTitle>
          <CardDescription>Set your cancellation policy for appointments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
            <Textarea
              id="cancellationPolicy"
              value={settings.cancellationPolicy}
              onChange={(e) => handleChange("cancellationPolicy", e.target.value)}
              placeholder="Enter your cancellation policy..."
              className="min-h-[100px]"
            />
            <p className="text-sm text-muted-foreground">
              This policy will be displayed to students when they book an appointment
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Auto-Decline Conflicting Requests</Label>
              <p className="text-sm text-muted-foreground">
                Automatically decline appointment requests that conflict with your calendar
              </p>
            </div>
            <Switch
              checked={settings.autoDecline}
              onCheckedChange={(checked) => handleChange("autoDecline", checked)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#0033A0] hover:bg-[#002180]" onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save All Preferences
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
