import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for recommended connections
const recommendedConnections = [
  {
    id: "1",
    name: "Dr. Robert Chen",
    role: "Faculty",
    department: "Computer Science",
    expertise: ["Machine Learning", "AI Ethics"],
    avatar: "/placeholder.svg",
    reason: "Based on your interest in AI",
  },
  {
    id: "2",
    name: "Lisa Patel",
    role: "Alumni",
    department: "School of Business",
    expertise: ["Marketing", "Entrepreneurship"],
    avatar: "/placeholder.svg",
    reason: "Recently spoke at a GW event",
  },
  {
    id: "3",
    name: "Prof. David Kim",
    role: "Faculty",
    department: "Political Science",
    expertise: ["International Relations", "Public Policy"],
    avatar: "/placeholder.svg",
    reason: "Popular among students in your program",
  },
]

export function RecommendedConnections() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recommended Connections</CardTitle>
        <CardDescription>Faculty and alumni you might want to meet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendedConnections.map((person) => (
          <div key={person.id} className="flex items-start space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
              <AvatarFallback>
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="font-medium">{person.name}</span>
                <Badge variant={person.role === "Faculty" ? "default" : "secondary"} className="ml-2">
                  {person.role}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">{person.department}</div>
              <div className="flex flex-wrap gap-1">
                {person.expertise.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">{person.reason}</div>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-blue-600">
                Book Appointment
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          View More Recommendations
        </Button>
      </CardFooter>
    </Card>
  )
}
