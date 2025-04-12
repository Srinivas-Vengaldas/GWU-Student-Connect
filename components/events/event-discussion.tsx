"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageSquare, Flag } from "lucide-react"

interface EventDiscussionProps {
  eventId: string
}

export function EventDiscussion({ eventId }: EventDiscussionProps) {
  const [comment, setComment] = useState("")

  // Sample comments data
  const comments = [
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: "Will there be representatives from tech startups at this event?",
      timestamp: "2 days ago",
      likes: 5,
      replies: [
        {
          id: "1-1",
          user: {
            name: "Career Services",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Organizer",
          },
          content:
            "Yes! We'll have several tech startups attending. You can find the full list of companies in the resources section.",
          timestamp: "1 day ago",
          likes: 2,
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      content: "Is business casual attire appropriate for this event?",
      timestamp: "1 day ago",
      likes: 3,
      replies: [],
    },
  ]

  const handleSubmitComment = () => {
    if (comment.trim()) {
      // In a real app, you would send this to your backend
      console.log("Submitting comment:", comment)
      setComment("")
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Discussion</h2>

        {/* Comment Form */}
        <div className="mb-6">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Ask a question or leave a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] mb-2"
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!comment.trim()}
                className="bg-[#0033A0] hover:bg-[#002180]"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.user.name}</span>
                    {comment.user.role === "Organizer" && (
                      <span className="bg-[#0033A0]/10 text-[#0033A0] text-xs px-2 py-0.5 rounded">Organizer</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{comment.timestamp}</p>
                  <p className="mt-2">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-500">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-500">
                      <MessageSquare className="h-4 w-4" />
                      <span>Reply</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-500">
                      <Flag className="h-4 w-4" />
                      <span>Report</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-12 space-y-4 border-l-2 border-gray-100 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                        <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{reply.user.name}</span>
                          {reply.user.role === "Organizer" && (
                            <span className="bg-[#0033A0]/10 text-[#0033A0] text-xs px-2 py-0.5 rounded">
                              Organizer
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{reply.timestamp}</p>
                        <p className="mt-2">{reply.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-500">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{reply.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 text-gray-500">
                            <Flag className="h-4 w-4" />
                            <span>Report</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
