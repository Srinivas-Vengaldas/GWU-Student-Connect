import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageSquare } from "lucide-react"

interface DashboardHeaderProps {
  role: "student" | "faculty" | "alumni"
}

export function DashboardHeader({ role }: DashboardHeaderProps) {
  // Mock notification data
  const hasUnreadMessages = true
  const hasUnreadNotifications = true
  const messageCount = 2
  const notificationCount = 3

  return (
    <div className="ml-auto flex items-center space-x-4">
      {/* Notifications Button with Badge */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {hasUnreadNotifications && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {notificationCount}
          </span>
        )}
      </Button>

      {/* Messages Button with Badge */}
      <Link href={`/${role}/messages`} className="inline-block">
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          {hasUnreadMessages && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {messageCount}
            </span>
          )}
        </Button>
      </Link>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/${role}/profile`} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/${role}/appointments/my-appointments`} className="w-full">
              My Appointments
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/${role}/settings`} className="w-full">
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/login" className="w-full">
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
