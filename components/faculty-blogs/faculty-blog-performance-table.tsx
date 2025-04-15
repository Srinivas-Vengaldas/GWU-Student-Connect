import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Eye, Heart, MessageSquare, TrendingUp, TrendingDown } from "lucide-react"

export function FacultyBlogPerformanceTable() {
  // Mock blog performance data
  const blogPerformance = [
    {
      id: "4",
      title: "Integrating AI Tools in Your Research Workflow",
      date: "2024-05-01",
      views: 215,
      likes: 89,
      comments: 31,
      trend: "up",
      tags: ["AI", "Research Tools"],
    },
    {
      id: "1",
      title: "5 Mistakes to Avoid on Your Research Proposal",
      date: "2024-05-10",
      views: 75,
      likes: 24,
      comments: 6,
      trend: "up",
      tags: ["Research Methods", "Academic Writing"],
    },
    {
      id: "3",
      title: "Navigating Academic Publishing as a Graduate Student",
      date: "2024-05-05",
      views: 142,
      likes: 56,
      comments: 23,
      trend: "up",
      tags: ["Academic Publishing", "Graduate Studies"],
    },
    {
      id: "6",
      title: "Crafting Effective Literature Reviews",
      date: "2024-04-22",
      views: 98,
      likes: 37,
      comments: 12,
      trend: "down",
      tags: ["Academic Writing", "Literature Review"],
    },
    {
      id: "7",
      title: "Ethical Considerations in Social Science Research",
      date: "2024-04-15",
      views: 112,
      likes: 42,
      comments: 11,
      trend: "down",
      tags: ["Research Ethics", "Social Science"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium py-2 px-4">Title</th>
                <th className="text-center font-medium py-2 px-4">Date</th>
                <th className="text-center font-medium py-2 px-4">Views</th>
                <th className="text-center font-medium py-2 px-4">Likes</th>
                <th className="text-center font-medium py-2 px-4">Comments</th>
                <th className="text-center font-medium py-2 px-4">Trend</th>
              </tr>
            </thead>
            <tbody>
              {blogPerformance.map((blog) => (
                <tr key={blog.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Link href={`/faculty/blogs/${blog.id}`} className="hover:text-[#0033A0]">
                      <div className="font-medium">{blog.title}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {blog.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Link>
                  </td>
                  <td className="text-center py-3 px-4 text-gray-500">{blog.date}</td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      <Eye className="h-3 w-3 mr-1 text-gray-500" />
                      {blog.views}
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      <Heart className="h-3 w-3 mr-1 text-gray-500" />
                      {blog.likes}
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <div className="flex items-center justify-center">
                      <MessageSquare className="h-3 w-3 mr-1 text-gray-500" />
                      {blog.comments}
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    {blog.trend === "up" ? (
                      <div className="flex items-center justify-center text-green-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-red-500">
                        <TrendingDown className="h-4 w-4 mr-1" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
