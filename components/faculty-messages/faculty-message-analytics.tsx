"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FacultyMessageAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messaging Analytics</CardTitle>
        <CardDescription>View statistics about your messaging activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="response">Response Time</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-gray-500">Total Messages</div>
                <div className="text-2xl font-bold">1,248</div>
                <div className="text-xs text-green-500">+12% from last month</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-gray-500">Active Conversations</div>
                <div className="text-2xl font-bold">42</div>
                <div className="text-xs text-green-500">+5 from last month</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-gray-500">Student Reach</div>
                <div className="text-2xl font-bold">78%</div>
                <div className="text-xs text-gray-500">Of enrolled students</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-gray-500">Avg. Response Time</div>
                <div className="text-2xl font-bold">4.2h</div>
                <div className="text-xs text-red-500">+0.8h from last month</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="engagement">
            <div className="space-y-4 mt-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-2">Most Active Conversations</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>MATH 2230 Study Group</span>
                    <span className="text-sm text-gray-500">142 messages</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-[#0033A0] rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Advanced Calculus Project Team</span>
                    <span className="text-sm text-gray-500">98 messages</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-[#0033A0] rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Alex Johnson</span>
                    <span className="text-sm text-gray-500">76 messages</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-[#0033A0] rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="response">
            <div className="space-y-4 mt-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-2">Response Time Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Under 1 hour</span>
                    <span className="text-sm text-gray-500">42%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>1-6 hours</span>
                    <span className="text-sm text-gray-500">35%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>6-24 hours</span>
                    <span className="text-sm text-gray-500">18%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-orange-500 rounded-full" style={{ width: "18%" }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Over 24 hours</span>
                    <span className="text-sm text-gray-500">5%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: "5%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
