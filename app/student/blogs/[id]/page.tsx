import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BlogComments } from "@/components/blogs/blog-comments"
import { RelatedPosts } from "@/components/blogs/related-posts"
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Bookmark, Clock, Eye } from "lucide-react"
import Link from "next/link"

export default function BlogPost({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the blog post data based on the ID
  const blog = {
    id: Number.parseInt(params.id),
    type: "article",
    title: "Tips for Effective Study Habits",
    content: `
      <h2>Introduction</h2>
      <p>Effective study habits are essential for academic success. In this blog post, I'll share some techniques that have helped me improve my grades and reduce stress during exam periods.</p>
      
      <h2>1. Create a Dedicated Study Space</h2>
      <p>Having a clean, organized, and dedicated study space helps train your brain to focus when you're in that environment. Make sure it's comfortable, well-lit, and free from distractions.</p>
      
      <h2>2. Use the Pomodoro Technique</h2>
      <p>The Pomodoro Technique involves studying for 25 minutes, then taking a 5-minute break. After four cycles, take a longer 15-30 minute break. This helps maintain focus and prevents burnout.</p>
      
      <h2>3. Active Recall</h2>
      <p>Instead of passively re-reading notes, actively test yourself on the material. This could involve creating flashcards, explaining concepts out loud, or solving practice problems without looking at your notes.</p>
      
      <h2>4. Spaced Repetition</h2>
      <p>Review material at increasing intervals over time. This technique leverages the psychological spacing effect, which shows that information is better retained when studied over spaced intervals.</p>
      
      <h2>5. Teach What You Learn</h2>
      <p>Explaining concepts to others (or even to yourself) helps solidify your understanding. If you can teach it, you know it.</p>
      
      <h2>Conclusion</h2>
      <p>Remember, everyone's learning style is different. Experiment with these techniques and find what works best for you. The key is consistency and finding methods that keep you engaged with the material.</p>
    `,
    author: {
      name: "Jane Smith",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      major: "Psychology",
      year: "Junior",
      bio: "Psychology major with a passion for cognitive science and educational psychology. I love sharing study tips and learning strategies with fellow students.",
    },
    date: "May 10, 2024",
    readTime: "5 min read",
    tags: ["Study Tips", "Productivity", "Academic Success"],
    likes: 42,
    comments: 15,
    views: 230,
    coverImage: "/placeholder.svg?height=400&width=800",
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
          <div className="flex-1 space-y-6 p-8 pt-6">
            <div>
              <Link href="/student/blogs">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blogs
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-6">
                  {blog.coverImage && (
                    <div className="-mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6">
                      <img
                        src={blog.coverImage || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <Link href={`/student/blogs/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={tag}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  <h1 className="text-3xl font-bold text-[#0033A0]">{blog.title}</h1>

                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                      <AvatarFallback>{blog.author.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href={`/student/profile/${blog.author.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <div className="font-medium hover:underline cursor-pointer">{blog.author.name}</div>
                      </Link>
                      <div className="text-sm text-gray-500">
                        {blog.author.role} • {blog.author.major} • {blog.author.year}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {blog.readTime}
                    </div>
                    <div className="flex items-center">
                      <Eye className="mr-1 h-4 w-4" />
                      {blog.views} views
                    </div>
                    <div>{blog.date}</div>
                  </div>

                  <Separator />

                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />

                  <Separator />

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{blog.likes}</span>
                      </Button>

                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{blog.comments}</span>
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                        <span className="ml-2">Share</span>
                      </Button>

                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                        <span className="ml-2">Save</span>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">About the Author</h3>
                    <p className="text-sm text-gray-700">{blog.author.bio}</p>
                  </div>

                  <BlogComments blogId={blog.id} commentCount={blog.comments} />
                </div>
              </CardContent>
            </Card>

            <RelatedPosts currentBlogId={blog.id} tags={blog.tags} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
