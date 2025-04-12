import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { EventsHeader } from "@/components/events/events-header"
import { EventsList } from "@/components/events/events-list"
import { EventsCalendar } from "@/components/events/events-calendar"
import { EventsFilter } from "@/components/events/events-filter"
import { FeaturedEvents } from "@/components/events/featured-events"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="student" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-6">
            <EventsHeader />

            <FeaturedEvents />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <EventsFilter />
              </div>

              <div className="md:col-span-3">
                <Tabs defaultValue="list" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="list">List View</TabsTrigger>
                      <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="list" className="mt-0">
                    <EventsList />
                  </TabsContent>

                  <TabsContent value="calendar" className="mt-0">
                    <EventsCalendar />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
