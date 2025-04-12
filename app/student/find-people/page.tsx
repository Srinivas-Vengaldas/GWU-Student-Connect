import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function FindPeople() {
  const people = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Student",
      school: "College of Arts & Sciences",
      year: "Class of 2025",
      major: "Psychology",
      interests: ["Research", "Mental Health", "Neuroscience"],
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "AJ",
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      role: "Faculty",
      department: "Computer Science",
      research: "Artificial Intelligence",
      courses: ["CS 101", "CS 450"],
      interests: ["Machine Learning", "Neural Networks", "Data Science"],
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "SW",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Alumni",
      school: "School of Business",
      year: "Class of 2018",
      company: "TechStart",
      position: "Founder & CEO",
      interests: ["Entrepreneurship", "Startups", "Venture Capital"],
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "MC",
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "Student",
      school: "School of Engineering",
      year: "Class of 2024",
      major: "Mechanical Engineering",
      interests: ["Robotics", "Sustainable Energy", "3D Printing"],
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "ER",
    },
    {
      id: 5,
      name: "Prof. James Wilson",
      role: "Faculty",
      department: "Biology",
      research: "Genetics",
      courses: ["BIO 201", "BIO 350"],
      interests: ["Genomics", "Biotechnology", "CRISPR"],
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "JW",
    },
    {
      id: 6,
      name: "Lisa Thompson",
      role: "Alumni",
      school: "School of Medicine",
      year: "Class of 2015",
      company: "City Hospital",
      position: "Chief Resident",
      interests: ["Public Health", "Medical Education", "Global Health"],
      avatar: "/placeholder.svg?height=80&width=80",
      initials: "LT",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav role="student" />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <h2 className="text-3xl font-bold tracking-tight">Find People</h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search by name..." className="pl-8" />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="student">Students</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="School/Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Schools</SelectItem>
                        <SelectItem value="arts">College of Arts & Sciences</SelectItem>
                        <SelectItem value="business">School of Business</SelectItem>
                        <SelectItem value="engineering">School of Engineering</SelectItem>
                        <SelectItem value="medicine">School of Medicine</SelectItem>
                        <SelectItem value="law">School of Law</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Button className="w-full bg-[#0033A0] hover:bg-[#002180]">
                      <Filter className="mr-2 h-4 w-4" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {people.map((person) => (
                <Card key={person.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.initials}</AvatarFallback>
                      </Avatar>
                      <h3 className="mt-4 text-xl font-bold">{person.name}</h3>
                      <Badge className="mt-1">{person.role}</Badge>

                      <div className="mt-2 space-y-1 text-sm text-gray-500">
                        {person.school && <p>{person.school}</p>}
                        {person.department && <p>Department: {person.department}</p>}
                        {person.year && <p>{person.year}</p>}
                        {person.major && <p>Major: {person.major}</p>}
                        {person.company && <p>{person.company}</p>}
                        {person.position && <p>{person.position}</p>}
                      </div>

                      <div className="mt-3 flex flex-wrap justify-center gap-1">
                        {person.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Link href={`/student/profile/${person.id}`}>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </Link>
                        <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
