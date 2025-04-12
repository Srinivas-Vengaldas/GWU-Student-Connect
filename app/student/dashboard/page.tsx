import type React from "react"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CheckCircle2, FileText, Users, Clock } from "lucide-react"
import { RecentBlogs } from "@/components/recent-blogs"
import { StudyGroups } from "@/components/study-groups"
import { UpcomingEvents } from "@/components/upcoming-events"

export default function StudentDashboard() {
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
          <h1 className="mb-6 text-3xl font-bold">Student Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <RecentBlogs />
            <StudyGroups />
            <UpcomingEvents />
          </div>
        </div>
      </main>
    </div>
  )
}

// Component for quick stats in the welcome header
function QuickStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2">
      <div className="text-[#0033A0]">{icon}</div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  )
}

// Component for activity feed items
function ActivityItem({
  icon,
  title,
  description,
  time,
  link,
  badge,
}: {
  icon: React.ReactNode
  title: string
  description: string
  time: string
  link: string
  badge?: string
}) {
  return (
    <Link href={link} className="block">
      <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50">
        <div className="mt-1">{icon}</div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{title}</p>
            <div className="flex items-center gap-2">
              {badge && (
                <Badge variant="outline" className="bg-[#E8D4A3]/20 text-[#0033A0]">
                  {badge}
                </Badge>
              )}
              <span className="text-xs text-gray-500">{time}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  )
}

// Component for agenda items
function AgendaItem({
  time,
  title,
  location,
  type,
}: {
  time: string
  title: string
  location: string
  type: "class" | "meeting" | "study"
}) {
  const getTypeIcon = () => {
    switch (type) {
      case "class":
        return <BookOpen className="h-5 w-5 text-blue-500" />
      case "meeting":
        return <Users className="h-5 w-5 text-purple-500" />
      case "study":
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50">
      <div className="mt-1">{getTypeIcon()}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <Clock className="mr-1 h-3 w-3" />
          <span>{time}</span>
        </div>
        <div className="mt-1 text-sm text-gray-500">{location}</div>
      </div>
    </div>
  )
}

// Component for task items
function TaskItem({
  title,
  description,
  completed,
  link,
}: {
  title: string
  description: string
  completed: boolean
  link: string
}) {
  return (
    <Link href={link} className="block">
      <div className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50">
        <div className="mt-1">
          {completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
          )}
        </div>
        <div className="flex-1">
          <p className={`font-medium ${completed ? "line-through text-gray-500" : ""}`}>{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <Button variant="ghost" size="sm" className="shrink-0">
          {completed ? "Completed" : "Complete"}
        </Button>
      </div>
    </Link>
  )
}

// Component for quick access cards
function QuickAccessCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Link href={link} className="block">
      <Card className="h-full transition-all hover:shadow-md">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="mb-3 mt-2">{icon}</div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

// Component for suggestion items
function SuggestionItem({
  avatar,
  name,
  description,
  actionLabel,
}: {
  avatar: string
  name: string
  description: string
  actionLabel: string
}) {
  return (
    <div className="flex items-center justify-between px-6 py-3 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <Button variant="outline" size="sm">
        {actionLabel}
      </Button>
    </div>
  )
}
