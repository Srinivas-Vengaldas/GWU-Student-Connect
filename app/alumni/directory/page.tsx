"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AlumniDirectoryPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to student directory for now
    // In a real app, this would be a separate implementation
    router.push("/student/directory")
  }, [router])

  return null
}
