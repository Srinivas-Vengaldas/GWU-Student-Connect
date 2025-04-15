"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogCard } from "@/components/blogs/blog-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const mockPosts = [
  {
    id: 1,
    type: "blog",
    title: "My Experience with Research Methods",
    excerpt:
      "Last semester, I participated in a research project that taught me valuable skills in data collection and analysis.",
    author: {
      id: "profile-user",
      name: "Alex Morgan",
      role: "Student",
      avatar: "/placeholder.svg",
      initials: "AM",
      major: "Psychology",
      year: "Junior",
    },
    date: "2 weeks ago",
    readTime: "6 min read",
    tags: ["Research", "Psychology", "Data Analysis"],
    likes: 24,
    comments: 8,
    saves: 12,
    shares: 5,
    coverImage: "/placeholder.svg?height=300&width=600",
    visibility: "public",
  },
  {
    id: 2,
    type: "quick",
    title: "",
    excerpt: "Just submitted my application for the summer research program! Fingers crossed!",
    author: {
      id: "profile-user",
      name: "Alex Morgan",
      role: "Student",
      avatar: "/placeholder.svg",
      initials: "AM",
      major: "Psychology",
      year: "Junior",
    },
    date: "3 days ago",
    tags: ["Summer Research", "Application"],
    likes: 15,
    comments: 3,
    saves: 0,
    shares: 0,
    visibility: "public",
  },
  {
    id: 3,
    type: "blog",
    title: "5 Study Techniques That Saved My GPA",
    excerpt:
      "After struggling with my coursework, I discovered these effective study methods that dramatically improved my academic performance.",
    author: {
      id: "profile-user",
      name: "Alex Morgan",
      role: "Student",
      avatar: "/placeholder.svg",
      initials: "AM",
      major: "Psychology",
      year: "Junior",
    },
    date: "1 month ago",
    readTime: "4 min read",
    tags: ["Study Tips", "Academic Success", "Time Management"],
    likes: 36,
    comments: 14,
    saves: 28,
    shares: 9,
    coverImage: "/placeholder.svg?height=300&width=600",
    visibility: "public",
  },
]

export function ProfilePosts() {
  const [posts, setPosts] = useState(mockPosts)
  const [postType, setPostType] = useState("all")
  const [sort, setSort] = useState("newest")

  const filteredPosts = posts.filter((post) => {
    if (postType !== "all" && post.type !== postType) return false
    return true
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sort === "newest") {
      // Simple sort by id for mock data
      return b.id - a.id
    } else if (sort === "most-liked") {
      return b.likes - a.likes
    } else if (sort === "most-commented") {
      return b.comments - a.comments
    }
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" value={postType} onValueChange={setPostType}>
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="blog">Blogs</TabsTrigger>
            <TabsTrigger value="quick">Quick Posts</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="most-liked">Most Liked</SelectItem>
            <SelectItem value="most-commented">Most Commented</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sortedPosts.length > 0 ? (
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <BlogCard key={post.id} blog={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No posts found</h3>
          <p className="text-gray-500">This user hasn't created any posts yet</p>
        </div>
      )}
    </div>
  )
}
