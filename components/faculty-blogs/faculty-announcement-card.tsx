import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2, Eye, Calendar, MapPin, Bell } from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

interface FacultyAnnouncementCardProps {
  announcement: {
    id: string
    title: string
    excerpt: string
    date: string
    tags: string[]
    likes: number
    comments: number
    views: number
    author: {
      id: string
      name: string
      avatar?: string
      department?: string
    }
    visibility: string
    course?: string
    department?: string
    eventDate?: string
    location?: string
  }
}

export function FacultyAnnouncementCard({ announcement }: FacultyAnnouncementCardProps) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-orange-400">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <UserAvatar user={announcement.author} showName={true} />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">
              {new Date(announcement.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {announcement.author.department && (
              <span className="text-xs text-gray-500">{announcement.author.department}</span>
            )}
          </div>
        </div>
        <Link href={`/faculty/blogs/${announcement.id}`}>
          <div className="flex items-center mb-2">
            <Bell className="h-4 w-4 mr-2 text-orange-500" />
            <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors">{announcement.title}</h3>
          </div>
        </Link>
        <p className="text-gray-600 text-sm mb-3">{announcement.excerpt}</p>

        {announcement.eventDate && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>
              {new Date(announcement.eventDate).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at{" "}
              {new Date(announcement.eventDate).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        )}

        {announcement.location && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span>{announcement.location}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {announcement.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {announcement.visibility === "course" && announcement.course && (
            <Badge variant="outline" className="text-xs bg-blue-50">
              {announcement.course}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-gray-50 flex justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">{announcement.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{announcement.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Eye className="h-4 w-4 mr-1" />
            <span className="text-xs">{announcement.views}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
