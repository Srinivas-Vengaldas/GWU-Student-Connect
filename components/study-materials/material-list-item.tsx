"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BookOpen,
  FileText,
  Heart,
  ImageIcon,
  MoreHorizontal,
  Presentation,
  CheckCircle,
  Users,
  History,
} from "lucide-react"

interface MaterialListItemProps {
  material: any
  isOwner?: boolean
}

export function MaterialListItem({ material, isOwner = false }: MaterialListItemProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(material.isFavorite)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)

  // Check if material is in downloads
  useEffect(() => {
    const downloads = JSON.parse(localStorage.getItem("downloadedMaterials") || "[]")
    setIsDownloaded(downloads.includes(material.id))
  }, [material.id])

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "docx":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "pptx":
        return <Presentation className="h-6 w-6 text-orange-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-6 w-6 text-green-500" />
      default:
        return <BookOpen className="h-6 w-6 text-gray-500" />
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
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

  const handleDelete = () => {
    // In a real app, you'd call an API to delete the material
    console.log("Deleting material:", material.id)
    setShowDeleteDialog(false)
  }

  const handleItemClick = () => {
    router.push(`/student/study-materials/${material.id}`)
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleItemClick}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100">
              {getFileIcon(material.fileType)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0033A0] hover:underline">{material.title}</h3>
                    {material.isVerified && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified by faculty</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {material.hasVersions && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <History
                              className="h-4 w-4 text-blue-500 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowVersionHistory(true)
                              }}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Version history available</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-1">{material.description}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge>{material.course}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {material.fileType.toUpperCase()} • {material.fileSize}
                    </Badge>
                    {material.hasSolutions && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                        Solutions
                      </Badge>
                    )}
                    {material.tags.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {material.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{material.tags.length - 2} more
                      </Badge>
                    )}
                    {material.studyGroups && material.studyGroups.length > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 text-xs flex items-center gap-1"
                      >
                        <Users className="h-3 w-3" />
                        {material.studyGroups.length} groups
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuItem>
                        \
