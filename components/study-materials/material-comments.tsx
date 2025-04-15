"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, Reply, Flag, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type Comment = {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    role: string
  }
  content: string
  timestamp: string
  likes: number
  replies: CommentReply[]
  isLiked: boolean
}

type CommentReply = {
  id: string
  user: {
    id: string
    name: string
    avatar: string
    role: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

type MaterialCommentsProps = {
  materialId: string
}

export function MaterialComments({ materialId }: MaterialCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        id: "1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content:
        "This material was really helpful for understanding the concepts. I especially liked the examples on page 15.",
      timestamp: "2023-04-10T14:30:00Z",
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: "1-1",
          user: {
            id: "2",
            name: "Prof. Williams",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Faculty",
          },
          content: "Glad you found it helpful, Alex! I'll be adding more examples like those in the next update.",
          timestamp: "2023-04-10T15:45:00Z",
          likes: 2,
          isLiked: true,
        },
      ],
    },
    {
      id: "2",
      user: {
        id: "3",
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: "I think there might be a typo in the formula on page 23. Shouldn't the exponent be negative?",
      timestamp: "2023-04-09T10:15:00Z",
      likes: 3,
      isLiked: true,
      replies: [],
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date)
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        id: "current-user",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: [],
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const newReply: CommentReply = {
      id: `reply-${Date.now()}`,
      user: {
        id: "current-user",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyingTo(null)
    setReplyContent("")
  }

  const toggleLike = (commentId: string, isReply = false, replyId?: string) => {
    if (isReply && replyId) {
      const updatedComments = comments.map((comment) => {
        if (comment.replies.some((reply) => reply.id === replyId)) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked,
                }
              }
              return reply
            }),
          }
        }
        return comment
      })
      setComments(updatedComments)
    } else {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      })
      setComments(updatedComments)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Discussion
        </CardTitle>
        <CardDescription>Share your thoughts and questions about this material</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handleAddComment}>Post Comment</Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border rounded-lg p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.user.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {comment.user.role}
                    </Badge>
                    <span className="text-muted-foreground text-sm">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={comment.isLiked ? "text-blue-600" : ""}
                      onClick={() => toggleLike(comment.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes > 0 && comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Copy Link</DropdownMenuItem>
                        <DropdownMenuItem>Bookmark</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {replyingTo === comment.id && (
                    <div className="mt-4 ml-6">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}

                  {comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3 ml-6 border-l-2 pl-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={reply.user.avatar || "/placeholder.svg"} alt={reply.user.name} />
                            <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{reply.user.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {reply.user.role}
                              </Badge>
                              <span className="text-muted-foreground text-sm">{formatDate(reply.timestamp)}</span>
                            </div>
                            <p className="mt-1">{reply.content}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={reply.isLiked ? "text-blue-600" : ""}
                                onClick={() => toggleLike(comment.id, true, reply.id)}
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {reply.likes > 0 && reply.likes}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Flag className="h-3 w-3 mr-1" />
                                Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
