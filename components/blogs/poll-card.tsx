import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Share2, BarChart2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Author {
  name: string
  role: string
  avatar: string
  initials: string
}

interface PollOption {
  id: number
  text: string
  votes: number
}

interface Poll {
  id: number
  title: string
  options: PollOption[]
  totalVotes: number
  author: Author
  date: string
  deadline: string
  tags: string[]
  comments: number
}

interface PollCardProps {
  poll: Poll
}

export function PollCard({ poll }: PollCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={poll.author.avatar} alt={poll.author.name} />
              <AvatarFallback>{poll.author.initials}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/student/profile/${poll.author.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <div className="font-medium hover:underline cursor-pointer">{poll.author.name}</div>
              </Link>
              <div className="text-sm text-gray-500">
                {poll.author.role} • {poll.date} • Closes: {poll.deadline}
              </div>
            </div>
          </div>

          <div>
            <Link href={`/student/blogs/${poll.id}`}>
              <h3 className="text-xl font-bold text-[#0033A0] hover:underline">{poll.title}</h3>
            </Link>

            <div className="mt-4 space-y-4">
              <RadioGroup defaultValue="option-1">
                {poll.options.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={`option-${option.id}`} id={`option-${option.id}`} />
                      <Label htmlFor={`option-${option.id}`} className="flex-1">
                        {option.text}
                      </Label>
                      <span className="text-sm text-gray-500">
                        {Math.round((option.votes / poll.totalVotes) * 100)}%
                      </span>
                    </div>
                    <Progress value={(option.votes / poll.totalVotes) * 100} className="h-2" />
                  </div>
                ))}
              </RadioGroup>

              <div className="text-sm text-gray-500">
                {poll.totalVotes} votes • Poll closes on {poll.deadline}
              </div>

              <Button className="w-full bg-[#0033A0] hover:bg-[#002180]">Vote</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {poll.tags.map((tag) => (
              <Link href={`/student/blogs/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`} key={tag}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span>Results</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{poll.comments}</span>
            </Button>

            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
