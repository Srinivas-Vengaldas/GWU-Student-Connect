import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react"

export function FacultyBlogStats() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Blog Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-2 text-[#0033A0]" />
              <span className="text-sm font-medium">Total Views</span>
            </div>
            <span className="font-bold">642</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#0033A0]" style={{ width: "78%" }}></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LineChart className="h-4 w-4 mr-2 text-green-600" />
              <span className="text-sm font-medium">Engagement Rate</span>
            </div>
            <span className="font-bold">24.8%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-600" style={{ width: "24.8%" }}></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <PieChart className="h-4 w-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium">Comment Rate</span>
            </div>
            <span className="font-bold">12.9%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600" style={{ width: "12.9%" }}></div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <h4 className="text-sm font-medium mb-2">Top Performing Post</h4>
          <div className="text-sm">
            <p className="font-medium text-[#0033A0]">Integrating AI Tools in Your Research Workflow</p>
            <p className="text-gray-500 text-xs">215 views • 89 likes • 31 comments</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
