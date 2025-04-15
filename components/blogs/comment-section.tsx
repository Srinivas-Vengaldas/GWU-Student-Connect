"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Reply, MoreHorizontal, Send } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar: string
    initials: string
  }
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
}

interface CommentSectionProps {
  postId: string
  initialCommentCount: number
}

// Mock data for demonstration
const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      initials: "AJ",
    },
    content: "This is really insightful! I've been struggling with this concept for weeks.",
    timestamp: "2 hours ago",
    likes: 5,
    replies: [
      {
        id: "1-1",
        author: {
          id: "user2",
          name: "Taylor Smith",
          avatar: "/placeholder.svg",
          initials: "TS",
        },
        content: "I agree! The explanation really helped me understand it better.",
        timestamp: "1 hour ago",
        likes: 2,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: {
      id: "user3",
      name: "Jordan Lee",
      avatar: "/placeholder.svg",
      initials: "JL",
    },
    content: "Thanks for sharing this! Do you have any additional resources on this topic?",
    timestamp: "3 hours ago",
    likes: 3,
    replies: [],
  },
]

export function CommentSection({ postId, initialCommentCount }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `new-${Date.now()}`,
      author: {
        id: "current-user",
        name: "Current User",
        avatar: "/placeholder.svg",
        initials: "CU",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `reply-${Date.now()}`,
      author: {
        id: "current-user",
        name: "Current User",
        avatar: "/placeholder.svg",
        initials: "CU",
      },
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      replies: [],
    }

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyingTo(null)
    setReplyContent("")
  }

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1,
        }
      }

      // Check in replies
      if (comment.replies.length > 0) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === commentId) {
            return {
              ...reply,
              likes: reply.likes + 1,
            }
          }
          return reply
        })

        return {
          ...comment,
          replies: updatedReplies,
        }
      }

      return comment
    })

    setComments(updatedComments)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Comments ({comments.length})</h3>

      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="Current User" />
          <AvatarFallback>CU</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end mt-2">
            <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Post
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{comment.author.name}</div>
                    <div className="text-xs text-gray-500">{comment.timestamp}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Report</DropdownMenuItem>
                      {comment.author.id === "current-user" && (
                        <>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-1 text-sm">{comment.content}</div>
                <div className="mt-2 flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <Heart className="h-3 w-3 mr-1" />
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                </div>

                {replyingTo === comment.id && (
                  <div className="mt-3 flex gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt="Current User" />
                      <AvatarFallback>CU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder={`Reply to ${comment.author.name}...`}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[60px] resize-none text-sm"
                      />
                      <div className="flex justify-end mt-2 gap-2">
                        <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleAddReply(comment.id)} disabled={!replyContent.trim()}>
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 pl-6 space-y-4 border-l-2 border-gray-100">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                          <AvatarFallback>{reply.author.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-sm">{reply.author.name}</div>
                              <div className="text-xs text-gray-500">{reply.timestamp}</div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Report</DropdownMenuItem>
                                {reply.author.id === "current-user" && (
                                  <>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="mt-1 text-sm">{reply.content}</div>
                          <div className="mt-2 flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 px-2 text-xs"
                              onClick={() => handleLikeComment(reply.id)}
                            >
                              <Heart className="h-3 w-3 mr-1" />
                              {reply.likes > 0 && <span>{reply.likes}</span>}
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
    </div>
  )
}
