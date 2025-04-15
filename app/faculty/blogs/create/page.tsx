import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FacultyBlogEditor } from "@/components/faculty-blogs/faculty-blog-editor"
import { FacultyAnnouncementEditor } from "@/components/faculty-blogs/faculty-announcement-editor"
import { FacultyBlogVisibilitySelector } from "@/components/faculty-blogs/faculty-blog-visibility-selector"
import { FacultyTagSelector } from "@/components/faculty-blogs/faculty-tag-selector"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function CreateFacultyBlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="faculty" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="faculty" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link href="/faculty/blogs">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blogs
                  </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">Create New Post</h2>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-[#0033A0] hover:bg-[#002180]">
                  <Save className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Enter a descriptive title for your post" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cover-image">Cover Image (Optional)</Label>
                        <Input id="cover-image" type="file" accept="image/*" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="article" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="article">Article</TabsTrigger>
                    <TabsTrigger value="announcement">Announcement</TabsTrigger>
                  </TabsList>
                  <TabsContent value="article">
                    <Card>
                      <CardHeader>
                        <CardTitle>Write Your Article</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FacultyBlogEditor />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="announcement">
                    <Card>
                      <CardHeader>
                        <CardTitle>Create Announcement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FacultyAnnouncementEditor />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Visibility Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FacultyBlogVisibilitySelector />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FacultyTagSelector />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interaction Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-comments">Allow Comments</Label>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="allow-comments" className="rounded border-gray-300" defaultChecked />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-reactions">Allow Reactions</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="allow-reactions"
                          className="rounded border-gray-300"
                          defaultChecked
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="allow-sharing">Allow Sharing</Label>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="allow-sharing" className="rounded border-gray-300" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
