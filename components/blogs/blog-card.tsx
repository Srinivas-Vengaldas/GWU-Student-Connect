import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare, Bookmark, Share2 } from "lucide-react"

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  authorRole: string
  date: string
  commentCount: number
  likeCount: number
  tags: string[]
  coverImage?: string
}

export function BlogCard({
  id,
  title,
  excerpt,
  author,
  authorRole,
  date,
  commentCount,
  likeCount,
  tags,
  coverImage,
}: BlogCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {coverImage && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={coverImage || "/placeholder.svg?height=192&width=384"}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={author} />
            <AvatarFallback>
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/student/profile/${author.toLowerCase().replace(/\s+/g, "-")}`}>
              <p className="text-sm font-medium hover:underline">{author}</p>
            </Link>
            <p className="text-xs text-gray-500">
              {authorRole} • {date}
            </p>
          </div>
        </div>

        <Link href={`/student/blogs/${id}`}>
          <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors mb-2">{title}</h3>
        </Link>

        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{excerpt}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <Link href={`/student/blogs/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={tag}>
              <Badge variant="outline" className="text-xs hover:bg-secondary cursor-pointer">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#0033A0]">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-xs">{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#0033A0]">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{commentCount}</span>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#0033A0]">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#0033A0]">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
