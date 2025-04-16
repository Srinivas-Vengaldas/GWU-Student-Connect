"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { UserAvatar } from "@/components/user-avatar"
import { Heart, Reply, MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface Comment {
  id: string
  content: string
  date: string
  likes: number
  author: {
    id: string
    name: string
    avatar?: string
  }
  replies?: Comment[]
}

interface BlogCommentsProps {
  blogId?: number | string
  commentCount?: number
  comments?: Comment[]
}

export function BlogComments({ blogId, commentCount = 0, comments = [] }: BlogCommentsProps) {
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = () => {
    // In a real app, you would submit the comment to the server
    setNewComment("")
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? "ml-12 mt-3" : "mb-6"}`}>
      <div className="flex gap-3">
        <UserAvatar user={comment.author} size="sm" />
        <div className="flex-1">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <Link href={`/student/profile/${comment.author.id}`} className="font-medium hover:text-[#0033A0]">
                {comment.author.name}
              </Link>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
            <span>{new Date(comment.date).toLocaleDateString()}</span>
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Heart className="h-3 w-3 mr-1" />
              <span>{comment.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2">
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
          </div>
        </div>
      </div>

      {comment.replies?.map((reply) => renderComment(reply, true))}
    </div>
  )

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Comments ({commentCount})</h3>

      <div className="flex gap-3">
        <UserAvatar user={{ id: "current-user", name: "You" }} size="sm" />
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      {comments.length > 0 && <div className="space-y-6 mt-8">{comments.map((comment) => renderComment(comment))}</div>}
    </div>
  )
}
