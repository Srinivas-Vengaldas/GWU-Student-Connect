import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUp, PenSquare, CalendarPlus, Users } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 pt-2">
        <Button
          variant="outline"
          className="h-auto min-h-[80px] py-3 px-2 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-50 hover:text-[#0033A0] hover:border-[#0033A0] transition-colors"
          asChild
        >
          <Link href="/student/study-materials">
            <FileUp className="h-4 w-4 mb-2 flex-shrink-0" />
            <span className="text-xs font-medium whitespace-normal">Upload Material</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="h-auto min-h-[80px] py-3 px-2 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-50 hover:text-[#0033A0] hover:border-[#0033A0] transition-colors"
          asChild
        >
          <Link href="/student/blogs/create">
            <PenSquare className="h-4 w-4 mb-2 flex-shrink-0" />
            <span className="text-xs font-medium whitespace-normal">Create Post</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="h-auto min-h-[80px] py-3 px-2 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-50 hover:text-[#0033A0] hover:border-[#0033A0] transition-colors"
          asChild
        >
          <Link href="/student/appointments">
            <CalendarPlus className="h-4 w-4 mb-2 flex-shrink-0" />
            <span className="text-xs font-medium whitespace-normal">Book Appointment</span>
          </Link>
        </Button>

        <Button
          variant="outline"
          className="h-auto min-h-[80px] py-3 px-2 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-50 hover:text-[#0033A0] hover:border-[#0033A0] transition-colors"
          asChild
        >
          <Link href="/student/study-groups">
            <Users className="h-4 w-4 mb-2 flex-shrink-0" />
            <span className="text-xs font-medium whitespace-normal">Join Study Group</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
