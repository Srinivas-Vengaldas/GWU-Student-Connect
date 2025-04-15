"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Loader2, Calendar } from "lucide-react"
import Link from "next/link"

interface AppointmentSettingsProps {
  onSave: () => void
}

export function AppointmentSettings({ onSave }: AppointmentSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    acceptingAppointments: true,
    appointmentVisibility: "verified",
    appointmentDuration: "30",
    bufferTime: "15",
    advanceNotice: "24",
    allowVirtual: true,
    allowInPerson: true,
    location: "Science & Engineering Hall, Room 205",
    autoDecline: false,
    sendReminders: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSave()
    }, 1000)
  }

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
                <SelectItem value="connections">Connections Only</SelectItem>
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
            <div className="space-y-0.5">
              <Label className="text-base">Auto-decline Conflicting Requests</Label>
              <p className="text-sm text-muted-foreground">
                Automatically decline appointment requests that conflict with your calendar
              </p>
            </div>
            <Switch
              checked={settings.autoDecline}
              onCheckedChange={(checked) => handleChange("autoDecline", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Send Appointment Reminders</Label>
              <p className="text-sm text-muted-foreground">Send email reminders before scheduled appointments</p>
            </div>
            <Switch
              checked={settings.sendReminders}
              onCheckedChange={(checked) => handleChange("sendReminders", checked)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/student/appointments">
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
