"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  UserPlus,
  UserMinus,
  MessageSquare,
  Calendar,
  User,
  BookOpen,
  Briefcase,
  GraduationCap,
  Clock,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { AppointmentBookingDialog } from "@/components/appointments/appointment-booking-dialog"

// Mock data for the directory
const mockUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "ajohnson",
    role: "Student",
    gwid: "G12345678",
    school: "College of Arts & Sciences",
    year: "Class of 2025",
    major: "Psychology",
    courses: ["PSYC 1001", "PSYC 2011", "STAT 1051"],
    interests: ["Research", "Mental Health", "Neuroscience"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "AJ",
    online: true,
    availability: ["Monday 2-4 PM", "Wednesday 1-3 PM"],
  },
  {
    id: "2",
    name: "Dr. Sarah Williams",
    username: "swilliams",
    role: "Faculty",
    gwid: "G87654321",
    department: "Computer Science",
    research: "Artificial Intelligence",
    courses: ["CS 1011", "CS 2461"],
    expertise: ["Machine Learning", "Neural Networks", "Data Science"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "SW",
    online: false,
    availability: ["Tuesday 10 AM-12 PM", "Thursday 3-5 PM"],
  },
  {
    id: "3",
    name: "Michael Chen",
    username: "mchen",
    role: "Alumni",
    gwid: "G23456789",
    school: "School of Business",
    year: "Class of 2018",
    company: "TechStart",
    position: "Founder & CEO",
    interests: ["Entrepreneurship", "Startups", "Venture Capital"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "MC",
    online: true,
    availability: ["Friday 5-7 PM"],
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    username: "erodriguez",
    role: "Student",
    gwid: "G34567890",
    school: "School of Engineering",
    year: "Class of 2024",
    major: "Mechanical Engineering",
    courses: ["EMSE 2705", "MAE 2131", "MAE 3126"],
    interests: ["Robotics", "Sustainable Energy", "3D Printing"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "ER",
    online: true,
    availability: [],
  },
  {
    id: "5",
    name: "Prof. James Wilson",
    username: "jwilson",
    role: "Faculty",
    gwid: "G45678901",
    department: "Biology",
    research: "Genetics",
    courses: ["BISC 1111", "BISC 2207"],
    expertise: ["Genomics", "Biotechnology", "CRISPR"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "JW",
    online: false,
    availability: ["Monday 10 AM-12 PM", "Friday 1-3 PM"],
  },
  {
    id: "6",
    name: "Lisa Thompson",
    username: "lthompson",
    role: "Alumni",
    gwid: "G56789012",
    school: "School of Medicine",
    year: "Class of 2015",
    company: "City Hospital",
    position: "Chief Resident",
    interests: ["Public Health", "Medical Education", "Global Health"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "LT",
    online: false,
    availability: ["Wednesday 7-9 PM"],
  },
  {
    id: "7",
    name: "David Park",
    username: "dpark",
    role: "Student",
    gwid: "G67890123",
    school: "Elliott School of International Affairs",
    year: "Class of 2023",
    major: "International Relations",
    courses: ["IAFF 1005", "IAFF 2190", "HIST 3044"],
    interests: ["Foreign Policy", "Diplomacy", "International Development"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "DP",
    online: true,
    availability: ["Tuesday 4-6 PM"],
  },
  {
    id: "8",
    name: "Dr. Rebecca Lee",
    username: "rlee",
    role: "Faculty",
    gwid: "G78901234",
    department: "Psychology",
    research: "Cognitive Development",
    courses: ["PSYC 2011", "PSYC 3118"],
    expertise: ["Child Development", "Educational Psychology", "Cognitive Science"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "RL",
    online: true,
    availability: ["Thursday 1-3 PM", "Friday 10 AM-12 PM"],
  },
  {
    id: "9",
    name: "Thomas Garcia",
    username: "tgarcia",
    role: "Alumni",
    gwid: "G89012345",
    school: "Law School",
    year: "Class of 2017",
    company: "Garcia & Associates",
    position: "Partner",
    interests: ["Corporate Law", "Intellectual Property", "Legal Education"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "TG",
    online: false,
    availability: ["Monday 6-8 PM"],
  },
  {
    id: "10",
    name: "Sophia Kim",
    username: "skim",
    role: "Student",
    gwid: "G90123456",
    school: "Milken Institute School of Public Health",
    year: "Class of 2024",
    major: "Public Health",
    courses: ["PUBH 1101", "PUBH 2110", "PUBH 3151"],
    interests: ["Epidemiology", "Global Health", "Health Policy"],
    avatar: "/placeholder.svg?height=80&width=80",
    initials: "SK",
    online: true,
    availability: ["Wednesday 3-5 PM", "Thursday 4-6 PM"],
  },
]

// Mock data for courses
const mockCourses = [
  "PSYC 1001 - Intro to Psychology",
  "PSYC 2011 - Abnormal Psychology",
  "STAT 1051 - Statistics for Social Sciences",
  "CS 1011 - Intro to Computer Science",
  "CS 2461 - Computer Architecture",
  "EMSE 2705 - Engineering Economics",
  "MAE 2131 - Thermodynamics",
  "MAE 3126 - Fluid Mechanics",
  "BISC 1111 - Intro to Biology",
  "BISC 2207 - Genetics",
  "IAFF 1005 - Intro to International Affairs",
  "IAFF 2190 - Global Problems",
  "HIST 3044 - Modern European History",
  "PUBH 1101 - Intro to Public Health",
  "PUBH 2110 - Public Health Biology",
  "PUBH 3151 - Epidemiology",
]

// Mock data for schools
const mockSchools = [
  "College of Arts & Sciences",
  "School of Engineering & Applied Science",
  "School of Business",
  "School of Medicine & Health Sciences",
  "Law School",
  "Elliott School of International Affairs",
  "Milken Institute School of Public Health",
  "Graduate School of Education & Human Development",
]

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [selectedPerson, setSelectedPerson] = useState<any>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [followedUsers, setFollowedUsers] = useState<string[]>([])

  // Filter states
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [onlineOnly, setOnlineOnly] = useState(false)
  const [availableOnly, setAvailableOnly] = useState(false)

  // Apply filters and search
  useEffect(() => {
    let results = mockUsers

    // Filter by role tab
    if (activeTab !== "all") {
      results = results.filter((user) => user.role.toLowerCase() === activeTab.toLowerCase())
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query) ||
          user.gwid.toLowerCase().includes(query) ||
          (user.courses && user.courses.some((course) => course.toLowerCase().includes(query))) ||
          (user.school && user.school.toLowerCase().includes(query)) ||
          (user.department && user.department.toLowerCase().includes(query)),
      )
    }

    // Filter by school
    if (selectedSchool) {
      results = results.filter(
        (user) =>
          (user.school && user.school === selectedSchool) || (user.department && user.department === selectedSchool),
      )
    }

    // Filter by course
    if (selectedCourse) {
      results = results.filter(
        (user) => user.courses && user.courses.some((course) => course === selectedCourse.split(" - ")[0]),
      )
    }

    // Filter by online status
    if (onlineOnly) {
      results = results.filter((user) => user.online)
    }

    // Filter by availability
    if (availableOnly) {
      results = results.filter((user) => user.availability && user.availability.length > 0)
    }

    setFilteredUsers(results)
  }, [searchQuery, activeTab, selectedSchool, selectedCourse, onlineOnly, availableOnly])

  const handleBookAppointment = (person: any) => {
    setSelectedPerson(person)
    setBookingDialogOpen(true)
  }

  const handleToggleFollow = (userId: string) => {
    setFollowedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const isFollowing = (userId: string) => followedUsers.includes(userId)

  // Get suggested connections based on shared courses, schools, etc.
  const getSuggestedConnections = () => {
    // In a real app, this would be based on the current user's profile
    // For demo purposes, we'll just return a subset of users
    return mockUsers.slice(0, 3)
  }

  // Get newly joined users
  const getNewlyJoinedUsers = () => {
    // In a real app, this would be based on join date
    // For demo purposes, we'll just return a subset of users
    return mockUsers.slice(7, 10)
  }

  return (
    <PageLayout role="student">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Directory</h2>
          <p className="text-muted-foreground">Search and connect with students, faculty, and alumni across GW.</p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search by name, GWID, course, school..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="student">Students</TabsTrigger>
                    <TabsTrigger value="faculty">Faculty</TabsTrigger>
                    <TabsTrigger value="alumni">Alumni</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4">
          {/* Filters Sidebar */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  Reset
                </Button>
              </div>

              <Accordion type="multiple" defaultValue={["school", "course", "status"]}>
                <AccordionItem value="school">
                  <AccordionTrigger>School/Department</AccordionTrigger>
                  <AccordionContent>
                    <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select school" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Schools</SelectItem>
                        {mockSchools.map((school) => (
                          <SelectItem key={school} value={school}>
                            {school}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="course">
                  <AccordionTrigger>Course</AccordionTrigger>
                  <AccordionContent>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {mockCourses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="status">
                  <AccordionTrigger>Status</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id="online"
                        checked={onlineOnly}
                        onCheckedChange={(checked) => setOnlineOnly(checked === true)}
                      />
                      <label
                        htmlFor="online"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Online now
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="available"
                        checked={availableOnly}
                        onCheckedChange={(checked) => setAvailableOnly(checked === true)}
                      />
                      <label
                        htmlFor="available"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Available for appointments
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Search Results */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                {filteredUsers.length} {filteredUsers.length === 1 ? "Result" : "Results"}
              </h3>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Sort by: Relevance</SelectItem>
                  <SelectItem value="name-asc">Sort by: Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Sort by: Name (Z-A)</SelectItem>
                  <SelectItem value="recent">Sort by: Recently Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredUsers.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center justify-center py-8">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No results found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col items-center md:items-start">
                          <div className="relative">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.initials}</AvatarFallback>
                            </Avatar>
                            {user.online && (
                              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
                            )}
                          </div>
                          <div className="mt-2 flex flex-col items-center md:items-start">
                            <Badge
                              variant={
                                user.role === "Student" ? "default" : user.role === "Faculty" ? "secondary" : "outline"
                              }
                            >
                              {user.role}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex-1 space-y-2 text-center md:text-left">
                          <div>
                            <h3 className="text-xl font-bold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              @{user.username} • GWID: {user.gwid.substring(0, 4)}****
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="space-y-1">
                              {user.role === "Student" && (
                                <>
                                  <p className="text-sm flex items-center">
                                    <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {user.school}
                                  </p>
                                  <p className="text-sm flex items-center">
                                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {user.major} • {user.year}
                                  </p>
                                </>
                              )}
                              {user.role === "Faculty" && (
                                <>
                                  <p className="text-sm flex items-center">
                                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {user.department}
                                  </p>
                                  <p className="text-sm flex items-center">
                                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                                    Teaches: {user.courses?.join(", ")}
                                  </p>
                                </>
                              )}
                              {user.role === "Alumni" && (
                                <>
                                  <p className="text-sm flex items-center">
                                    <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {user.school} • {user.year}
                                  </p>
                                  <p className="text-sm flex items-center">
                                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                                    {user.position} at {user.company}
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="space-y-1">
                              {user.availability && user.availability.length > 0 && (
                                <p className="text-sm flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  Available: {user.availability.join(", ")}
                                </p>
                              )}
                              {user.interests && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {user.interests.slice(0, 3).map((interest, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {interest}
                                    </Badge>
                                  ))}
                                  {user.interests.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{user.interests.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                              {user.expertise && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {user.expertise.slice(0, 3).map((expertise, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {expertise}
                                    </Badge>
                                  ))}
                                  {user.expertise.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{user.expertise.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col justify-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/student/profile/${user.id}`}>
                              <User className="h-4 w-4 mr-2" />
                              Profile
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/student/messages?user=${user.id}`}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Link>
                          </Button>
                          {user.availability && user.availability.length > 0 && (
                            <Button variant="outline" size="sm" onClick={() => handleBookAppointment(user)}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Book
                            </Button>
                          )}
                          <Button
                            variant={isFollowing(user.id) ? "destructive" : "default"}
                            size="sm"
                            onClick={() => handleToggleFollow(user.id)}
                            className={!isFollowing(user.id) ? "bg-[#0033A0] hover:bg-[#002180]" : ""}
                          >
                            {isFollowing(user.id) ? (
                              <>
                                <UserMinus className="h-4 w-4 mr-2" />
                                Unfollow
                              </>
                            ) : (
                              <>
                                <UserPlus className="h-4 w-4 mr-2" />
                                Follow
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Smart Suggestions */}
        <div className="space-y-4 mt-8">
          <Separator />
          <h3 className="text-xl font-bold">Suggested Connections</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getSuggestedConnections().map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.role === "Student"
                          ? user.major
                          : user.role === "Faculty"
                            ? user.department
                            : user.position}
                      </p>
                    </div>
                    <Button
                      variant={isFollowing(user.id) ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleToggleFollow(user.id)}
                      className={!isFollowing(user.id) ? "bg-[#0033A0] hover:bg-[#002180]" : ""}
                    >
                      {isFollowing(user.id) ? "Unfollow" : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-xl font-bold">Newly Joined</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getNewlyJoinedUsers().map((user) => (
              <Card key={user.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.role === "Student"
                          ? user.major
                          : user.role === "Faculty"
                            ? user.department
                            : user.position}
                      </p>
                    </div>
                    <Button
                      variant={isFollowing(user.id) ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleToggleFollow(user.id)}
                      className={!isFollowing(user.id) ? "bg-[#0033A0] hover:bg-[#002180]" : ""}
                    >
                      {isFollowing(user.id) ? "Unfollow" : "Follow"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <AppointmentBookingDialog person={selectedPerson} open={bookingDialogOpen} onOpenChange={setBookingDialogOpen} />
    </PageLayout>
  )
}
