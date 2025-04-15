import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, MessageSquare, Share2, Eye, Edit, Trash2, BookOpen } from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"
import { Separator } from "@/components/ui/separator"
import { FacultyBlogComments } from "@/components/faculty-blogs/faculty-blog-comments"
import { FacultyRelatedPosts } from "@/components/faculty-blogs/faculty-related-posts"

export default function FacultyBlogDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the blog post data based on the ID
  const blog = {
    id: params.id,
    type: "article",
    title: "5 Mistakes to Avoid on Your Research Proposal",
    content: `
# 5 Mistakes to Avoid on Your Research Proposal

Based on years of reviewing student research proposals, I've compiled the most common mistakes that can easily be avoided with proper planning and attention to detail.

## 1. Vague Research Questions

Your research question should be specific, measurable, and focused. Avoid broad questions like "How does social media affect students?" Instead, try something like "How does daily Instagram usage correlate with anxiety levels among undergraduate students aged 18-22?"

**Example of a weak question:**
- How does climate change impact agriculture?

**Example of a strong question:**
- How have changing precipitation patterns between 2000-2020 affected corn yields in the Midwestern United States?

## 2. Inadequate Literature Review

Many students simply summarize previous studies without critically analyzing them or explaining their relevance to the proposed research.

Your literature review should:
- Identify gaps in existing research
- Establish theoretical frameworks
- Justify your methodology choices
- Connect directly to your research questions

## 3. Methodological Misalignment

Your methodology must align with your research questions. If you're investigating causation, a correlational study design won't suffice.

| Research Goal | Appropriate Methods | Inappropriate Methods |
| ------------- | ------------------- | --------------------- |
| Establish causation | Experimental designs | Surveys, correlational studies |
| Explore experiences | Qualitative interviews | Purely quantitative approaches |
| Measure prevalence | Large-scale surveys | Case studies |

## 4. Unrealistic Scope

Be honest about what you can accomplish within your timeframe and resources. It's better to do a focused study well than an ambitious study poorly.

Consider:
- Time constraints
- Access to participants
- Available resources
- Your own expertise

## 5. Ethical Oversights

Always thoroughly address ethical considerations, even if they seem obvious. This includes:

- Informed consent procedures
- Data privacy and security
- Potential risks to participants
- Conflicts of interest

Remember that a strong research proposal demonstrates not just what you want to study, but that you understand *how* to study it properly.

Feel free to schedule office hours if you'd like feedback on your specific proposal!
    `,
    date: "2024-05-10T14:30:00Z",
    readTime: "8 min read",
    tags: ["Research Methods", "Academic Writing", "SOCI 301"],
    likes: 24,
    comments: 6,
    views: 75,
    author: {
      id: "f1",
      name: "Dr. Hassan Ahmed",
      role: "Faculty",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Sociology",
    },
    coverImage: "/placeholder.svg?height=400&width=800",
    visibility: "course",
    course: "SOCI 301: Advanced Research Methods",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="faculty" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="faculty" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
              <Link href="/faculty/blogs">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Link href={`/faculty/blogs/${params.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4">
                  {blog.coverImage && (
                    <div className="w-full h-64 md:h-80 overflow-hidden rounded-md">
                      <img
                        src={blog.coverImage || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-2">
                    {blog.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {blog.visibility === "course" && blog.course && (
                      <Badge variant="outline" className="text-xs bg-blue-50">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {blog.course}
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold">{blog.title}</h1>

                  <div className="flex items-center gap-4">
                    <UserAvatar user={blog.author} showName={true} />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        {new Date(blog.date).toLocaleDateString(undefined, {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {blog.author.department && (
                        <span className="text-sm text-gray-500">{blog.author.department}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {blog.views} views
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {blog.likes} likes
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {blog.comments} comments
                    </span>
                    <span>{blog.readTime}</span>
                  </div>

                  <Separator />

                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, "<br />") }} />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Like
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <FacultyBlogComments />
              </div>
              <div className="md:col-span-1">
                <FacultyRelatedPosts />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
