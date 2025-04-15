"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { FacultyMessageSidebar } from "@/components/faculty-messages/faculty-message-sidebar"
import { FacultyMessagePanel } from "@/components/faculty-messages/faculty-message-panel"
import { FacultyEmptyState } from "@/components/faculty-messages/faculty-empty-state"
import { FacultyMessageComposer } from "@/components/faculty-messages/faculty-message-composer"
import { FacultyMessageHeader } from "@/components/faculty-messages/faculty-message-header"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function FacultyMessagesPage() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // On mobile, when a conversation is selected, hide the sidebar
  const handleConversationSelect = (id: string) => {
    setActiveConversation(id)
    if (isMobile) {
      setShowSidebar(false)
    }
  }

  // On mobile, allow going back to the conversation list
  const handleBackToList = () => {
    setShowSidebar(true)
    if (isMobile) {
      setActiveConversation(null)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="faculty" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="faculty" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 rounded-lg border shadow-sm overflow-hidden">
            <div className="flex h-[calc(100vh-12rem)] md:h-[600px] flex-col md:flex-row">
              {/* Conversation List Sidebar */}
              {(showSidebar || !isMobile) && (
                <FacultyMessageSidebar
                  activeConversationId={activeConversation}
                  onSelectConversation={handleConversationSelect}
                  className={isMobile ? "w-full" : "w-80 border-r"}
                />
              )}

              {/* Message Panel */}
              {(!showSidebar || !isMobile) && (
                <div className="flex flex-1 flex-col">
                  {activeConversation ? (
                    <>
                      <FacultyMessageHeader
                        conversationId={activeConversation}
                        onBack={handleBackToList}
                        showBackButton={isMobile}
                      />
                      <FacultyMessagePanel conversationId={activeConversation} />
                      <FacultyMessageComposer conversationId={activeConversation} />
                    </>
                  ) : (
                    <FacultyEmptyState />
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
