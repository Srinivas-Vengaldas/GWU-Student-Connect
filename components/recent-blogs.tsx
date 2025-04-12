import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentBlogs() {
  const blogs = [
    {
      id: 1,
      title: "Tips for Effective Study Habits",
      excerpt: "Learn how to maximize your study time with these proven techniques.",
      author: {
        name: "Jane Smith",
        role: "Student",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Preparing for Final Exams",
      excerpt: "A comprehensive guide to ace your finals with minimal stress.",
      author: {
        name: "Prof. Robert Johnson",
        role: "Faculty",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RJ",
      },
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Career Advice for New Graduates",
      excerpt: "Insights from alumni on navigating the job market after graduation.",
      author: {
        name: "Michael Chen",
        role: "Alumni",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
      date: "2 weeks ago",
    },
  ]

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Blogs</CardTitle>
        <CardDescription>Stay updated with the latest posts from the community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <Link href={`/student/blogs/${blog.id}`} className="font-medium text-[#0033A0] hover:underline">
                  {blog.title}
                </Link>
                <p className="text-sm text-gray-500 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{blog.author.name}</span>
                  <span className="mx-1">•</span>
                  <span>{blog.author.role}</span>
                  <span className="mx-1">•</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/student/blogs" className="text-sm font-medium text-[#0033A0] hover:underline">
            View all blogs
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
