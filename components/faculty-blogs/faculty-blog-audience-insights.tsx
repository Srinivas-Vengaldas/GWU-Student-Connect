import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, BookOpen } from "lucide-react"

export function FacultyBlogAudienceInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Audience Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Users className="h-4 w-4 mr-2 text-[#0033A0]" />
            Reader Demographics
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Undergraduate Students</span>
              <span className="font-medium">62%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0033A0]" style={{ width: "62%" }}></div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span>Graduate Students</span>
              <span className="font-medium">28%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0033A0]" style={{ width: "28%" }}></div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span>Faculty</span>
              <span className="font-medium">7%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0033A0]" style={{ width: "7%" }}></div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span>Other</span>
              <span className="font-medium">3%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0033A0]" style={{ width: "3%" }}></div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <GraduationCap className="h-4 w-4 mr-2 text-[#0033A0]" />
            Top Departments
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Sociology</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Psychology</span>
              <span className="font-medium">22%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Political Science</span>
              <span className="font-medium">18%</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-[#0033A0]" />
            Top Courses
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>SOCI 301</span>
              <span className="font-medium">38%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>SOCI 201</span>
              <span className="font-medium">24%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>PSYC 350</span>
              <span className="font-medium">15%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
