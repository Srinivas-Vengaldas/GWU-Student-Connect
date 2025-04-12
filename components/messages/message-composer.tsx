"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Code, FileUp, ImageIcon, Mic, PlusCircle, Send, Smile, Timer } from "lucide-react"

interface MessageComposerProps {
  conversationId: string
}

export function MessageComposer({ conversationId }: MessageComposerProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you'd send the message to your backend
      console.log("Sending message:", message, "to conversation:", conversationId)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="border-t p-3">
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
                    <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-2">
                      <ImageIcon className="h-5 w-5" />
                      <span className="text-xs">Image</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-2">
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
                className="h-8 gap-1 bg-[#0033A0] text-white hover:bg-[#002180]"
                onClick={handleSendMessage}
                disabled={!message.trim() && !isRecording}
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
