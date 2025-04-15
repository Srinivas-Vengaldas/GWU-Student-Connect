"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { UserAvatar } from "@/components/user-avatar"
import { Heart, Reply, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Comment {
  id: string
  content: string
  date: string
  likes: number
  author: {
    id: string
    name: string
    avatar?: string
    role: string
  }
  replies?: Comment[]
}

export function FacultyBlogComments() {
  const [newComment, setNewComment] = useState("")

  // Mock comments data
  const comments: Comment[] = [
    {
      id: "1",
      content:
        "This is incredibly helpful! I've been struggling with narrowing down my research question for weeks. The examples you provided really clarified what makes a strong vs. weak question.",
      date: "2024-05-10T15:30:00Z",
      likes: 5,
      author: {
        id: "s1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      replies: [
        {
          id: "1-1",
          content:
            "I'm glad you found it helpful, Alex! Feel free to bring your draft research question to my office hours if you'd like more specific feedback.",
          date: "2024-05-10T16:15:00Z",
          likes: 2,
          author: {
            id: "f1",
            name: "Dr. Hassan Ahmed",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Faculty",
          },
        },
      ],
    },
    {
      id: "2",
      content:
        "The table comparing appropriate vs. inappropriate methods is particularly useful. Would you recommend any specific resources for learning more about experimental design for psychology research?",
      date: "2024-05-10T17:45:00Z",
      likes: 3,
      author: {
        id: "s2",
        name: "Maya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
    },
    {
      id: "3",
      content:
        "I've been guilty of #4 (unrealistic scope) in my previous proposals. This is a good reminder to be more focused and realistic about what can be accomplished in a semester.",
      date: "2024-05-11T09:20:00Z",
      likes: 7,
      author: {
        id: "s3",
        name: "Carlos Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
    },
  ]

  const handleSubmitComment = () => {
    // In a real app, you would submit the comment to the server
    setNewComment("")
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? "ml-12 mt-3" : "mb-6"}`}>
      <div className="flex gap-3">
        <UserAvatar user={comment.author} size="sm" />
        <div className="flex-1">
          <div className={`${comment.author.role === "Faculty" ? "bg-blue-50" : "bg-gray-50"} p-3 rounded-lg`}>
            <div className="flex items-center justify-between mb-1">
              <Link
                href={`/${comment.author.role.toLowerCase()}/profile/${comment.author.id}`}
                className="font-medium hover:text-[#0033A0]"
              >
                {comment.author.name}
                {comment.author.role === "Faculty" && (
                  <Badge variant="outline" className="ml-2 text-xs bg-blue-50">
                    Faculty
                  </Badge>
                )}
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
    <Card>
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3">
          <UserAvatar user={{ id: "f1", name: "Dr. Hassan Ahmed", role: "Faculty" }} size="sm" />
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment or reply to students..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="bg-[#0033A0] hover:bg-[#002180]"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-8">{comments.map((comment) => renderComment(comment))}</div>
      </CardContent>
    </Card>
  )
}
