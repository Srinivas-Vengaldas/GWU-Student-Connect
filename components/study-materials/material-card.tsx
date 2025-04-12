import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, BookmarkPlus, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

interface MaterialCardProps {
  material: {
    id: string
    title: string
    description: string
    type: string
    course: string
    downloads: number
    date: string
    thumbnail: string
    author: {
      id: string
      name: string
      avatar?: string
    }
  }
}

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <UserAvatar user={material.author} showName={true} />
          <span className="text-xs text-gray-500">
            {new Date(material.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <div className="flex gap-4">
          <div className="relative h-24 w-20 flex-shrink-0 bg-gray-100 rounded">
            <Image
              src={material.thumbnail || "/placeholder.svg"}
              alt={material.title}
              fill
              className="object-cover rounded"
            />
          </div>
          <div>
            <Link href={`/student/study-materials/${material.id}`}>
              <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors">{material.title}</h3>
            </Link>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{material.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{material.type}</Badge>
              <Badge variant="secondary">{material.course}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-gray-50 flex justify-between">
        <div className="text-sm text-gray-500">{material.downloads} downloads</div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <BookmarkPlus className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
