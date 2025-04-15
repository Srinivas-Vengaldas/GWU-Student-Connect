import { AppHeader } from "@/components/app-header"
import type { ReactNode } from "react"

interface PageLayoutProps {
  role: "student" | "faculty" | "alumni"
  children: ReactNode
  showSchedule?: boolean
}

export function PageLayout({ role, children, showSchedule = false }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader role={role} showNavInHeader={true} />
      <div className="container grid flex-1 gap-6 py-4">
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
