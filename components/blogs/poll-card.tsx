import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Share2 } from "lucide-react"

interface PollOption {
  id: string
  text: string
  votes: number
}

interface PollCardProps {
  id: string
  question: string
  options: PollOption[]
  totalVotes: number
  author: string
  authorRole: string
  date: string
  commentCount: number
}

export function PollCard({ id, question, options, totalVotes, author, authorRole, date, commentCount }: PollCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={author} />
            <AvatarFallback>
              {author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link href={`/student/profile/${author.toLowerCase().replace(/\s+/g, "-")}`}>
              <p className="text-sm font-medium hover:underline">{author}</p>
            </Link>
            <p className="text-xs text-gray-500">
              {authorRole} • {date}
            </p>
          </div>
        </div>

        <Link href={`/student/blogs/polls/${id}`}>
          <h3 className="text-lg font-semibold hover:text-[#0033A0] transition-colors mb-4">{question}</h3>
        </Link>

        <div className="space-y-3 mb-3">
          {options.map((option) => (
            <div key={option.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{option.text}</span>
                <span className="font-medium">{Math.round((option.votes / totalVotes) * 100)}%</span>
              </div>
              <Progress value={(option.votes / totalVotes) * 100} className="h-2" />
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-4">{totalVotes} votes • Poll ends in 3 days</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center border-t">
        <div className="flex space-x-4">
          <Button variant="outline" size="sm" className="text-[#0033A0] border-[#0033A0]">
            Vote
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#0033A0]">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{commentCount}</span>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#0033A0]">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
