import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogEditor } from "@/components/blogs/blog-editor"
import { PollCreator } from "@/components/blogs/poll-creator"
import { TagSelector } from "@/components/blogs/tag-selector"
import { VisibilitySelector } from "@/components/blogs/visibility-selector"
import { ArrowLeft, Save, Send } from "lucide-react"
import Link from "next/link"

export default function CreateBlogPost() {
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
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link href="/student/blogs">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blogs
                  </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">Create New Post</h2>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button className="bg-[#0033A0] hover:bg-[#002180]">
                  <Send className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </div>
            </div>

            <Tabs defaultValue="article" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="article">Write Article</TabsTrigger>
                <TabsTrigger value="poll">Create Poll</TabsTrigger>
              </TabsList>
              <TabsContent value="article" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>New Article</CardTitle>
                    <CardDescription>
                      Share your thoughts, experiences, or knowledge with the GW community.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Enter a compelling title..." />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cover-image">Cover Image (Optional)</Label>
                      <Input id="cover-image" type="file" accept="image/*" />
                    </div>

                    <div className="space-y-2">
                      <Label>Content</Label>
                      <BlogEditor />
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <TagSelector />
                    </div>

                    <div className="space-y-2">
                      <Label>Visibility</Label>
                      <VisibilitySelector />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="poll" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>New Poll</CardTitle>
                    <CardDescription>Create a poll to gather opinions from the GW community.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="poll-question">Poll Question</Label>
                      <Input id="poll-question" placeholder="Ask a question..." />
                    </div>

                    <PollCreator />

                    <div className="space-y-2">
                      <Label htmlFor="poll-deadline">Poll Deadline</Label>
                      <Input id="poll-deadline" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <TagSelector />
                    </div>

                    <div className="space-y-2">
                      <Label>Visibility</Label>
                      <VisibilitySelector />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
