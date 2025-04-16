"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  BellOff,
  Calendar,
  Flag,
  Globe,
  Lock,
  MoreHorizontal,
  Share2,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react"

interface StudyGroupHeaderProps {
  group: any
  onJoin?: () => void
  onLeave?: () => void
  onFollowCreator?: () => void
  onUnfollowCreator?: () => void
  isFollowingCreator?: boolean
}

export function StudyGroupHeader({
  group,
  onJoin,
  onLeave,
  onFollowCreator,
  onUnfollowCreator,
  isFollowingCreator = false,
}: StudyGroupHeaderProps) {
  const [isJoined, setIsJoined] = useState(group.isMember)
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true)
  const [showLeaveDialog, setShowLeaveDialog] = useState(false)
  const [showCreatorProfile, setShowCreatorProfile] = useState(false)

  const handleJoinGroup = () => {
    // In a real app, you'd call an API to join the group
    setIsJoined(true)
    if (onJoin) onJoin()
  }

  const handleLeaveGroup = () => {
    // In a real app, you'd call an API to leave the group
    setIsJoined(false)
    setShowLeaveDialog(false)
    if (onLeave) onLeave()
  }

  const toggleNotifications = () => {
    // In a real app, you'd call an API to toggle notifications
    setIsNotificationsEnabled(!isNotificationsEnabled)
  }

  const handleFollowCreator = () => {
    if (onFollowCreator) onFollowCreator()
  }

  const handleUnfollowCreator = () => {
    if (onUnfollowCreator) onUnfollowCreator()
  }

  return (
    <>
      <div className="rounded-lg border overflow-hidden">
        <div className="relative h-40 w-full bg-gray-100">
          {group.banner && (
            <Image src={group.banner || "/placeholder.svg"} alt={group.name} fill className="object-cover" />
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{group.name}</h1>
                {group.visibility === "public" && <Globe className="h-4 w-4 text-green-500" title="Public Group" />}
                {group.visibility === "private" && <Lock className="h-4 w-4 text-amber-500" title="Private Group" />}
                {group.visibility === "invite-only" && (
                  <UserPlus className="h-4 w-4 text-blue-500" title="Invite Only" />
                )}
              </div>
              <p className="text-gray-500">
                {group.course} • {group.subject}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isJoined ? (
                <>
                  <Button variant="outline" size="sm" className="gap-1" onClick={toggleNotifications}>
                    {isNotificationsEnabled ? (
                      <>
                        <BellOff className="h-4 w-4" />
                        <span>Mute</span>
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4" />
                        <span>Unmute</span>
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600 hover:text-red-600 hover:bg-red-50"
                    onClick={() => setShowLeaveDialog(true)}
                  >
                    <UserMinus className="h-4 w-4" />
                    <span>Leave</span>
                  </Button>
                </>
              ) : (
                <Button className="gap-1 bg-[#0033A0] hover:bg-[#002180]" onClick={handleJoinGroup}>
                  <UserPlus className="h-4 w-4" />
                  <span>Join Group</span>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share Group</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Add to Calendar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 text-red-600">
                    <Flag className="h-4 w-4" />
                    <span>Report Group</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="mt-4 text-gray-700">{group.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {group.tags &&
              group.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">{group.members} members</span>
              </div>
              <div className="flex -space-x-2">
                {group.admins &&
                  group.admins.map((admin: any) => (
                    <Avatar
                      key={admin.id}
                      className="h-6 w-6 border-2 border-white cursor-pointer"
                      onClick={() => setShowCreatorProfile(!showCreatorProfile)}
                    >
                      <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                      <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                {group.members > (group.admins?.length || 0) && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-500 border-2 border-white">
                    +{group.members - (group.admins?.length || 0)}
                  </div>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Created {group.created ? new Date(group.created).toLocaleDateString() : "recently"} • Active{" "}
              {group.lastActive}
            </div>
          </div>

          {/* Creator Profile Card */}
          {showCreatorProfile && group.admins && group.admins.length > 0 && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={group.admins[0].avatar || "/placeholder.svg"} alt={group.admins[0].name} />
                    <AvatarFallback>{group.admins[0].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{group.admins[0].name}</h3>
                    <p className="text-sm text-gray-500">Group Creator</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/student/messages?user=${group.admins[0].id}`}>
                    <Button variant="outline" size="sm">
                      Message
                    </Button>
                  </Link>
                  {isFollowingCreator ? (
                    <Button variant="outline" size="sm" onClick={handleUnfollowCreator}>
                      Unfollow
                    </Button>
                  ) : (
                    <Button size="sm" className="bg-[#0033A0] hover:bg-[#002180]" onClick={handleFollowCreator}>
                      Follow
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Study Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave this study group? You'll no longer have access to the group's resources,
              chats, and meetings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLeaveGroup} className="bg-red-600 hover:bg-red-700">
              Leave Group
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
