import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Calendar, Award, BookOpen, GraduationCap, Star } from "lucide-react"

interface ProfileAchievementsProps {
  student: any
}

export function ProfileAchievements({ student }: ProfileAchievementsProps) {
  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case "trophy":
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case "users":
        return <Users className="h-6 w-6 text-blue-500" />
      case "calendar":
        return <Calendar className="h-6 w-6 text-green-500" />
      case "award":
        return <Award className="h-6 w-6 text-purple-500" />
      case "book":
        return <BookOpen className="h-6 w-6 text-red-500" />
      case "graduation":
        return <GraduationCap className="h-6 w-6 text-indigo-500" />
      default:
        return <Star className="h-6 w-6 text-amber-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-[#0033A0]" />
          Achievements & Badges
          <Badge className="ml-2">{student.achievements.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {student.achievements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {student.achievements.map((achievement: any) => (
              <Card key={achievement.id} className="overflow-hidden border-2 border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full p-3 bg-gray-50">{getAchievementIcon(achievement.icon)}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#0033A0]">{achievement.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs">
                          {achievement.date}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <Trophy className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2">No achievements yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
