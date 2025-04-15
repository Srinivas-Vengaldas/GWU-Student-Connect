"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

// Import the MFA setup component
import { MFASetup } from "@/components/auth/mfa-setup"

interface RegistrationFormProps {
  role: string
  onBack: () => void
}

export function RegistrationForm({ role, onBack }: RegistrationFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // Common fields
    firstName: "",
    lastName: "",
    email: "",
    gwid: "",
    password: "",
    confirmPassword: "",
    school: "",

    // Student-specific fields
    program: "",
    year: "",

    // Faculty-specific fields
    department: "",
    position: "",
    researchAreas: "",
    officeLocation: "",
    officeHours: "",

    // Alumni-specific fields
    graduationYear: "",
    company: "",
    jobTitle: "",
    industry: "",
    location: "",

    // Common fields
    interests: [] as string[],
    agreeTerms: false,
  })

  // Add a new state to track MFA setup
  const [showMFASetup, setShowMFASetup] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }))
  }

  // Update the handleSubmit function to show MFA setup
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would submit the form data to the server
    console.log("Form submitted:", { role, ...formData })

    // Store user data in localStorage for profile use
    const userData = {
      id: "user-" + Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      gwid: formData.gwid,
      school: formData.school,
      role: role,
      // Role-specific data
      ...(role === "Student" && {
        program: formData.program,
        year: formData.year,
      }),
      ...(role === "Faculty" && {
        department: formData.department,
        position: formData.position,
        researchAreas: formData.researchAreas,
        officeLocation: formData.officeLocation,
        officeHours: formData.officeHours,
      }),
      ...(role === "Alumni" && {
        graduationYear: formData.graduationYear,
        company: formData.company,
        jobTitle: formData.jobTitle,
        industry: formData.industry,
        location: formData.location,
      }),
      interests: formData.interests,
      status: "",
      avatar: "/placeholder.svg?height=128&width=128",
      isCurrentUser: true,
      achievements: [],
    }

    localStorage.setItem("gwConnectUserProfile", JSON.stringify(userData))
    localStorage.setItem("gwConnectUserRole", role)

    // Show MFA setup instead of redirecting immediately
    setShowMFASetup(true)
  }

  // Add handlers for MFA setup
  const handleMFAComplete = (method: string) => {
    console.log("MFA setup completed with method:", method)
    router.push("/login")
  }

  const handleMFASkip = () => {
    console.log("MFA setup skipped")
    router.push("/login")
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

  const positions = [
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Adjunct Professor",
    "Lecturer",
    "Research Professor",
    "Department Chair",
    "Dean",
    "Teaching Assistant",
    "Research Assistant",
  ]

  const graduationYears = Array.from({ length: 50 }, (_, i) => `${new Date().getFullYear() - i}`)

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Government",
    "Consulting",
    "Legal",
    "Non-profit",
    "Manufacturing",
    "Retail",
    "Media & Entertainment",
    "Energy",
    "Transportation",
    "Real Estate",
    "Hospitality",
  ]

  const interests = [
    "Research",
    "Academic Writing",
    "Data Analysis",
    "Programming",
    "Laboratory Work",
    "Public Speaking",
    "Group Projects",
    "Tutoring",
    "Volunteering",
    "Leadership",
    "Entrepreneurship",
    "Arts & Culture",
    "Sports & Fitness",
    "Sustainability",
    "Global Affairs",
  ]

  // Faculty-specific interests
  const facultyInterests = [
    ...interests,
    "Grant Writing",
    "Curriculum Development",
    "Academic Publishing",
    "Mentoring",
    "Conference Presentations",
    "Interdisciplinary Collaboration",
    "Academic Administration",
  ]

  // Alumni-specific interests
  const alumniInterests = [
    ...interests,
    "Networking",
    "Mentoring Students",
    "Career Advising",
    "Industry Partnerships",
    "Recruiting",
    "Alumni Events",
    "Philanthropy",
  ]

  // Select the appropriate interests based on role
  const roleInterests = role === "Faculty" ? facultyInterests : role === "Alumni" ? alumniInterests : interests

  // Update the return statement to conditionally render MFA setup
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-gray-500">Enter your information to create a {role.toLowerCase()} account</p>
      </div>

      {showMFASetup ? (
        <MFASetup
          email={formData.email}
          onComplete={handleMFAComplete}
          onSkip={handleMFASkip}
          onBack={() => setShowMFASetup(false)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gwid">GW ID Number</Label>
            <Input
              id="gwid"
              name="gwid"
              value={formData.gwid}
              onChange={handleChange}
              required
              placeholder="G12345678"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School/College</Label>
            <Select value={formData.school} onValueChange={(value) => handleSelectChange("school", value)}>
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

          {/* Student-specific fields */}
          {role === "Student" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="program">Program of Study</Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) => handleSelectChange("program", value)}
                  disabled={!formData.school}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your program" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.school &&
                      programs[formData.school as keyof typeof programs]?.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
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
            </>
          )}

          {/* Faculty-specific fields */}
          {role === "Faculty" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" value={formData.department} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position/Title</Label>
                <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your position" />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="researchAreas">Research Areas</Label>
                <Textarea
                  id="researchAreas"
                  name="researchAreas"
                  value={formData.researchAreas}
                  onChange={handleChange}
                  placeholder="Describe your research areas and interests"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeLocation">Office Location</Label>
                <Input
                  id="officeLocation"
                  name="officeLocation"
                  value={formData.officeLocation}
                  onChange={handleChange}
                  placeholder="Building and room number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeHours">Office Hours</Label>
                <Input
                  id="officeHours"
                  name="officeHours"
                  value={formData.officeHours}
                  onChange={handleChange}
                  placeholder="e.g., Mon/Wed 2-4pm or By appointment"
                />
              </div>
            </>
          )}

          {/* Alumni-specific fields */}
          {role === "Alumni" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Select
                  value={formData.graduationYear}
                  onValueChange={(value) => handleSelectChange("graduationYear", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your graduation year" />
                  </SelectTrigger>
                  <SelectContent>
                    {graduationYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Current Company/Organization</Label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Current Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State/Province, Country"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Interests (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {roleInterests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest}`}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <label
                    htmlFor={`interest-${interest}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {interest}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
              required
            />
            <label
              htmlFor="agreeTerms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms of service and privacy policy
            </label>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" disabled={!formData.agreeTerms}>
              Create Account
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
