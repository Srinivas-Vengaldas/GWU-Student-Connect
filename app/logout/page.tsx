"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear any necessary session data
    localStorage.removeItem("gwConnectUserRole")
    localStorage.removeItem("gwConnectUnreadMessages")
    localStorage.removeItem("gwConnectPendingAppointments")

    // Don't clear profile data to maintain demo experience
    // localStorage.removeItem('gwConnectUserProfile')

    // Redirect to login page
    router.push("/login")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
        <p>You are being redirected to the login page.</p>
      </div>
    </div>
  )
}
