import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "lucide-react"

export function FacultyBlogAnalyticsOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Overview</CardTitle>
        <LineChart className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">
            [Line chart showing views, likes, and comments over time would appear here]
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
