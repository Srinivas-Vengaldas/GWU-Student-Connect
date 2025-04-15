import { PageLayout } from "@/components/page-layout"
import { WelcomePanel } from "@/components/dashboard/welcome-panel"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { ScheduleWidget } from "@/components/dashboard/schedule-widget"
import { StudyGroupPreview } from "@/components/dashboard/study-group-preview"
import { RecentMaterials } from "@/components/dashboard/recent-materials"
import { SuggestionsWidget } from "@/components/dashboard/suggestions-widget"

export default function StudentDashboardPage() {
  return (
    <PageLayout role="student">
      <div className="space-y-6 py-6 px-4 md:px-6">
        {/* Welcome & Overview Panel */}
        <WelcomePanel />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <QuickActions />
            <StudyGroupPreview />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-2 space-y-6">
            <ActivityFeed />
            <RecentMaterials />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScheduleWidget />
          <SuggestionsWidget />
        </div>
      </div>
    </PageLayout>
  )
}
