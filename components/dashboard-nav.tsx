import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, FileText, Home, MessageSquare, Settings, Users } from "lucide-react"

interface DashboardNavProps {
  role: "student" | "faculty" | "alumni"
  className?: string
}

export function DashboardNav({ role, className }: DashboardNavProps) {
  const navItems = [
    {
      title: "Dashboard",
      href: `/${role}/dashboard`,
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "Messages",
      href: `/${role}/messages`,
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Study Groups",
      href: `/${role}/study-groups`,
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Study Materials",
      href: `/${role}/study-materials`,
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Blogs",
      href: `/${role}/blogs`,
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      title: "Events",
      href: `/${role}/events`,
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      title: "Appointments",
      href: `/${role}/appointments`,
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: `/${role}/settings`,
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1 pt-4", className)}>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant="ghost"
            className="w-full justify-start font-normal hover:bg-transparent hover:text-[#0033A0] hover:underline"
          >
            {item.icon}
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
