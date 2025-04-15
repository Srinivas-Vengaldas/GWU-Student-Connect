"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Eye, FileText, Heart, ImageIcon, Presentation, BookOpen } from "lucide-react"

interface MaterialCardProps {
  id: string
  title: string
  description: string
  fileType: string
  uploadDate: string
  downloads: number
  views: number
  uploader: {
    name: string
    avatar?: string
  }
  tags: string[]
}

export function MaterialCard({
  id,
  title,
  description,
  fileType,
  uploadDate,
  downloads,
  views,
  uploader,
  tags,
}: MaterialCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isDownloaded, setIsDownloaded] = useState(false)

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "docx":
      case "doc":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "pptx":
      case "ppt":
        return <Presentation className="h-10 w-10 text-orange-500" />
      case "jpg":
      case "png":
      case "jpeg":
        return <ImageIcon className="h-10 w-10 text-green-500" />
      default:
        return <BookOpen className="h-10 w-10 text-gray-500" />
    }
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // In a real app, you'd initiate a file download here
    console.log("Downloading material:", id)

    // Track the download in localStorage
    const downloads = JSON.parse(localStorage.getItem("downloadedMaterials") || "[]")
    if (!downloads.includes(id)) {
      downloads.push(id)
      localStorage.setItem("downloadedMaterials", JSON.stringify(downloads))
    }

    setIsDownloaded(true)

    // Simulate download with a timeout
    setTimeout(() => {
      alert(`Downloaded: ${title}`)
    }, 1000)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsFavorite(!isFavorite)

    // Update favorites in localStorage
    const favorites = JSON.parse(localStorage.getItem("favoriteMaterials") || "[]")
    if (isFavorite) {
      const index = favorites.indexOf(id)
      if (index > -1) {
        favorites.splice(index, 1)
      }
    } else {
      if (!favorites.includes(id)) {
        favorites.push(id)
      }
    }
    localStorage.setItem("favoriteMaterials", JSON.stringify(favorites))
  }

  return (
    <Link href={`/student/study-materials/${id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-gray-100">
              {getFileIcon(fileType)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-lg line-clamp-2">{title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{tags.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={uploader.avatar || "/placeholder.svg"} alt={uploader.name} />
              <AvatarFallback>{uploader.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-500">{uploader.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleDownload}
              aria-label="Download material"
            >
              <Download className={`h-4 w-4 ${isDownloaded ? "text-green-500" : ""}`} />
            </Button>
            <div className="flex items-center text-xs text-gray-500">
              <Eye className="h-3 w-3 mr-1" />
              {views}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
