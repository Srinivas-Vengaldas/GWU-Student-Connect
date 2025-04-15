"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageSquare, Settings, User, LogOut } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  role: "student" | "faculty" | "alumni"
}

export function DashboardHeader({ role }: DashboardHeaderProps) {
  const router = useRouter()
  const [unreadMessages, setUnreadMessages] = useState(3)
  const [unreadNotifications, setUnreadNotifications] = useState(4)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=32&width=32")
  const [userInitials, setUserInitials] = useState("JD")
  const [userName, setUserName] = useState("John Doe")
  const [userEmail, setUserEmail] = useState("john.doe@gwu.edu")

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "New appointment request",
      description: "Prof. Sarah Johnson requested a meeting on May 15th",
      time: "10 minutes ago",
      icon: "calendar",
      link: `/${role}/appointments/my-appointments`,
    },
    {
      id: 2,
      title: "New connection",
      description: "Michael Chen accepted your connection request",
      time: "2 hours ago",
      icon: "user",
      link: `/${role}/directory`,
    },
    {
      id: 3,
      title: "Study group update",
      description: "New resources added to 'Advanced Statistics' group",
      time: "Yesterday",
      icon: "book",
      link: `/${role}/study-groups`,
    },
    {
      id: 4,
      title: "Event reminder",
      description: "CS Department Mixer starts in 2 hours",
      time: "Yesterday",
      icon: "calendar",
      link: `/${role}/events`,
    },
  ]

  const handleLogout = () => {
    // Clear any necessary session data
    localStorage.removeItem("gwConnectUserRole")
    // Redirect to login page
    router.push("/login")
  }

  const markAllNotificationsAsRead = () => {
    setUnreadNotifications(0)
    localStorage.setItem("gwConnectPendingAppointments", "0")
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Messages Button - Direct link to messages page */}
      <Button variant="ghost" size="icon" className="relative" asChild>
        <Link href={`/${role}/messages`}>
          <MessageSquare className="h-5 w-5" />
          {unreadMessages > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
              variant="destructive"
            >
              {unreadMessages}
            </Badge>
          )}
        </Link>
      </Button>

      {/* Notifications Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                variant="destructive"
              >
                {unreadNotifications}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span className="text-sm font-medium">Notifications</span>
            {unreadNotifications > 0 && (
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllNotificationsAsRead}>
                Mark all as read
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {notifications.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} asChild className="p-0 focus:bg-transparent">
                  <Link href={notification.link} className="w-full">
                    <div className="p-3 hover:bg-muted w-full cursor-pointer">
                      <div className="flex w-full gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="justify-center">
            <Link href={`/${role}/settings`} className="text-xs">
              Manage notification settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Settings Button */}
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/${role}/settings`}>
          <Settings className="h-5 w-5" />
        </Link>
      </Button>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileImage || "/placeholder.svg"} alt={userName} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/${role}/profile`} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/${role}/settings`} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
