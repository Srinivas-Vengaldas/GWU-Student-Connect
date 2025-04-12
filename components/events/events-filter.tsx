"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "lucide-react"

export function EventsFilter() {
  const [dateRange, setDateRange] = useState("all")

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Date Range</h3>
          <RadioGroup defaultValue="all" onValueChange={setDateRange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Events</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="today" />
              <Label htmlFor="today">Today</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="this-week" id="this-week" />
              <Label htmlFor="this-week">This Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="this-month" id="this-month" />
              <Label htmlFor="this-month">This Month</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom Range</Label>
            </div>
          </RadioGroup>

          {dateRange === "custom" && (
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Calendar className="h-4 w-4" />
                <span>Select Dates</span>
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Event Categories */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Event Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="academic" />
              <Label htmlFor="academic">Academic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="career" />
              <Label htmlFor="career">Career</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="social" />
              <Label htmlFor="social">Social</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="clubs" />
              <Label htmlFor="clubs">Clubs & Organizations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="workshops" />
              <Label htmlFor="workshops">Workshops & Training</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sports" />
              <Label htmlFor="sports">Sports & Recreation</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Event Format */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Event Format</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="in-person" />
              <Label htmlFor="in-person">In-Person</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="virtual" />
              <Label htmlFor="virtual">Virtual</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hybrid" />
              <Label htmlFor="hybrid">Hybrid</Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Attendance */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Attendance</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="free" />
              <Label htmlFor="free">Free Events</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="paid" />
              <Label htmlFor="paid">Paid Events</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rsvp-required" />
              <Label htmlFor="rsvp-required">RSVP Required</Label>
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#0033A0] hover:bg-[#002180]">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}
