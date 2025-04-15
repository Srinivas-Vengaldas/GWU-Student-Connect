"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, UserPlus, Search } from "lucide-react"

type AccessRule = {
  id: string
  type: "user" | "group" | "course" | "department" | "role"
  name: string
  entity: {
    id: string
    name: string
    avatar?: string
    type: string
  }
  permissions: {
    view: boolean
    download: boolean
    edit: boolean
    share: boolean
  }
  addedBy: {
    id: string
    name: string
  }
  addedAt: string
}

type MaterialAccessControlProps = {
  materialId: string
  materialName: string
  isOwner: boolean
}

export function MaterialAccessControl({
  materialId,
  materialName,
  isOwner
}: MaterialAccessControlProps) {
  const [accessRules, setAccessRules] = useState<AccessRule[]>([
    {
      id: '1',
      type: 'user',
      name: 'Individual User',
      entity: {
        id: '1',
        name: 'Sarah Chen',
        avatar: '/placeholder.svg?height=32&width=32',
        type: 'Student'
      },
      permissions: {
        view: true,
        download: true,
        edit: false,
        share: false
      },
      addedBy: {
        id: 'owner',
        name: 'Prof. Johnson'
      },
      addedAt: '2023-04-01T10:00:00Z'
    },
    {
      id: '2',
      type: 'group',
      name: 'Study Group',
      entity: {
        id: '2',
        name: 'Advanced Physics Study Group',
        type: 'Study Group'
      },
      permissions: {
        view: true,
        download: true,
        edit: false,
        share: false
      },
      addedBy: {
        id: 'owner',
        name: 'Prof. Johnson'
      },
      addedAt: '2023-04-02T14:30:00Z'
    },
    {
      id: '3',
      type: 'course',
      name: 'Course',
      entity: {
        id: '3',
        name: 'PHYS 2023: Quantum Mechanics',
        type: 'Course'
      },
      permissions: {
        view: true,
        download: true,
        edit: false,
        share: false
      },
      addedBy: {
        id: 'owner',
        name: 'Prof. Johnson'
      },
      addedAt: '2023-04-03T09:15:00Z'
    }
  ])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPermission, setSelectedPermission] = useState<string>('view')
  const [selectedEntityType, setSelectedEntityType] = useState<string>('user')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [requiresLogin, setRequiresLogin] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }
  
  const handleAddAccessRule = () => {
    // In a real app, this would call an API to add the access rule
    setIsAddDialogOpen(false)
  }
  
  const handleRemoveAccessRule = (ruleId: string) => {
    // In a real app, this would call an API to remove the access rule
    setAccessRules(accessRules.filter(rule => rule.id !== ruleId))
  }
  
  const handleTogglePermission = (ruleId: string, permission: keyof AccessRule['permissions']) => {
    setAccessRules(accessRules.map(rule => {
      if (rule.id === ruleId) {
        return {
          ...rule,
          permissions: {
            ...rule.permissions,
            [permission]: !rule.permissions[permission]
          }
        }
      }
      return rule
    }))
  }
  
  const filteredRules = accessRules.filter(rule => 
    rule.entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.type.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Mock search results for the add dialog
  const searchResults = [
    {
      id: 'user-1',
      name: 'Alex Johnson',
      avatar: '/placeholder.svg?height=32&width=32',
      type: 'Student'
    },
    {
      id: 'user-2',
      name: 'Maria Rodriguez',
      avatar: '/placeholder.svg?height=32&width=32',
      type: 'Student'
    },
    {
      id: 'group-1',
      name: 'Calculus Study Group',
      type: 'Study Group'
    },
    {
      id: 'course-1',
      name: 'MATH 101: Introduction to Calculus',
      type: 'Course'
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Access Control
        </CardTitle>
        <CardDescription>
          Manage who can access "{materialName}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="permissions">
          <TabsList className="mb-4">
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="settings">Visibility Settings</TabsTrigger>
            <TabsTrigger value="link">Sharing Link</TabsTrigger>
          </TabsList>
          
          <TabsContent value="permissions">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users or groups..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {isOwner && (
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add People
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add People or Groups</DialogTitle>

\
