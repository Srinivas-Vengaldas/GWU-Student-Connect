"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"student" | "faculty" | "alumni" | null>(null)

  useEffect(() => {
    // Check if user is logged in based on path
    const loggedInPaths = ["/student/", "/faculty/", "/alumni/"]
    const isUserLoggedIn = loggedInPaths.some((path) => pathname.startsWith(path))
    setIsLoggedIn(isUserLoggedIn)

    // Determine user role from path
    if (pathname.startsWith("/student/")) {
      setUserRole("student")
    } else if (pathname.startsWith("/faculty/")) {
      setUserRole("faculty")
    } else if (pathname.startsWith("/alumni/")) {
      setUserRole("alumni")
    } else {
      setUserRole(null)
    }
  }, [pathname])

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href={isLoggedIn && userRole ? `/${userRole}/dashboard` : "/"} className="flex items-center space-x-2">
        <div className="relative h-10 w-14">
          <Image src="/images/gw-logo.png" alt="GW Logo" fill className="object-contain" />
        </div>
        <span className="font-bold text-xl text-[#0033A0]">Connect</span>
      </Link>

      {!isLoggedIn && (
        <>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-black dark:text-white" : "text-muted-foreground",
            )}
          >
            About
          </Link>
          <Link
            href="/features"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/features" ? "text-black dark:text-white" : "text-muted-foreground",
            )}
          >
            Features
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/contact" ? "text-black dark:text-white" : "text-muted-foreground",
            )}
          >
            Contact
          </Link>
        </>
      )}
    </nav>
  )
}
