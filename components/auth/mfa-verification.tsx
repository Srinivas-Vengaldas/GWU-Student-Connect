"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Smartphone, Mail, ArrowLeft } from "lucide-react"

interface MFAVerificationProps {
  email: string
  onVerify: (success: boolean) => void
  onBack: () => void
}

export function MFAVerification({ email, onVerify, onBack }: MFAVerificationProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [method, setMethod] = useState<"email" | "app">("email")
  const [countdown, setCountdown] = useState(0)

  // Simulate sending verification code
  const sendVerificationCode = () => {
    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setCountdown(30)
      // Show success message or update UI
    }, 1500)
  }

  // Handle countdown for resending code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Send verification code when component mounts
  useEffect(() => {
    sendVerificationCode()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, accept any 6-digit code
      if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
        onVerify(true)
      } else {
        setError("Invalid verification code. Please try again.")
      }
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-[#0033A0]">Two-Factor Authentication</CardTitle>
        <CardDescription className="text-center">Please verify your identity to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" value={method} onValueChange={(value) => setMethod(value as "email" | "app")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="app">
              <Smartphone className="mr-2 h-4 w-4" />
              Authenticator App
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              We&apos;ve sent a verification code to <span className="font-medium">{email}</span>
            </div>
          </TabsContent>

          <TabsContent value="app" className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Enter the verification code from your authenticator app
            </div>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>
            </div>

            {error && <div className="text-center text-sm text-red-500">{error}</div>}
          </div>

          <div className="flex justify-center">
            <Button
              type="button"
              variant="link"
              disabled={countdown > 0 || isLoading}
              onClick={sendVerificationCode}
              className="text-sm"
            >
              {countdown > 0 ? `Resend code in ${countdown}s` : "Resend code"}
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0033A0] hover:bg-[#002180]"
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Button>
      </CardFooter>
    </Card>
  )
}
