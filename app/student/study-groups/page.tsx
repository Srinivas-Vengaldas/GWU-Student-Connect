"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function StudyGroupsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <DashboardHeader role="student" />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Study Groups</h1>
            <Button asChild>
              <Link href="/student/study-groups/create">Create Study Group</Link>
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Groups</TabsTrigger>
              <TabsTrigger value="my-groups">My Groups</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Study Group Cards */}
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>Data Structures & Algorithms</CardTitle>
                      <CardDescription>CS 2201 - Spring 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                          Weekly study sessions focusing on algorithm analysis, problem-solving, and exam preparation.
                        </p>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">Algorithms</Badge>
                        <Badge variant="secondary">Data Structures</Badge>
                        <Badge variant="secondary">Problem Solving</Badge>
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((j) => (
                          <Avatar key={j} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${j}`} />
                            <AvatarFallback>U{j}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                          +3
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/student/study-groups/${i}`}>View Group</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="my-groups">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* My Study Group Cards */}
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>Advanced Machine Learning</CardTitle>
                      <CardDescription>CS 4267 - Spring 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                          Deep dive into neural networks, reinforcement learning, and practical ML applications.
                        </p>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">Machine Learning</Badge>
                        <Badge variant="secondary">AI</Badge>
                        <Badge variant="secondary">Neural Networks</Badge>
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((j) => (
                          <Avatar key={j} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${j}`} />
                            <AvatarFallback>U{j}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                          +2
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/student/study-groups/${i}`}>View Group</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recommended">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Recommended Study Group Cards */}
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>Web Development Workshop</CardTitle>
                      <CardDescription>CS 3312 - Spring 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                          Hands-on sessions for modern web development using React, Next.js, and related technologies.
                        </p>
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">Web Dev</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">JavaScript</Badge>
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <Avatar key={j} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${j}`} />
                            <AvatarFallback>U{j}</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                          +2
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/student/study-groups/${i}`}>Join Group</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
