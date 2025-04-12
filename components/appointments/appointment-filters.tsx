"use client"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function AppointmentFilters() {
  const [roleFilters, setRoleFilters] = useState({
    faculty: true,
    alumni: true,
  })

  const [departmentFilters, setDepartmentFilters] = useState({
    computerScience: true,
    business: true,
    psychology: true,
    engineering: true,
    internationalAffairs: true,
  })

  const [availabilityFilters, setAvailabilityFilters] = useState({
    inPerson: true,
    virtual: true,
    weekdays: true,
    weekends: true,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Role</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={roleFilters.faculty}
          onCheckedChange={(checked) => setRoleFilters({ ...roleFilters, faculty: checked })}
        >
          Faculty
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={roleFilters.alumni}
          onCheckedChange={(checked) => setRoleFilters({ ...roleFilters, alumni: checked })}
        >
          Alumni
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Department</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={departmentFilters.computerScience}
          onCheckedChange={(checked) => setDepartmentFilters({ ...departmentFilters, computerScience: checked })}
        >
          Computer Science
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={departmentFilters.business}
          onCheckedChange={(checked) => setDepartmentFilters({ ...departmentFilters, business: checked })}
        >
          Business
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={departmentFilters.psychology}
          onCheckedChange={(checked) => setDepartmentFilters({ ...departmentFilters, psychology: checked })}
        >
          Psychology
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={departmentFilters.engineering}
          onCheckedChange={(checked) => setDepartmentFilters({ ...departmentFilters, engineering: checked })}
        >
          Engineering
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={departmentFilters.internationalAffairs}
          onCheckedChange={(checked) => setDepartmentFilters({ ...departmentFilters, internationalAffairs: checked })}
        >
          International Affairs
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Availability</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={availabilityFilters.inPerson}
          onCheckedChange={(checked) => setAvailabilityFilters({ ...availabilityFilters, inPerson: checked })}
        >
          In-Person
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={availabilityFilters.virtual}
          onCheckedChange={(checked) => setAvailabilityFilters({ ...availabilityFilters, virtual: checked })}
        >
          Virtual
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={availabilityFilters.weekdays}
          onCheckedChange={(checked) => setAvailabilityFilters({ ...availabilityFilters, weekdays: checked })}
        >
          Weekdays
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={availabilityFilters.weekends}
          onCheckedChange={(checked) => setAvailabilityFilters({ ...availabilityFilters, weekends: checked })}
        >
          Weekends
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
