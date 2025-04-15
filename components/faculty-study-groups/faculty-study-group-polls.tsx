"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { BarChart2, Calendar, ChevronRight, Clock, Edit, Plus, Trash, Users } from "lucide-react"
import Link from "next/link"

interface FacultyStudyGroupPollsProps {
  groupId: string
  limit?: number
  showViewAll?: boolean
}

export function FacultyStudyGroupPolls({ groupId, limit = 5, showViewAll = false }: FacultyStudyGroupPollsProps) {
  const [polls, setPolls] = useState([
    {
      id: "1",
      question: "What topic should we focus on in our next study session?",
      options: [
        { id: "1a", text: "Red-Black Trees", votes: 12 },
        { id: "1b", text: "Dynamic Programming", votes: 8 },
        { id: "1c", text: "Graph Algorithms", votes: 15 },
        { id: "1d", text: "Sorting Algorithms", votes: 5 },
      ],
      totalVotes: 40,
      status: "active",
      createdBy: "Dr. Sarah Williams",
      createdAt: "2 days ago",
      endsAt: "in 3 days",
      userVoted: "1c",
    },
    {
      id: "2",
      question: "When would you prefer to have the midterm review session?",
      options: [
        { id: "2a", text: "Friday afternoon", votes: 18 },
        { id: "2b", text: "Saturday morning", votes: 22 },
        { id: "2c", text: "Sunday evening", votes: 10 },
      ],
      totalVotes: 50,
      status: "active",
      createdBy: "Dr. Sarah Williams",
      createdAt: "1 week ago",
      endsAt: "in 1 day",
      userVoted: "2b",
    },
    {
      id: "3",
      question: "Which project topic are you most interested in?",
      options: [
        { id: "3a", text: "Machine Learning Application", votes: 25 },
        { id: "3b", text: "Database System", votes: 15 },
        { id: "3c", text: "Web Application", votes: 20 },
        { id: "3d", text: "Mobile App", votes: 18 },
      ],
      totalVotes: 78,
      status: "closed",
      createdBy: "Michael Chen",
      createdAt: "2 weeks ago",
      endsAt: "ended 3 days ago",
      userVoted: "3a",
    },
  ])

  // Limit the number of polls if specified
  const displayedPolls = limit ? polls.slice(0, limit) : polls

  const handleVote = (pollId: string, optionId: string) => {
    setPolls((currentPolls) =>
      currentPolls.map((poll) => {
        if (poll.id === pollId) {
          // If user already voted, remove their vote from the previous option
          if (poll.userVoted) {
            poll.options = poll.options.map((option) => {
              if (option.id === poll.userVoted) {
                return { ...option, votes: option.votes - 1 }
              }
              return option
            })
          }

          // Add vote to the new option
          const updatedOptions = poll.options.map((option) => {
            if (option.id === optionId) {
              return { ...option, votes: option.votes + 1 }
            }
            return option
          })

          return {
            ...poll,
            options: updatedOptions,
            userVoted: optionId,
            totalVotes: poll.userVoted ? poll.totalVotes : poll.totalVotes + 1,
          }
        }
        return poll
      }),
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Polls</CardTitle>
          <CardDescription>Gather feedback and make decisions as a group</CardDescription>
        </div>
        <Button className="bg-[#0033A0] hover:bg-[#002180]">
          <Plus className="mr-2 h-4 w-4" />
          Create Poll
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {displayedPolls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <BarChart2 className="h-12 w-12 text-gray-300 mb-2" />
            <h3 className="text-lg font-medium">No polls yet</h3>
            <p className="text-sm text-gray-500 mt-1">Create a poll to gather feedback from the group</p>
          </div>
        ) : (
          displayedPolls.map((poll) => (
            <div key={poll.id} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{poll.question}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{poll.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{poll.endsAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{poll.totalVotes} votes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {poll.status === "active" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        Closed
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mt-3">
                  {poll.options.map((option) => {
                    const percentage = Math.round((option.votes / poll.totalVotes) * 100) || 0
                    const isSelected = poll.userVoted === option.id

                    return (
                      <div key={option.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{option.text}</span>
                            {isSelected && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                Your vote
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {option.votes} ({percentage}%)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={percentage}
                            className={`h-2 ${isSelected ? "bg-blue-100" : "bg-gray-100"}`}
                            indicatorClassName={isSelected ? "bg-blue-500" : "bg-gray-400"}
                          />
                          {poll.status === "active" && !poll.userVoted && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs"
                              onClick={() => handleVote(poll.id, option.id)}
                            >
                              Vote
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <Separator />
            </div>
          ))
        )}
      </CardContent>
      {showViewAll && polls.length > limit && (
        <CardFooter>
          <Link href={`/faculty/study-groups/${groupId}/polls`} className="w-full">
            <Button variant="outline" className="w-full">
              View All Polls
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
