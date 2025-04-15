"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Eye, FileUp, Loader2, Save, Settings, Shield, Trash, Upload, UserPlus, Users } from "lucide-react"

export function FacultyMaterialsSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Mock settings data
  const [settings, setSettings] = useState({
    defaultVisibility: "course",
    autoNotify: true,
    allowComments: true,
    allowRatings: true,
    moderateComments: false,
    allowStudentUploads: true,
    requireApproval: true,
    maxFileSize: "100",
    defaultLicense: "cc-by",
    watermark: false,
    watermarkText: "GWU Faculty Materials",
    autoOrganize: true,
    showAnalytics: true,
    emailNotifications: {
      newComment: true,
      newRating: true,
      newDownload: false,
      materialApproval: true,
    },
  })

  // Mock courses data
  const courses = [
    { id: "cs101", name: "CS 101: Introduction to Programming", enrolled: 45 },
    { id: "cs250", name: "CS 250: Data Structures", enrolled: 32 },
    { id: "cs350", name: "CS 350: Algorithms", enrolled: 28 },
    { id: "math241", name: "MATH 241: Calculus I", enrolled: 56 },
    { id: "phys101", name: "PHYS 101: Introduction to Physics", enrolled: 38 },
  ]

  // Mock teaching assistants data
  const teachingAssistants = [
    {
      id: "ta1",
      name: "Michael Chen",
      email: "mchen@gwu.edu",
      permissions: ["view", "upload", "edit", "delete"],
    },
    {
      id: "ta2",
      name: "Jessica Thompson",
      email: "jthompson@gwu.edu",
      permissions: ["view", "upload", "edit"],
    },
    {
      id: "ta3",
      name: "David Kim",
      email: "dkim@gwu.edu",
      permissions: ["view", "upload"],
    },
  ]

  const handleSaveSettings = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1500)
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateEmailNotification = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure default behavior for study materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-visibility">Default Visibility</Label>
                  <Select
                    value={settings.defaultVisibility}
                    onValueChange={(value) => updateSetting("defaultVisibility", value)}
                  >
                    <SelectTrigger id="default-visibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone)</SelectItem>
                      <SelectItem value="course">Course-specific</SelectItem>
                      <SelectItem value="department">Department-only</SelectItem>
                      <SelectItem value="private">Private (Only me)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Default visibility setting for new uploads</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-license">Default License</Label>
                  <Select
                    value={settings.defaultLicense}
                    onValueChange={(value) => updateSetting("defaultLicense", value)}
                  >
                    <SelectTrigger id="default-license">
                      <SelectValue placeholder="Select license" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-rights">All Rights Reserved</SelectItem>
                      <SelectItem value="cc-by">Creative Commons Attribution</SelectItem>
                      <SelectItem value="cc-by-sa">Creative Commons Attribution-ShareAlike</SelectItem>
                      <SelectItem value="cc-by-nc">Creative Commons Attribution-NonCommercial</SelectItem>
                      <SelectItem value="cc-0">Creative Commons Zero (Public Domain)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Default license for your uploaded materials</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                  <Input
                    id="max-file-size"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => updateSetting("maxFileSize", e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Maximum allowed file size for uploads (1-500 MB)</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="watermark">Add Watermark</Label>
                    <Switch
                      id="watermark"
                      checked={settings.watermark}
                      onCheckedChange={(checked) => updateSetting("watermark", checked)}
                    />
                  </div>
                  {settings.watermark && (
                    <Input
                      id="watermark-text"
                      placeholder="Watermark text"
                      value={settings.watermarkText}
                      onChange={(e) => updateSetting("watermarkText", e.target.value)}
                      className="mt-2"
                    />
                  )}
                  <p className="text-xs text-gray-500">Add watermark to PDF documents</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-organize" className="block">
                      Auto-organize Materials
                    </Label>
                    <p className="text-xs text-gray-500">Automatically organize materials by course and type</p>
                  </div>
                  <Switch
                    id="auto-organize"
                    checked={settings.autoOrganize}
                    onCheckedChange={(checked) => updateSetting("autoOrganize", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-analytics" className="block">
                      Show Analytics
                    </Label>
                    <p className="text-xs text-gray-500">Display analytics data on material cards</p>
                  </div>
                  <Switch
                    id="show-analytics"
                    checked={settings.showAnalytics}
                    onCheckedChange={(checked) => updateSetting("showAnalytics", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Permissions & Access</CardTitle>
              <CardDescription>Control who can interact with your materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-comments" className="block">
                      Allow Comments
                    </Label>
                    <p className="text-xs text-gray-500">Let students comment on your materials</p>
                  </div>
                  <Switch
                    id="allow-comments"
                    checked={settings.allowComments}
                    onCheckedChange={(checked) => updateSetting("allowComments", checked)}
                  />
                </div>

                {settings.allowComments && (
                  <div className="flex items-center justify-between pl-6">
                    <div>
                      <Label htmlFor="moderate-comments" className="block">
                        Moderate Comments
                      </Label>
                      <p className="text-xs text-gray-500">Review comments before they are published</p>
                    </div>
                    <Switch
                      id="moderate-comments"
                      checked={settings.moderateComments}
                      onCheckedChange={(checked) => updateSetting("moderateComments", checked)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-ratings" className="block">
                      Allow Ratings
                    </Label>
                    <p className="text-xs text-gray-500">Let students rate your materials</p>
                  </div>
                  <Switch
                    id="allow-ratings"
                    checked={settings.allowRatings}
                    onCheckedChange={(checked) => updateSetting("allowRatings", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-student-uploads" className="block">
                      Allow Student Uploads
                    </Label>
                    <p className="text-xs text-gray-500">Let students contribute their own materials</p>
                  </div>
                  <Switch
                    id="allow-student-uploads"
                    checked={settings.allowStudentUploads}
                    onCheckedChange={(checked) => updateSetting("allowStudentUploads", checked)}
                  />
                </div>

                {settings.allowStudentUploads && (
                  <div className="flex items-center justify-between pl-6">
                    <div>
                      <Label htmlFor="require-approval" className="block">
                        Require Approval
                      </Label>
                      <p className="text-xs text-gray-500">Review student uploads before they are published</p>
                    </div>
                    <Switch
                      id="require-approval"
                      checked={settings.requireApproval}
                      onCheckedChange={(checked) => updateSetting("requireApproval", checked)}
                    />
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Teaching Assistants</h3>
                  <Button variant="outline" size="sm" className="gap-1">
                    <UserPlus className="h-4 w-4" />
                    Add Assistant
                  </Button>
                </div>

                <div className="space-y-4">
                  {teachingAssistants.map((ta) => (
                    <div key={ta.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{ta.name}</p>
                        <p className="text-sm text-gray-500">{ta.email}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {ta.permissions.includes("view") && (
                            <Badge variant="outline" className="text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Badge>
                          )}
                          {ta.permissions.includes("upload") && (
                            <Badge variant="outline" className="text-xs">
                              <Upload className="h-3 w-3 mr-1" />
                              Upload
                            </Badge>
                          )}
                          {ta.permissions.includes("edit") && (
                            <Badge variant="outline" className="text-xs">
                              <FileUp className="h-3 w-3 mr-1" />
                              Edit
                            </Badge>
                          )}
                          {ta.permissions.includes("delete") && (
                            <Badge variant="outline" className="text-xs text-red-600">
                              <Trash className="h-3 w-3 mr-1" />
                              Delete
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit Permissions
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
              <CardDescription>Manage material settings for specific courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="flex items-start justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.enrolled} students enrolled</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-notify" className="block">
                      Auto-notify Students
                    </Label>
                    <p className="text-xs text-gray-500">
                      Automatically notify students when new materials are uploaded
                    </p>
                  </div>
                  <Switch
                    id="auto-notify"
                    checked={settings.autoNotify}
                    onCheckedChange={(checked) => updateSetting("autoNotify", checked)}
                  />
                </div>

                <Separator />

                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-comment">When someone comments on your material</Label>
                    <Switch
                      id="notify-comment"
                      checked={settings.emailNotifications.newComment}
                      onCheckedChange={(checked) => updateEmailNotification("newComment", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-rating">When someone rates your material</Label>
                    <Switch
                      id="notify-rating"
                      checked={settings.emailNotifications.newRating}
                      onCheckedChange={(checked) => updateEmailNotification("newRating", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-download">When someone downloads your material</Label>
                    <Switch
                      id="notify-download"
                      checked={settings.emailNotifications.newDownload}
                      onCheckedChange={(checked) => updateEmailNotification("newDownload", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-approval">When a student upload needs approval</Label>
                    <Switch
                      id="notify-approval"
                      checked={settings.emailNotifications.materialApproval}
                      onCheckedChange={(checked) => updateEmailNotification("materialApproval", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <div>
          {saveSuccess && (
            <div className="flex items-center text-green-600 gap-1">
              <Check className="h-4 w-4" />
              <span>Settings saved successfully</span>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-[#0033A0] hover:bg-[#002180]" onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
