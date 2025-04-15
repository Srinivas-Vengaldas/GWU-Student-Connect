"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
  CheckCircle,
  MessageSquare,
  Users,
  Clock,
  History,
} from "lucide-react"

interface MaterialListItemProps {
  material: any
  isOwner?: boolean
}

export function MaterialListItem({ material, isOwner = false }: MaterialListItemProps) {
  const [isFavorite, setIsFavorite] = useState(material.isFavorite)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)

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

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleDelete = () => {
    // In a real app, you'd call an API to delete the material
    console.log("Deleting material:", material.id)
    setShowDeleteDialog(false)
  }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-100">
              {getFileIcon(material.fileType)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/student/study-materials/${material.id}`}>
                      <h3 className="font-semibold text-[#0033A0] hover:underline">{material.title}</h3>
                    </Link>
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
                              onClick={() => setShowVersionHistory(true)}
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
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleFavorite}>
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      {material.hasVersions && (
                        <DropdownMenuItem onClick={() => setShowVersionHistory(true)}>
                          <History className="mr-2 h-4 w-4" />
                          Version History
                        </DropdownMenuItem>
                      )}
                      {isOwner ? (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => setShowDeleteDialog(true)}>
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
              <div className="mt-2 flex items-center justify-between text-sm flex-wrap">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center">
                    <Avatar className="h-5 w-5 mr-1">
                      <AvatarImage src={material.uploader.avatar || "/placeholder.svg"} alt={material.uploader.name} />
                      <AvatarFallback>{material.uploader.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-500">{material.uploader.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{material.uploadDate}</span>
                  {material.lastAccessed && (
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last accessed: {material.lastAccessed}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-500">
                      {material.rating} ({material.ratingCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-500">{material.views || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-500">{material.comments || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-500">{material.downloads}</span>
                  </div>
                  <Button size="sm" className="h-7 gap-1 bg-[#0033A0] hover:bg-[#002180]">
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Study Material</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{material.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Version History Dialog */}
      {material.hasVersions && (
        <AlertDialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Version History</AlertDialogTitle>
              <AlertDialogDescription>Previous versions of this material</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4 space-y-3">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Current Version</p>
                    <p className="text-xs text-gray-500">Updated on May 10, 2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded border">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm">Version 2</p>
                    <p className="text-xs text-gray-500">Updated on May 5, 2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded border">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm">Version 1</p>
                    <p className="text-xs text-gray-500">Created on May 1, 2024</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
