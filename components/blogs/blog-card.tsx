import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

interface BlogCardProps {
  blog: {
    id: string
    title: string
    excerpt: string
    date: string
    tags: string[]
    likes: number
    comments: number
    author: {
      id: string
      name: string
      avatar?: string
    }
  }
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <UserAvatar user={blog.author} showName={true} />
          <span className="text-xs text-gray-500">
            {new Date(blog.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <Link href={`/student/blogs/${blog.id}`}>
          <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors mb-2">{blog.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
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
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
