import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarClock, Clock, Plus, Settings, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Manage Availability | GW Connect",
  description: "Set your availability for student appointments",
}

export default function FacultyAvailabilityPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Availability</h1>
          <p className="text-muted-foreground">
            Set your availability for student appointments and manage your preferences
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
          <Button className="bg-[#0033A0] hover:bg-[#002180]">
            <Users className="mr-2 h-4 w-4" />
            View Appointments
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5">
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList>
              <TabsTrigger value="calendar" className="flex items-center">
                <CalendarClock className="mr-2 h-4 w-4" />
                Calendar View
              </TabsTrigger>
              <TabsTrigger value="recurring" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Recurring Hours
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Set Daily Availability</CardTitle>
                  <CardDescription>Select dates and set specific hours for student appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Calendar mode="single" className="rounded-md border" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">May 15, 2023</h3>
                        <p className="text-sm text-muted-foreground">Monday</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="availability-toggle">Available for appointments</Label>
                          <Switch id="availability-toggle" defaultChecked />
                        </div>

                        <div className="grid gap-4">
                          <div className="flex items-center justify-between rounded-md border p-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>2:00 PM - 4:00 PM</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                          <Button variant="outline" className="flex items-center">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Time Slot
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="max-appointments">Maximum appointments per day</Label>
                          <Select defaultValue="3">
                            <SelectTrigger id="max-appointments">
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 appointment</SelectItem>
                              <SelectItem value="2">2 appointments</SelectItem>
                              <SelectItem value="3">3 appointments</SelectItem>
                              <SelectItem value="4">4 appointments</SelectItem>
                              <SelectItem value="5">5 appointments</SelectItem>
                              <SelectItem value="unlimited">No limit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="appointment-duration">Appointment duration</Label>
                          <Select defaultValue="30">
                            <SelectTrigger id="appointment-duration">
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
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button className="bg-[#0033A0] hover:bg-[#002180]">Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="recurring" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Set Recurring Availability</CardTitle>
                  <CardDescription>Configure your regular weekly office hours for student appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">Monday</h3>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>2:00 PM - 4:00 PM</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Time Slot
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">Wednesday</h3>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>1:00 PM - 3:00 PM</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Time Slot
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Day
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset</Button>
                  <Button className="bg-[#0033A0] hover:bg-[#002180]">Save Schedule</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Settings</CardTitle>
                <CardDescription>Configure your appointment preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="accepting-toggle">Accepting Appointments</Label>
                    <Switch id="accepting-toggle" defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Toggle off to temporarily stop receiving new appointment requests
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Who can book appointments</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select who can book" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="department">Students in my Department</SelectItem>
                      <SelectItem value="classes">Students in my Classes</SelectItem>
                      <SelectItem value="approved">Approved Students Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Appointment buffer time</Label>
                  <Select defaultValue="15">
                    <SelectTrigger>
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
                  <p className="text-xs text-muted-foreground">Time between consecutive appointments</p>
                </div>

                <div className="space-y-2">
                  <Label>Advance notice required</Label>
                  <Select defaultValue="24">
                    <SelectTrigger>
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="virtual-toggle">Allow Virtual Meetings</Label>
                    <Switch id="virtual-toggle" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="inperson-toggle">Allow In-Person Meetings</Label>
                    <Switch id="inperson-toggle" defaultChecked />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Office Location (for in-person)</Label>
                  <Input defaultValue="Science & Engineering Hall, Room 4000" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0033A0] hover:bg-[#002180]">Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
