"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

interface FacultyMessageTemplatesProps {
  onSelectTemplate: (template: string) => void
}

export function FacultyMessageTemplates({ onSelectTemplate }: FacultyMessageTemplatesProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock template data
  const templates = [
    {
      id: "1",
      category: "Office Hours",
      title: "Office Hours Reminder",
      content:
        "Just a reminder that my office hours are on Tuesdays and Thursdays from 2-4 PM in Room 302. Feel free to stop by if you have any questions about the course material.",
    },
    {
      id: "2",
      category: "Assignments",
      title: "Assignment Feedback",
      content:
        "I've reviewed your assignment and provided feedback. You did well on [specific aspects], but there's room for improvement in [specific areas]. Please let me know if you have any questions about my comments.",
    },
    {
      id: "3",
      category: "Exams",
      title: "Exam Preparation",
      content:
        "The upcoming exam will cover chapters 5-7. I recommend focusing on the key concepts we discussed in class and the practice problems from the textbook. Let me know if you need any clarification on specific topics.",
    },
    {
      id: "4",
      category: "Study Groups",
      title: "Study Group Session",
      content:
        "I've scheduled a study group session for this Friday at 3 PM in the library. We'll be reviewing the material for the upcoming exam. I hope you can join us!",
    },
    {
      id: "5",
      category: "Appointments",
      title: "Appointment Confirmation",
      contentt:
        "I'm confirming our appointment on [date] at [time]. Please come prepared with any specific questions or topics you'd like to discuss. Looking forward to our meeting!",
    },
    {
      id: "6",
      category: "Recommendations",
      title: "Recommendation Request Response",
      content:
        "I'd be happy to write a recommendation letter for you. Please send me your CV, the program details, and any specific achievements or qualities you'd like me to highlight. I'll need at least two weeks to complete it before your deadline.",
    },
    {
      id: "7",
      category: "General",
      title: "Thank You",
      content:
        "Thank you for your participation in today's class discussion. Your insights were valuable and contributed significantly to our exploration of the topic.",
    },
    {
      id: "8",
      category: "General",
      title: "Absence Follow-up",
      content:
        "I noticed you missed class today. The material we covered will be important for the upcoming assignment. Please review the slides I've posted and let me know if you have any questions.",
    },
  ]

  // Filter templates based on search query
  const filteredTemplates = templates.filter((template) => {
    return (
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Message Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Message Templates</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{template.title}</h4>
                    <span className="text-xs text-gray-500">{template.category}</span>
                  </div>
                  <Button size="sm" onClick={() => onSelectTemplate(template.content)}>
                    Use
                  </Button>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{template.content}</p>
              </div>
            ))}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-8 text-gray-500">No templates found matching your search</div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
