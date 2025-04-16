import { DashboardHeader } from "@/components/dashboard-header"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AppHeaderProps {
  role: "student" | "faculty" | "alumni"
  showNavInHeader?: boolean
}

export function AppHeader({ role, showNavInHeader = false }: AppHeaderProps) {
  // Determine the home link based on role
  const homeLink = role ? `/${role}/dashboard` : "/"

  // Add this function before the return statement in the AppHeader component
  const isActive = (path: string) => {
    if (typeof window !== "undefined") {
      return window.location.pathname.includes(path)
    }
    return false
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={homeLink} className="flex items-center gap-2">
            <Image src="/images/gw-logo.png" alt="GW Logo" width={40} height={40} />
            <span className="text-xl font-bold text-[#0033A0]">Connect</span>
          </Link>
        </div>

        {showNavInHeader && (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
              <Link
                href={`/${role}/dashboard`}
                className={`text-sm font-medium transition-colors hover:text-[#0033A0] ${
                  isActive(`/${role}/dashboard`) ? "text-[#0033A0] font-bold" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                href={`/${role}/messages`}
                className={`text-sm font-medium transition-colors hover:text-[#0033A0] ${
                  isActive(`/${role}/messages`) ? "text-[#0033A0] font-bold" : ""
                }`}
              >
                Messages
              </Link>
              <Link
                href={`/${role}/study-groups`}
                className={`text-sm font-medium transition-colors hover:text-[#0033A0] ${
                  isActive(`/${role}/study-groups`) ? "text-[#0033A0] font-bold" : ""
                }`}
              >
                Study Groups
              </Link>
              <Link
                href={`/${role}/study-materials`}
                className={`text-sm font-medium transition-colors hover:text-[#0033A0] ${
                  isActive(`/${role}/study-materials`) ? "text-[#0033A0] font-bold" : ""
                }`}
              >
                Materials
              </Link>
              <Link
                href={`/${role}/blogs`}
                className={`text-sm font-medium transition-colors hover:text-[#0033A0] ${
                  isActive(`/${role}/blogs`) ? "text-[#0033A0] font-bold" : ""
                }`}
              >
                Blogs
              </Link>
              <Link
                href={`/${role}/events`}
                className={`text-sm font-medium transition-colors hover:text-[#0033A0] ${
                  isActive(`/${role}/events`) ? "text-[#0033A0] font-bold" : ""
                }`}
              >
                Events
              </Link>
              <Link
                href={`/${role}/appointments`}
                className={`text-sm font-medium transition-colors hover:text-[#0033A0] ${
                  isActive(`/${role}/appointments`) ? "text-[#0033A0] font-bold" : ""
                }`}
              >
                Appointments
              </Link>
              <Link
                href={`/${role}/directory`}
                className={`text-sm font-medium transition-colors hover:text-[#0033A0] ${
                  isActive(`/${role}/directory`) ? "text-[#0033A0] font-bold" : ""
                }`}
              >
                Directory
              </Link>
            </nav>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 py-4">
                  <Link
                    href={`/${role}/dashboard`}
                    className={`px-2 py-1 text-sm font-medium transition-colors hover:text-[#0033A0] ${
                      isActive(`/${role}/dashboard`) ? "text-[#0033A0] font-bold" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={`/${role}/messages`}
                    className={`px-2 py-1 text-sm font-medium transition-colors hover:text-[#0033A0] ${
                      isActive(`/${role}/messages`) ? "text-[#0033A0] font-bold" : ""
                    }`}
                  >
                    Messages
                  </Link>
                  <Link
                    href={`/${role}/study-groups`}
                    className={`px-2 py-1 text-sm font-medium transition-colors hover:text-[#0033A0] ${
                      isActive(`/${role}/study-groups`) ? "text-[#0033A0] font-bold" : ""
                    }`}
                  >
                    Study Groups
                  </Link>
                  <Link
                    href={`/${role}/study-materials`}
                    className={`px-2 py-1 text-sm font-medium transition-colors hover:text-[#0033A0] ${
                      isActive(`/${role}/study-materials`) ? "text-[#0033A0] font-bold" : ""
                    }`}
                  >
                    Materials
                  </Link>
                  <Link
                    href={`/${role}/blogs`}
                    className={`px-2 py-1 text-sm font-medium transition-colors hover:text-[#0033A0] ${
                      isActive(`/${role}/blogs`) ? "text-[#0033A0] font-bold" : ""
                    }`}
                  >
                    Blogs
                  </Link>
                  <Link
                    href={`/${role}/events`}
                    className={`px-2 py-1 text-sm font-medium transition-colors hover:text-[#0033A0] ${
                      isActive(`/${role}/events`) ? "text-[#0033A0] font-bold" : ""
                    }`}
                  >
                    Events
                  </Link>
                  <Link
                    href={`/${role}/appointments`}
                    className={`px-2 py-1 text-sm font-medium transition-colors hover:text-[#0033A0] ${
                      isActive(`/${role}/appointments`) ? "text-[#0033A0] font-bold" : ""
                    }`}
                  >
                    Appointments
                  </Link>
                  <Link
                    href={`/${role}/directory`}
                    className={`px-2 py-1 text-sm font-medium transition-colors hover:text-[#0033A0] ${
                      isActive(`/${role}/directory`) ? "text-[#0033A0] font-bold" : ""
                    }`}
                  >
                    Directory
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}

        <div className="flex items-center gap-2">
          {role ? (
            <DashboardHeader role={role} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
