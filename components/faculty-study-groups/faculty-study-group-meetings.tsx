"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  CalendarPlus,
  Clock,
  Edit,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Trash,
  Users,
  Video,
} from "lucide-react"

interface FacultyStudyGroupMeetingsProps {
  groupId: string
  limit?: number
  showViewAll?: boolean
}

export function FacultyStudyGroupMeetings({ groupId, limit, showViewAll = false }: FacultyStudyGroupMeetingsProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null)
  const [meetingTitle, setMeetingTitle] = useState("")
  const [meetingDescription, setMeetingDescription] = useState("")
  const [meetingDate, setMeetingDate] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [meetingEndTime, setMeetingEndTime] = useState("")
  const [meetingType, setMeetingType] = useState("in-person")
  const [meetingLocation, setMeetingLocation] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringPattern, setRecurringPattern] = useState("weekly")

  // Mock meetings data
  const meetings = [
    {
      id: "1",
      title: "Advanced Algorithms Discussion",
      description: "We'll be discussing efficient algorithm design and optimization techniques.",
      date: "Friday, October 7",
      time: "3:00 PM - 5:00 PM",
      location: "Computer Science Building, Room 305",
      type: "in-person",
      organizer: {
        id: "1",
        name: "Dr. Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      attendees: 22,
      going: ["1", "2", "3"],
      maybe: ["4", "5"],
      notGoing: ["6"],
      recurring: true,
      recurringPattern: "weekly",
    },
    {
      id: "2",
      title: "Red-Black Trees Workshop",
      description: "Hands-on session working with red-black tree implementations and balancing algorithms.",
      date: "Monday, October 10",
      time: "4:00 PM - 6:00 PM",
      location: "Computer Science Building, Room 201",
      type: "in-person",
      organizer: {
        id: "1",
        name: "Dr. Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      attendees: 18,
      going: ["1", "2", "7"],
      maybe: ["3", "4"],
      notGoing: [],
    },
    {
      id: "3",
      title: "Virtual Office Hours",
      description: "Open session for questions about recent topics and upcoming assignments.",
      date: "Wednesday, October 12",
      time: "5:00 PM - 6:30 PM",
      location: "https://gwu.zoom.us/j/123456789",
      type: "virtual",
      organizer: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      attendees: 15,
      going: ["1", "2", "3", "4", "5"],
      maybe: ["6", "7"],
      notGoing: ["8"],
    },
  ]

  // Limit the number of meetings shown if limit is provided
  const displayedMeetings = limit ? meetings.slice(0, limit) : meetings

  const handleCreateMeeting = () => {
    // In a real app, you'd call an API to create a meeting
    console.log("Creating meeting:", {
      title: meetingTitle,
      description: meetingDescription,
      date: meetingDate,
      time: meetingTime,
      endTime: meetingEndTime,
      type: meetingType,
      location: meetingLocation,
      recurring: isRecurring,
      recurringPattern: isRecurring ? recurringPattern : null,
    })

    // Reset form fields
    setMeetingTitle("")
    setMeetingDescription("")
    setMeetingDate("")
    setMeetingTime("")
    setMeetingEndTime("")
    setMeetingType("in-person")
    setMeetingLocation("")
    setIsRecurring(false)
    setRecurringPattern("weekly")

    setShowCreateDialog(false)
  }

  const openMeetingDetails = (meeting: any) => {
    setSelectedMeeting(meeting)
    setShowDetailsDialog(true)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Meetings & Events</CardTitle>
            <CardDescription>Upcoming study sessions and events</CardDescription>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
                <CalendarPlus className="h-4 w-4" />
                <span>Create</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Meeting</DialogTitle>
                <DialogDescription>Schedule a new study session or event for your group.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter meeting title"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose of this meeting"
                    value={meetingDescription}
                    onChange={(e) => setMeetingDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time">Start Time</Label>
                    <Input id="time" type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={meetingEndTime}
                      onChange={(e) => setMeetingEndTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Meeting Type</Label>
                  <RadioGroup value={meetingType} onValueChange={setMeetingType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person">In-Person</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="virtual" id="virtual" />
                      <Label htmlFor="virtual">Virtual</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder={meetingType === "virtual" ? "Enter meeting link" : "Enter location"}
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="recurring">Recurring meeting</Label>
                </div>
                {isRecurring && (
                  <div className="space-y-2">
                    <Label htmlFor="recurringPattern">Recurring Pattern</Label>
                    <select
                      id="recurringPattern"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={recurringPattern}
                      onChange={(e) => setRecurringPattern(e.target.value)}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateMeeting} className="bg-[#0033A0] hover:bg-[#002180]">
                  Create Meeting
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayedMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => openMeetingDetails(meeting)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-[#0033A0]">{meeting.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      {meeting.type === "in-person" ? (
                        <MapPin className="mr-1 h-4 w-4" />
                      ) : (
                        <Video className="mr-1 h-4 w-4" />
                      )}
                      <span className="truncate max-w-[200px]">{meeting.location}</span>
                    </div>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                          <Trash className="mr-2 h-4 w-4" />
                          Cancel Meeting
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{meeting.attendees} attending</span>
                    {meeting.recurring && (
                      <Badge variant="outline" className="text-xs">
                        Recurring
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {meetings.length === 0 && (
              <div className="text-center py-4 text-gray-500">No upcoming meetings scheduled.</div>
            )}

            {showViewAll && meetings.length > limit! && (
              <div className="text-center pt-2">
                <Link href={`/faculty/study-groups/${groupId}?tab=meetings`}>
                  <Button variant="link" className="text-[#0033A0]">
                    View all {meetings.length} meetings
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Meeting Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        {selectedMeeting && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedMeeting.title}</DialogTitle>
              <DialogDescription>Organized by {selectedMeeting.organizer.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-gray-700">{selectedMeeting.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{selectedMeeting.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{selectedMeeting.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  {selectedMeeting.type === "in-person" ? (
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  ) : (
                    <Video className="mr-2 h-4 w-4 text-gray-500" />
                  )}
                  <span>{selectedMeeting.location}</span>
                  {selectedMeeting.type === "virtual" && (
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                {selectedMeeting.recurring && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-500">
                      Recurring:{" "}
                      {selectedMeeting.recurringPattern === "weekly" ? "Weekly" : selectedMeeting.recurringPattern}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Attendees ({selectedMeeting.attendees})</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMeeting.going.length > 0 && (
                    <div>
                      <Badge variant="default" className="bg-green-500 mb-2">
                        Going ({selectedMeeting.going.length})
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {selectedMeeting.going.map((id: string) => (
                          <Avatar key={id} className="h-6 w-6">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMeeting.maybe.length > 0 && (
                    <div>
                      <Badge variant="outline" className="mb-2">
                        Maybe ({selectedMeeting.maybe.length})
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {selectedMeeting.maybe.map((id: string) => (
                          <Avatar key={id} className="h-6 w-6">
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="sm:flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button className="sm:flex-1 bg-[#0033A0] hover:bg-[#002180]">
                <Edit className="mr-2 h-4 w-4" />
                Edit Meeting
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
