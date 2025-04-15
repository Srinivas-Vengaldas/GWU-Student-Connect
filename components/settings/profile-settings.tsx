"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Edit, Loader2 } from "lucide-react"
import Link from "next/link"
import { handleImageUpload, saveProfileImage } from "@/utils/image-upload"

interface ProfileSettingsProps {
  onSave: () => void
}

export function ProfileSettings({ onSave }: ProfileSettingsProps) {
  // Default profile data
  const defaultProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@gwconnect.edu",
    gwid: "G12345678",
    school: "College of Arts & Sciences",
    program: "Psychology",
    year: "Class of 2025",
    bio: "Psychology student interested in cognitive research and digital mental health interventions.",
    interests: ["Cognitive Psychology", "Research Methods", "Mental Health", "Data Science"],
    avatar: "/placeholder.svg?height=128&width=128",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    displayName: "Alex J.",
  }

  const [profile, setProfile] = useState(defaultProfile)
  const [isLoading, setIsLoading] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load profile from localStorage if available
  useEffect(() => {
    const savedProfile = localStorage.getItem("gwConnectUserProfile")
    if (savedProfile) {
      try {
        const userData = JSON.parse(savedProfile)
        // Merge with default values for any missing fields
        setProfile({
          ...defaultProfile,
          ...userData,
          bio: userData.bio || defaultProfile.bio,
          linkedin: userData.linkedin || defaultProfile.linkedin,
          github: userData.github || defaultProfile.github,
          displayName: userData.displayName || defaultProfile.displayName,
        })
      } catch (error) {
        console.error("Error parsing profile data:", error)
      }
    }
  }, [])

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      try {
        const imageUrl = await handleImageUpload(e.target.files[0])
        setProfile((prev) => ({ ...prev, avatar: imageUrl }))
        saveProfileImage(imageUrl)
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
      // Save to localStorage
      localStorage.setItem("gwConnectUserProfile", JSON.stringify(profile))

      // Ensure the avatar is specifically saved for consistency
      if (profile.avatar) {
        saveProfileImage(profile.avatar)
      }

      // Dispatch a custom event to notify other components
      window.dispatchEvent(new Event("storage"))

      setIsLoading(false)
      onSave()
    }, 1000)
  }

  const schools = [
    "College of Arts & Sciences",
    "School of Engineering & Applied Science",
    "School of Business",
    "School of Medicine & Health Sciences",
    "Law School",
    "Graduate School of Education & Human Development",
  ]

  const programs = {
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

  const years = ["Class of 2024", "Class of 2025", "Class of 2026", "Class of 2027", "Graduate Student"]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile information and how others see you on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>This information will be displayed publicly on your profile.</CardDescription>
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
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profile.displayName}
                    onChange={(e) => handleChange("displayName", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">This is how your name will appear to others.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">Brief description for your profile.</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Select value={profile.school} onValueChange={(value) => handleChange("school", value)}>
                <SelectTrigger>
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
              <Label htmlFor="program">Program</Label>
              <Select value={profile.program} onValueChange={(value) => handleChange("program", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your program" />
                </SelectTrigger>
                <SelectContent>
                  {profile.school &&
                    programs[profile.school as keyof typeof programs]?.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={profile.year} onValueChange={(value) => handleChange("year", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gwid">GW ID</Label>
              <Input id="gwid" value={profile.gwid} disabled className="bg-gray-50" />
              <p className="text-xs text-muted-foreground">Your GW ID cannot be changed.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/student/profile">
            <Button variant="outline">View Profile</Button>
          </Link>
          <Button onClick={handleSave} disabled={isLoading} className="bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Connect your social profiles to enhance your networking opportunities.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={profile.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="linkedin.com/in/username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub Profile</Label>
            <Input
              id="github"
              value={profile.github}
              onChange={(e) => handleChange("github", e.target.value)}
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
    </div>
  )
}
