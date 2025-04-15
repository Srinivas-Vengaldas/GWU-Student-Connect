"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Mail, MessageSquare, Loader2 } from "lucide-react"
import { handleImageUpload, saveProfileImage } from "@/utils/image-upload"

interface FacultyProfileHeaderProps {
  faculty: {
    id: string
    name: string
    email: string
    title: string
    department: string
    bio: string
    avatar?: string
    status?: string
    isCurrentUser: boolean
  }
  onProfileUpdate?: (updatedProfile: any) => void
}

export function FacultyProfileHeader({ faculty, onProfileUpdate }: FacultyProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [status, setStatus] = useState(faculty.status || "")
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState(faculty.avatar || "/placeholder.svg")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleStatusUpdate = () => {
    setIsEditing(false)
    if (onProfileUpdate) {
      onProfileUpdate({ ...faculty, status })
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      try {
        const imageUrl = await handleImageUpload(e.target.files[0])
        setAvatarSrc(imageUrl)
        saveProfileImage(imageUrl)

        if (onProfileUpdate) {
          onProfileUpdate({ ...faculty, avatar: imageUrl })
        }
      } catch (error) {
        console.error("Error uploading image:", error)
      } finally {
        setIsUploading(false)
        setShowImageUpload(false)
      }
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white bg-white">
                <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={faculty.name} />
                <AvatarFallback className="text-2xl">
                  {faculty.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {faculty.isCurrentUser && (
                <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute right-0 bottom-0 rounded-full p-1 h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                      <DialogDescription>
                        Upload a new profile picture. The image should be square for best results.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowImageUpload(false)} disabled={isUploading}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#0033A0] hover:bg-[#002180]"
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          "Upload"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {!faculty.isCurrentUser && (
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            )}
          </div>

          {/* Profile Info Section */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{faculty.name}</h1>
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Badge variant="outline">{faculty.title}</Badge>
                  <span className="text-sm">{faculty.department}</span>
                </div>
              </div>

              {faculty.isCurrentUser && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} disabled={isEditing}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update Status
                </Button>
              )}
            </div>

            {/* Status */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              {isEditing ? (
                <div className="mt-1 space-y-2">
                  <Textarea
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="What's on your mind?"
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleStatusUpdate} className="bg-[#0033A0] hover:bg-[#002180]">
                      Update
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 mt-1">{status || "No status set"}</p>
              )}
            </div>

            {/* Bio */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Biography</h3>
              <p className="text-gray-700 mt-1">{faculty.bio}</p>
            </div>

            {/* Contact Info */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
              <div className="mt-1">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{faculty.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
