"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Download, Heart, Share2, Star, Eye, MessageSquare, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"
import { useState } from "react"

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
    rating?: number
    ratingCount?: number
    views?: number
    comments?: number
    isVerified?: boolean
    hasSolutions?: boolean
    studyGroups?: string[]
  }
  isOwner?: boolean
}

export function MaterialCard({ material, isOwner = false }: MaterialCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <UserAvatar user={material.author} showName={true} />
          <span className="text-xs text-gray-500">
            {new Date(material.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </span>
          {material.isVerified && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified by faculty</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
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
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="outline">{material.type}</Badge>
              <Badge variant="secondary">{material.course}</Badge>
              {material.hasSolutions && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Solutions
                </Badge>
              )}
              {material.studyGroups && material.studyGroups.length > 0 && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Shared in Groups
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-3 bg-gray-50 flex justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center">
            <Download className="h-3.5 w-3.5 mr-1" />
            <span>{material.downloads}</span>
          </div>
          {material.views && (
            <div className="flex items-center">
              <Eye className="h-3.5 w-3.5 mr-1" />
              <span>{material.views}</span>
            </div>
          )}
          {material.rating && (
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 mr-1 text-yellow-500 fill-yellow-500" />
              <span>{material.rating}</span>
            </div>
          )}
          {material.comments && (
            <div className="flex items-center">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              <span>{material.comments}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={isFavorite ? "text-red-500" : ""}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 mr-1 ${isFavorite ? "fill-red-500" : ""}`} />
            {isFavorite ? "Saved" : "Save"}
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
