"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarClock, Clock, Plus, Save, Trash } from "lucide-react"
import { format } from "date-fns"

export function FacultyAppointmentAvailability() {
  const [date, setDate] = useState<Date>(new Date())
  const [availabilityEnabled, setAvailabilityEnabled] = useState(true)
  const [timeSlots, setTimeSlots] = useState([{ id: "1", startTime: "2:00 PM", endTime: "4:00 PM" }])

  // Weekly recurring availability
  const [weeklyAvailability, setWeeklyAvailability] = useState({
    monday: { enabled: true, slots: [{ id: "m1", startTime: "2:00 PM", endTime: "4:00 PM" }] },
    wednesday: { enabled: true, slots: [{ id: "w1", startTime: "1:00 PM", endTime: "3:00 PM" }] },
    friday: { enabled: false, slots: [] },
  })

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { id: Date.now().toString(), startTime: "", endTime: "" }])
  }

  const handleRemoveTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
  }

  const handleTimeSlotChange = (id: string, field: "startTime" | "endTime", value: string) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)))
  }

  const handleAddWeeklyTimeSlot = (day: string) => {
    const dayData = weeklyAvailability[day as keyof typeof weeklyAvailability]
    if (dayData) {
      setWeeklyAvailability({
        ...weeklyAvailability,
        [day]: {
          ...dayData,
          slots: [...dayData.slots, { id: Date.now().toString(), startTime: "", endTime: "" }],
        },
      })
    }
  }

  const handleRemoveWeeklyTimeSlot = (day: string, id: string) => {
    const dayData = weeklyAvailability[day as keyof typeof weeklyAvailability]
    if (dayData) {
      setWeeklyAvailability({
        ...weeklyAvailability,
        [day]: {
          ...dayData,
          slots: dayData.slots.filter((slot) => slot.id !== id),
        },
      })
    }
  }

  const handleWeeklyTimeSlotChange = (day: string, id: string, field: "startTime" | "endTime", value: string) => {
    const dayData = weeklyAvailability[day as keyof typeof weeklyAvailability]
    if (dayData) {
      setWeeklyAvailability({
        ...weeklyAvailability,
        [day]: {
          ...dayData,
          slots: dayData.slots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)),
        },
      })
    }
  }

  const handleToggleDay = (day: string, enabled: boolean) => {
    const dayData = weeklyAvailability[day as keyof typeof weeklyAvailability]
    if (dayData) {
      setWeeklyAvailability({
        ...weeklyAvailability,
        [day]: {
          ...dayData,
          enabled,
        },
      })
    }
  }

  const handleSaveAvailability = () => {
    console.log("Saving availability")
    // In a real app, you would save the availability to the database
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Set Availability</h1>
          <p className="text-muted-foreground">Define when you're available for student appointments</p>
        </div>
        <Button className="bg-[#0033A0] hover:bg-[#002180]" onClick={handleSaveAvailability}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

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
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">{format(date, "EEEE, MMMM d, yyyy")}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="availability-toggle">Available for appointments</Label>
                      <Switch
                        id="availability-toggle"
                        checked={availabilityEnabled}
                        onCheckedChange={setAvailabilityEnabled}
                      />
                    </div>

                    {availabilityEnabled && (
                      <div className="space-y-4">
                        {timeSlots.map((slot) => (
                          <div key={slot.id} className="flex items-center space-x-2">
                            <Select
                              value={slot.startTime}
                              onValueChange={(value) => handleTimeSlotChange(slot.id, "startTime", value)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Start" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <span>to</span>
                            <Select
                              value={slot.endTime}
                              onValueChange={(value) => handleTimeSlotChange(slot.id, "endTime", value)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="End" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                                <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveTimeSlot(slot.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                        <Button variant="outline" className="w-full" onClick={handleAddTimeSlot}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Time Slot
                        </Button>
                      </div>
                    )}

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
                      <Label htmlFor="appointment-duration">Default appointment duration</Label>
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
                {/* Monday */}
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">Monday</h3>
                    </div>
                    <Switch
                      checked={weeklyAvailability.monday.enabled}
                      onCheckedChange={(checked) => handleToggleDay("monday", checked)}
                    />
                  </div>
                  {weeklyAvailability.monday.enabled && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        {weeklyAvailability.monday.slots.map((slot) => (
                          <div key={slot.id} className="flex items-center space-x-2">
                            <Select
                              value={slot.startTime}
                              onValueChange={(value) =>
                                handleWeeklyTimeSlotChange("monday", slot.id, "startTime", value)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Start" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <span>to</span>
                            <Select
                              value={slot.endTime}
                              onValueChange={(value) => handleWeeklyTimeSlotChange("monday", slot.id, "endTime", value)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="End" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                                <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveWeeklyTimeSlot("monday", slot.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleAddWeeklyTimeSlot("monday")}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Time Slot
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* Wednesday */}
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">Wednesday</h3>
                    </div>
                    <Switch
                      checked={weeklyAvailability.wednesday.enabled}
                      onCheckedChange={(checked) => handleToggleDay("wednesday", checked)}
                    />
                  </div>
                  {weeklyAvailability.wednesday.enabled && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        {weeklyAvailability.wednesday.slots.map((slot) => (
                          <div key={slot.id} className="flex items-center space-x-2">
                            <Select
                              value={slot.startTime}
                              onValueChange={(value) =>
                                handleWeeklyTimeSlotChange("wednesday", slot.id, "startTime", value)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Start" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <span>to</span>
                            <Select
                              value={slot.endTime}
                              onValueChange={(value) =>
                                handleWeeklyTimeSlotChange("wednesday", slot.id, "endTime", value)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="End" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                                <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveWeeklyTimeSlot("wednesday", slot.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleAddWeeklyTimeSlot("wednesday")}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Time Slot
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {/* Friday */}
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">Friday</h3>
                    </div>
                    <Switch
                      checked={weeklyAvailability.friday.enabled}
                      onCheckedChange={(checked) => handleToggleDay("friday", checked)}
                    />
                  </div>
                  {weeklyAvailability.friday.enabled && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        {weeklyAvailability.friday.slots.map((slot) => (
                          <div key={slot.id} className="flex items-center space-x-2">
                            <Select
                              value={slot.startTime}
                              onValueChange={(value) =>
                                handleWeeklyTimeSlotChange("friday", slot.id, "startTime", value)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Start" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <span>to</span>
                            <Select
                              value={slot.endTime}
                              onValueChange={(value) => handleWeeklyTimeSlotChange("friday", slot.id, "endTime", value)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="End" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                                <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveWeeklyTimeSlot("friday", slot.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleAddWeeklyTimeSlot("friday")}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Time Slot
                        </Button>
                      </div>
                    </>
                  )}
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
  )
}
