import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function FacultyRelatedPosts() {
  // Mock related posts data
  const relatedPosts = [
    {
      id: "3",
      title: "Navigating Academic Publishing as a Graduate Student",
      excerpt: "Publishing your research as a graduate student can be intimidating...",
      date: "2024-05-05T11:20:00Z",
      tags: ["Academic Publishing", "Graduate Studies", "Research"],
    },
    {
      id: "4",
      title: "Integrating AI Tools in Your Research Workflow",
      excerpt: "Artificial intelligence tools can enhance your research productivity...",
      date: "2024-05-01T16:45:00Z",
      tags: ["AI", "Research Tools", "Academic Technology"],
    },
    {
      id: "6",
      title: "Crafting Effective Literature Reviews",
      excerpt: "A comprehensive guide to writing literature reviews that demonstrate critical thinking...",
      date: "2024-04-22T13:10:00Z",
      tags: ["Academic Writing", "Research Methods", "Literature Review"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relatedPosts.map((post) => (
          <div key={post.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <Link href={`/faculty/blogs/${post.id}`}>
              <h3 className="font-medium hover:text-[#0033A0] transition-colors">{post.title}</h3>
            </Link>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{post.excerpt}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(post.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
