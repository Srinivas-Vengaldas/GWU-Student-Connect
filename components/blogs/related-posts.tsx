import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RelatedPostsProps {
  currentBlogId: number
  tags: string[]
}

export function RelatedPosts({ currentBlogId, tags }: RelatedPostsProps) {
  // In a real app, you would fetch related posts based on tags
  const relatedPosts = [
    {
      id: 2,
      title: "Preparing for Final Exams",
      excerpt: "A comprehensive guide to ace your finals with minimal stress.",
      author: {
        name: "Prof. Robert Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RJ",
      },
      date: "May 5, 2024",
    },
    {
      id: 5,
      title: "Balancing Academics and Extracurriculars",
      excerpt: "How to maintain a healthy balance between your studies and other activities.",
      author: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SW",
      },
      date: "April 22, 2024",
    },
    {
      id: 7,
      title: "Memory Techniques for Better Retention",
      excerpt: "Learn powerful memory techniques to help you retain information longer.",
      author: {
        name: "David Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "DL",
      },
      date: "April 15, 2024",
    },
  ].filter((post) => post.id !== currentBlogId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedPosts.map((post) => (
            <Link href={`/student/blogs/${post.id}`} key={post.id}>
              <div className="p-4 rounded-md border hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-[#0033A0] mb-2">{post.title}</h3>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-xs text-gray-500">
                    {post.author.name} • {post.date}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
