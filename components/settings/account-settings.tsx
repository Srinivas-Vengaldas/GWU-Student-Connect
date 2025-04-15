"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, AlertTriangle, QrCode, Smartphone, Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecoveryCodes } from "@/components/auth/recovery-codes"

interface AccountSettingsProps {
  onSave: () => void
}

export function AccountSettings({ onSave }: AccountSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "alex.johnson@gwconnect.edu",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    preferredMFAMethod: "email",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSave()

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    }, 1000)
  }

  const deviceLogins = [
    { device: "Chrome on Windows", location: "Washington, DC", lastActive: "Today at 2:30 PM" },
    { device: "Safari on iPhone", location: "Washington, DC", lastActive: "Yesterday at 7:15 PM" },
    { device: "Firefox on MacOS", location: "Arlington, VA", lastActive: "May 10, 2023 at 10:45 AM" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account credentials and security settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>Update your email address. You'll need to verify any new email address.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Email
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to maintain account security.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={(e) => handleChange("currentPassword", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSave}
            disabled={
              isLoading ||
              !formData.currentPassword ||
              !formData.newPassword ||
              formData.newPassword !== formData.confirmPassword
            }
            className="ml-auto bg-[#0033A0] hover:bg-[#002180]"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Two-factor authentication</p>
              <p className="text-sm text-muted-foreground">
                Receive a verification code via email when signing in from a new device.
              </p>
            </div>
            <Switch
              checked={formData.twoFactorEnabled}
              onCheckedChange={(checked) => handleChange("twoFactorEnabled", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Multi-Factor Authentication Methods</CardTitle>
          <CardDescription>Configure how you want to receive authentication codes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs
              defaultValue={formData.preferredMFAMethod}
              onValueChange={(value) => handleChange("preferredMFAMethod", value)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="app">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Authenticator App
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <p className="text-sm">We'll send a verification code to your email address when you sign in.</p>
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{formData.email}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="app" className="space-y-4 pt-4">
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
                  <Label htmlFor="verifyCode">Verify Setup</Label>
                  <div className="flex">
                    <Input id="verifyCode" placeholder="Enter 6-digit code" className="text-center" />
                    <Button className="ml-2 bg-[#0033A0] hover:bg-[#002180]">Verify</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter a verification code from your authenticator app to confirm setup.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Recovery Codes</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate backup codes to use if you can't access your authentication methods.
                  </p>
                </div>
                <RecoveryCodes />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save MFA Settings
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Activity</CardTitle>
          <CardDescription>View and manage your active sessions across devices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceLogins.map((device, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="font-medium">{device.device}</p>
                  <p className="text-sm text-muted-foreground">
                    {device.location} • {device.lastActive}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="ml-auto">
            Sign Out All Devices
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Permanent actions that cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Deactivate Account</p>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable your account. You can reactivate it later.
                </p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                Deactivate
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      Delete Account
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data
                      from our servers.
                      <div className="mt-4 p-3 bg-red-50 rounded-md text-red-600 text-sm">
                        <p className="font-medium">You will lose:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>All your profile information</li>
                          <li>Your study materials and uploads</li>
                          <li>Your blog posts and comments</li>
                          <li>Your study group memberships</li>
                          <li>Your event registrations</li>
                        </ul>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Account</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
