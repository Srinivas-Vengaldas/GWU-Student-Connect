import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { UserAvatar } from "@/components/user-avatar"
import Link from "next/link"

interface EventOrganizerProps {
  organizer: {
    id: string
    name: string
    role: string
    department?: string
    avatar?: string
    email?: string
  }
}

export function EventOrganizer({ organizer }: EventOrganizerProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Organizer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <UserAvatar user={organizer} size="lg" />
          <div className="flex-1">
            <Link href={`/student/profile/${organizer.id}`} className="font-medium text-lg hover:text-[#0033A0]">
              {organizer.name}
            </Link>
            <p className="text-sm text-gray-500">{organizer.role}</p>
            {organizer.department && <p className="text-sm text-gray-500">{organizer.department}</p>}
            {organizer.email && (
              <a
                href={`mailto:${organizer.email}`}
                className="flex items-center text-sm text-[#0033A0] hover:underline mt-2"
              >
                <Mail className="h-4 w-4 mr-1" />
                {organizer.email}
              </a>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Button className="w-full">Contact Organizer</Button>
        </div>
      </CardContent>
    </Card>
  )
}
