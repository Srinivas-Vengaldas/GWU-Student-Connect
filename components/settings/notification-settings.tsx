"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Bell, Mail, MessageSquare, Users, Calendar, FileText, BookOpen } from "lucide-react"

interface NotificationSettingsProps {
  onSave: () => void
}

export function NotificationSettings({ onSave }: NotificationSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    inApp: {
      messages: true,
      studyGroups: true,
      blogComments: true,
      events: true,
      appointments: true,
      studyMaterials: true,
      mentions: true,
      newConnections: true,
    },
    email: {
      messages: false,
      studyGroups: true,
      blogComments: false,
      events: true,
      appointments: true,
      studyMaterials: false,
      mentions: false,
      newConnections: true,
    },
  })

  const handleChange = (channel: "inApp" | "email", field: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [field]: value,
      },
    }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSave()
    }, 1000)
  }

  const notificationItems = [
    {
      id: "messages",
      label: "Messages",
      description: "When you receive a new message",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "studyGroups",
      label: "Study Groups",
      description: "Updates from your study groups",
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: "blogComments",
      label: "Blog Comments",
      description: "When someone comments on your blog post",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      id: "events",
      label: "Events",
      description: "Reminders about upcoming events",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "appointments",
      label: "Appointments",
      description: "Updates about your appointments",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "studyMaterials",
      label: "Study Materials",
      description: "When new materials are shared with you",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: "mentions",
      label: "Mentions",
      description: "When someone mentions you in a post or comment",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "newConnections",
      label: "New Connections",
      description: "When someone connects with you",
      icon: <Users className="h-5 w-5" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">Control how and when you receive notifications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose which notifications you want to receive and how you want to receive them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inApp" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inApp" className="flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                In-App
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inApp" className="space-y-4">
              {notificationItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-muted-foreground">{item.icon}</div>
                    <div className="space-y-0.5">
                      <Label className="text-base">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.inApp[item.id as keyof typeof settings.inApp]}
                    onCheckedChange={(checked) => handleChange("inApp", item.id, checked)}
                  />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              {notificationItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-muted-foreground">{item.icon}</div>
                    <div className="space-y-0.5">
                      <Label className="text-base">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.email[item.id as keyof typeof settings.email]}
                    onCheckedChange={(checked) => handleChange("email", item.id, checked)}
                  />
                </div>
              ))}
            </TabsContent>
          </Tabs>
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
          <CardTitle>Notification Schedule</CardTitle>
          <CardDescription>Control when you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Quiet Hours</Label>
                <p className="text-sm text-muted-foreground">Pause notifications during specific hours</p>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">Receive a weekly summary of activity</p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Important Announcements</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about important GW announcements</p>
              </div>
              <Switch defaultChecked={true} />
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
    </div>
  )
}
