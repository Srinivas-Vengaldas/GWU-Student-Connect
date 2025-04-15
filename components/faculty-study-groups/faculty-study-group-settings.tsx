"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Globe, Lock, Save, Trash, Upload } from "lucide-react"

interface FacultyStudyGroupSettingsProps {
  groupId: string
  group: any
}

export function FacultyStudyGroupSettings({ groupId, group }: FacultyStudyGroupSettingsProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [groupName, setGroupName] = useState(group.name)
  const [groupDescription, setGroupDescription] = useState(group.description)
  const [groupVisibility, setGroupVisibility] = useState(group.visibility)
  const [allowStudentPosts, setAllowStudentPosts] = useState(true)
  const [allowStudentUploads, setAllowStudentUploads] = useState(true)
  const [allowStudentEvents, setAllowStudentEvents] = useState(false)
  const [notifyDashboard, setNotifyDashboard] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showArchiveDialog, setShowArchiveDialog] = useState(false)

  const handleSaveSettings = () => {
    // In a real app, you'd call an API to save the settings
    console.log("Saving settings:", {
      name: groupName,
      description: groupDescription,
      visibility: groupVisibility,
      permissions: {
        allowStudentPosts,
        allowStudentUploads,
        allowStudentEvents,
        notifyDashboard,
      },
    })
  }

  const handleDeleteGroup = () => {
    // In a real app, you'd call an API to delete the group
    console.log("Deleting group:", groupId)
    // Redirect to the groups list page
    window.location.href = "/faculty/study-groups"
  }

  const handleArchiveGroup = () => {
    // In a real app, you'd call an API to archive the group
    console.log("Archiving group:", groupId)
    setShowArchiveDialog(false)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Group Information</CardTitle>
              <CardDescription>Update your group's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name</Label>
                <Input id="name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input id="course" defaultValue={group.course} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" defaultValue={group.tags.join(", ")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Group Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 rounded-md border-2 border-dashed flex items-center justify-center bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button type="button" variant="outline">
                    Change Image
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Group Visibility</Label>
                <RadioGroup value={groupVisibility} onValueChange={setGroupVisibility}>
                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="public" id="public" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="public" className="flex items-center gap-2 font-medium">
                        <Globe className="h-4 w-4 text-green-500" />
                        Public
                      </Label>
                      <p className="text-sm text-gray-500">
                        Anyone can find and join this group. All content is visible to members.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="private" id="private" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="private" className="flex items-center gap-2 font-medium">
                        <Lock className="h-4 w-4 text-amber-500" />
                        Private
                      </Label>
                      <p className="text-sm text-gray-500">
                        The group is visible in search but requires faculty approval to join.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="course-enrolled" id="course-enrolled" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="course-enrolled" className="flex items-center gap-2 font-medium">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        Course-Enrolled Only
                      </Label>
                      <p className="text-sm text-gray-500">
                        Only students enrolled in the specified course can join this group.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleSaveSettings} className="gap-2 bg-[#0033A0] hover:bg-[#002180]">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Permissions & Access</CardTitle>
              <CardDescription>Control what students can do in your group</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="student-posts">Allow Student Posts</Label>
                    <p className="text-sm text-gray-500">Let students create posts and participate in discussions</p>
                  </div>
                  <Switch id="student-posts" checked={allowStudentPosts} onCheckedChange={setAllowStudentPosts} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="student-uploads">Allow Student Uploads</Label>
                    <p className="text-sm text-gray-500">Let students upload and share study materials</p>
                  </div>
                  <Switch id="student-uploads" checked={allowStudentUploads} onCheckedChange={setAllowStudentUploads} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="student-events">Allow Student Events</Label>
                    <p className="text-sm text-gray-500">Let students create and schedule group events</p>
                  </div>
                  <Switch id="student-events" checked={allowStudentEvents} onCheckedChange={setAllowStudentEvents} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-dashboard">Show Announcements on Dashboard</Label>
                    <p className="text-sm text-gray-500">Important announcements will appear on student dashboards</p>
                  </div>
                  <Switch id="notify-dashboard" checked={notifyDashboard} onCheckedChange={setNotifyDashboard} />
                </div>
              </div>
              <Button onClick={handleSaveSettings} className="gap-2 bg-[#0033A0] hover:bg-[#002180]">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Co-Administrators</CardTitle>
              <CardDescription>Manage teaching assistants or other faculty as co-administrators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Search by name or email..." className="flex-1" />
                <Button variant="outline">Add</Button>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium">MC</span>
                    </div>
                    <div>
                      <div className="font-medium">Michael Chen</div>
                      <div className="text-xs text-gray-500">Teaching Assistant • Added Sep 16, 2024</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Member Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified when someone joins the group</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Message Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified for new messages in the group chat</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Resource Upload Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified when new resources are uploaded</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Meeting Reminders</Label>
                    <p className="text-sm text-gray-500">Get reminders before scheduled meetings</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive email notifications in addition to in-app alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button onClick={handleSaveSettings} className="gap-2 bg-[#0033A0] hover:bg-[#002180]">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-4 pt-4">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>These actions cannot be undone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-red-200 p-4">
                <h3 className="font-medium">Archive Group</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Archiving will make the group read-only. No new content can be added, but existing content will still
                  be accessible.
                </p>
                <AlertDialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="mt-4">
                      Archive Group
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Archive this group?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will make the group read-only. Members will still be able to view content but won't be able
                        to add new content.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleArchiveGroup} className="bg-amber-600 hover:bg-amber-700">
                        Archive
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="rounded-md border border-red-200 p-4">
                <h3 className="font-medium text-red-600">Delete Group</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Permanently delete this group and all its content. This action cannot be undone.
                </p>
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="mt-4 gap-2">
                      <Trash className="h-4 w-4" />
                      Delete Group
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the "{group.name}" group and all of
                        its data, including messages, files, and other content.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteGroup} className="bg-red-600 hover:bg-red-700">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
