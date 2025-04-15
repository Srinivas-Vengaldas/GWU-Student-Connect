import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, Eye, BookOpen } from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

interface FacultyFeaturedBlogBannerProps {
  blog: {
    id: string
    title: string
    excerpt: string
    date: string
    tags: string[]
    likes: number
    comments: number
    views: number
    author: {
      id: string
      name: string
      avatar?: string
      department?: string
    }
    coverImage?: string
    visibility: string
    course?: string
    department?: string
  }
}

export function FacultyFeaturedBlogBanner({ blog }: FacultyFeaturedBlogBannerProps) {
  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        {blog.coverImage && (
          <div className="md:w-2/5 h-48 md:h-auto">
            <img
              src={blog.coverImage || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-full object-cover"
              style={{ maxHeight: "300px" }}
            />
          </div>
        )}
        <div className={`${blog.coverImage ? "md:w-3/5" : "w-full"}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                Featured
              </Badge>
            </div>
            <Link href={`/faculty/blogs/${blog.id}`}>
              <h3 className="text-xl md:text-2xl font-bold hover:text-[#0033A0] transition-colors mb-2">
                {blog.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4">{blog.excerpt}</p>

            <div className="flex items-center gap-3 mb-4">
              <UserAvatar user={blog.author} showName={true} />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">
                  {new Date(blog.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                {blog.author.department && <span className="text-xs text-gray-500">{blog.author.department}</span>}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {blog.visibility === "course" && blog.course && (
                <Badge variant="outline" className="text-xs bg-blue-50">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {blog.course}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-xs">{blog.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="text-xs">{blog.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Eye className="h-4 w-4 mr-1" />
                  <span className="text-xs">{blog.views}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
