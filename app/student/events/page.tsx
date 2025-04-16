"use client"
import { EventsHeader } from "@/components/events/events-header"
import { EventsList } from "@/components/events/events-list"
import { EventsCalendar } from "@/components/events/events-calendar"
import { EventsFilter } from "@/components/events/events-filter"
import { FeaturedEvents } from "@/components/events/featured-events"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsProvider } from "@/contexts/events-context"
import { PageLayout } from "@/components/page-layout"

export default function EventsPage() {
  return (
    <EventsProvider>
      <PageLayout role="student">
        <div className="flex-1 space-y-6">
          <EventsHeader />

          <FeaturedEvents />

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-64 shrink-0">
                <EventsFilter />
              </div>

              <div className="flex-1">
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
        </div>
      </PageLayout>
    </EventsProvider>
  )
}
