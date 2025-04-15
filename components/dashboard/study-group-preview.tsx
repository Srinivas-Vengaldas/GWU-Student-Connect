import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Calendar, ChevronRight } from "lucide-react"

// Mock data for study groups
const studyGroups = [
  {
    id: 1,
    name: "Advanced Algorithms",
    course: "CS 401",
    members: 8,
    nextMeeting: "Today, 4:00 PM",
    unreadMessages: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AA",
  },
  {
    id: 2,
    name: "Database Systems",
    course: "CS 332",
    members: 6,
    nextMeeting: "Tomorrow, 2:30 PM",
    unreadMessages: 0,
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DS",
  },
]

export function StudyGroupPreview() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-800">My Study Groups</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/student/study-groups">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {studyGroups.map((group) => (
          <Link href={`/student/study-groups/${group.id}`} key={group.id} className="block">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-[#0033A0] transition-colors">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                <AvatarFallback className="bg-[#0033A0] text-white">{group.initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium truncate">{group.name}</h4>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>

                <Badge variant="outline" className="mt-1 text-xs">
                  {group.course}
                </Badge>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <span>{group.members} members</span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                    <span className="truncate">{group.nextMeeting}</span>
                  </div>

                  {group.unreadMessages > 0 && (
                    <div className="flex items-center text-[#0033A0]">
                      <MessageSquare className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span>{group.unreadMessages} new messages</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}

        <Button variant="outline" className="w-full" asChild>
          <Link href="/student/study-groups/create">
            <Users className="mr-2 h-4 w-4" />
            Create New Study Group
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
