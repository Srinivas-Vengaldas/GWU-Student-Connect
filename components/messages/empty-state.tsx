import { Button } from "@/components/ui/button"
import { MessageSquare, Plus } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <MessageSquare className="h-10 w-10 text-gray-500" />
      </div>
      <h3 className="mt-6 text-xl font-semibold">Your Messages</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-md">
        Connect with your classmates, professors, and study groups. Select a conversation to start messaging.
      </p>
      <Button className="mt-6 gap-1 bg-[#0033A0] hover:bg-[#002180]">
        <Plus className="h-4 w-4" />
        <span>New Message</span>
      </Button>
    </div>
  )
}
