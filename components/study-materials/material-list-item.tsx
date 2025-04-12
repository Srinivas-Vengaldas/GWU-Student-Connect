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

interface MaterialListItemProps {
  material: any
  isOwner?: boolean
}

export function MaterialListItem({ material, isOwner = false }: MaterialListItemProps) {
  const [isFavorite, setIsFavorite] = useState(material.isFavorite)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

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
                  <Link href={`/student/study-materials/${material.id}`}>
                    <h3 className="font-semibold text-[#0033A0] hover:underline">{material.title}</h3>
                  </Link>
                  <p className="text-sm text-gray-700 line-clamp-1">{material.description}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge>{material.course}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {material.fileType.toUpperCase()} • {material.fileSize}
                    </Badge>
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
              <div className="mt-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Avatar className="h-5 w-5 mr-1">
                      <AvatarImage src={material.uploader.avatar} alt={material.uploader.name} />
                      <AvatarFallback>{material.uploader.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-500">{material.uploader.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{material.uploadDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-500">
                      {material.rating} ({material.ratingCount})
                    </span>
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
    </>
  )
}
