import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentList } from "@/components/appointments/appointment-list"
import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"
import { AppointmentFilters } from "@/components/appointments/appointment-filters"
import { AppointmentSearch } from "@/components/appointments/appointment-search"
import { UpcomingAppointments } from "@/components/appointments/upcoming-appointments"
import { RecommendedConnections } from "@/components/appointments/recommended-connections"
import { CalendarDays, Users } from "lucide-react"
import Link from "next/link"

export default function AppointmentsPage() {
  return (
    <PageLayout role="student" showSchedule={false}>
      <div className="flex-1 space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Schedule meetings with faculty and alumni for academic and career guidance
            </p>
          </div>
          <Link href="/student/appointments/my-appointments">
            <Button className="bg-[#0033A0] hover:bg-[#002180]">
              <Users className="mr-2 h-4 w-4" />
              My Appointments
            </Button>
          </Link>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs defaultValue="list" className="w-full">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <TabsList>
                  <TabsTrigger value="list" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    People
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                </TabsList>
                <div className="flex space-x-2">
                  <AppointmentSearch />
                  <AppointmentFilters />
                </div>
              </div>

              <TabsContent value="list" className="mt-6">
                <AppointmentList />
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
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
    </PageLayout>
  )
}
