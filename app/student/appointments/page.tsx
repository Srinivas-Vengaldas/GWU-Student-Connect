import { DashboardHeader } from "@/components/dashboard-header"
import { MainNav } from "@/components/main-nav"
import { AppointmentList } from "@/components/appointments/appointment-list"
import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"
import { AppointmentFilters } from "@/components/appointments/appointment-filters"
import { AppointmentSearch } from "@/components/appointments/appointment-search"
import { UpcomingAppointments } from "@/components/appointments/upcoming-appointments"
import { RecommendedConnections } from "@/components/appointments/recommended-connections"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AppointmentsPage() {
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
            <h1 className="text-3xl font-bold">Appointments</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="space-y-4">
                  <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <AppointmentSearch />
                    <AppointmentFilters />
                  </div>
                  <AppointmentList />
                </TabsContent>
                <TabsContent value="calendar">
                  <AppointmentCalendar />
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-6">
              <UpcomingAppointments />
              <RecommendedConnections />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
