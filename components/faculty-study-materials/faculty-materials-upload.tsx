"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, FileText, FileVideo, FolderPlus, LinkIcon, Loader2, Plus, Upload, X } from "lucide-react"

export function FacultyMaterialsUpload() {
  const [uploadType, setUploadType] = useState("file")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [course, setCourse] = useState("")
  const [visibility, setVisibility] = useState("course")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [collections, setCollections] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [notifyStudents, setNotifyStudents] = useState(false)
  const [scheduleRelease, setScheduleRelease] = useState(false)
  const [releaseDate, setReleaseDate] = useState("")

  // Mock courses data
  const courses = [
    { id: "cs101", name: "CS 101: Introduction to Programming" },
    { id: "cs250", name: "CS 250: Data Structures" },
    { id: "cs350", name: "CS 350: Algorithms" },
    { id: "math241", name: "MATH 241: Calculus I" },
    { id: "phys101", name: "PHYS 101: Introduction to Physics" },
  ]

  // Mock collections data
  const availableCollections = [
    { id: "c1", name: "Week 1 Materials" },
    { id: "c2", name: "Midterm Review Materials" },
    { id: "c3", name: "Assignments" },
    { id: "c4", name: "Supplementary Materials" },
    { id: "c5", name: "Video Lectures" },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      if (!title) {
        // Auto-fill title with file name (without extension)
        const fileName = e.target.files[0].name
        const titleFromFileName = fileName.substring(0, fileName.lastIndexOf(".")) || fileName
        setTitle(titleFromFileName)
      }
    }
  }

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const toggleCollection = (collectionId: string) => {
    if (collections.includes(collectionId)) {
      setCollections(collections.filter((id) => id !== collectionId))
    } else {
      setCollections([...collections, collectionId])
    }
  }

  const handleUpload = () => {
    // Validate form
    if (!title) {
      setUploadError("Please enter a title")
      return
    }

    if (uploadType === "file" && !selectedFile) {
      setUploadError("Please select a file to upload")
      return
    }

    if (uploadType === "link" && !linkUrl) {
      setUploadError("Please enter a valid URL")
      return
    }

    if (!course) {
      setUploadError("Please select a course")
      return
    }

    // Clear any previous errors
    setUploadError(null)
    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setUploadComplete(true)
        setIsUploading(false)
      }
    }, 300)
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setCourse("")
    setVisibility("course")
    setTags([])
    setCurrentTag("")
    setCollections([])
    setSelectedFile(null)
    setLinkUrl("")
    setNotifyStudents(false)
    setScheduleRelease(false)
    setReleaseDate("")
    setUploadComplete(false)
    setUploadProgress(0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Study Materials</CardTitle>
        <CardDescription>Share resources with your students</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadComplete ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium">Upload Complete!</h3>
            <p className="text-gray-500 mt-2 mb-6">Your study material has been successfully uploaded.</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={resetForm}>
                Upload Another
              </Button>
              <Button className="bg-[#0033A0] hover:bg-[#002180]">View Material</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs value={uploadType} onValueChange={setUploadType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Upload File
                </TabsTrigger>
                <TabsTrigger value="link" className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Add Link
                </TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="space-y-4 pt-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-16 w-16 rounded-md bg-gray-100 mb-4">
                        {selectedFile.type.includes("video") ? (
                          <FileVideo className="h-8 w-8 text-pink-500" />
                        ) : (
                          <FileText className="h-8 w-8 text-blue-500" />
                        )}
                      </div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-red-500 hover:text-red-700"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Drag and drop your file here</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-4">or click to browse files</p>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.mp4,.mov,.zip"
                      />
                      <Button asChild variant="outline">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Browse Files
                        </label>
                      </Button>
                      <p className="text-xs text-gray-500 mt-4">
                        Supported formats: PDF, Word, PowerPoint, Excel, Text, Images, Videos, ZIP (Max 100MB)
                      </p>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="link" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="link-url">Resource URL</Label>
                  <Input
                    id="link-url"
                    type="url"
                    placeholder="https://example.com/resource"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Add a link to an external resource like a website, video, or document
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Provide additional details about this material"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={course} onValueChange={setCourse}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger id="visibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone)</SelectItem>
                      <SelectItem value="course">Course-specific</SelectItem>
                      <SelectItem value="department">Department-only</SelectItem>
                      <SelectItem value="private">Private (Only me)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Add to Collections (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {availableCollections.map((collection) => (
                    <div key={collection.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`collection-${collection.id}`}
                        checked={collections.includes(collection.id)}
                        onCheckedChange={() => toggleCollection(collection.id)}
                      />
                      <Label htmlFor={`collection-${collection.id}`} className="text-sm">
                        {collection.name}
                      </Label>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="mt-2 text-[#0033A0]">
                  <FolderPlus className="h-4 w-4 mr-1" />
                  Create New Collection
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notify-students"
                    checked={notifyStudents}
                    onCheckedChange={(checked) => setNotifyStudents(checked as boolean)}
                  />
                  <Label htmlFor="notify-students">Notify students when published</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="schedule-release"
                    checked={scheduleRelease}
                    onCheckedChange={(checked) => setScheduleRelease(checked as boolean)}
                  />
                  <Label htmlFor="schedule-release">Schedule release</Label>
                </div>

                {scheduleRelease && (
                  <div className="pl-6">
                    <Label htmlFor="release-date">Release Date</Label>
                    <Input
                      id="release-date"
                      type="datetime-local"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{uploadError}</p>
                </div>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Uploading...</Label>
                    <span className="text-sm">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0033A0]"
                      style={{ width: `${uploadProgress}%`, transition: "width 0.3s ease-in-out" }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={resetForm} disabled={isUploading}>
                  Cancel
                </Button>
                <Button className="bg-[#0033A0] hover:bg-[#002180]" onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Material
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
