"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { UserRoleForm } from "@/components/user-role-form"
import { RegistrationForm } from "@/components/registration-form"

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-14">
                <Image src="/images/gw-logo.png" alt="GW Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-[#0033A0]">Connect</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mx-auto max-w-md">
            {!selectedRole ? (
              <UserRoleForm onRoleSelect={setSelectedRole} />
            ) : (
              <RegistrationForm role={selectedRole} onBack={() => setSelectedRole(null)} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
