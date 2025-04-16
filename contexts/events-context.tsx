"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export type EventStatus = "going" | "maybe" | "not-going" | "active"

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  description?: string
  image?: string
  attendees: number
  isFeatured?: boolean
  status?: EventStatus
  organizer?: {
    name: string
    image: string
    department: string
    email: string
  }
}

interface EventsContextType {
  events: Event[]
  myEvents: Event[]
  addEvent: (event: Omit<Event, "id" | "attendees">) => void
  rsvpToEvent: (eventId: string, status: EventStatus) => void
  getEventById: (id: string) => Event | undefined
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

export function EventsProvider({ children }: { children: React.ReactNode }) {
  // Initial events data
  const initialEvents = [
    {
      id: "1",
      title: "Career Fair: Tech & Engineering",
      date: "May 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Marvin Center Grand Ballroom",
      category: "Career",
      attendees: 245,
      isFeatured: true,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Unknown.jpg-x8a2IU7yfeqkRpRgsQEP2jVxG5QvYv.png",
      description:
        "Join us for the annual Tech & Engineering Career Fair! Connect with over 50 employers from various industries looking to hire GW students and alumni for internships and full-time positions. Bring multiple copies of your resume and dress professionally.",
    },
    {
      id: "2",
      title: "Research Symposium: Undergraduate Projects",
      date: "May 20, 2024",
      time: "1:00 PM - 5:00 PM",
      location: "Science & Engineering Hall",
      category: "Academic",
      attendees: 120,
      isFeatured: true,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Unknown-2.jpg-8BvTA7mkcViHKr70OxiKeeqXgelAxC.png",
      description:
        "Showcase your research at the annual Undergraduate Research Symposium. This event provides an opportunity for undergraduate students to present their research projects to faculty, peers, and the GW community.",
    },
    {
      id: "3",
      title: "Alumni Networking Event",
      date: "June 5, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "University Hall",
      category: "Networking",
      attendees: 85,
      isFeatured: false,
      description:
        "Connect with GW alumni from various industries and build your professional network. Light refreshments will be served.",
    },
    {
      id: "4",
      title: "Workshop: Resume Building & Interview Skills",
      date: "May 18, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual (Zoom)",
      category: "Career",
      attendees: 62,
      isFeatured: false,
      description:
        "Learn how to create a standout resume and ace your interviews with tips from career services professionals.",
    },
    {
      id: "5",
      title: "Student Organization Fair",
      date: "May 25, 2024",
      time: "11:00 AM - 3:00 PM",
      location: "Kogan Plaza",
      category: "Clubs",
      attendees: 180,
      isFeatured: false,
      description: "Explore the diverse range of student organizations at GW and find the perfect club to join.",
    },
  ]

  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [myEvents, setMyEvents] = useState<Event[]>([])
  const router = useRouter()

  // Load events from localStorage on component mount
  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem("events")
      const storedMyEvents = localStorage.getItem("myEvents")

      if (storedEvents) {
        setEvents(JSON.parse(storedEvents))
      }

      if (storedMyEvents) {
        setMyEvents(JSON.parse(storedMyEvents))
      }
    } catch (error) {
      console.error("Error loading events from localStorage:", error)
    }
  }, [])

  // Save events to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("events", JSON.stringify(events))
    } catch (error) {
      console.error("Error saving events to localStorage:", error)
    }
  }, [events])

  // Save myEvents to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("myEvents", JSON.stringify(myEvents))
    } catch (error) {
      console.error("Error saving myEvents to localStorage:", error)
    }
  }, [myEvents])

  // Add a new event
  const addEvent = (event: Omit<Event, "id" | "attendees">) => {
    const newEvent: Event = {
      ...event,
      id: `${Date.now()}`, // Generate a unique ID
      attendees: 0, // Start with 0 attendees
      status: "active", // Set status to active for created events
    }

    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  // RSVP to an event
  const rsvpToEvent = (eventId: string, status: EventStatus) => {
    const event = events.find((e) => e.id === eventId)

    if (!event) {
      console.error(`Event with ID ${eventId} not found`)
      return
    }

    // Update attendees count if status is "going"
    if (status === "going") {
      setEvents((prevEvents) => prevEvents.map((e) => (e.id === eventId ? { ...e, attendees: e.attendees + 1 } : e)))
    }

    // Check if event is already in myEvents
    const existingEventIndex = myEvents.findIndex((e) => e.id === eventId)

    if (existingEventIndex >= 0) {
      // Update existing event status
      setMyEvents((prevMyEvents) => prevMyEvents.map((e, i) => (i === existingEventIndex ? { ...e, status } : e)))
    } else {
      // Add event to myEvents with the specified status
      const eventWithStatus = { ...event, status }
      setMyEvents((prevMyEvents) => [...prevMyEvents, eventWithStatus])
    }

    // Show success message
    alert(`You've successfully RSVP'd to "${event.title}" as "${status}"`)

    // Redirect to My Events page
    router.push("/student/events/my-events")
  }

  // Get event by ID
  const getEventById = (id: string) => {
    return events.find((event) => event.id === id)
  }

  return (
    <EventsContext.Provider
      value={{
        events,
        myEvents,
        addEvent,
        rsvpToEvent,
        getEventById,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (context === undefined) {
    throw new Error(
      "useEvents must be used within an EventsProvider. Make sure you have wrapped your component tree with EventsProvider.",
    )
  }
  return context
}
