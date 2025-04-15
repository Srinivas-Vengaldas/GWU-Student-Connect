import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Footer } from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacultyAppointmentDashboard } from "@/components/faculty-appointments/faculty-appointment-dashboard"
import { FacultyAppointmentCalendar } from "@/components/faculty-appointments/faculty-appointment-calendar"
import { FacultyAppointmentRequests } from "@/components/faculty-appointments/faculty-appointment-requests"
import { FacultyAppointmentAvailability } from "@/components/faculty-appointments/faculty-appointment-availability"
import { FacultyAppointmentHistory } from "@/components/faculty-appointments/faculty-appointment-history"
import { FacultyAppointmentPreferences } from "@/components/faculty-appointments/faculty-appointment-preferences"

export const metadata: Metadata = {
  title: "Manage Appointments | GW Connect",
  description: "Manage your appointments with students and alumni",
}

export default function FacultyAppointmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="faculty" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="faculty" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-6">
                <FacultyAppointmentDashboard />
              </TabsContent>

              <TabsContent value="calendar" className="mt-6">
                <FacultyAppointmentCalendar />
              </TabsContent>

              <TabsContent value="requests" className="mt-6">
                <FacultyAppointmentRequests />
              </TabsContent>

              <TabsContent value="availability" className="mt-6">
                <FacultyAppointmentAvailability />
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <FacultyAppointmentHistory />
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <FacultyAppointmentPreferences />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
