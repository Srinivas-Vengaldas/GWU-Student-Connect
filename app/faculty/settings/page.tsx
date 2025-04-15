"use client"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { FacultyProfileSettings } from "@/components/settings/faculty-profile-settings"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings updated",
      description: "Your profile settings have been updated successfully.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader role="faculty" />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="faculty" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden pb-10">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
              <Button variant="outline" asChild>
                <Link href="/faculty/profile">
                  <Eye className="mr-2 h-4 w-4" />
                  View My Profile
                </Link>
              </Button>
            </div>
            <FacultyProfileSettings onSave={handleSave} />
          </div>
        </main>
      </div>
    </div>
  )
}
