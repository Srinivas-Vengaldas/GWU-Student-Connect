import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, BookMarked, Users, FileText, Calendar } from "lucide-react"

interface ProfileHeaderSimpleProps {
  student: any
}

export function ProfileHeaderSimple({ student }: ProfileHeaderSimpleProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white bg-white">
            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
            <AvatarFallback>
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div>
              <h1 className="text-2xl font-bold">{student.name}</h1>
              <div className="flex items-center gap-2 text-gray-500">
                <Badge variant="outline">{student.role}</Badge>
                <span className="text-sm">{student.major}</span>
                <span className="text-sm">•</span>
                <span className="text-sm">{student.year}</span>
              </div>
            </div>

            <p className="text-gray-700">{student.bio || "No bio available"}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="flex flex-col items-center p-2 rounded-md border text-center">
                <BookMarked className="h-5 w-5 text-[#0033A0] mb-1" />
                <span className="text-lg font-semibold">{student.stats?.materials || 0}</span>
                <span className="text-xs text-gray-500">Materials</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md border text-center">
                <Users className="h-5 w-5 text-[#0033A0] mb-1" />
                <span className="text-lg font-semibold">{student.stats?.groups || 0}</span>
                <span className="text-xs text-gray-500">Study Groups</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md border text-center">
                <FileText className="h-5 w-5 text-[#0033A0] mb-1" />
                <span className="text-lg font-semibold">{student.stats?.blogs || 0}</span>
                <span className="text-xs text-gray-500">Blog Posts</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-md border text-center">
                <Calendar className="h-5 w-5 text-[#0033A0] mb-1" />
                <span className="text-lg font-semibold">{student.stats?.events || 0}</span>
                <span className="text-xs text-gray-500">Events</span>
              </div>
            </div>

            <div className="space-y-1 pt-4">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{student.email}</span>
              </div>
              {student.phone && (
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{student.phone}</span>
                </div>
              )}
              {student.location && (
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{student.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
