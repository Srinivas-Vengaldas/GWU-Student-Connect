"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { PrivacySettings } from "@/components/settings/privacy-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { ThemeSettings } from "@/components/settings/theme-settings"
import { AppointmentSettings } from "@/components/settings/appointment-settings"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")

  // Function to handle settings saved notification
  const handleSettingsSaved = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section} settings have been updated successfully.`,
      duration: 3000,
    })
  }

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
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>
            <Separator />

            <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="w-full justify-start border-b pb-px">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <ProfileSettings onSave={() => handleSettingsSaved("profile")} />
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <AccountSettings onSave={() => handleSettingsSaved("account")} />
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <PrivacySettings onSave={() => handleSettingsSaved("privacy")} />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <NotificationSettings onSave={() => handleSettingsSaved("notification")} />
              </TabsContent>

              <TabsContent value="theme" className="space-y-6">
                <ThemeSettings onSave={() => handleSettingsSaved("theme")} />
              </TabsContent>

              <TabsContent value="appointments" className="space-y-6">
                <AppointmentSettings onSave={() => handleSettingsSaved("appointment")} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
