import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Plus, Search } from "lucide-react"

export function EventsHeader() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Discover and participate in campus events, workshops, and activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="gap-1">
            <Link href="/student/events/my-events">
              <Calendar className="h-4 w-4" />
              <span>My Events</span>
            </Link>
          </Button>
          <Button asChild className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
            <Link href="/student/events/create">
              <Plus className="h-4 w-4" />
              <span>Create Event</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events by title, keyword, or organizer..."
          className="w-full pl-9 bg-white"
        />
      </div>
    </div>
  )
}
