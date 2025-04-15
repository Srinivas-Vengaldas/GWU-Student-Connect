"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, Settings, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  role: "student" | "faculty" | "alumni"
}

export function DashboardHeader({ role }: DashboardHeaderProps) {
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  })

  // Listen for profile updates
  useEffect(() => {
    const loadProfileData = () => {
      const savedProfile = localStorage.getItem("gwConnectUserProfile")
      if (savedProfile) {
        try {
          const userData = JSON.parse(savedProfile)
          setProfileData({
            name: userData.name || "Alex Johnson",
            avatar: userData.avatar || "/placeholder.svg?height=40&width=40",
          })
        } catch (error) {
          console.error("Error parsing profile data:", error)
        }
      }
    }

    // Load profile data initially
    loadProfileData()

    // Listen for storage events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "gwConnectUserProfile") {
        loadProfileData()
      }
    }

    // Listen for custom events
    const handleCustomEvent = () => {
      loadProfileData()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("profileUpdated", handleCustomEvent)

    // Clean up
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("profileUpdated", handleCustomEvent)
    }
  }, [])

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
          3
        </Badge>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{profileData.name}</p>
              <p className="text-xs leading-none text-muted-foreground">student@gwu.edu</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/${role}/profile`}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/${role}/settings`}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/logout">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
