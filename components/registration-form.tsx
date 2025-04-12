"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface RegistrationFormProps {
  role: string
  onBack: () => void
}

export function RegistrationForm({ role, onBack }: RegistrationFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gwid: "",
    password: "",
    confirmPassword: "",
    school: "",
    program: "",
    year: "",
    interests: [] as string[],
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to the server
    console.log("Form submitted:", { role, ...formData })
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-gray-500">Enter your information to create a {role.toLowerCase()} account</p>
      </div>

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
          <Input id="gwid" name="gwid" value={formData.gwid} onChange={handleChange} required placeholder="G12345678" />
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
          <Label htmlFor="school">School</Label>
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

        <div className="space-y-2">
          <Label>Interests (Select all that apply)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {interests.map((interest) => (
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
    </div>
  )
}
