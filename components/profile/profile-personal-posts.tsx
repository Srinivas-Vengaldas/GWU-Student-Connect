"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageSquare, Share2, MessageCircle, Send } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface ProfilePersonalPostsProps {
  student: any
}

export function ProfilePersonalPosts({ student }: ProfilePersonalPostsProps) {
  const [newPostText, setNewPostText] = useState("")

  // This would be fetched from an API in a real app
  const posts = [
    {
      id: 1,
      content:
        "Just finished my research project on digital media's effects on anxiety levels. Looking forward to presenting at the Psychology Research Symposium next month!",
      date: "2 days ago",
      likes: 24,
      comments: 5,
      isLiked: false,
    },
    {
      id: 2,
      content: "Has anyone taken PSY 350 with Dr. Martinez? Looking for advice on the final paper requirements.",
      date: "1 week ago",
      likes: 8,
      comments: 12,
      isLiked: true,
    },
    {
      id: 3,
      content:
        "Just uploaded a new study guide for Cognitive Psychology (PSY 201). Check it out in the Study Materials section if you're preparing for Professor Johnson's midterm!",
      date: "2 weeks ago",
      likes: 36,
      comments: 7,
      isLiked: false,
    },
  ]

  const [likedPosts, setLikedPosts] = useState(
    posts.reduce(
      (acc, post) => {
        acc[post.id] = post.isLiked
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )

  const handleToggleLike = (postId: number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handlePostSubmit = () => {
    if (newPostText.trim()) {
      // In a real app, you'd call an API to create a new post
      console.log("Creating new post:", newPostText)
      setNewPostText("")
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-[#0033A0]" />
          Personal Updates
          <Badge className="ml-2">{posts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {student.isCurrentUser && (
          <div className="mb-6">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback>
                  {student.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share an update, question, or announcement..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    onClick={handlePostSubmit}
                    disabled={!newPostText.trim()}
                    className="bg-[#0033A0] hover:bg-[#002180]"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Post Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">{student.name}</span>
                          <span className="text-xs text-gray-500 ml-2">{post.date}</span>
                        </div>
                        {student.isCurrentUser && (
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-more-horizontal"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="19" cy="12" r="1" />
                              <circle cx="5" cy="12" r="1" />
                            </svg>
                          </Button>
                        )}
                      </div>
                      <p className="mt-1 text-gray-700">{post.content}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center gap-1 ${likedPosts[post.id] ? "text-[#0033A0]" : ""}`}
                          onClick={() => handleToggleLike(post.id)}
                        >
                          <ThumbsUp className={`h-4 w-4 ${likedPosts[post.id] ? "fill-[#0033A0]" : ""}`} />
                          <span>
                            {post.likes +
                              (likedPosts[post.id] && !post.isLiked
                                ? 1
                                : likedPosts[post.id]
                                  ? 0
                                  : post.isLiked
                                    ? -1
                                    : 0)}
                          </span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No updates yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
