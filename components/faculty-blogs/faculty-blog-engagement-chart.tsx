import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "lucide-react"

export function FacultyBlogEngagementChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Engagement by Type</CardTitle>
        <PieChart className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">
            [Pie chart showing distribution of engagement types would appear here]
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#0033A0] mb-1"></div>
            <div className="text-xs text-center">Views</div>
            <div className="font-bold">65%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#00A86B] mb-1"></div>
            <div className="text-xs text-center">Likes</div>
            <div className="font-bold">25%</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#FFC72C] mb-1"></div>
            <div className="text-xs text-center">Comments</div>
            <div className="font-bold">10%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
