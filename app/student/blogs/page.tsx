import { DashboardHeader } from "@/components/dashboard-header"
import { MainNav } from "@/components/main-nav"
import { BlogCard } from "@/components/blogs/blog-card"
import { PollCard } from "@/components/blogs/poll-card"
import { FeaturedBlogBanner } from "@/components/blogs/featured-blog-banner"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BlogsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Blogs</h1>
            <Button asChild>
              <Link href="/student/blogs/create">Create New Blog</Link>
            </Button>
          </div>

          <FeaturedBlogBanner
            title="The Future of AI in Education"
            excerpt="Exploring how artificial intelligence is transforming the educational landscape and what it means for students and educators."
            author="Dr. Sarah Johnson"
            date="May 10, 2023"
            image="/placeholder.svg?height=400&width=800"
            slug="the-future-of-ai-in-education"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <BlogCard
              title="Effective Study Techniques for Finals"
              excerpt="Learn about evidence-based study methods that can help you prepare for your final exams more effectively."
              author="James Wilson"
              date="May 8, 2023"
              image="/placeholder.svg?height=200&width=400"
              slug="effective-study-techniques"
              tags={["Study Tips", "Finals", "Productivity"]}
            />
            <BlogCard
              title="Networking Tips for College Students"
              excerpt="Building professional connections while still in college can give you a head start in your career. Here's how to do it right."
              author="Emily Rodriguez"
              date="May 5, 2023"
              image="/placeholder.svg?height=200&width=400"
              slug="networking-tips-college-students"
              tags={["Career", "Networking", "Professional Development"]}
            />
            <PollCard
              question="What study method works best for you?"
              options={[
                { id: "1", text: "Flashcards", votes: 45 },
                { id: "2", text: "Practice tests", votes: 78 },
                { id: "3", text: "Group study", votes: 32 },
                { id: "4", text: "Teaching others", votes: 56 },
              ]}
              totalVotes={211}
              author="Michael Chen"
              date="May 7, 2023"
            />
            <BlogCard
              title="Balancing Academics and Extracurriculars"
              excerpt="Finding the right balance between your studies and other activities is crucial for a fulfilling college experience."
              author="Robert Brown"
              date="May 3, 2023"
              image="/placeholder.svg?height=200&width=400"
              slug="balancing-academics-extracurriculars"
              tags={["Student Life", "Balance", "Time Management"]}
            />
            <BlogCard
              title="Research Opportunities for Undergraduates"
              excerpt="Discover various research opportunities available to undergraduate students and how to get involved."
              author="Dr. Lisa Thompson"
              date="May 1, 2023"
              image="/placeholder.svg?height=200&width=400"
              slug="research-opportunities-undergraduates"
              tags={["Research", "Opportunities", "Academic"]}
            />
            <BlogCard
              title="Mental Health Resources on Campus"
              excerpt="A comprehensive guide to the mental health resources available to students on campus."
              author="Jennifer Lee"
              date="April 28, 2023"
              image="/placeholder.svg?height=200&width=400"
              slug="mental-health-resources-campus"
              tags={["Mental Health", "Wellness", "Campus Resources"]}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
