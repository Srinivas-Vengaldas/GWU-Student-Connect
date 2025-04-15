"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, BookOpen, Building2, Users } from "lucide-react"

export function FacultyBlogVisibilitySelector() {
  const [visibility, setVisibility] = useState("public")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")

  // Mock data
  const courses = [
    { id: "cs101", name: "CS 101: Introduction to Computer Science" },
    { id: "cs250", name: "CS 250: Data Structures" },
    { id: "cs350", name: "CS 350: Algorithms" },
    { id: "soci301", name: "SOCI 301: Advanced Research Methods" },
    { id: "pols320", name: "POLS 320: Environmental Politics" },
  ]

  const departments = ["Computer Science", "Sociology", "Political Science", "Psychology", "Economics", "Mathematics"]

  return (
    <div className="space-y-4">
      <RadioGroup value={visibility} onValueChange={setVisibility}>
        <div className="flex items-start space-x-2 mb-3">
          <RadioGroupItem value="public" id="public" className="mt-1" />
          <div>
            <Label htmlFor="public" className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-green-600" />
              Public
            </Label>
            <p className="text-xs text-gray-500">Visible to all students, faculty, and alumni</p>
          </div>
        </div>

        <div className="flex items-start space-x-2 mb-3">
          <RadioGroupItem value="course" id="course" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="course" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
              Course-specific
            </Label>
            <p className="text-xs text-gray-500 mb-2">Only visible to students enrolled in selected course</p>
            {visibility === "course" && (
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
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
            )}
          </div>
        </div>

        <div className="flex items-start space-x-2 mb-3">
          <RadioGroupItem value="department" id="department" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="department" className="flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-purple-600" />
              Department-only
            </Label>
            <p className="text-xs text-gray-500 mb-2">Only visible to students in selected department</p>
            {visibility === "department" && (
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <RadioGroupItem value="followers" id="followers" className="mt-1" />
          <div>
            <Label htmlFor="followers" className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-orange-600" />
              Followers-only
            </Label>
            <p className="text-xs text-gray-500">Only visible to students who follow you</p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
