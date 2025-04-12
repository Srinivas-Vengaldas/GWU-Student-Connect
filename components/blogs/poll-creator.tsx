"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"

export function PollCreator() {
  const [options, setOptions] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ])
  const [allowMultiple, setAllowMultiple] = useState(false)

  const addOption = () => {
    const newId = Math.max(0, ...options.map((o) => o.id)) + 1
    setOptions([...options, { id: newId, text: "" }])
  }

  const removeOption = (id: number) => {
    if (options.length <= 2) return // Minimum 2 options
    setOptions(options.filter((option) => option.id !== id))
  }

  const updateOption = (id: number, text: string) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, text } : option)))
  }

  return (
    <div className="space-y-4">
      <Label>Poll Options</Label>

      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Input
              value={option.text}
              onChange={(e) => updateOption(option.id, e.target.value)}
              placeholder={`Option ${option.id}`}
              className="flex-1"
            />
            <Button variant="ghost" size="icon" onClick={() => removeOption(option.id)} disabled={options.length <= 2}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={addOption} className="flex items-center">
        <Plus className="mr-2 h-4 w-4" />
        Add Option
      </Button>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="allow-multiple"
          checked={allowMultiple}
          onCheckedChange={(checked) => setAllowMultiple(checked === true)}
        />
        <Label htmlFor="allow-multiple">Allow multiple selections</Label>
      </div>
    </div>
  )
}
