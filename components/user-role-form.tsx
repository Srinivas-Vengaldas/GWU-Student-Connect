"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { GraduationCap, Users, BookOpen } from "lucide-react"

interface UserRoleFormProps {
  onRoleSelect: (role: string) => void
}

export function UserRoleForm({ onRoleSelect }: UserRoleFormProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-[#0033A0]">Choose Your Role</CardTitle>
        <CardDescription>Select your role to continue with registration</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="student" className="grid gap-4">
          <div>
            <RadioGroupItem
              value="student"
              id="student"
              className="peer sr-only"
              onClick={() => onRoleSelect("student")}
            />
            <Label
              htmlFor="student"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#0033A0] [&:has([data-state=checked])]:border-[#0033A0]"
            >
              <GraduationCap className="mb-3 h-6 w-6" />
              <div className="text-center">
                <p className="text-lg font-medium">Student</p>
                <p className="text-sm text-muted-foreground">Current students enrolled in courses</p>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="faculty"
              id="faculty"
              className="peer sr-only"
              onClick={() => onRoleSelect("faculty")}
            />
            <Label
              htmlFor="faculty"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#0033A0] [&:has([data-state=checked])]:border-[#0033A0]"
            >
              <BookOpen className="mb-3 h-6 w-6" />
              <div className="text-center">
                <p className="text-lg font-medium">Faculty</p>
                <p className="text-sm text-muted-foreground">Professors and teaching staff</p>
              </div>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="alumni"
              id="alumni"
              className="peer sr-only"
              onClick={() => onRoleSelect("alumni")}
            />
            <Label
              htmlFor="alumni"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#0033A0] [&:has([data-state=checked])]:border-[#0033A0]"
            >
              <Users className="mb-3 h-6 w-6" />
              <div className="text-center">
                <p className="text-lg font-medium">Alumni</p>
                <p className="text-sm text-muted-foreground">Graduated students</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
