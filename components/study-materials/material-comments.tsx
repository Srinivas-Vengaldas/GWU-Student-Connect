"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Reply, Flag, MoreHorizontal } from "lucide-react"

interface MaterialCommentsProps {
  materialId: string
}

export function MaterialComments({ materialId }: MaterialCommentsProps) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "This study guide was incredibly helpful for my final exam preparation. The practice problems were especially useful!",
      date: "May 12, 2024",
      likes: 5,
      liked: false,
    },
    {
      id: "2",
      user: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "I found a few errors in the integration section. The formula for u-substitution has a typo on page 7.",
      date: "May 11, 2024",
      likes: 2,
      liked: false,
    },
    {
      id: "3",
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Could you add more examples for the chain rule? That's the part I'm struggling with the most.",
      date: "May 10, 2024",
      likes: 3,
      liked: false,
    },
  ])

  const handleSubmitComment = () => {
    if (!comment.trim()) return

    const newComment = {
      id: `${comments.length + 1}`,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: comment,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      likes: 0,
      liked: false,
    }

    setComments([newComment, ...comments])
    setComment("")
  }

  const handleLikeComment = (id: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            likes: c.liked ? c.likes - 1 : c.likes + 1,
            liked: !c.liked,
          }
        }
        return c
      }),
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-medium mb-4">Comments ({comments.length})</h3>

        <div className="mb-6">
          <Textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleSubmitComment} className="bg-[#0033A0] hover:bg-[#002180]">
            Post Comment
          </Button>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{comment.user.name}</p>
                      <p className="text-xs text-gray-500">{comment.date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-gray-700">{comment.content}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <Heart className={`h-4 w-4 ${comment.liked ? "fill-red-500 text-red-500" : ""}`} />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Reply className="h-4 w-4" />
                      <span>Reply</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Flag className="h-4 w-4" />
                      <span>Report</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
