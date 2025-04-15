"use client"

import { useState, useCallback } from "react"
import { MessageSidebar } from "@/components/messages/message-sidebar"
import { MessagePanel } from "@/components/messages/message-panel"
import { MessageComposer } from "@/components/messages/message-composer"
import { MessageHeader } from "@/components/messages/message-header"
import { EmptyState } from "@/components/messages/empty-state"
import { AppHeader } from "@/components/app-header"
import { Footer } from "@/components/footer"
import { DashboardNav } from "@/components/dashboard-nav"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [addMessageToConversation, setAddMessageToConversation] = useState<((content: string) => void) | null>(null)

  // On mobile, when a conversation is selected, hide the sidebar
  const handleConversationSelect = (id: string) => {
    setSelectedConversation(id)
    if (isMobile) {
      setShowSidebar(false)
    }
  }

  // On mobile, allow going back to the conversation list
  const handleBackToList = () => {
    setShowSidebar(true)
    if (isMobile) {
      setSelectedConversation(null)
    }
  }

  // Function to handle sending a new message
  const handleSendMessage = (message: string) => {
    if (selectedConversation && addMessageToConversation) {
      addMessageToConversation(message)
    }
  }

  // Callback to receive the addMessage function from MessagePanel
  const handleMessagesInit = useCallback((addMessage: (content: string) => void) => {
    setAddMessageToConversation(() => addMessage)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader role="student" />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="student" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 rounded-lg border shadow-sm overflow-hidden">
            <div className="flex h-[calc(100vh-12rem)] md:h-[600px] flex-col md:flex-row">
              {/* Conversation List Sidebar */}
              {(showSidebar || !isMobile) && (
                <MessageSidebar
                  activeConversationId={selectedConversation}
                  onSelectConversation={handleConversationSelect}
                  className={isMobile ? "w-full" : "w-80 border-r"}
                />
              )}

              {/* Message Panel */}
              {(!showSidebar || !isMobile) && (
                <div className="flex flex-1 flex-col">
                  {selectedConversation ? (
                    <>
                      <MessageHeader
                        conversationId={selectedConversation}
                        onBack={handleBackToList}
                        showBackButton={isMobile}
                      />
                      <MessagePanel conversationId={selectedConversation} onMessagesInit={handleMessagesInit} />
                      <MessageComposer conversationId={selectedConversation} onSendMessage={handleSendMessage} />
                    </>
                  ) : (
                    <EmptyState />
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
