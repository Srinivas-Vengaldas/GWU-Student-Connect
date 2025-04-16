"use client"

import type React from "react"

import { EventsProvider } from "@/contexts/events-context"

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <EventsProvider>{children}</EventsProvider>
}
