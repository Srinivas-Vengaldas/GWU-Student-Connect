import Link from "next/link"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, FileText, Home, MessageSquare, Search, Settings, Users } from "lucide-react"

interface DashboardNavProps {
  role: "student" | "faculty" | "alumni"
}

export function DashboardNav({ role }: DashboardNavProps) {
  const items = [
    {
      title: "Dashboard",
      href: `/${role}/dashboard`,
      icon: Home,
    },
    {
      title: "Find People",
      href: `/${role}/find-people`,
      icon: Search,
    },
    {
      title: "Messages",
      href: `/${role}/messages`,
      icon: MessageSquare,
    },
    {
      title: "Study Groups",
      href: `/${role}/study-groups`,
      icon: Users,
    },
    {
      title: "Study Materials",
      href: `/${role}/study-materials`,
      icon: FileText,
    },
    {
      title: "Blogs",
      href: `/${role}/blogs`,
      icon: BookOpen,
    },
    {
      title: "Events",
      href: `/${role}/events`,
      icon: Calendar,
    },
    {
      title: "Settings",
      href: `/${role}/settings`,
      icon: Settings,
    },
  ]

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            item.href === `/${role}/dashboard` ? "bg-accent" : "transparent",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
