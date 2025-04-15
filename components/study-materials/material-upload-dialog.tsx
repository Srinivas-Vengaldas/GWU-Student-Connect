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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { X, Upload, Calendar, LinkIcon, AlertTriangle } from "lucide-react"

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
  const [isReplacement, setIsReplacement] = useState(false)
  const [expirationEnabled, setExpirationEnabled] = useState(false)
  const [expirationDate, setExpirationDate] = useState("")
  const [hasSolutions, setHasSolutions] = useState(false)
  const [isVersionUpdate, setIsVersionUpdate] = useState(false)
  const [versionNotes, setVersionNotes] = useState("")
  const [selectedStudyGroups, setSelectedStudyGroups] = useState<string[]>([])
  const [allowComments, setAllowComments] = useState(true)
  const [allowDownloads, setAllowDownloads] = useState(true)
  const [isPrivate, setIsPrivate] = useState(false)
  const [password, setPassword] = useState("")

  // Mock study groups data
  const studyGroups = [
    { id: "sg1", name: "Calculus Study Group" },
    { id: "sg2", name: "Psychology Research Team" },
    { id: "sg3", name: "Computer Science Club" },
    { id: "sg4", name: "Chemistry Lab Partners" },
  ]

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

  const toggleStudyGroup = (groupId: string) => {
    setSelectedStudyGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId],
    )
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
      isReplacement,
      expirationEnabled,
      expirationDate: expirationEnabled ? expirationDate : null,
      hasSolutions,
      isVersionUpdate,
      versionNotes: isVersionUpdate ? versionNotes : null,
      selectedStudyGroups,
      allowComments,
      allowDownloads,
      isPrivate,
      password: isPrivate ? password : null,
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
    setIsReplacement(false)
    setExpirationEnabled(false)
    setExpirationDate("")
    setHasSolutions(false)
    setIsVersionUpdate(false)
    setVersionNotes("")
    setSelectedStudyGroups([])
    setAllowComments(true)
    setAllowDownloads(true)
    setIsPrivate(false)
    setPassword("")

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="details">Material Details</TabsTrigger>
            <TabsTrigger value="sharing">Sharing Options</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="file">Select File</Label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="is-replacement"
                    checked={isReplacement}
                    onCheckedChange={(checked) => setIsReplacement(checked as boolean)}
                  />
                  <Label htmlFor="is-replacement" className="text-sm">
                    Replace existing file
                  </Label>
                </div>
              </div>
              <Input
                id="file"
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.png,.mp4,.mov"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">
                Accepted file types: PDF, Word, PowerPoint, Excel, Images, Videos (max 50MB)
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

            {isReplacement && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-version-update">Mark as version update</Label>
                  <Checkbox
                    id="is-version-update"
                    checked={isVersionUpdate}
                    onCheckedChange={(checked) => setIsVersionUpdate(checked as boolean)}
                  />
                </div>

                {isVersionUpdate && (
                  <div className="space-y-2">
                    <Label htmlFor="version-notes">Version Notes</Label>
                    <Textarea
                      id="version-notes"
                      placeholder="Describe what changed in this version"
                      rows={2}
                      value={versionNotes}
                      onChange={(e) => setVersionNotes(e.target.value)}
                    />
                  </div>
                )}
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

            <div className="flex items-center gap-2">
              <Checkbox
                id="has-solutions"
                checked={hasSolutions}
                onCheckedChange={(checked) => setHasSolutions(checked as boolean)}
              />
              <Label htmlFor="has-solutions">This material contains solutions or answers</Label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="expiration-enabled">Set expiration date</Label>
                <Checkbox
                  id="expiration-enabled"
                  checked={expirationEnabled}
                  onCheckedChange={(checked) => setExpirationEnabled(checked as boolean)}
                />
              </div>

              {expirationEnabled && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <Input
                    id="expiration-date"
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              )}
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

            <div className="flex justify-end">
              <Button
                onClick={() => setActiveTab("sharing")}
                disabled={!title}
                className="bg-[#0033A0] hover:bg-[#002180]"
              >
                Next: Sharing Options
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sharing" className="space-y-4 py-4">
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
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private (only visible to people with the link)</Label>
                </div>
              </RadioGroup>
            </div>

            {visibility === "private" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-protected">Password protect this material</Label>
                  <Checkbox
                    id="password-protected"
                    checked={isPrivate}
                    onCheckedChange={(checked) => setIsPrivate(checked as boolean)}
                  />
                </div>

                {isPrivate && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <Label>Share with Study Groups</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {studyGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`group-${group.id}`}
                      checked={selectedStudyGroups.includes(group.id)}
                      onCheckedChange={() => toggleStudyGroup(group.id)}
                    />
                    <Label htmlFor={`group-${group.id}`}>{group.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Access Options</Label>
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-comments" className="text-sm font-normal">
                  Allow comments
                </Label>
                <Checkbox
                  id="allow-comments"
                  checked={allowComments}
                  onCheckedChange={(checked) => setAllowComments(checked as boolean)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-downloads" className="text-sm font-normal">
                  Allow downloads
                </Label>
                <Checkbox
                  id="allow-downloads"
                  checked={allowDownloads}
                  onCheckedChange={(checked) => setAllowDownloads(checked as boolean)}
                />
              </div>
            </div>

            <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-4">
              <h3 className="font-medium text-amber-800 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Copyright Notice
              </h3>
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
          {activeTab === "sharing" && (
            <Button
              onClick={handleSubmit}
              disabled={!title || !selectedFile}
              className="bg-[#0033A0] hover:bg-[#002180]"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
