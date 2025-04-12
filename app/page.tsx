import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GW Connect",
  description: "Connect with students, faculty, and alumni",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-14">
              <Image src="/images/gw-logo.png" alt="GW Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-[#0033A0]">Connect</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#0033A0] hover:bg-[#002180]">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
