"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Loader2, Plus, Trash2, X } from "lucide-react"
import Link from "next/link"

interface FacultyProfileSettingsProps {
  onSave: () => void
}

export function FacultyProfileSettings({ onSave }: FacultyProfileSettingsProps) {
  // Default profile data
  const defaultProfile = {
    name: "Dr. Sarah Williams",
    title: "Associate Professor",
    department: "Computer Science",
    school: "School of Engineering & Applied Science",
    officeLocation: "Science & Engineering Hall, Room 4550",
    contactEmail: "sarah.williams@gwconnect.edu",
    phoneNumber: "(202) 555-1234",
    showPhoneNumber: false,
    bio: "Computer Science professor specializing in artificial intelligence and machine learning. My research focuses on developing new algorithms for natural language processing and computer vision applications.",
    researchInterests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Natural Language Processing",
      "Computer Vision",
    ],
    coursesTaught: ["CS 1011: Intro to Programming", "CS 2461: Data Structures", "CS 6511: AI Principles"],
    education: [
      "Ph.D. in Computer Science, MIT, 2010",
      "M.S. in Computer Science, Stanford University, 2006",
      "B.S. in Computer Engineering, Georgia Tech, 2004",
    ],
    languages: ["English (Native)", "Spanish (Intermediate)", "French (Basic)"],
    links: {
      googleScholar: "scholar.google.com/citations?user=sarahwilliams",
      linkedin: "linkedin.com/in/sarahwilliams",
      researchGate: "researchgate.net/profile/Sarah-Williams",
      personalWebsite: "sarahwilliams.edu",
      github: "github.com/sarahwilliams",
    },
    linkVisibility: {
      googleScholar: true,
      linkedin: true,
      researchGate: true,
      personalWebsite: true,
      github: false,
    },
    officeHours: [
      { day: "Monday", startTime: "14:00", endTime: "16:00", location: "Office" },
      { day: "Wednesday", startTime: "10:00", endTime: "12:00", location: "Virtual (Zoom)" },
    ],
    showOfficeHours: true,
    visibility: {
      studyGroups: "enrolled",
      studyMaterials: "public",
      blogPosts: "public",
      officeHours: "public",
      contactEmail: true,
    },
    profileVisibility: "public",
    avatar: "/placeholder.svg?height=128&width=128",
  }

  const [profile, setProfile] = useState(defaultProfile)
  const [isLoading, setIsLoading] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [newOfficeHour, setNewOfficeHour] = useState({
    day: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    location: "Office",
  })
  const [showOfficeHourForm, setShowOfficeHourForm] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: string, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (parent: string, field: string, value: string | boolean) => {
    setProfile((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      try {
        // Simulate image upload
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setProfile((prev) => ({ ...prev, avatar: URL.createObjectURL(e.target.files![0]) }))
      } catch (error) {
        console.error("Error uploading image:", error)
      } finally {
        setIsUploading(false)
        setShowImageUpload(false)
      }
    }
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSave()
    }, 1000)
  }

  const handleAddOfficeHour = () => {
    setProfile((prev) => ({
      ...prev,
      officeHours: [...prev.officeHours, newOfficeHour],
    }))
    setNewOfficeHour({
      day: "Monday",
      startTime: "09:00",
      endTime: "10:00",
      location: "Office",
    })
    setShowOfficeHourForm(false)
  }

  const handleRemoveOfficeHour = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      officeHours: prev.officeHours.filter((_, i) => i !== index),
    }))
  }

  const handleAddItem = (field: string, value: string) => {
    if (!value.trim()) return

    setProfile((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), value],
    }))
  }

  const handleRemoveItem = (field: string, index: number) => {
    setProfile((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index),
    }))
  }

  const schools = [
    "College of Arts & Sciences",
    "School of Engineering & Applied Science",
    "School of Business",
    "School of Medicine & Health Sciences",
    "Law School",
    "Graduate School of Education & Human Development",
  ]

  const departments = {
    "College of Arts & Sciences": ["Psychology", "Biology", "Chemistry", "Political Science", "Economics", "History"],
    "School of Engineering & Applied Science": [
      "Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Biomedical Engineering",
    ],
    "School of Business": ["Finance", "Marketing", "Management", "Accounting", "International Business"],
    "School of Medicine & Health Sciences": ["Medicine", "Public Health", "Physician Assistant", "Physical Therapy"],
    "Law School": ["Law"],
    "Graduate School of Education & Human Development": ["Education", "Counseling", "Human Development"],
  }

  const titles = [
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Adjunct Professor",
    "Visiting Professor",
    "Professor Emeritus",
    "Lecturer",
    "Instructor",
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4)
    const minute = (i % 4) * 15
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  })

  const visibilityOptions = [
    { value: "public", label: "Public (All Users)" },
    { value: "university", label: "University Only" },
    { value: "enrolled", label: "Enrolled Students Only" },
    { value: "hidden", label: "Hidden" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Faculty Profile Settings</h3>
          <p className="text-sm text-muted-foreground">
            Update your professional profile information and how you appear to students.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(!previewMode)}
            className={previewMode ? "bg-[#0033A0] hover:bg-[#002180]" : ""}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? "Exit Preview" : "Preview Profile"}
          </Button>
        </div>
      </div>

      {previewMode ? (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Profile Preview</CardTitle>
            <CardDescription>This is how your profile appears to others.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 border-4 border-white bg-white">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback className="text-2xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.title}</p>
                  <p className="text-sm">{profile.department}</p>
                  <p className="text-sm">{profile.school}</p>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="font-medium">About</h3>
                  <p className="mt-2 text-sm">{profile.bio}</p>
                </div>

                <div>
                  <h3 className="font-medium">Research Interests</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.researchInterests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Courses Taught</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    {profile.coursesTaught.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium">Education</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    {profile.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>

                {profile.showOfficeHours && (
                  <div>
                    <h3 className="font-medium">Office Hours</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      {profile.officeHours.map((hour, index) => (
                        <li key={index}>
                          {hour.day}: {hour.startTime} - {hour.endTime} ({hour.location})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-medium">Contact Information</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Office: {profile.officeLocation}</p>
                    {profile.visibility.contactEmail && <p>Email: {profile.contactEmail}</p>}
                    {profile.showPhoneNumber && <p>Phone: {profile.phoneNumber}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Professional Links</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    {profile.linkVisibility.googleScholar && (
                      <p>
                        <a href={`https://${profile.links.googleScholar}`} className="text-blue-600 hover:underline">
                          Google Scholar
                        </a>
                      </p>
                    )}
                    {profile.linkVisibility.linkedin && (
                      <p>
                        <a href={`https://${profile.links.linkedin}`} className="text-blue-600 hover:underline">
                          LinkedIn
                        </a>
                      </p>
                    )}
                    {profile.linkVisibility.researchGate && (
                      <p>
                        <a href={`https://${profile.links.researchGate}`} className="text-blue-600 hover:underline">
                          ResearchGate
                        </a>
                      </p>
                    )}
                    {profile.linkVisibility.personalWebsite && (
                      <p>
                        <a href={`https://${profile.links.personalWebsite}`} className="text-blue-600 hover:underline">
                          Personal Website
                        </a>
                      </p>
                    )}
                    {profile.linkVisibility.github && (
                      <p>
                        <a href={`https://${profile.links.github}`} className="text-blue-600 hover:underline">
                          GitHub
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setPreviewMode(false)} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
              Return to Edit Mode
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="bio">Bio & Background</TabsTrigger>
            <TabsTrigger value="links">Academic Links</TabsTrigger>
            <TabsTrigger value="hours">Office Hours</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your core professional details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-white bg-white">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                        <AvatarFallback className="text-lg">
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute right-0 bottom-0 rounded-full p-1 h-8 w-8"
                        onClick={() => setShowImageUpload(!showImageUpload)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    {showImageUpload && (
                      <div className="mt-4 space-y-2">
                        <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowImageUpload(false)}
                            disabled={isUploading}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#0033A0] hover:bg-[#002180]"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              "Upload"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={profile.name} onChange={(e) => handleChange("name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Select value={profile.title} onValueChange={(value) => handleChange("title", value)}>
                          <SelectTrigger id="title">
                            <SelectValue placeholder="Select your title" />
                          </SelectTrigger>
                          <SelectContent>
                            {titles.map((title) => (
                              <SelectItem key={title} value={title}>
                                {title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="school">School</Label>
                        <Select value={profile.school} onValueChange={(value) => handleChange("school", value)}>
                          <SelectTrigger id="school">
                            <SelectValue placeholder="Select your school" />
                          </SelectTrigger>
                          <SelectContent>
                            {schools.map((school) => (
                              <SelectItem key={school} value={school}>
                                {school}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select value={profile.department} onValueChange={(value) => handleChange("department", value)}>
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            {profile.school &&
                              departments[profile.school as keyof typeof departments]?.map((department) => (
                                <SelectItem key={department} value={department}>
                                  {department}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="officeLocation">Office Location</Label>
                    <Input
                      id="officeLocation"
                      value={profile.officeLocation}
                      onChange={(e) => handleChange("officeLocation", e.target.value)}
                      placeholder="Building and room number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      value={profile.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                      placeholder="your.email@gwconnect.edu"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={(e) => handleChange("phoneNumber", e.target.value)}
                      placeholder="(202) 555-1234"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      id="showPhoneNumber"
                      checked={profile.showPhoneNumber}
                      onCheckedChange={(checked) => handleChange("showPhoneNumber", checked)}
                    />
                    <Label htmlFor="showPhoneNumber">Display phone number on profile</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="bio" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Bio & Academic Background</CardTitle>
                <CardDescription>Share your professional background and expertise.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Biography</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    className="min-h-[150px]"
                    placeholder="Share your professional background, research focus, and teaching philosophy..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Research Interests / Areas of Expertise</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile.researchInterests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <button
                          onClick={() => handleRemoveItem("researchInterests", index)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="newInterest"
                      placeholder="Add a research interest"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddItem("researchInterests", e.currentTarget.value)
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={(e) => {
                        const input = document.getElementById("newInterest") as HTMLInputElement
                        handleAddItem("researchInterests", input.value)
                        input.value = ""
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Courses Taught</Label>
                  <div className="space-y-2">
                    {profile.coursesTaught.map((course, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={course} readOnly className="flex-1" />
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem("coursesTaught", index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        id="newCourse"
                        placeholder="Add a course (e.g., CS 1011: Intro to Programming)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddItem("coursesTaught", e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          const input = document.getElementById("newCourse") as HTMLInputElement
                          handleAddItem("coursesTaught", input.value)
                          input.value = ""
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Education & Degrees</Label>
                  <div className="space-y-2">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={edu} readOnly className="flex-1" />
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem("education", index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        id="newEducation"
                        placeholder="Add education (e.g., Ph.D. in Computer Science, MIT, 2010)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddItem("education", e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          const input = document.getElementById("newEducation") as HTMLInputElement
                          handleAddItem("education", input.value)
                          input.value = ""
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Languages Spoken</Label>
                  <div className="space-y-2">
                    {profile.languages.map((lang, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={lang} readOnly className="flex-1" />
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem("languages", index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        id="newLanguage"
                        placeholder="Add language (e.g., English (Native))"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddItem("languages", e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          const input = document.getElementById("newLanguage") as HTMLInputElement
                          handleAddItem("languages", input.value)
                          input.value = ""
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="links" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Academic & Social Links</CardTitle>
                <CardDescription>Connect your professional profiles to enhance your academic presence.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="googleScholar">Google Scholar</Label>
                    <Switch
                      id="showGoogleScholar"
                      checked={profile.linkVisibility.googleScholar}
                      onCheckedChange={(checked) => handleNestedChange("linkVisibility", "googleScholar", checked)}
                    />
                  </div>
                  <Input
                    id="googleScholar"
                    value={profile.links.googleScholar}
                    onChange={(e) => handleNestedChange("links", "googleScholar", e.target.value)}
                    placeholder="scholar.google.com/citations?user=username"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Switch
                      id="showLinkedin"
                      checked={profile.linkVisibility.linkedin}
                      onCheckedChange={(checked) => handleNestedChange("linkVisibility", "linkedin", checked)}
                    />
                  </div>
                  <Input
                    id="linkedin"
                    value={profile.links.linkedin}
                    onChange={(e) => handleNestedChange("links", "linkedin", e.target.value)}
                    placeholder="linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="researchGate">ResearchGate</Label>
                    <Switch
                      id="showResearchGate"
                      checked={profile.linkVisibility.researchGate}
                      onCheckedChange={(checked) => handleNestedChange("linkVisibility", "researchGate", checked)}
                    />
                  </div>
                  <Input
                    id="researchGate"
                    value={profile.links.researchGate}
                    onChange={(e) => handleNestedChange("links", "researchGate", e.target.value)}
                    placeholder="researchgate.net/profile/Your-Name"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="personalWebsite">Personal Website</Label>
                    <Switch
                      id="showPersonalWebsite"
                      checked={profile.linkVisibility.personalWebsite}
                      onCheckedChange={(checked) => handleNestedChange("linkVisibility", "personalWebsite", checked)}
                    />
                  </div>
                  <Input
                    id="personalWebsite"
                    value={profile.links.personalWebsite}
                    onChange={(e) => handleNestedChange("links", "personalWebsite", e.target.value)}
                    placeholder="example.edu"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="github">GitHub</Label>
                    <Switch
                      id="showGithub"
                      checked={profile.linkVisibility.github}
                      onCheckedChange={(checked) => handleNestedChange("linkVisibility", "github", checked)}
                    />
                  </div>
                  <Input
                    id="github"
                    value={profile.links.github}
                    onChange={(e) => handleNestedChange("links", "github", e.target.value)}
                    placeholder="github.com/username"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="hours" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Office Hours & Availability</CardTitle>
                <CardDescription>Set your regular office hours for students to see.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showOfficeHours"
                    checked={profile.showOfficeHours}
                    onCheckedChange={(checked) => handleChange("showOfficeHours", checked)}
                  />
                  <Label htmlFor="showOfficeHours">Display office hours on my profile</Label>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Current Office Hours</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowOfficeHourForm(true)}
                      className="flex items-center"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add Hours
                    </Button>
                  </div>

                  {profile.officeHours.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No office hours set. Add your availability above.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {profile.officeHours.map((hour, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div>
                            <span className="font-medium">{hour.day}:</span> {hour.startTime} - {hour.endTime} (
                            {hour.location})
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveOfficeHour(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {showOfficeHourForm && (
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="day">Day</Label>
                            <Select
                              value={newOfficeHour.day}
                              onValueChange={(value) => setNewOfficeHour((prev) => ({ ...prev, day: value }))}
                            >
                              <SelectTrigger id="day">
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                {days.map((day) => (
                                  <SelectItem key={day} value={day}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Select
                              value={newOfficeHour.location}
                              onValueChange={(value) => setNewOfficeHour((prev) => ({ ...prev, location: value }))}
                            >
                              <SelectTrigger id="location">
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Office">Office</SelectItem>
                                <SelectItem value="Virtual (Zoom)">Virtual (Zoom)</SelectItem>
                                <SelectItem value="Virtual (Teams)">Virtual (Teams)</SelectItem>
                                <SelectItem value="Library">Library</SelectItem>
                                <SelectItem value="Lab">Lab</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="startTime">Start Time</Label>
                            <Select
                              value={newOfficeHour.startTime}
                              onValueChange={(value) => setNewOfficeHour((prev) => ({ ...prev, startTime: value }))}
                            >
                              <SelectTrigger id="startTime">
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {times.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="endTime">End Time</Label>
                            <Select
                              value={newOfficeHour.endTime}
                              onValueChange={(value) => setNewOfficeHour((prev) => ({ ...prev, endTime: value }))}
                            >
                              <SelectTrigger id="endTime">
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                              <SelectContent>
                                {times.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setShowOfficeHourForm(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddOfficeHour} className="bg-[#0033A0] hover:bg-[#002180]">
                            Add Office Hours
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Appointment Settings</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Manage more detailed appointment settings in the Appointments tab.
                      </p>
                    </div>
                    <Link href="/faculty/appointments">
                      <Button variant="outline" size="sm">
                        Manage Appointments
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="visibility" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility Settings</CardTitle>
                <CardDescription>Control who can see your profile and specific content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Profile Visibility</h4>
                  <Select
                    value={profile.profileVisibility}
                    onValueChange={(value) => handleChange("profileVisibility", value)}
                  >
                    <SelectTrigger id="profileVisibility">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    This controls who can see your profile in the directory and search results.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Content Visibility</h4>
                  <p className="text-xs text-muted-foreground">Control who can see specific content on your profile.</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="studyGroups">Study Groups</Label>
                      <Select
                        value={profile.visibility.studyGroups}
                        onValueChange={(value) => handleNestedChange("visibility", "studyGroups", value)}
                      >
                        <SelectTrigger id="studyGroups" className="w-[180px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          {visibilityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="studyMaterials">Study Materials</Label>
                      <Select
                        value={profile.visibility.studyMaterials}
                        onValueChange={(value) => handleNestedChange("visibility", "studyMaterials", value)}
                      >
                        <SelectTrigger id="studyMaterials" className="w-[180px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          {visibilityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="blogPosts">Blog Posts</Label>
                      <Select
                        value={profile.visibility.blogPosts}
                        onValueChange={(value) => handleNestedChange("visibility", "blogPosts", value)}
                      >
                        <SelectTrigger id="blogPosts" className="w-[180px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          {visibilityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="officeHoursVisibility">Office Hours</Label>
                      <Select
                        value={profile.visibility.officeHours}
                        onValueChange={(value) => handleNestedChange("visibility", "officeHours", value)}
                      >
                        <SelectTrigger id="officeHoursVisibility" className="w-[180px]">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          {visibilityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="contactEmailVisibility">Contact Email</Label>
                      <Switch
                        id="contactEmailVisibility"
                        checked={profile.visibility.contactEmail}
                        onCheckedChange={(checked) => handleNestedChange("visibility", "contactEmail", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
