"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { GraduationCap, Users, BookOpen } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login submitted:", { email, password, role })
    // Here you would typically authenticate the user
    // Redirect to the appropriate dashboard based on role
    window.location.href = `/${role}/dashboard`
  }

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
            <Link href="/register">
              <Button className="bg-[#0033A0] hover:bg-[#002180]">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mx-auto max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center text-[#0033A0]">Log In</CardTitle>
                <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Select Your Role</Label>
                    <RadioGroup
                      defaultValue="student"
                      value={role}
                      onValueChange={setRole}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="student" id="login-student" className="peer sr-only" />
                        <Label
                          htmlFor="login-student"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#0033A0] [&:has([data-state=checked])]:border-[#0033A0]"
                        >
                          <GraduationCap className="mb-2 h-5 w-5" />
                          <p className="text-sm font-medium">Student</p>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="faculty" id="login-faculty" className="peer sr-only" />
                        <Label
                          htmlFor="login-faculty"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#0033A0] [&:has([data-state=checked])]:border-[#0033A0]"
                        >
                          <BookOpen className="mb-2 h-5 w-5" />
                          <p className="text-sm font-medium">Faculty</p>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="alumni" id="login-alumni" className="peer sr-only" />
                        <Label
                          htmlFor="login-alumni"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-[#0033A0] [&:has([data-state=checked])]:border-[#0033A0]"
                        >
                          <Users className="mb-2 h-5 w-5" />
                          <p className="text-sm font-medium">Alumni</p>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button type="submit" className="w-full bg-[#0033A0] hover:bg-[#002180]">
                    Log In
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Link href="/forgot-password" className="text-sm text-[#0033A0] hover:underline">
                  Forgot password?
                </Link>
                <p className="text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-[#0033A0] hover:underline">
                    Register
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
