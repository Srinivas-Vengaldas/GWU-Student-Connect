import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, FileText, ThumbsUp, MessageSquare, BarChart2 } from "lucide-react"

interface ProfileBlogsProps {
  student: any
  limit?: number
}

export function ProfileBlogs({ student, limit }: ProfileBlogsProps) {
  // This would be fetched from an API in a real app
  const blogs = [
    {
      id: 1,
      type: "blog",
      title: "The Connection Between Digital Media and Anxiety",
      excerpt:
        "Exploring the latest research on how digital media consumption affects anxiety levels in college students.",
      date: "Apr 10, 2024",
      readTime: "5 min read",
      tags: ["Mental Health", "Digital Media", "Research"],
      likes: 42,
      comments: 15,
      coverImage: "/placeholder.svg?height=200&width=400",
      author: {
        name: student.name,
        role: student.role,
        avatar: student.avatar,
        initials: student.name
          .split(" ")
          .map((n: string) => n[0])
          .join(""),
      },
    },
    {
      id: 2,
      type: "poll",
      title: "Study Habits Survey: What Works Best for You?",
      date: "Mar 25, 2024",
      deadline: "Apr 30, 2024",
      tags: ["Study Habits", "Academic Success", "Survey"],
      comments: 8,
      totalVotes: 87,
      options: [
        { id: 1, text: "Spaced repetition with flashcards", votes: 32 },
        { id: 2, text: "Group study sessions", votes: 25 },
        { id: 3, text: "Practice problems and exercises", votes: 18 },
        { id: 4, text: "Teaching concepts to others", votes: 12 },
      ],
      author: {
        name: student.name,
        role: student.role,
        avatar: student.avatar,
        initials: student.name
          .split(" ")
          .map((n: string) => n[0])
          .join(""),
      },
    },
    {
      id: 3,
      type: "blog",
      title: "Applying Cognitive Psychology to Everyday Learning",
      excerpt:
        "Practical strategies from cognitive psychology that can enhance your learning experience in any subject.",
      date: "Mar 18, 2024",
      readTime: "7 min read",
      tags: ["Learning Strategies", "Cognitive Psychology", "Academic Tips"],
      likes: 38,
      comments: 12,
      coverImage: null,
      author: {
        name: student.name,
        role: student.role,
        avatar: student.avatar,
        initials: student.name
          .split(" ")
          .map((n: string) => n[0])
          .join(""),
      },
    },
    {
      id: 4,
      type: "poll",
      title: "Technology in the Classroom: Helpful or Distracting?",
      date: "Mar 5, 2024",
      deadline: "Apr 5, 2024",
      tags: ["EdTech", "Classroom", "Technology"],
      comments: 22,
      totalVotes: 112,
      options: [
        { id: 1, text: "Very helpful - enhances learning", votes: 45 },
        { id: 2, text: "Somewhat helpful - depends on usage", votes: 38 },
        { id: 3, text: "Neutral - neither helps nor hurts", votes: 15 },
        { id: 4, text: "Somewhat distracting - reduces focus", votes: 10 },
        { id: 5, text: "Very distracting - should be limited", votes: 4 },
      ],
      author: {
        name: student.name,
        role: student.role,
        avatar: student.avatar,
        initials: student.name
          .split(" ")
          .map((n: string) => n[0])
          .join(""),
      },
    },
  ]

  const displayBlogs = limit ? blogs.slice(0, limit) : blogs

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <FileText className="mr-2 h-5 w-5 text-[#0033A0]" />
          Blogs & Polls
          <Badge className="ml-2">{blogs.length}</Badge>
        </CardTitle>
        {limit && blogs.length > limit && (
          <Link href={`/student/blogs?user=${student.id}`}>
            <Button variant="ghost" className="h-8 w-8 p-0" title="View all blogs and polls">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardHeader>
      <CardContent>
        {displayBlogs.length > 0 ? (
          <div className="space-y-4">
            {displayBlogs.map((blog) => (
              <Link key={blog.id} href={`/student/blogs/${blog.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                        <AvatarFallback>{blog.author.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-[#0033A0]">{blog.title}</h3>
                              <Badge variant="outline" className={blog.type === "poll" ? "bg-purple-50" : "bg-blue-50"}>
                                {blog.type === "poll" ? "Poll" : "Blog"}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">
                              {blog.date} • {blog.type === "blog" ? blog.readTime : `Closes: ${blog.deadline}`}
                            </div>
                          </div>
                        </div>

                        {blog.type === "blog" && blog.excerpt && (
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{blog.excerpt}</p>
                        )}

                        {blog.type === "poll" && (
                          <div className="mt-2 text-sm text-gray-700">
                            <p>
                              {blog.totalVotes} votes on {blog.options.length} options
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1 mt-2">
                          {blog.tags.slice(0, 2).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {blog.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{blog.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          {blog.type === "blog" ? (
                            <>
                              <div className="flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span>{blog.likes}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{blog.comments}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center">
                                <BarChart2 className="h-3 w-3 mr-1" />
                                <span>Results</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{blog.comments}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {limit && blogs.length > limit && (
              <div className="pt-2 text-center">
                <Link href={`/student/blogs?user=${student.id}`}>
                  <Button variant="outline" size="sm">
                    View All ({blogs.length}) Posts
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <FileText className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No blog posts or polls yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
