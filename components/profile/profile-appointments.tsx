"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface ProfileAppointmentsProps {
  student: any
}

export function ProfileAppointments({ student }: ProfileAppointmentsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-[#0033A0]" />
          Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-12 text-center text-gray-500">
          <Calendar className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2">No appointments scheduled yet</p>
        </div>
      </CardContent>
    </Card>
  )
}
