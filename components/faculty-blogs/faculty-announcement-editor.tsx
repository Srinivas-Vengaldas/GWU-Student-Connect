"use client"

import { useState } from "react"
import { Bold, Italic, List, LinkIcon, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FacultyAnnouncementEditor() {
  const [content, setContent] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [location, setLocation] = useState("")

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = document.querySelector("textarea")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    const newText = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end)

    setContent(newText)

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + prefix.length
      textarea.selectionEnd = start + prefix.length + selectedText.length
    }, 0)
  }

  const formatters = [
    { icon: <Bold size={18} />, action: () => insertFormatting("**"), tooltip: "Bold" },
    { icon: <Italic size={18} />, action: () => insertFormatting("*"), tooltip: "Italic" },
    { icon: <List size={18} />, action: () => insertFormatting("- "), tooltip: "Bullet List" },
    { icon: <LinkIcon size={18} />, action: () => insertFormatting("[", "](url)"), tooltip: "Link" },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1 p-1 border rounded-md bg-gray-50">
          <TooltipProvider>
            {formatters.map((formatter, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={formatter.action} className="h-8 w-8 p-0">
                    {formatter.icon}
                    <span className="sr-only">{formatter.tooltip}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{formatter.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        <Textarea
          placeholder="Write your announcement here... Keep it concise and informative."
          className="min-h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="space-y-4 border-t pt-4">
        <div className="space-y-2">
          <Label className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Event Date & Time (Optional)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="Select date"
            />
            <Input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              placeholder="Select time"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Location (Optional)
          </Label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location (e.g., Room 302, Science Building)"
          />
        </div>
      </div>

      {content && (
        <div className="p-4 border rounded-md bg-white">
          <h3 className="text-sm font-medium mb-2">Preview:</h3>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm">{content}</pre>

            {(eventDate || location) && (
              <div className="mt-4 text-sm">
                {eventDate && eventTime && (
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {eventDate} at {eventTime}
                    </span>
                  </div>
                )}

                {location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
