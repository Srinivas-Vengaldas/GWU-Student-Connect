import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface UserAvatarProps {
  user: {
    id?: string
    name: string
    avatar?: string
  }
  showName?: boolean
  size?: "sm" | "md" | "lg"
  linkToProfile?: boolean
}

export function UserAvatar({ user, showName = false, size = "md", linkToProfile = true }: UserAvatarProps) {
  if (!user) {
    return null
  }

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  }

  const avatar = (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  )

  const content = (
    <>
      {avatar}
      {showName && <span className="ml-2 font-medium">{user.name}</span>}
    </>
  )

  if (linkToProfile && user.id) {
    return (
      <Link href={`/student/profile/${user.id}`} className="flex items-center hover:opacity-80">
        {content}
      </Link>
    )
  }

  return <div className="flex items-center">{content}</div>
}
