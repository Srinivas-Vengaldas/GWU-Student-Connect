import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, Eye, BookOpen } from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

interface FacultyBlogCardProps {
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
    visibility: string
    course?: string
    department?: string
  }
}

export function FacultyBlogCard({ blog }: FacultyBlogCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <UserAvatar user={blog.author} showName={true} />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">
              {new Date(blog.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </span>
            {blog.author.department && <span className="text-xs text-gray-500">{blog.author.department}</span>}
          </div>
        </div>
        <Link href={`/faculty/blogs/${blog.id}`}>
          <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors mb-2">{blog.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-3">
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
          {blog.visibility === "department" && blog.department && (
            <Badge variant="outline" className="text-xs bg-purple-50">
              {blog.department} Only
            </Badge>
          )}
          {blog.visibility === "public" && (
            <Badge variant="outline" className="text-xs bg-green-50">
              Public
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-gray-50 flex justify-between">
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
      </CardFooter>
    </Card>
  )
}
