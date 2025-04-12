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
  blog: Blog
}

export function FeaturedBlogBanner({ blog }: FeaturedBlogBannerProps) {
  return (
    <Card className="overflow-hidden border-2 border-[#0033A0]">
      <div className="relative">
        <Badge className="absolute top-4 left-4 z-10 bg-[#0033A0]">Featured</Badge>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                  <AvatarFallback>{blog.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/student/profile/${blog.author.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <div className="font-medium hover:underline cursor-pointer">{blog.author.name}</div>
                  </Link>
                  <div className="text-sm text-gray-500">
                    {blog.author.role} • {blog.date} • {blog.readTime}
                  </div>
                </div>
              </div>

              <div>
                <Link href={`/student/blogs/${blog.id}`}>
                  <h3 className="text-2xl font-bold text-[#0033A0] hover:underline">{blog.title}</h3>
                </Link>
                <p className="mt-2 text-gray-700 line-clamp-3">{blog.excerpt}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Link href={`/student/blogs/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={tag}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Link href={`/student/blogs/${blog.id}`}>
                <Button className="bg-[#0033A0] hover:bg-[#002180]">Read Featured Post</Button>
              </Link>
            </div>
          </div>

          {blog.coverImage && (
            <div className="h-full min-h-[200px] md:min-h-[unset]">
              <img
                src={blog.coverImage || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
