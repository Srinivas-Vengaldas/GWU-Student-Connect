import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Bookmark, FileImage, FileCode, FileIcon as FilePdf } from "lucide-react"

// Mock data for recent materials
const recentMaterials = [
  {
    id: 1,
    title: "Data Structures Final Review",
    type: "pdf",
    size: "2.4 MB",
    course: "CS 202",
    tags: ["exam", "review"],
    uploader: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    uploadDate: "2 days ago",
    downloads: 45,
    bookmarked: false,
  },
  {
    id: 2,
    title: "Algorithm Visualization Examples",
    type: "pptx",
    size: "5.1 MB",
    course: "CS 401",
    tags: ["visualization", "sorting"],
    uploader: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    uploadDate: "3 days ago",
    downloads: 32,
    bookmarked: true,
  },
  {
    id: 3,
    title: "Database Schema Design Project",
    type: "zip",
    size: "8.7 MB",
    course: "CS 332",
    tags: ["project", "code"],
    uploader: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ER",
    },
    uploadDate: "1 week ago",
    downloads: 18,
    bookmarked: false,
  },
]

export function RecentMaterials() {
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FilePdf className="h-5 w-5 text-red-500" />
      case "pptx":
        return <FileImage className="h-5 w-5 text-orange-500" />
      case "zip":
      case "code":
        return <FileCode className="h-5 w-5 text-blue-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recently Shared Materials</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/student/study-materials">View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentMaterials.map((material) => (
          <div
            key={material.id}
            className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-slate-50 transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              {getFileIcon(material.type)}
            </div>

            <div className="flex-1 min-w-0">
              <Link href={`/student/study-materials/${material.id}`}>
                <h4 className="font-medium text-[#0033A0] hover:underline truncate">{material.title}</h4>
              </Link>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge>{material.course}</Badge>
                <Badge variant="outline" className="text-xs">
                  {material.type.toUpperCase()} • {material.size}
                </Badge>
                <div className="flex flex-wrap gap-1">
                  {material.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center min-w-0">
                  <Avatar className="h-5 w-5 mr-1 flex-shrink-0">
                    <AvatarImage src={material.uploader.avatar || "/placeholder.svg"} alt={material.uploader.name} />
                    <AvatarFallback>{material.uploader.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-500 truncate">
                    {material.uploader.name} • {material.uploadDate}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Bookmark className={`h-4 w-4 ${material.bookmarked ? "fill-[#0033A0] text-[#0033A0]" : ""}`} />
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 gap-1 whitespace-nowrap">
                    <Download className="h-3 w-3" />
                    <span className="text-xs">Download</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
