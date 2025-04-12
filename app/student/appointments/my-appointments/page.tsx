import { DashboardHeader } from "@/components/dashboard-header"
import { MainNav } from "@/components/main-nav"
import { AppointmentList } from "@/components/appointments/appointment-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyAppointmentsPage() {
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
            <h1 className="text-3xl font-bold">My Appointments</h1>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <AppointmentList
                appointments={[
                  {
                    id: "1",
                    title: "Academic Advising",
                    with: "Dr. Sarah Johnson",
                    date: "May 15, 2023",
                    time: "10:00 AM - 11:00 AM",
                    location: "Online",
                    status: "confirmed",
                  },
                  {
                    id: "2",
                    title: "Career Counseling",
                    with: "Prof. Michael Chen",
                    date: "May 18, 2023",
                    time: "2:00 PM - 3:00 PM",
                    location: "Science Building, Room 302",
                    status: "pending",
                  },
                ]}
              />
            </TabsContent>
            <TabsContent value="past">
              <AppointmentList
                appointments={[
                  {
                    id: "3",
                    title: "Research Discussion",
                    with: "Dr. Emily Rodriguez",
                    date: "April 28, 2023",
                    time: "3:00 PM - 4:00 PM",
                    location: "Online",
                    status: "completed",
                  },
                  {
                    id: "4",
                    title: "Thesis Review",
                    with: "Prof. James Wilson",
                    date: "April 20, 2023",
                    time: "1:00 PM - 2:30 PM",
                    location: "Library, Study Room 5",
                    status: "completed",
                  },
                ]}
              />
            </TabsContent>
            <TabsContent value="cancelled">
              <AppointmentList
                appointments={[
                  {
                    id: "5",
                    title: "Study Plan Review",
                    with: "Dr. Robert Brown",
                    date: "May 5, 2023",
                    time: "11:00 AM - 12:00 PM",
                    location: "Online",
                    status: "cancelled",
                  },
                ]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
