import Image from "next/image"
import Link from "next/link"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <div className="relative h-10 w-14">
          <Image src="/images/gw-logo.png" alt="GW Logo" fill className="object-contain" priority />
        </div>
        <span className="text-xl font-bold text-[#0033A0]">Connect</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <Link href="/student/dashboard" className="text-sm font-medium transition-colors hover:text-[#0033A0]">
          Dashboard
        </Link>
        <Link href="/student/blogs" className="text-sm font-medium transition-colors hover:text-[#0033A0]">
          Blogs
        </Link>
        <Link href="/student/study-materials" className="text-sm font-medium transition-colors hover:text-[#0033A0]">
          Study Materials
        </Link>
        <Link href="/student/study-groups" className="text-sm font-medium transition-colors hover:text-[#0033A0]">
          Study Groups
        </Link>
        <Link href="/student/appointments" className="text-sm font-medium transition-colors hover:text-[#0033A0]">
          Appointments
        </Link>
        <Link href="/student/profile" className="text-sm font-medium transition-colors hover:text-[#0033A0]">
          Profile
        </Link>
      </nav>
    </div>
  )
}
