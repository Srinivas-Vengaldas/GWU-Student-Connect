import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, MapPin, Upload } from "lucide-react"
import Link from "next/link"

export default function CreateEventPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="student" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-6">
            {/* Back Button */}
            <div>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link href="/student/events">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Events</span>
                </Link>
              </Button>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">Create New Event</h1>
              <p className="text-muted-foreground">Fill out the form below to create a new event</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Provide the basic information about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="Enter event title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea id="description" placeholder="Describe your event" className="min-h-[150px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="clubs">Clubs & Organizations</SelectItem>
                        <SelectItem value="workshops">Workshops & Training</SelectItem>
                        <SelectItem value="sports">Sports & Recreation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Event Format</Label>
                    <Select>
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input id="date" type="date" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input id="time-start" type="time" className="pl-10" />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input id="time-end" type="time" className="pl-10" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input id="location" placeholder="Enter location" className="pl-10" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="image">Event Image</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop an image, or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">Recommended size: 1200 x 600 pixels</p>
                    <Input id="image" type="file" className="hidden" />
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Image
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Event Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="rsvp">Require RSVP</Label>
                      <p className="text-sm text-gray-500">Attendees must RSVP to attend this event</p>
                    </div>
                    <Switch id="rsvp" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="capacity">Limit Capacity</Label>
                      <p className="text-sm text-gray-500">Set a maximum number of attendees</p>
                    </div>
                    <Switch id="capacity" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Request Featured Status</Label>
                      <p className="text-sm text-gray-500">Request to have this event featured on the events page</p>
                    </div>
                    <Switch id="featured" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="calendar">Add to GW Calendar</Label>
                      <p className="text-sm text-gray-500">Submit this event to the official GW Calendar</p>
                    </div>
                    <Switch id="calendar" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/student/events">Cancel</Link>
              </Button>
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-[#0033A0] hover:bg-[#002180]">Create Event</Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
