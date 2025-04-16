"use client"

import { useState, useEffect } from "react"
import { Bold, Italic, List, ListOrdered, ImageIcon, Code, LinkIcon, Heading1, Heading2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BlogEditorProps {
  onContentChange?: (content: string) => void
  initialContent?: string
}

export function BlogEditor({ onContentChange, initialContent = "" }: BlogEditorProps) {
  const [content, setContent] = useState(initialContent)

  useEffect(() => {
    if (onContentChange) {
      onContentChange(content)
    }
  }, [content, onContentChange])

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = document.querySelector("textarea")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    const newText = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end)

    setContent(newText)

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + prefix.length
      textarea.selectionEnd = start + prefix.length + selectedText.length
    }, 0)
  }

  const formatters = [
    { icon: <Bold size={18} />, action: () => insertFormatting("**"), tooltip: "Bold" },
    { icon: <Italic size={18} />, action: () => insertFormatting("*"), tooltip: "Italic" },
    { icon: <Heading1 size={18} />, action: () => insertFormatting("# "), tooltip: "Heading 1" },
    { icon: <Heading2 size={18} />, action: () => insertFormatting("## "), tooltip: "Heading 2" },
    { icon: <List size={18} />, action: () => insertFormatting("- "), tooltip: "Bullet List" },
    { icon: <ListOrdered size={18} />, action: () => insertFormatting("1. "), tooltip: "Numbered List" },
    { icon: <LinkIcon size={18} />, action: () => insertFormatting("[", "](url)"), tooltip: "Link" },
    { icon: <ImageIcon size={18} />, action: () => insertFormatting("![alt text](", ")"), tooltip: "Image" },
    { icon: <Code size={18} />, action: () => insertFormatting("```\n", "\n```"), tooltip: "Code Block" },
  ]

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-1 border rounded-md bg-gray-50">
        <TooltipProvider>
          {formatters.map((formatter, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={formatter.action} className="h-8 w-8 p-0">
                  {formatter.icon}
                  <span className="sr-only">{formatter.tooltip}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatter.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      <Textarea
        placeholder="Write your blog post here... You can use Markdown formatting."
        className="min-h-[300px] font-mono"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {content && (
        <div className="p-4 border rounded-md bg-white">
          <h3 className="text-sm font-medium mb-2">Preview:</h3>
          <div className="prose max-w-none">
            {/* This would be replaced with a proper Markdown renderer in a real app */}
            <pre className="whitespace-pre-wrap text-sm">{content}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
