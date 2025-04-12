"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { MainNav } from "@/components/main-nav"
import { MaterialCard } from "@/components/study-materials/material-card"
import { MaterialUploadDialog } from "@/components/study-materials/material-upload-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudyMaterialsPage() {
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
            <h1 className="text-3xl font-bold">Study Materials</h1>
            <MaterialUploadDialog />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Materials</TabsTrigger>
              <TabsTrigger value="my-uploads">My Uploads</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Study Material Cards */}
                <MaterialCard
                  title="Data Structures Cheat Sheet"
                  description="A comprehensive guide to common data structures with time and space complexity analysis."
                  type="PDF"
                  size="2.4 MB"
                  uploadedBy="James Wilson"
                  uploadDate="May 10, 2023"
                  downloads={128}
                  id="1"
                />
                <MaterialCard
                  title="Machine Learning Algorithms Explained"
                  description="Detailed explanations of popular ML algorithms with examples and use cases."
                  type="PDF"
                  size="5.7 MB"
                  uploadedBy="Dr. Sarah Johnson"
                  uploadDate="May 8, 2023"
                  downloads={215}
                  id="2"
                />
                <MaterialCard
                  title="Web Development Fundamentals"
                  description="Introduction to HTML, CSS, and JavaScript with practical exercises."
                  type="ZIP"
                  size="8.2 MB"
                  uploadedBy="Emily Rodriguez"
                  uploadDate="May 5, 2023"
                  downloads={176}
                  id="3"
                />
                <MaterialCard
                  title="Calculus II Formula Sheet"
                  description="All the formulas you need for Calculus II, organized by topic."
                  type="PDF"
                  size="1.8 MB"
                  uploadedBy="Michael Chen"
                  uploadDate="May 3, 2023"
                  downloads={342}
                  id="4"
                />
                <MaterialCard
                  title="Introduction to Algorithms - Lecture Notes"
                  description="Comprehensive lecture notes covering algorithm design and analysis."
                  type="PDF"
                  size="4.5 MB"
                  uploadedBy="Prof. Robert Brown"
                  uploadDate="May 1, 2023"
                  downloads={198}
                  id="5"
                />
                <MaterialCard
                  title="Physics Problem Set Solutions"
                  description="Detailed solutions to common physics problems for undergraduate courses."
                  type="PDF"
                  size="3.2 MB"
                  uploadedBy="Dr. Lisa Thompson"
                  uploadDate="April 28, 2023"
                  downloads={156}
                  id="6"
                />
              </div>
            </TabsContent>
            <TabsContent value="my-uploads">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* My Uploads */}
                <MaterialCard
                  title="Programming in Python - Tutorial"
                  description="Step-by-step tutorial for beginners learning Python programming."
                  type="PDF"
                  size="3.8 MB"
                  uploadedBy="You"
                  uploadDate="May 7, 2023"
                  downloads={87}
                  id="7"
                />
                <MaterialCard
                  title="Database Systems - Study Guide"
                  description="Comprehensive study guide for database systems and SQL."
                  type="PDF"
                  size="2.9 MB"
                  uploadedBy="You"
                  uploadDate="May 2, 2023"
                  downloads={64}
                  id="8"
                />
              </div>
            </TabsContent>
            <TabsContent value="bookmarked">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Bookmarked Materials */}
                <MaterialCard
                  title="Data Structures Cheat Sheet"
                  description="A comprehensive guide to common data structures with time and space complexity analysis."
                  type="PDF"
                  size="2.4 MB"
                  uploadedBy="James Wilson"
                  uploadDate="May 10, 2023"
                  downloads={128}
                  id="1"
                />
                <MaterialCard
                  title="Machine Learning Algorithms Explained"
                  description="Detailed explanations of popular ML algorithms with examples and use cases."
                  type="PDF"
                  size="5.7 MB"
                  uploadedBy="Dr. Sarah Johnson"
                  uploadDate="May 8, 2023"
                  downloads={215}
                  id="2"
                />
              </div>
            </TabsContent>
            <TabsContent value="recent">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Recently Viewed Materials */}
                <MaterialCard
                  title="Web Development Fundamentals"
                  description="Introduction to HTML, CSS, and JavaScript with practical exercises."
                  type="ZIP"
                  size="8.2 MB"
                  uploadedBy="Emily Rodriguez"
                  uploadDate="May 5, 2023"
                  downloads={176}
                  id="3"
                />
                <MaterialCard
                  title="Calculus II Formula Sheet"
                  description="All the formulas you need for Calculus II, organized by topic."
                  type="PDF"
                  size="1.8 MB"
                  uploadedBy="Michael Chen"
                  uploadDate="May 3, 2023"
                  downloads={342}
                  id="4"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
