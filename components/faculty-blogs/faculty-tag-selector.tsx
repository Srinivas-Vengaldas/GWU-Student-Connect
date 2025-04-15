"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function FacultyTagSelector() {
  const [tags, setTags] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const suggestedTags = [
    "Research Methods",
    "Academic Writing",
    "Career Advice",
    "Final Exam",
    "Study Tips",
    "Graduate Studies",
    "Research",
    "AI",
    "Academic Technology",
    "Guest Lecture",
  ]

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(inputValue)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 min-h-[38px] p-2 border rounded-md">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeTag(tag)}
              className="h-4 w-4 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </Button>
          </Badge>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length ? "Add more tags..." : "Add tags..."}
          className="flex-1 min-w-[120px] border-0 p-0 h-7 focus-visible:ring-0"
        />
      </div>

      {inputValue && <div className="text-sm text-muted-foreground">Press Enter or add a comma to create a tag</div>}

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground pt-1">Suggested:</span>
        {suggestedTags
          .filter((tag) => !tags.includes(tag))
          .slice(0, 5)
          .map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={() => addTag(tag)}
            >
              {tag}
            </Badge>
          ))}
      </div>
    </div>
  )
}
