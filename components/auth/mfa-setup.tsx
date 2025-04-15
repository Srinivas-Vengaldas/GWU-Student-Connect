"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Smartphone, Mail, ArrowRight, ArrowLeft, Check, Loader2, Copy, Download } from "lucide-react"

interface MFASetupProps {
  email: string
  onComplete: (method: string) => void
  onSkip: () => void
  onBack: () => void
}

export function MFASetup({ email, onComplete, onSkip, onBack }: MFASetupProps) {
  const [method, setMethod] = useState<"email" | "app">("email")
  const [step, setStep] = useState<"setup" | "verify" | "recovery">("setup")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = () => {
    setIsLoading(true)
    setError(null)

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, accept any 6-digit code
      if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
        if (step === "setup") {
          setStep("verify")
          setVerificationCode("")
        } else if (step === "verify") {
          setStep("recovery")
        }
      } else {
        setError("Invalid verification code. Please try again.")
      }
    }, 1500)
  }

  const handleComplete = () => {
    onComplete(method)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-[#0033A0]">
          {step === "recovery" ? "Save Recovery Codes" : "Set Up Two-Factor Authentication"}
        </CardTitle>
        <CardDescription className="text-center">
          {step === "setup" && "Enhance your account security with two-factor authentication"}
          {step === "verify" && "Verify your authentication method"}
          {step === "recovery" && "Keep these recovery codes in a safe place"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "setup" && (
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
              <div className="text-center text-sm">
                We'll send a verification code to <span className="font-medium">{email}</span> when you sign in.
              </div>

              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <div className="flex">
                  <Input
                    id="verificationCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="text-center text-lg tracking-widest"
                  />
                  <Button
                    className="ml-2 bg-[#0033A0] hover:bg-[#002180]"
                    onClick={handleVerify}
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                  </Button>
                </div>

                {error && <div className="text-center text-sm text-red-500">{error}</div>}

                <p className="text-xs text-muted-foreground text-center mt-2">
                  We've sent a verification code to your email address.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="app" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">
                  Use an authenticator app like Google Authenticator, Microsoft Authenticator, or Authy.
                </p>

                <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                  <div className="bg-white p-2 rounded-md mb-4">
                    <QrCode className="h-32 w-32 text-[#0033A0]" />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Scan this QR code with your authenticator app
                  </p>
                  <div className="mt-4 w-full">
                    <Label htmlFor="setupKey" className="text-xs">
                      Or enter this setup key manually:
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="setupKey"
                        value="GWST CONN ECTA UTH2 023X"
                        readOnly
                        className="text-xs font-mono text-center"
                      />
                      <Button variant="outline" size="sm" className="ml-2">
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appVerificationCode">Verification Code</Label>
                <div className="flex">
                  <Input
                    id="appVerificationCode"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="text-center text-lg tracking-widest"
                  />
                  <Button
                    className="ml-2 bg-[#0033A0] hover:bg-[#002180]"
                    onClick={handleVerify}
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
                  </Button>
                </div>

                {error && <div className="text-center text-sm text-red-500">{error}</div>}

                <p className="text-xs text-muted-foreground text-center mt-2">
                  Enter the verification code from your authenticator app.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {step === "verify" && (
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="font-medium">Authentication method verified!</p>
              <p className="text-sm text-muted-foreground">
                {method === "email"
                  ? "You'll receive a verification code via email when signing in."
                  : "You'll need to enter a code from your authenticator app when signing in."}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Let's confirm once more:</p>
              <Label htmlFor="confirmCode">Enter another verification code</Label>
              <div className="flex">
                <Input
                  id="confirmCode"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center text-lg tracking-widest"
                />
                <Button
                  className="ml-2 bg-[#0033A0] hover:bg-[#002180]"
                  onClick={handleVerify}
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm"}
                </Button>
              </div>

              {error && <div className="text-center text-sm text-red-500">{error}</div>}
            </div>
          </div>
        )}

        {step === "recovery" && (
          <div className="space-y-4">
            <p className="text-sm">
              Recovery codes allow you to access your account if you lose your authentication device or cannot receive
              verification codes.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="p-2 bg-muted rounded-md text-center font-mono text-sm">
                  {`${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`}
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Copy Codes
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
              <p className="text-sm text-amber-800 font-medium">
                Important: Save these recovery codes in a secure location.
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Each code can only be used once. If you lose access to your authentication method and don't have
                recovery codes, you may be locked out of your account.
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === "setup" && (
          <>
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button variant="outline" onClick={onSkip}>
              Skip for now
            </Button>
          </>
        )}

        {step === "verify" && (
          <>
            <Button variant="ghost" onClick={() => setStep("setup")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button variant="outline" onClick={onSkip}>
              Skip recovery codes
            </Button>
          </>
        )}

        {step === "recovery" && (
          <>
            <Button variant="ghost" onClick={() => setStep("verify")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button className="bg-[#0033A0] hover:bg-[#002180]" onClick={handleComplete}>
              Complete Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
