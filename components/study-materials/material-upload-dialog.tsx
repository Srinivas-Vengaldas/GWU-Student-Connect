"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface MaterialUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MaterialUploadDialog({ open, onOpenChange }: MaterialUploadDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [course, setCourse] = useState("")
  const [subject, setSubject] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [license, setLicense] = useState("free")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [activeTab, setActiveTab] = useState("upload")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    // In a real app, you'd call an API to upload the material
    console.log("Uploading material:", {
      title,
      description,
      course,
      subject,
      visibility,
      license,
      tags,
      file: selectedFile,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setCourse("")
    setSubject("")
    setVisibility("public")
    setLicense("free")
    setTags([])
    setCurrentTag("")
    setSelectedFile(null)

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Study Material</DialogTitle>
          <DialogDescription>
            Share your notes, study guides, or other academic resources with your peers.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="details">Material Details</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.png"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">
                Accepted file types: PDF, Word, PowerPoint, Excel, Images (max 50MB)
              </p>
            </div>

            {selectedFile && (
              <div className="rounded-md border p-4">
                <h3 className="font-medium">Selected File</h3>
                <p className="text-sm text-gray-500">
                  {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={() => setActiveTab("details")}
                disabled={!selectedFile}
                className="bg-[#0033A0] hover:bg-[#002180]"
              >
                Next: Add Details
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this material contains and how it might be helpful"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  placeholder="e.g., MATH 1231"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="psychology">Psychology</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add tags (press Enter after each tag)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="rounded-full hover:bg-gray-200 p-0.5"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup value={visibility} onValueChange={setVisibility}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public (visible to everyone)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="course" id="course" />
                  <Label htmlFor="course">Course-specific (only visible to students in this course)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>License</Label>
              <RadioGroup value={license} onValueChange={setLicense}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free">Free to use</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="attribution" id="attribution" />
                  <Label htmlFor="attribution">Attribution required</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-commercial" id="non-commercial" />
                  <Label htmlFor="non-commercial">Non-commercial use only</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-4">
              <h3 className="font-medium text-amber-800">Copyright Notice</h3>
              <p className="text-sm text-amber-700">
                By uploading this material, you confirm that you have the right to share it and that it does not violate
                any copyright laws. Do not upload copyrighted textbooks or materials without permission.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {activeTab === "details" && (
            <Button
              onClick={handleSubmit}
              disabled={!title || !selectedFile}
              className="bg-[#0033A0] hover:bg-[#002180]"
            >
              Upload Material
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
