"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"

export default function FacultyDirectoryPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to student directory for now
    // In a real app, this would be a separate implementation
    router.push("/student/directory")
  }, [router])

  return (
    <PageLayout role="faculty">
      <div className="flex items-center justify-center h-screen">
        <p>Redirecting to student directory...</p>
      </div>
    </PageLayout>
  )
}
