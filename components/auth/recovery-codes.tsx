"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Copy, Download, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface RecoveryCodesProps {
  onGenerate?: () => void
}

export function RecoveryCodes({ onGenerate }: RecoveryCodesProps) {
  const [codes, setCodes] = useState([
    "ABCD-EFGH-IJKL",
    "MNOP-QRST-UVWX",
    "1234-5678-9012",
    "3456-7890-1234",
    "WXYZ-ABCD-EFGH",
    "5678-9012-3456",
    "IJKL-MNOP-QRST",
    "7890-1234-5678",
  ])
  const [copied, setCopied] = useState(false)
  const [regenerateConfirm, setRegenerateConfirm] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codes.join("\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([codes.join("\n")], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "gw-connect-recovery-codes.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleRegenerate = () => {
    // In a real app, this would call an API to generate new codes
    const newCodes = codes.map(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      return (
        Array(4)
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("") +
        "-" +
        Array(4)
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("") +
        "-" +
        Array(4)
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("")
      )
    })
    setCodes(newCodes)
    setRegenerateConfirm(false)
    if (onGenerate) onGenerate()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Recovery Codes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Recovery Codes</DialogTitle>
          <DialogDescription>
            Keep these recovery codes in a safe place. You can use them to access your account if you lose your
            authentication device.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Each code can only be used once. Keep these codes private and store them securely.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-2">
            {codes.map((code, index) => (
              <div key={index} className="p-2 bg-muted rounded-md text-center font-mono text-sm">
                {code}
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "Copied!" : "Copy Codes"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          {regenerateConfirm ? (
            <div className="space-y-2 border rounded-md p-3 bg-red-50">
              <p className="text-sm text-red-600 font-medium">Are you sure you want to generate new recovery codes?</p>
              <p className="text-xs text-red-600">Your existing codes will no longer work.</p>
              <div className="flex space-x-2 mt-2">
                <Button variant="destructive" size="sm" onClick={handleRegenerate} className="flex-1">
                  Yes, generate new codes
                </Button>
                <Button variant="outline" size="sm" onClick={() => setRegenerateConfirm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setRegenerateConfirm(true)}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Codes
            </Button>
          )}
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogTrigger asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
