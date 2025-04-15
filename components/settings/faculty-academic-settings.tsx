"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, BookOpen, FileText, Users } from "lucide-react"
import Link from "next/link"

interface FacultyAcademicSettingsProps {
  onSave: () => void
}

export function FacultyAcademicSettings({ onSave }: FacultyAcademicSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    blogVisibility: "course-only",
    materialsVisibility: "enrolled",
    allowBlogComments: true,
    allowMaterialRatings: true,
    allowMaterialDownloads: true,
    notifyOnEngagement: true,
    autoShareWithCourses: true,
    requireApprovalForSharing: true,
    showContributionStats: true,
    allowStudentUploads: "moderated",
    citationPreference: "apa",
    contentCategories: ["Lecture Notes", "Assignments", "Readings", "Supplementary Materials"],
  })

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleCategoryToggle = (category: string) => {
    setSettings((prev) => {
      const currentCategories = [...prev.contentCategories]

      if (currentCategories.includes(category)) {
        return {
          ...prev,
          contentCategories: currentCategories.filter((c) => c !== category),
        }
      } else {
        return {
          ...prev,
          contentCategories: [...currentCategories, category],
        }
      }
    })
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSave()
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Academic Contribution Settings</h3>
        <p className="text-sm text-muted-foreground">Customize how you share academic content with students.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Post Settings</CardTitle>
          <CardDescription>Control how your blog posts are shared and who can interact with them.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="blogVisibility">Default blog post visibility</Label>
            <Select value={settings.blogVisibility} onValueChange={(value) => handleChange("blogVisibility", value)}>
              <SelectTrigger id="blogVisibility">
                <SelectValue placeholder="Select default visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (All GW Connect)</SelectItem>
                <SelectItem value="course-only">Course-only (Students in my courses)</SelectItem>
                <SelectItem value="followers-only">Followers-only</SelectItem>
                <SelectItem value="department">Department-only</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              This is the default setting. You can always change visibility for individual posts.
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Allow Comments on Blog Posts</Label>
                <p className="text-sm text-muted-foreground">
                  Let students comment on your blog posts and academic announcements
                </p>
              </div>
            </div>
            <Switch
              checked={settings.allowBlogComments}
              onCheckedChange={(checked) => handleChange("allowBlogComments", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Auto-share with Course Groups</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically share new blog posts with relevant course study groups
                </p>
              </div>
            </div>
            <Switch
              checked={settings.autoShareWithCourses}
              onCheckedChange={(checked) => handleChange("autoShareWithCourses", checked)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/faculty/blogs">
            <Button variant="outline" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              View My Blogs
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={isLoading} className="bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Materials Settings</CardTitle>
          <CardDescription>Control how your academic materials are shared and accessed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="materialsVisibility">Default materials visibility</Label>
            <Select
              value={settings.materialsVisibility}
              onValueChange={(value) => handleChange("materialsVisibility", value)}
            >
              <SelectTrigger id="materialsVisibility">
                <SelectValue placeholder="Select default visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="enrolled">Enrolled Students Only</SelectItem>
                <SelectItem value="request">By Request Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Allow Ratings on Materials</Label>
                <p className="text-sm text-muted-foreground">
                  Let students rate the helpfulness of your shared materials
                </p>
              </div>
            </div>
            <Switch
              checked={settings.allowMaterialRatings}
              onCheckedChange={(checked) => handleChange("allowMaterialRatings", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Allow Downloads</Label>
                <p className="text-sm text-muted-foreground">Allow students to download your shared materials</p>
              </div>
            </div>
            <Switch
              checked={settings.allowMaterialDownloads}
              onCheckedChange={(checked) => handleChange("allowMaterialDownloads", checked)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="allowStudentUploads">Student material contributions</Label>
            <RadioGroup
              value={settings.allowStudentUploads}
              onValueChange={(value) => handleChange("allowStudentUploads", value)}
              className="space-y-4"
            >
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="allowed" id="allowed" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="allowed" className="font-medium">
                    Allowed
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Students can freely upload materials to course collections
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="moderated" id="moderated" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="moderated" className="font-medium">
                    Moderated
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Student uploads require your approval before being published
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <RadioGroupItem value="disabled" id="disabled" className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor="disabled" className="font-medium">
                    Disabled
                  </Label>
                  <p className="text-sm text-muted-foreground">Only you can upload materials to your courses</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/faculty/study-materials">
            <Button variant="outline" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              View My Materials
            </Button>
          </Link>
          <Button onClick={handleSave} disabled={isLoading} className="bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Organization</CardTitle>
          <CardDescription>Customize how your academic content is organized and presented.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="citationPreference">Citation Style Preference</Label>
            <Select
              value={settings.citationPreference}
              onValueChange={(value) => handleChange("citationPreference", value)}
            >
              <SelectTrigger id="citationPreference">
                <SelectValue placeholder="Select citation style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apa">APA</SelectItem>
                <SelectItem value="mla">MLA</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
                <SelectItem value="harvard">Harvard</SelectItem>
                <SelectItem value="ieee">IEEE</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">This style will be used when students cite your materials.</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Content Categories</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Select the categories you want to use for organizing your content
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Lecture Notes",
                "Assignments",
                "Readings",
                "Supplementary Materials",
                "Practice Problems",
                "Exam Prep",
                "Research Resources",
                "Case Studies",
                "Tutorials",
                "Datasets",
              ].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={settings.contentCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Show Contribution Statistics</Label>
                <p className="text-sm text-muted-foreground">
                  Display statistics about your academic contributions on your profile
                </p>
              </div>
            </div>
            <Switch
              checked={settings.showContributionStats}
              onCheckedChange={(checked) => handleChange("showContributionStats", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 text-muted-foreground h-5 w-5" />
              <div className="space-y-0.5">
                <Label className="text-base">Notify on Content Engagement</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when students engage with your content
                </p>
              </div>
            </div>
            <Switch
              checked={settings.notifyOnEngagement}
              onCheckedChange={(checked) => handleChange("notifyOnEngagement", checked)}
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
