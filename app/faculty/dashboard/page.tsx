import { PageLayout } from "@/components/page-layout"
import { RecentBlogs } from "@/components/recent-blogs"
import { UpcomingEvents } from "@/components/upcoming-events"

export default function FacultyDashboardPage() {
  return (
    <PageLayout role="faculty">
      <div className="grid gap-4">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Welcome back, Professor!</h1>
          <div className="grid gap-4">
            <RecentBlogs />
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
