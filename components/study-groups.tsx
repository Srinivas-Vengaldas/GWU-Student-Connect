import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export function StudyGroups() {
  const groups = [
    {
      id: 1,
      name: "Calculus Study Group",
      members: 12,
      course: "MATH 101",
      tags: ["Mathematics", "Calculus"],
    },
    {
      id: 2,
      name: "Programming Fundamentals",
      members: 8,
      course: "CS 150",
      tags: ["Computer Science", "Programming"],
    },
    {
      id: 3,
      name: "Organic Chemistry",
      members: 15,
      course: "CHEM 202",
      tags: ["Chemistry", "Organic"],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Groups</CardTitle>
        <CardDescription>Join study groups to collaborate with peers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {groups.map((group) => (
            <Link key={group.id} href={`/student/study-groups/${group.id}`} className="block">
              <div className="rounded-lg border p-3 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-[#0033A0]">{group.name}</div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Users className="mr-1 h-4 w-4" />
                  <span>{group.members} members</span>
                  <span className="mx-1">•</span>
                  <span>{group.course}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {group.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/student/study-groups" className="text-sm font-medium text-[#0033A0] hover:underline">
            View all study groups
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
