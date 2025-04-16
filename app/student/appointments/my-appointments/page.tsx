import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentCalendar } from "@/components/appointments/appointment-calendar"
import { AppointmentFilters } from "@/components/appointments/appointment-filters"
import { AppointmentSearch } from "@/components/appointments/appointment-search"
import { CalendarDays, ChevronLeft, Users } from "lucide-react"
import Link from "next/link"

export default function MyAppointmentsPage() {
  return (
    <PageLayout role="student" showSchedule={false}>
      <div className="flex-1 space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <div className="flex items-center space-x-2">
              <Link href="/student/appointments">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
            </div>
            <p className="text-muted-foreground">View and manage your scheduled appointments</p>
          </div>
        </div>

        <Separator className="my-6" />

        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <TabsList>
              <TabsTrigger value="upcoming" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Past
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

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid gap-4">
              {/* Upcoming appointments would go here */}
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Prof. Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">Career Guidance</p>
                    <p className="text-sm">Tomorrow, 2:00 PM - 3:00 PM</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dr. Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">Academic Advising</p>
                    <p className="text-sm">Friday, 11:00 AM - 12:00 PM</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid gap-4">
              {/* Past appointments would go here */}
              <div className="rounded-lg border p-4 opacity-70">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Prof. David Wilson</h3>
                    <p className="text-sm text-muted-foreground">Research Discussion</p>
                    <p className="text-sm">March 15, 2023, 10:00 AM - 11:00 AM</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      View Notes
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4 opacity-70">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dr. Emily Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">Course Selection</p>
                    <p className="text-sm">February 28, 2023, 3:00 PM - 4:00 PM</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      View Notes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <AppointmentCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
