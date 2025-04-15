import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, UserPlus, Calendar, Sparkles } from "lucide-react"

// Mock data for suggestions
const suggestions = [
  {
    id: 1,
    type: "material",
    title: "Machine Learning Fundamentals",
    course: "CS 482",
    reason: "Based on your interests",
    link: "/student/study-materials/10",
  },
  {
    id: 2,
    type: "person",
    name: "Dr. James Wilson",
    role: "Faculty",
    department: "Computer Science",
    expertise: ["AI", "Machine Learning"],
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JW",
    reason: "Expertise matches your interests",
    link: "/student/directory/faculty/15",
  },
  {
    id: 3,
    type: "event",
    title: "Tech Career Fair",
    date: "May 20, 2023",
    time: "10:00 AM - 3:00 PM",
    location: "Student Center",
    reason: "Relevant to your major",
    link: "/student/events/25",
  },
  {
    id: 4,
    type: "person",
    name: "Emily Chen",
    role: "Student",
    program: "Computer Science",
    year: "Senior",
    interests: ["AI", "Web Development"],
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EC",
    reason: "Similar interests",
    link: "/student/directory/students/30",
  },
]

export function SuggestionsWidget() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-800 flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-yellow-500" />
            Suggestions For You
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="group">
            {suggestion.type === "material" && (
              <Link href={suggestion.link} className="block">
                <div className="flex items-start gap-3 p-2.5 rounded-md border border-gray-200 group-hover:border-[#0033A0] group-hover:bg-blue-50 transition-colors">
                  <div className="h-9 w-9 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 truncate">{suggestion.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-xs px-1.5 py-0 h-5">{suggestion.course}</Badge>
                      <span className="text-xs text-gray-500">{suggestion.reason}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {suggestion.type === "person" && (
              <Link href={suggestion.link} className="block">
                <div className="flex items-start gap-3 p-2.5 rounded-md border border-gray-200 group-hover:border-[#0033A0] group-hover:bg-blue-50 transition-colors">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={suggestion.avatar || "/placeholder.svg"} alt={suggestion.name} />
                    <AvatarFallback className="text-xs">{suggestion.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 truncate">{suggestion.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                        {suggestion.role}
                      </Badge>
                      <span className="text-xs text-gray-500 truncate">
                        {suggestion.department || suggestion.program}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {suggestion.expertise?.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                          {item}
                        </Badge>
                      ))}
                      {suggestion.interests?.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                          {item}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{suggestion.reason}</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                    <UserPlus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Link>
            )}

            {suggestion.type === "event" && (
              <Link href={suggestion.link} className="block">
                <div className="flex items-start gap-3 p-2.5 rounded-md border border-gray-200 group-hover:border-[#0033A0] group-hover:bg-blue-50 transition-colors">
                  <div className="h-9 w-9 rounded-md bg-purple-100 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 truncate">{suggestion.title}</h4>
                    <div className="text-xs text-gray-600 mt-1 truncate">
                      {suggestion.date}, {suggestion.time}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{suggestion.location}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate">{suggestion.reason}</div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
