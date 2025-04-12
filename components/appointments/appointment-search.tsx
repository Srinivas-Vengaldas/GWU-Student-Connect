"use client"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function AppointmentSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by name, expertise..."
        className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
      />
    </div>
  )
}
