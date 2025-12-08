import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, TrendingUp, ThumbsUp, Clock, Filter, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FacultyBlogCard } from "@/components/faculty-blogs/faculty-blog-card"
import { FacultyAnnouncementCard } from "@/components/faculty-blogs/faculty-announcement-card"
import { FacultyFeaturedBlogBanner } from "@/components/faculty-blogs/faculty-featured-blog-banner"
import { FacultyBlogStats } from "@/components/faculty-blogs/faculty-blog-stats"

export default function FacultyBlogs() {
  const blogs = [
    {
      id: "1",
      type: "article",
      title: "5 Mistakes to Avoid on Your Research Proposal",
      excerpt:
        "Based on years of reviewing student research proposals, I've compiled the most common mistakes that can easily be avoided with proper planning and attention to detail.",
      author: {
        id: "f1",
        name: "Dr. Hassan Ahmed",
        role: "Faculty",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Sociology",
      },
      date: "2025-12-10T14:30:00Z",
      readTime: "8 min read",
      tags: ["Research Methods", "Academic Writing", "SOCI 301"],
      likes: 24,
      comments: 6,
      views: 75,
      isFeatured: true,
      coverImage: "/placeholder.svg?height=200&width=400",
      visibility: "course",
      course: "SOCI 301: Advanced Research Methods",
    },
    {
      id: "2",
      type: "announcement",
      title: "Final Exam Review Session - CS 450",
      excerpt:
        "I'll be hosting a comprehensive review session for our upcoming final exam. We'll cover all major topics and address your questions. Attendance is optional but highly recommended.",
      author: {
        id: "f2",
        name: "Prof. Julia Chen",
        role: "Faculty",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Computer Science",
      },
      date: "2025-12-08T09:15:00Z",
      tags: ["CS 450", "Final Exam", "Review Session"],
      likes: 42,
      comments: 15,
      views: 98,
      isFeatured: false,
      visibility: "course",
      course: "CS 450: Operating Systems",
      eventDate: "2025-12-15T13:00:00Z",
      location: "Science Center Room 302",
    },
    {
      id: "3",
      type: "article",
      title: "Navigating Academic Publishing as a Graduate Student",
      excerpt:
        "Publishing your research as a graduate student can be intimidating. This guide provides practical advice on selecting journals, responding to reviewers, and building your academic portfolio.",
      author: {
        id: "f3",
        name: "Dr. Sarah Williams",
        role: "Faculty",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Psychology",
      },
      date: "2025-12-05T11:20:00Z",
      readTime: "12 min read",
      tags: ["Academic Publishing", "Graduate Studies", "Research"],
      likes: 56,
      comments: 23,
      views: 142,
      isFeatured: false,
      coverImage: "/placeholder.svg?height=200&width=400",
      visibility: "public",
    },
    {
      id: "4",
      type: "article",
      title: "Integrating AI Tools in Your Research Workflow",
      excerpt:
        "Artificial intelligence tools can enhance your research productivity when used appropriately. This post explores ethical considerations and practical applications for academic work.",
      author: {
        id: "f1",
        name: "Dr. Hassan Ahmed",
        role: "Faculty",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Sociology",
      },
      date: "2025-12-01T16:45:00Z",
      readTime: "10 min read",
      tags: ["AI", "Research Tools", "Academic Technology"],
      likes: 89,
      comments: 31,
      views: 215,
      isFeatured: false,
      coverImage: "/placeholder.svg?height=200&width=400",
      visibility: "department",
      department: "Sociology",
    },
    {
      id: "5",
      type: "announcement",
      title: "Guest Lecture: Dr. Emily Rodriguez on Climate Policy",
      excerpt:
        "I'm pleased to announce that Dr. Emily Rodriguez from the Environmental Policy Institute will be giving a guest lecture on current climate policy developments and their implications.",
      author: {
        id: "f4",
        name: "Prof. Michael Thompson",
        role: "Faculty",
        avatar: "/placeholder.svg?height=40&width=40",
        department: "Political Science",
      },
      date: "2025-11-28T10:30:00Z",
      tags: ["Guest Lecture", "Climate Policy", "POLS 320"],
      likes: 37,
      comments: 8,
      views: 112,
      isFeatured: false,
      visibility: "course",
      course: "POLS 320: Environmental Politics",
      eventDate: "2025-12-12T15:30:00Z",
      location: "Thompson Hall Auditorium",
    },
  ]

  const featuredBlog = blogs.find((blog) => blog.isFeatured)

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <h2 className="text-3xl font-bold tracking-tight">Blogs & Announcements</h2>
              <div className="flex w-full sm:w-auto space-x-2">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search blogs..." className="w-full pl-8" />
                </div>
                <Link href="/faculty/blogs/create">
                  <Button className="bg-[#0033A0] hover:bg-[#002180]">
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">{featuredBlog && <FacultyFeaturedBlogBanner blog={featuredBlog} />}</div>
              <div className="md:col-span-1">
                <FacultyBlogStats />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                  <TabsTrigger value="announcements">Announcements</TabsTrigger>
                  <TabsTrigger value="my-posts">My Posts</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Sort by: Trending
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>Trending</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Newest</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        <span>Most Liked</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                        Visibility
                      </DropdownMenuLabel>
                      <DropdownMenuItem>
                        <span>Public</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Course-specific</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Department-only</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Followers-only</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                        Popular Tags
                      </DropdownMenuLabel>
                      <DropdownMenuItem>
                        <span>Research Methods</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Academic Writing</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Final Exam</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {blogs.map((blog) =>
                blog.type === "announcement" ? (
                  <FacultyAnnouncementCard key={blog.id} announcement={blog} />
                ) : (
                  <FacultyBlogCard key={blog.id} blog={blog} />
                ),
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
