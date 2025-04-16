import { PageLayout } from "@/components/page-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function StudyGroupLoading() {
  return (
    <PageLayout role="student">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-24" />
        </div>

        <Card>
          <div className="relative h-40 w-full">
            <Skeleton className="h-full w-full" />
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <Skeleton className="h-4 w-40 mt-1" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>

            <Skeleton className="h-4 w-full mt-4" />
            <Skeleton className="h-4 w-3/4 mt-1" />

            <div className="mt-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex -space-x-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-4 w-48" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <div className="flex overflow-x-auto pb-2">
            <Skeleton className="h-10 w-32 mr-2 rounded-md" />
            <Skeleton className="h-10 w-20 mr-2 rounded-md" />
            <Skeleton className="h-10 w-28 mr-2 rounded-md" />
            <Skeleton className="h-10 w-24 mr-2 rounded-md" />
            <Skeleton className="h-10 w-32 mr-2 rounded-md" />
            <Skeleton className="h-10 w-20 mr-2 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>

          <div className="mt-6 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-24 mt-1" />
                      </div>
                    </div>
                    <Skeleton className="h-9 w-24" />
                  </div>

                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-24 mt-1" />
                      </div>
                    </div>
                    <Skeleton className="h-9 w-24" />
                  </div>

                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
