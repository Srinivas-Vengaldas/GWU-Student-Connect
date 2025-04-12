"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Edit, MoreHorizontal, Plus, Trash, Users } from "lucide-react"

interface StudyGroupPollsProps {
  groupId: string
}

export function StudyGroupPolls({ groupId }: StudyGroupPollsProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newPollQuestion, setNewPollQuestion] = useState("")
  const [newPollOptions, setNewPollOptions] = useState(["", ""])
  const [votes, setVotes] = useState<Record<string, string>>({})

  // Mock polls data
  const polls = [
    {
      id: "1",
      question: "When should we schedule our next study session?",
      options: [
        { id: "1a", text: "Thursday, 4-6 PM", votes: 5 },
        { id: "1b", text: "Friday, 3-5 PM", votes: 3 },
        { id: "1c", text: "Saturday, 1-3 PM", votes: 7 },
      ],
      totalVotes: 15,
      creator: {
        id: "1",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: "2 days ago",
      isActive: true,
    },
    {
      id: "2",
      question: "Which topic should we focus on in our next session?",
      options: [
        { id: "2a", text: "Integration techniques", votes: 8 },
        { id: "2b", text: "Sequences and series", votes: 6 },
        { id: "2c", text: "Differential equations", votes: 2 },
      ],
      totalVotes: 16,
      creator: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: "1 week ago",
      isActive: true,
    },
    {
      id: "3",
      question: "How helpful was our last study session?",
      options: [
        { id: "3a", text: "Very helpful", votes: 10 },
        { id: "3b", text: "Somewhat helpful", votes: 3 },
        { id: "3c", text: "Not very helpful", votes: 0 },
      ],
      totalVotes: 13,
      creator: {
        id: "1",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: "2 weeks ago",
      isActive: false,
    },
  ]

  const handleAddOption = () => {
    setNewPollOptions([...newPollOptions, ""])
  }

  const handleRemoveOption = (index: number) => {
    if (newPollOptions.length > 2) {
      const updatedOptions = [...newPollOptions]
      updatedOptions.splice(index, 1)
      setNewPollOptions(updatedOptions)
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newPollOptions]
    updatedOptions[index] = value
    setNewPollOptions(updatedOptions)
  }

  const handleCreatePoll = () => {
    // In a real app, you'd call an API to create a poll
    console.log("Creating poll:", {
      question: newPollQuestion,
      options: newPollOptions.filter((option) => option.trim()),
    })
    setNewPollQuestion("")
    setNewPollOptions(["", ""])
    setShowCreateDialog(false)
  }

  const handleVote = (pollId: string, optionId: string) => {
    // In a real app, you'd call an API to record the vote
    setVotes({
      ...votes,
      [pollId]: optionId,
    })
  }

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Polls & Feedback</CardTitle>
            <CardDescription>Gather opinions and make group decisions</CardDescription>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 bg-[#0033A0] hover:bg-[#002180]">
                <Plus className="h-4 w-4" />
                <span>Create Poll</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Poll</DialogTitle>
                <DialogDescription>Create a poll to gather feedback or make group decisions.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter your poll question"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Options</Label>
                  {newPollOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                      />
                      {newPollOptions.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleAddOption}>
                    Add Option
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePoll}
                  className="bg-[#0033A0] hover:bg-[#002180]"
                  disabled={!newPollQuestion.trim() || newPollOptions.filter((o) => o.trim()).length < 2}
                >
                  Create Poll
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {polls.map((poll) => (
              <div key={poll.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-[#0033A0]">{poll.question}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={poll.creator.avatar} alt={poll.creator.name} />
                          <AvatarFallback>{poll.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{poll.creator.name}</span>
                      </div>
                      <span>•</span>
                      <span>{poll.createdAt}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{poll.totalVotes} votes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!poll.isActive && (
                      <Badge variant="outline" className="text-xs">
                        Closed
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Results
                        </DropdownMenuItem>
                        {poll.creator.id === "1" && (
                          <>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Poll
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Poll
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  {votes[poll.id] || !poll.isActive ? (
                    // Results view
                    <div className="space-y-3">
                      {poll.options.map((option) => (
                        <div key={option.id} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>{option.text}</span>
                            <span className="font-medium">{getPercentage(option.votes, poll.totalVotes)}%</span>
                          </div>
                          <Progress value={getPercentage(option.votes, poll.totalVotes)} className="h-2" />
                          <div className="text-xs text-gray-500">{option.votes} votes</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Voting view
                    <RadioGroup value={votes[poll.id]} onValueChange={(value) => handleVote(poll.id, value)}>
                      {poll.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                            {option.text}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>

                {poll.isActive && !votes[poll.id] && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      className="bg-[#0033A0] hover:bg-[#002180]"
                      onClick={() => handleVote(poll.id, poll.options[0].id)}
                    >
                      Submit Vote
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {polls.length === 0 && (
              <div className="text-center py-4 text-gray-500">No polls have been created yet.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
