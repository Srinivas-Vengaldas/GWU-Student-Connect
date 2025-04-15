"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacultyMaterialsUpload } from "@/components/faculty-study-materials/faculty-materials-upload"
import { FacultyMaterialsManage } from "@/components/faculty-study-materials/faculty-materials-manage"
import { FacultyMaterialsAnalytics } from "@/components/faculty-study-materials/faculty-materials-analytics"
import { FacultyMaterialsSettings } from "@/components/faculty-study-materials/faculty-materials-settings"
import { Button } from "@/components/ui/button"
import { BookOpen, Download, FileText, Upload, Users, BarChart, Settings, PlusCircle, FolderPlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FacultyStudyMaterialsPage() {
  const [activeTab, setActiveTab] = useState("manage")

  // Mock stats for quick overview
  const stats = {
    totalMaterials: 24,
    totalDownloads: 1247,
    averageRating: 4.6,
    activeStudents: 87,
    recentUploads: 3,
    pendingReviews: 2,
  }

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
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Study Materials</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-1">
                  <FolderPlus className="h-4 w-4" />
                  Create Collection
                </Button>
                <Button className="gap-1 bg-[#0033A0] hover:bg-[#002180]" onClick={() => setActiveTab("upload")}>
                  <Upload className="h-4 w-4" />
                  Upload Material
                </Button>
              </div>
            </div>

            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <FileText className="h-8 w-8 text-[#0033A0] mb-2" />
                  <div className="text-2xl font-bold">{stats.totalMaterials}</div>
                  <p className="text-xs text-gray-500">Total Materials</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Download className="h-8 w-8 text-[#0033A0] mb-2" />
                  <div className="text-2xl font-bold">{stats.totalDownloads}</div>
                  <p className="text-xs text-gray-500">Total Downloads</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <BookOpen className="h-8 w-8 text-[#0033A0] mb-2" />
                  <div className="text-2xl font-bold">{stats.recentUploads}</div>
                  <p className="text-xs text-gray-500">Recent Uploads</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Users className="h-8 w-8 text-[#0033A0] mb-2" />
                  <div className="text-2xl font-bold">{stats.activeStudents}</div>
                  <p className="text-xs text-gray-500">Active Students</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <BarChart className="h-8 w-8 text-[#0033A0] mb-2" />
                  <div className="text-2xl font-bold">{stats.averageRating}</div>
                  <p className="text-xs text-gray-500">Average Rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center relative">
                  <PlusCircle className="h-8 w-8 text-[#0033A0] mb-2" />
                  <div className="text-2xl font-bold">{stats.pendingReviews}</div>
                  <p className="text-xs text-gray-500">Pending Reviews</p>
                  {stats.pendingReviews > 0 && <Badge className="absolute top-2 right-2 bg-red-500">New</Badge>}
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="manage" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Manage Materials</span>
                  <span className="sm:hidden">Manage</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-1">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload New</span>
                  <span className="sm:hidden">Upload</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                  <span className="sm:hidden">Stats</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                  <span className="sm:hidden">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manage" className="space-y-4">
                <FacultyMaterialsManage />
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <FacultyMaterialsUpload />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <FacultyMaterialsAnalytics />
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <FacultyMaterialsSettings />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
