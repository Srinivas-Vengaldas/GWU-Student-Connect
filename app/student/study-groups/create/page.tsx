"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Globe, Lock, UserPlus } from "lucide-react"

export default function CreateStudyGroupPage() {
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [course, setCourse] = useState("")
  const [subject, setSubject] = useState("")
  const [tags, setTags] = useState("")
  const [visibility, setVisibility] = useState("public")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd call an API to create the group
    console.log("Creating group:", {
      name: groupName,
      description: groupDescription,
      course,
      subject,
      tags: tags.split(",").map((tag) => tag.trim()),
      visibility,
    })
    // Redirect to the new group page
    window.location.href = "/student/study-groups"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="student" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-2">
              <Link href="/student/study-groups">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Groups
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Create Study Group</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Group Information</CardTitle>
                  <CardDescription>Provide details about your new study group</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Group Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Calculus II Study Group"
                      required
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the purpose and goals of your study group"
                      rows={4}
                      required
                      value={groupDescription}
                      onChange={(e) => setGroupDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Input
                        id="course"
                        placeholder="e.g., MATH 220"
                        required
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="e.g., Mathematics"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., Calculus, Integration, Problem Sets"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Group Visibility</Label>
                    <RadioGroup value={visibility} onValueChange={setVisibility}>
                      <div className="flex items-start space-x-2 rounded-md border p-3">
                        <RadioGroupItem value="public" id="public" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="public" className="flex items-center gap-2 font-medium">
                            <Globe className="h-4 w-4 text-green-500" />
                            Public
                          </Label>
                          <p className="text-sm text-gray-500">
                            Anyone can find and join this group. All content is visible to members.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 rounded-md border p-3">
                        <RadioGroupItem value="private" id="private" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="private" className="flex items-center gap-2 font-medium">
                            <Lock className="h-4 w-4 text-amber-500" />
                            Private
                          </Label>
                          <p className="text-sm text-gray-500">
                            The group is visible in search but requires admin approval to join.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 rounded-md border p-3">
                        <RadioGroupItem value="invite-only" id="invite-only" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="invite-only" className="flex items-center gap-2 font-medium">
                            <UserPlus className="h-4 w-4 text-blue-500" />
                            Invite Only
                          </Label>
                          <p className="text-sm text-gray-500">
                            The group is hidden from search. Only invited users can join.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href="/student/study-groups">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button type="submit" className="bg-[#0033A0] hover:bg-[#002180]">
                    Create Study Group
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
