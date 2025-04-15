import { Skeleton } from "@/components/ui/skeleton"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function FacultyDashboardLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="faculty" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            {/* Welcome Banner Skeleton */}
            <Skeleton className="h-[180px] w-full rounded-lg" />

            {/* Main Dashboard Content Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-[180px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-[200px] w-full" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-[180px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-[200px] w-full" />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-[180px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-[200px] w-full" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-6 w-[180px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-[200px] w-full" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Settings & Quick Links Skeleton */}
            <Card className="mt-4">
              <CardHeader>
                <Skeleton className="h-6 w-[120px]" />
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Skeleton className="h-[80px] w-full" />
                  <Skeleton className="h-[80px] w-full" />
                  <Skeleton className="h-[80px] w-full" />
                  <Skeleton className="h-[80px] w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
