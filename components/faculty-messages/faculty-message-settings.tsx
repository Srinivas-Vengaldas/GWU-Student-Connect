"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function FacultyMessageSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailDigestEnabled, setEmailDigestEnabled] = useState(true)
  const [messagingPermission, setMessagingPermission] = useState("all")
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false)
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messaging Settings</CardTitle>
        <CardDescription>Configure your messaging preferences and permissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">In-app notifications</Label>
              <p className="text-sm text-gray-500">Receive notifications for new messages</p>
            </div>
            <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-digest">Daily email digest</Label>
              <p className="text-sm text-gray-500">Receive a daily summary of unread messages</p>
            </div>
            <Switch id="email-digest" checked={emailDigestEnabled} onCheckedChange={setEmailDigestEnabled} />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Messaging Permissions</h3>
          <RadioGroup value={messagingPermission} onValueChange={setMessagingPermission}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="all" id="all" />
              <div className="grid gap-1.5">
                <Label htmlFor="all">All students</Label>
                <p className="text-sm text-gray-500">Any student can send you a message</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="enrolled" id="enrolled" />
              <div className="grid gap-1.5">
                <Label htmlFor="enrolled">Enrolled students only</Label>
                <p className="text-sm text-gray-500">Only students enrolled in your courses can message you</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="appointments" id="appointments" />
              <div className="grid gap-1.5">
                <Label htmlFor="appointments">Appointment attendees only</Label>
                <p className="text-sm text-gray-500">Only students who have scheduled appointments can message you</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Settings</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-reply">Auto-reply when away</Label>
              <p className="text-sm text-gray-500">Automatically reply to messages when you're unavailable</p>
            </div>
            <Switch id="auto-reply" checked={autoReplyEnabled} onCheckedChange={setAutoReplyEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="read-receipts">Read receipts</Label>
              <p className="text-sm text-gray-500">Let others know when you've read their messages</p>
            </div>
            <Switch id="read-receipts" checked={readReceiptsEnabled} onCheckedChange={setReadReceiptsEnabled} />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
