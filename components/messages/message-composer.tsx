"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Code, FileUp, ImageIcon, Mic, PlusCircle, Send, Smile, Timer, X, Paperclip, File } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageComposerProps {
  conversationId: string
  onSendMessage: (message: string, attachments?: MessageAttachment[]) => void
}

export interface MessageAttachment {
  id: string
  type: "image" | "file"
  name: string
  url: string
  size?: number
  extension?: string
}

export function MessageComposer({ conversationId, onSendMessage }: MessageComposerProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [attachments, setAttachments] = useState<MessageAttachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      // Send the message to the parent component
      onSendMessage(message.trim(), attachments)
      setMessage("")
      setAttachments([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newAttachments: MessageAttachment[] = []

    Array.from(files).forEach((file) => {
      const fileUrl = URL.createObjectURL(file)
      const fileExtension = file.name.split(".").pop() || ""

      newAttachments.push({
        id: `attachment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: type,
        name: file.name,
        url: fileUrl,
        size: file.size,
        extension: fileExtension,
      })
    })

    setAttachments((prev) => [...prev, ...newAttachments])

    // Reset the file input
    if (type === "file" && fileInputRef.current) {
      fileInputRef.current.value = ""
    } else if (type === "image" && imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="border-t p-3">
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="relative group flex items-center border rounded-md p-2 bg-gray-50">
              {attachment.type === "image" ? (
                <div className="relative w-16 h-16 mr-2">
                  <img
                    src={attachment.url || "/placeholder.svg"}
                    alt={attachment.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded bg-gray-200 mr-2">
                  <File className="h-5 w-5 text-gray-500" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[150px]">{attachment.name}</span>
                {attachment.size && <span className="text-xs text-gray-500">{formatFileSize(attachment.size)}</span>}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 absolute -top-2 -right-2 bg-white rounded-full border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeAttachment(attachment.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2">
        <div className="flex-1 rounded-md border">
          <Textarea
            placeholder="Type a message..."
            className="min-h-[80px] max-h-[200px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center justify-between border-t px-3 py-1.5">
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile className="h-5 w-5 text-gray-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add emoji</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <PlusCircle className="h-5 w-5 text-gray-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="start" alignOffset={-40}>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="flex flex-col items-center gap-1 h-auto py-2"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <ImageIcon className="h-5 w-5" />
                      <span className="text-xs">Image</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center gap-1 h-auto py-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FileUp className="h-5 w-5" />
                      <span className="text-xs">File</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-2">
                      <Code className="h-5 w-5" />
                      <span className="text-xs">Code</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-2">
                      <Timer className="h-5 w-5" />
                      <span className="text-xs">Timer</span>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Hidden file inputs */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleFileSelect(e, "file")}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
              />
              <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                onChange={(e) => handleFileSelect(e, "image")}
                accept="image/*"
                multiple
              />

              {/* Quick access buttons */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <ImageIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Upload image</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach file</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isRecording ? "destructive" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isRecording ? "Stop recording" : "Voice message"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 gap-1 bg-[#0033A0] text-white hover:bg-[#002180]",
                  !message.trim() && attachments.length === 0 && !isRecording && "opacity-50 cursor-not-allowed",
                )}
                onClick={handleSendMessage}
                disabled={!message.trim() && attachments.length === 0 && !isRecording}
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
