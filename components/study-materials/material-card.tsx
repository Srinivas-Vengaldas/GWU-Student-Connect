"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BookOpen,
  Download,
  Edit,
  Eye,
  FileText,
  Flag,
  Heart,
  ImageIcon,
  MoreHorizontal,
  Presentation,
  Share2,
  Star,
  Trash,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface MaterialCardProps {
  material: any
  isOwner?: boolean
}

export function MaterialCard({ material, isOwner = false }: MaterialCardProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(material.isFavorite)
  const [isDownloaded, setIsDownloaded] = useState(false)

  // Check if material is in downloads
  useEffect(() => {
    const downloads = JSON.parse(localStorage.getItem("downloadedMaterials") || "[]")
    setIsDownloaded(downloads.includes(material.id))
  }, [material.id])

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "docx":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "pptx":
        return <Presentation className="h-10 w-10 text-orange-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-10 w-10 text-green-500" />
      default:
        return <BookOpen className="h-10 w-10 text-gray-500" />
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)

    // Update favorites in localStorage
    const favorites = JSON.parse(localStorage.getItem("favoriteMaterials") || "[]")
    if (isFavorite) {
      const index = favorites.indexOf(material.id)
      if (index > -1) {
        favorites.splice(index, 1)
      }
    } else {
      if (!favorites.includes(material.id)) {
        favorites.push(material.id)
      }
    }
    localStorage.setItem("favoriteMaterials", JSON.stringify(favorites))
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // In a real app, you'd initiate a file download here
    console.log("Downloading material:", material.id)

    // Track the download in localStorage
    const downloads = JSON.parse(localStorage.getItem("downloadedMaterials") || "[]")
    if (!downloads.includes(material.id)) {
      downloads.push(material.id)
      localStorage.setItem("downloadedMaterials", JSON.stringify(downloads))
    }

    setIsDownloaded(true)

    // Simulate download with a timeout
    setTimeout(() => {
      alert(`Downloaded: ${material.title}`)
    }, 1000)
  }

  const handleCardClick = () => {
    router.push(`/student/study-materials/${material.id}`)
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer" onClick={handleCardClick}>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100">
            {getFileIcon(material.fileType)}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                handleToggleFavorite()
              }}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                {isOwner ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <h3 className="font-semibold text-[#0033A0] hover:underline line-clamp-2">{material.title}</h3>
        <p className="text-sm text-gray-700 mt-1 line-clamp-2">{material.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          <Badge>{material.course}</Badge>
          {material.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Avatar className="h-5 w-5 mr-1">
              <AvatarImage src={material.uploader.avatar || "/placeholder.svg"} alt={material.uploader.name} />
              <AvatarFallback>{material.uploader.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{material.uploader.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>
              {material.rating} ({material.ratingCount})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-4">
        <div className="w-full flex items-center justify-between">
          <span className="text-xs text-gray-500">{material.uploadDate}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className={`h-8 gap-1 ${isDownloaded ? "bg-green-600 hover:bg-green-700" : "bg-[#0033A0] hover:bg-[#002180]"}`}
                  onClick={(e) => handleDownload(e)}
                >
                  <Download className="h-3 w-3" />
                  {isDownloaded ? "Downloaded" : "Download"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {material.downloads} downloads • {material.fileSize}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}
