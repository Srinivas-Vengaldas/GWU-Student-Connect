"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal, Hash } from "lucide-react"
import { CommentSection } from "@/components/blogs/comment-section"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Author {
  id: string
  name: string
  role: string
  avatar: string
  initials: string
  major?: string
  year?: string
  department?: string
  graduationYear?: string
}

interface QuickPost {
  id: number
  type: string
  content: string
  author: Author
  date: string
  tags: string[]
  likes: number
  comments: number
  saves: number
  shares: number
  visibility: string
}

interface QuickPostCardProps {
  post: QuickPost
}

export function QuickPostCard({ post }: QuickPostCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  const formatContent = (content: string) => {
    // Convert hashtags to links
    return content.replace(/#(\w+)/g, '<span class="text-[#0033A0]">#$1</span>')
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.initials}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/student/profile/${post.author.id}`}>
                <div className="font-medium hover:text-[#0033A0] hover:underline cursor-pointer">
                  {post.author.name}
                </div>
              </Link>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                {post.author.role}
                {post.author.major && ` • ${post.author.major}`}
                {post.author.year && ` • ${post.author.year}`}
                {post.visibility !== "public" && (
                  <Badge variant="outline" className="text-xs ml-1 px-1 py-0 h-4">
                    {post.visibility === "course-only"
                      ? "Course Only"
                      : post.visibility === "friends-only"
                        ? "Friends Only"
                        : post.visibility}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">
              {new Date(post.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuItem>Report post</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mb-3">
          <p
            className="text-gray-800 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag) => (
            <Link href={`/student/blogs/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={tag}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                <Hash className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-gray-50 flex justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className={`h-8 px-2 ${liked ? "text-red-500" : ""}`} onClick={handleLike}>
            <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs">{likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setShowComments(!showComments)}>
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{post.comments}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${saved ? "text-[#0033A0]" : ""}`}
            onClick={handleSave}
          >
            <Bookmark className={`h-4 w-4 mr-1 ${saved ? "fill-current" : ""}`} />
            <span className="text-xs">{post.saves}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Share2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Share</span>
        </Button>
      </CardFooter>

      {showComments && (
        <div className="px-6 py-4 border-t">
          <CommentSection postId={post.id.toString()} initialCommentCount={post.comments} />
        </div>
      )}
    </Card>
  )
}
