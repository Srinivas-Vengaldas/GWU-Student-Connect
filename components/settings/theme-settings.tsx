"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2, Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

interface ThemeSettingsProps {
  onSave: () => void
}

export function ThemeSettings({ onSave }: ThemeSettingsProps) {
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    fontSize: "medium",
    reducedMotion: false,
    highContrast: false,
  })

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onSave()
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Theme Settings</h3>
        <p className="text-sm text-muted-foreground">Customize the appearance of the application.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred color theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme || "system"} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-md border-2 ${theme === "light" ? "border-[#0033A0]" : "border-muted"} bg-white`}
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Sun className="h-6 w-6 text-yellow-500" />
              </div>
              <Label htmlFor="light" className="text-center">
                Light
              </Label>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-md border-2 ${theme === "dark" ? "border-[#0033A0]" : "border-muted"} bg-gray-950`}
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Moon className="h-6 w-6 text-blue-300" />
              </div>
              <Label htmlFor="dark" className="text-center">
                Dark
              </Label>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-md border-2 ${theme === "system" ? "border-[#0033A0]" : "border-muted"} bg-gradient-to-br from-white to-gray-950`}
              >
                <RadioGroupItem value="system" id="system" className="sr-only" />
                <Monitor className="h-6 w-6 text-gray-400" />
              </div>
              <Label htmlFor="system" className="text-center">
                System
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Customize how content is displayed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Select
              value={settings.fontSize}
              onValueChange={(value) => setSettings((prev) => ({ ...prev, fontSize: value }))}
            >
              <SelectTrigger id="fontSize">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium (Default)</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="x-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>Settings to improve your experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations throughout the interface</p>
              </div>
              <RadioGroup defaultValue="off" className="flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="off" id="motion-off" />
                  <Label htmlFor="motion-off">Off</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="on" id="motion-on" />
                  <Label htmlFor="motion-on">On</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">High Contrast</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
              </div>
              <RadioGroup defaultValue="off" className="flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="off" id="contrast-off" />
                  <Label htmlFor="contrast-off">Off</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="on" id="contrast-on" />
                  <Label htmlFor="contrast-on">On</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isLoading} className="ml-auto bg-[#0033A0] hover:bg-[#002180]">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
