import { DashboardHeader } from "@/components/dashboard-header"
import Image from "next/image"
import Link from "next/link"

interface StudentLayoutHeaderProps {
  role: "student" | "faculty" | "alumni"
}

export function StudentLayoutHeader({ role }: StudentLayoutHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Link href={`/${role}/dashboard`}>
            <div className="flex items-center space-x-2">
              <div className="relative h-10 w-14">
                <Image src="/images/gw-logo.png" alt="GW Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-xl text-[#0033A0]">Connect</span>
            </div>
          </Link>
        </div>
        <DashboardHeader role={role} />
      </div>
    </header>
  )
}
