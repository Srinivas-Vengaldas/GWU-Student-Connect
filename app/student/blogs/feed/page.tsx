import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Filter } from "lucide-react"
import { BlogCard } from "@/components/blogs/blog-card"
import { PostCreator } from "@/components/blogs/post-creator"

export default function StudentBlogsFeedPage() {
  return (
    <PageLayout role="student">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">News Feed</h1>
        <Button asChild>
          <Link href="/student/blogs/create">
            <Plus className="mr-2 h-4 w-4" /> Create Post
          </Link>
        </Button>
      </div>

      <PostCreator />

      <div className="flex items-center justify-between my-6">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="space-y-6">
        <BlogCard
          id="1"
          title="Tips for Acing Your Finals"
          excerpt="Here are some proven strategies that helped me prepare for and excel in my final exams last semester."
          author="Sarah Johnson"
          authorRole="Computer Science"
          date="2 days ago"
          commentCount={12}
          likeCount={45}
          tags={["Study Tips", "Finals", "Productivity"]}
          expanded
        />
        <BlogCard
          id="2"
          title="My Internship Experience at Google"
          excerpt="I spent last summer as a software engineering intern at Google. Here's what I learned and how you can prepare for a similar opportunity."
          author="Michael Chen"
          authorRole="Computer Science"
          date="1 week ago"
          commentCount={8}
          likeCount={67}
          tags={["Internships", "Career", "Tech"]}
          expanded
        />
        <BlogCard
          id="3"
          title="Research Opportunities in Psychology"
          excerpt="Looking to gain research experience in psychology? Here are some opportunities both on and off campus that you might not know about."
          author="Emily Rodriguez"
          authorRole="Psychology"
          date="3 days ago"
          commentCount={5}
          likeCount={23}
          tags={["Research", "Psychology", "Opportunities"]}
          expanded
        />
      </div>
    </PageLayout>
  )
}
