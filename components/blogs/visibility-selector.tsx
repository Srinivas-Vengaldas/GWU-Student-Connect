"use client"

import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Globe, Lock, Users, BookOpen, Building2 } from "lucide-react"

interface VisibilitySelectorProps {
  onVisibilityChange?: (visibility: string) => void
  initialVisibility?: string
}

export function VisibilitySelector({ onVisibilityChange, initialVisibility = "public" }: VisibilitySelectorProps) {
  const [visibility, setVisibility] = useState(initialVisibility)

  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(visibility)
    }
  }, [visibility, onVisibilityChange])

  return (
    <RadioGroup value={visibility} onValueChange={setVisibility} className="space-y-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="public" id="public" />
        <Label htmlFor="public" className="flex items-center cursor-pointer">
          <Globe className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">Public</div>
            <div className="text-sm text-gray-500">Anyone can view this post</div>
          </div>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="course" id="course" />
        <Label htmlFor="course" className="flex items-center cursor-pointer">
          <BookOpen className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">Course-specific</div>
            <div className="text-sm text-gray-500">Only visible to members of your course</div>
          </div>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="department" id="department" />
        <Label htmlFor="department" className="flex items-center cursor-pointer">
          <Building2 className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">Department-only</div>
            <div className="text-sm text-gray-500">Only visible to members of your department</div>
          </div>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="followers" id="followers" />
        <Label htmlFor="followers" className="flex items-center cursor-pointer">
          <Users className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">Followers-only</div>
            <div className="text-sm text-gray-500">Only visible to people who follow you</div>
          </div>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="private" id="private" />
        <Label htmlFor="private" className="flex items-center cursor-pointer">
          <Lock className="h-4 w-4 mr-2" />
          <div>
            <div className="font-medium">Private</div>
            <div className="text-sm text-gray-500">Only you can view this post</div>
          </div>
        </Label>
      </div>
    </RadioGroup>
  )
}
