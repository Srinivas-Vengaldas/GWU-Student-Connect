"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TagSelectorProps {
  onTagsChange?: (tags: string[]) => void
  initialTags?: string[]
}

export function TagSelector({ onTagsChange, initialTags = [] }: TagSelectorProps) {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    if (onTagsChange) {
      onTagsChange(tags)
    }
  }, [tags, onTagsChange])

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()]
      setTags(newTags)
      setInputValue("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  // Suggested tags
  const suggestedTags = [
    "Study Tips",
    "Research",
    "Career",
    "Campus Life",
    "Technology",
    "Mental Health",
    "Internships",
    "Productivity",
    "Courses",
    "Student Life",
  ].filter((tag) => !tags.includes(tag))

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Add a tag..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button type="button" onClick={handleAddTag} disabled={!inputValue.trim()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-2 py-1">
            {tag}
            <button type="button" onClick={() => handleRemoveTag(tag)} className="rounded-full hover:bg-gray-200 p-0.5">
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
      </div>

      {tags.length === 0 && (
        <p className="text-sm text-gray-500">No tags added yet. Tags help others discover your post.</p>
      )}

      {suggestedTags.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.slice(0, 8).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  if (!tags.includes(tag)) {
                    setTags([...tags, tag])
                  }
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
