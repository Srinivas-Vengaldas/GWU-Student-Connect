import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Author {
  name: string
  role: string
  avatar: string
  initials: string
  major?: string
  year?: string
}

interface Blog {
  id: number
  title: string
  excerpt: string
  author: Author
  date: string
  readTime: string
  tags: string[]
  likes: number
  comments: number
  coverImage?: string
}

interface FeaturedBlogBannerProps {
  blog?: Blog
}

export function FeaturedBlogBanner({ blog }: FeaturedBlogBannerProps) {
  // If no blog is provided, use a default featured blog
  const defaultBlog: Blog = {
    id: 1,
    title: "Tips for Effective Study Habits",
    excerpt:
      "Learn how to maximize your study time with these proven techniques that have helped me improve my grades and reduce stress during exam periods.",
    author: {
      name: "Jane Smith",
      role: "Student",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      major: "Psychology",
      year: "Junior",
    },
    date: "May 10, 2024",
    readTime: "5 min read",
    tags: ["Study Tips", "Productivity"],
    likes: 42,
    comments: 15,
    coverImage: "/images/student-studying.jpeg",
  }

  const featuredBlog = blog || defaultBlog

  return (
    <Card className="overflow-hidden border-2 border-[#0033A0]">
      <div className="relative">
        <Badge className="absolute top-4 left-4 z-10 bg-[#0033A0]">Featured</Badge>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={featuredBlog.author.avatar || "/placeholder.svg"} alt={featuredBlog.author.name} />
                  <AvatarFallback>{featuredBlog.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/student/profile/${featuredBlog.author.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="font-medium hover:underline cursor-pointer">{featuredBlog.author.name}</div>
                  </Link>
                  <div className="text-sm text-gray-500">
                    {featuredBlog.author.role} • {featuredBlog.date} • {featuredBlog.readTime}
                  </div>
                </div>
              </div>

              <div>
                <Link href={`/student/blogs/${featuredBlog.id}`}>
                  <h3 className="text-2xl font-bold text-[#0033A0] hover:underline">{featuredBlog.title}</h3>
                </Link>
                <p className="mt-2 text-gray-700 line-clamp-3">{featuredBlog.excerpt}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {featuredBlog.tags.map((tag) => (
                  <Link href={`/student/blogs/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={tag}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/student/blogs/${featuredBlog.id}`}>
                <Button className="bg-[#0033A0] hover:bg-[#002180]">Read Featured Post</Button>
              </Link>
            </div>
          </div>

          {featuredBlog.coverImage && (
            <div className="h-full min-h-[200px] md:min-h-[unset]">
              <img
                src={featuredBlog.coverImage || "/placeholder.svg"}
                alt={featuredBlog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
