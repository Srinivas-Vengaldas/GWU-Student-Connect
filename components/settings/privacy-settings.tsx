"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"

interface PrivacySettingsProps {
  onSave: () => void
}

export function PrivacySettings({ onSave }: PrivacySettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    profileVisibility: "public",
    showGPA: false,
    showStudyGroups: true,
    showStudyMaterials: true,
    showEvents: true,
    showBlogActivity: true,
    messagePermission: "everyone",
    appointmentRequests: "verified",
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
        <h3 className="text-lg font-medium">Privacy Settings</h3>
        <p className="text-sm text-muted-foreground">
          Control what information is visible to others and who can contact you.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile and personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings.profileVisibility}
            onValueChange={(value) => handleChange("profileVisibility", value)}
            className="space-y-4"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="public" id="public" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="public" className="font-medium">
                  Public
                </Label>
                <p className="text-sm text-muted-foreground">Your profile is visible to everyone at GW Connect.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="connections" id="connections" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="connections" className="font-medium">
                  Connections Only
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only people you've connected with can see your full profile.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <RadioGroupItem value="private" id="private" className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor="private" className="font-medium">
                  Private
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only you can see your profile. Others will see limited information.
                </p>
              </div>
            </div>
          </RadioGroup>
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
          <CardTitle>Information Visibility</CardTitle>
          <CardDescription>Control which specific information is visible on your profile.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">GPA</Label>
                <p className="text-sm text-muted-foreground">Show your GPA on your profile</p>
              </div>
              <Switch checked={settings.showGPA} onCheckedChange={(checked) => handleChange("showGPA", checked)} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Study Groups</Label>
                <p className="text-sm text-muted-foreground">Show study groups you've joined</p>
              </div>
              <Switch
                checked={settings.showStudyGroups}
                onCheckedChange={(checked) => handleChange("showStudyGroups", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Study Materials</Label>
                <p className="text-sm text-muted-foreground">Show study materials you've uploaded</p>
              </div>
              <Switch
                checked={settings.showStudyMaterials}
                onCheckedChange={(checked) => handleChange("showStudyMaterials", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Events</Label>
                <p className="text-sm text-muted-foreground">Show events you're attending</p>
              </div>
              <Switch
                checked={settings.showEvents}
                onCheckedChange={(checked) => handleChange("showEvents", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Blog Activity</Label>
                <p className="text-sm text-muted-foreground">Show your blog posts and comments</p>
              </div>
              <Switch
                checked={settings.showBlogActivity}
                onCheckedChange={(checked) => handleChange("showBlogActivity", checked)}
              />
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
          <CardTitle>Communication Preferences</CardTitle>
          <CardDescription>Control who can message you and request appointments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="messagePermission">Who can message you</Label>
            <Select
              value={settings.messagePermission}
              onValueChange={(value) => handleChange("messagePermission", value)}
            >
              <SelectTrigger id="messagePermission">
                <SelectValue placeholder="Select who can message you" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="connections">Connections Only</SelectItem>
                <SelectItem value="nobody">Nobody</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentRequests">Who can request appointments</Label>
            <Select
              value={settings.appointmentRequests}
              onValueChange={(value) => handleChange("appointmentRequests", value)}
            >
              <SelectTrigger id="appointmentRequests">
                <SelectValue placeholder="Select who can request appointments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="verified">Verified GW Members Only</SelectItem>
                <SelectItem value="connections">Connections Only</SelectItem>
                <SelectItem value="nobody">Nobody</SelectItem>
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
    </div>
  )
}
