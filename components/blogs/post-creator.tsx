"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ImageIcon,
  Link2,
  FileText,
  Video,
  Hash,
  X,
  Globe,
  Users,
  BookOpen,
  PenLine,
  MessageSquare,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PostCreator() {
  const [postType, setPostType] = useState("quick")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [visibility, setVisibility] = useState("public")

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = () => {
    // Here you would handle the submission of the post
    console.log({
      type: postType,
      title,
      content,
      tags,
      visibility,
    })

    // Reset form
    setTitle("")
    setContent("")
    setTags([])
    setVisibility("public")
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <Tabs defaultValue="quick" onValueChange={setPostType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Quick Post
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <PenLine className="h-4 w-4" />
              Blog Post
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt="Current User" />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            {postType === "blog" && (
              <Input
                placeholder="Title of your blog post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-medium"
              />
            )}
            <Textarea
              placeholder={postType === "quick" ? "What's on your mind?" : "Write your blog post content..."}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={postType === "blog" ? "min-h-[200px]" : "min-h-[100px]"}
            />

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {tag}
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => handleRemoveTag(tag)}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <div className="flex items-center">
                <Input
                  placeholder="Add a tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-8 w-32"
                />
                <Button variant="ghost" size="sm" onClick={handleAddTag} disabled={!currentTag.trim()} className="ml-1">
                  <Hash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <ImageIcon className="h-4 w-4 mr-1" />
            Image
          </Button>
          <Button variant="ghost" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            File
          </Button>
          <Button variant="ghost" size="sm">
            <Link2 className="h-4 w-4 mr-1" />
            Link
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4 mr-1" />
            Video
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={visibility} onValueChange={setVisibility}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Public
                </div>
              </SelectItem>
              <SelectItem value="friends-only">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Friends Only
                </div>
              </SelectItem>
              <SelectItem value="course-only">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Course Only
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} disabled={!content.trim() || (postType === "blog" && !title.trim())}>
            Post
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
