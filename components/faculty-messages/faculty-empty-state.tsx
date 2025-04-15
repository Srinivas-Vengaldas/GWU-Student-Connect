import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function FacultyEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <MessageSquare className="h-10 w-10 text-[#0033A0]" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold">Your Messages</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-md">
        Select a conversation to view messages or start a new conversation with your students, colleagues, or study
        groups.
      </p>
      <div className="mt-6 flex gap-4">
        <Button>New Message</Button>
        <Button variant="outline">Create Group</Button>
      </div>
      <div className="mt-8 rounded-lg border p-4 bg-blue-50 max-w-md">
        <h4 className="font-medium">Faculty Messaging Tips</h4>
        <ul className="mt-2 text-sm text-gray-600 text-left list-disc pl-5 space-y-1">
          <li>Use message templates for common responses</li>
          <li>Schedule appointments directly from chat</li>
          <li>Share study materials with individuals or groups</li>
          <li>Pin important messages for quick reference</li>
          <li>Star important conversations to find them easily</li>
        </ul>
      </div>
    </div>
  )
}
