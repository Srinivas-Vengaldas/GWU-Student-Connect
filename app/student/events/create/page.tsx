"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Clock, MapPin, Upload } from "lucide-react"
import Link from "next/link"
import { useEvents } from "@/contexts/events-context"
import { PageLayout } from "@/components/page-layout"

export default function CreateEventPage() {
  const router = useRouter()
  const { addEvent } = useEvents()

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
    image: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Add the new event
    addEvent({
      ...formData,
      date: formData.date, // In a real app, you'd format this properly
    })

    // Show success message
    alert("Event created successfully!")

    // Redirect to events page
    router.push("/student/events")
  }

  const categories = ["Academic", "Career", "Clubs", "Networking", "Social", "Sports", "Workshop", "Other"]

  return (
    <PageLayout role="student">
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
          <h1 className="text-2xl font-bold tracking-tight">Create Event</h1>
          <p className="text-muted-foreground">Create a new event for the GW community</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Fill out the form below to create your event. All fields are required unless marked as optional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        name="date"
                        type="text"
                        placeholder="May 15, 2024"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <div className="relative">
                      <Input
                        id="time"
                        name="time"
                        type="text"
                        placeholder="10:00 AM - 4:00 PM"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                      <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <Input
                      id="location"
                      name="location"
                      placeholder="Enter event location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                    <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Event Image (Optional)</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <Button type="button" variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Image</span>
                    </Button>
                    <span className="text-sm text-gray-500">No file selected</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended image size: 1200x600 pixels. Max file size: 5MB.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/student/events">Cancel</Link>
                </Button>
                <Button type="submit" className="bg-[#0033A0] hover:bg-[#002180]">
                  Create Event
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
