"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { MainNav } from "@/components/main-nav"
import { MessageSidebar } from "@/components/messages/message-sidebar"
import { MessagePanel } from "@/components/messages/message-panel"
import { EmptyState } from "@/components/messages/empty-state"

export default function MessagesPage() {
  // Mock state for selected conversation
  const selectedConversation = null

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <main className="flex-1">
        <div className="container h-[calc(100vh-4rem)] py-6">
          <div className="grid h-full grid-cols-1 overflow-hidden rounded-lg border md:grid-cols-3">
            <MessageSidebar />
            {selectedConversation ? (
              <MessagePanel />
            ) : (
              <div className="col-span-2 flex items-center justify-center">
                <EmptyState
                  title="No conversation selected"
                  description="Select a conversation from the sidebar or start a new one."
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
