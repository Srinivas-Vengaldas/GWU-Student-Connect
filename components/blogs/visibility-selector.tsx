"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Globe, Users, Lock } from "lucide-react"

export function VisibilitySelector() {
  const [visibility, setVisibility] = useState("public")

  return (
    <RadioGroup value={visibility} onValueChange={setVisibility} className="space-y-3">
      <div
        className="flex items-start space-x-3 p-3 rounded-md border border-transparent hover:border-muted cursor-pointer data-[state=checked]:border-primary data-[state=checked]:bg-secondary/50"
        data-state={visibility === "public" ? "checked" : ""}
        onClick={() => setVisibility("public")}
      >
        <RadioGroupItem value="public" id="public" className="mt-1" />
        <div className="space-y-1">
          <div className="flex items-center">
            <Label htmlFor="public" className="font-medium cursor-pointer">
              Public
            </Label>
            <Globe className="ml-2 h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Anyone at GW can see this post</p>
        </div>
      </div>

      <div
        className="flex items-start space-x-3 p-3 rounded-md border border-transparent hover:border-muted cursor-pointer data-[state=checked]:border-primary data-[state=checked]:bg-secondary/50"
        data-state={visibility === "groups" ? "checked" : ""}
        onClick={() => setVisibility("groups")}
      >
        <RadioGroupItem value="groups" id="groups" className="mt-1" />
        <div className="space-y-1">
          <div className="flex items-center">
            <Label htmlFor="groups" className="font-medium cursor-pointer">
              Groups Only
            </Label>
            <Users className="ml-2 h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Only members of your groups can see this post</p>
        </div>
      </div>

      <div
        className="flex items-start space-x-3 p-3 rounded-md border border-transparent hover:border-muted cursor-pointer data-[state=checked]:border-primary data-[state=checked]:bg-secondary/50"
        data-state={visibility === "private" ? "checked" : ""}
        onClick={() => setVisibility("private")}
      >
        <RadioGroupItem value="private" id="private" className="mt-1" />
        <div className="space-y-1">
          <div className="flex items-center">
            <Label htmlFor="private" className="font-medium cursor-pointer">
              Private
            </Label>
            <Lock className="ml-2 h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Only you can see this post</p>
        </div>
      </div>
    </RadioGroup>
  )
}
