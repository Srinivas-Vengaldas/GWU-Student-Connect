import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ThumbsUp,
  MessageSquare,
  Download,
  UserPlus,
  Calendar,
  BookMarked,
  Edit,
  PlusCircle,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface ProfileActivityFeedProps {
  student: any
}

export function ProfileActivityFeed({ student }: ProfileActivityFeedProps) {
  // This would be fetched from an API in a real app
  const activities = [
    {
      id: 1,
      type: "comment",
      content:
        "Great points about memory consolidation techniques! I've found spaced repetition particularly effective for my psychology courses.",
      target: {
        type: "blog",
        title: "Effective Study Strategies Based on Cognitive Science",
        id: "123",
      },
      date: "2 days ago",
      icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      type: "upload",
      content: "Uploaded new study material",
      target: {
        type: "material",
        title: "Neuroscience Fundamentals - Presentation",
        id: "456",
      },
      date: "3 days ago",
      icon: <BookMarked className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      type: "join",
      content: "Joined a study group",
      target: {
        type: "group",
        title: "Research Methods Collaboration",
        id: "789",
      },
      date: "1 week ago",
      icon: <UserPlus className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      type: "rsvp",
      content: "RSVP'd to an event",
      target: {
        type: "event",
        title: "Psychology Department Research Symposium",
        id: "101",
      },
      date: "1 week ago",
      icon: <Calendar className="h-4 w-4 text-orange-500" />,
    },
    {
      id: 5,
      type: "create",
      content: "Created a new blog post",
      target: {
        type: "blog",
        title: "The Connection Between Digital Media and Anxiety",
        id: "112",
      },
      date: "2 weeks ago",
      icon: <Edit className="h-4 w-4 text-indigo-500" />,
    },
    {
      id: 6,
      type: "like",
      content: "Liked a study material",
      target: {
        type: "material",
        title: "Statistical Methods for Psychology - Practice Problems",
        id: "131",
      },
      date: "2 weeks ago",
      icon: <ThumbsUp className="h-4 w-4 text-red-500" />,
    },
    {
      id: 7,
      type: "download",
      content: "Downloaded a study material",
      target: {
        type: "material",
        title: "Cognitive Psychology - Exam Study Guide",
        id: "145",
      },
      date: "3 weeks ago",
      icon: <Download className="h-4 w-4 text-cyan-500" />,
    },
    {
      id: 8,
      type: "create",
      content: "Created a new poll",
      target: {
        type: "poll",
        title: "Study Habits Survey: What Works Best for You?",
        id: "159",
      },
      date: "3 weeks ago",
      icon: <PlusCircle className="h-4 w-4 text-teal-500" />,
    },
  ]

  const getActivityLink = (activity: any) => {
    switch (activity.target.type) {
      case "blog":
      case "poll":
        return `/student/blogs/${activity.target.id}`
      case "material":
        return `/student/study-materials/${activity.target.id}`
      case "group":
        return `/student/study-groups/${activity.target.id}`
      case "event":
        return `/student/events/${activity.target.id}`
      default:
        return "#"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Activity className="mr-2 h-5 w-5 text-[#0033A0]" />
          Recent Activity
          <Badge className="ml-2">{activities.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="rounded-full p-2 bg-gray-50 flex-shrink-0 mt-1">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{student.name}</span> {activity.content}
                      </p>
                      <Link
                        href={getActivityLink(activity)}
                        className="text-sm font-medium text-[#0033A0] hover:underline"
                      >
                        {activity.target.title}
                      </Link>
                    </div>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <Activity className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
