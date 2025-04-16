"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lock, UserPlus, Search, Eye, Download, Edit, Share2, Trash2, Copy, Users, BookOpen } from "lucide-react"

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

export function MaterialAccessControl({ materialId, materialName, isOwner }: MaterialAccessControlProps) {
  const [accessRules, setAccessRules] = useState<AccessRule[]>([
    {
      id: "1",
      type: "user",
      name: "Individual User",
      entity: {
        id: "1",
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        type: "Student",
      },
      permissions: {
        view: true,
        download: true,
        edit: false,
        share: false,
      },
      addedBy: {
        id: "owner",
        name: "Prof. Johnson",
      },
      addedAt: "2023-04-01T10:00:00Z",
    },
    {
      id: "2",
      type: "group",
      name: "Study Group",
      entity: {
        id: "2",
        name: "Advanced Physics Study Group",
        type: "Study Group",
      },
      permissions: {
        view: true,
        download: true,
        edit: false,
        share: false,
      },
      addedBy: {
        id: "owner",
        name: "Prof. Johnson",
      },
      addedAt: "2023-04-02T14:30:00Z",
    },
    {
      id: "3",
      type: "course",
      name: "Course",
      entity: {
        id: "3",
        name: "PHYS 2023: Quantum Mechanics",
        type: "Course",
      },
      permissions: {
        view: true,
        download: true,
        edit: false,
        share: false,
      },
      addedBy: {
        id: "owner",
        name: "Prof. Johnson",
      },
      addedAt: "2023-04-03T09:15:00Z",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPermission, setSelectedPermission] = useState<string>("view")
  const [selectedEntityType, setSelectedEntityType] = useState<string>("user")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [requiresLogin, setRequiresLogin] = useState(true)
  const [allowComments, setAllowComments] = useState(true)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const handleAddAccessRule = () => {
    // In a real app, this would call an API to add the access rule
    setIsAddDialogOpen(false)
  }

  const handleRemoveAccessRule = (ruleId: string) => {
    // In a real app, this would call an API to remove the access rule
    setAccessRules(accessRules.filter((rule) => rule.id !== ruleId))
  }

  const handleTogglePermission = (ruleId: string, permission: keyof AccessRule["permissions"]) => {
    setAccessRules(
      accessRules.map((rule) => {
        if (rule.id === ruleId) {
          return {
            ...rule,
            permissions: {
              ...rule.permissions,
              [permission]: !rule.permissions[permission],
            },
          }
        }
        return rule
      }),
    )
  }

  const filteredRules = accessRules.filter(
    (rule) =>
      rule.entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Mock search results for the add dialog
  const searchResults = [
    {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Student",
    },
    {
      id: "user-2",
      name: "Maria Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Student",
    },
    {
      id: "group-1",
      name: "Calculus Study Group",
      type: "Study Group",
    },
    {
      id: "course-1",
      name: "MATH 101: Introduction to Calculus",
      type: "Course",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Access Control
        </CardTitle>
        <CardDescription>Manage who can access "{materialName}"</CardDescription>
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
                    </DialogHeader>
                    <div className="py-4">
                      <Tabs defaultValue="user">
                        <TabsList className="mb-4">
                          <TabsTrigger value="user">Users</TabsTrigger>
                          <TabsTrigger value="group">Groups</TabsTrigger>
                          <TabsTrigger value="course">Courses</TabsTrigger>
                        </TabsList>
                        <TabsContent value="user">
                          <div className="relative mb-4">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Search users..." className="pl-8" />
                          </div>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {searchResults
                              .filter((r) => r.type === "Student")
                              .map((result) => (
                                <div
                                  key={result.id}
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={result.avatar || "/placeholder.svg"} alt={result.name} />
                                      <AvatarFallback>{result.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="text-sm font-medium">{result.name}</p>
                                      <p className="text-xs text-muted-foreground">{result.type}</p>
                                    </div>
                                  </div>
                                  <Checkbox />
                                </div>
                              ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="group">
                          <div className="relative mb-4">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Search groups..." className="pl-8" />
                          </div>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {searchResults
                              .filter((r) => r.type === "Study Group")
                              .map((result) => (
                                <div
                                  key={result.id}
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                                >
                                  <div className="flex items-center gap-2">
                                    <Users className="h-8 w-8 p-1.5 bg-muted rounded-full" />
                                    <div>
                                      <p className="text-sm font-medium">{result.name}</p>
                                      <p className="text-xs text-muted-foreground">{result.type}</p>
                                    </div>
                                  </div>
                                  <Checkbox />
                                </div>
                              ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="course">
                          <div className="relative mb-4">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input placeholder="Search courses..." className="pl-8" />
                          </div>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {searchResults
                              .filter((r) => r.name.includes("MATH"))
                              .map((result) => (
                                <div
                                  key={result.id}
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                                >
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="h-8 w-8 p-1.5 bg-muted rounded-full" />
                                    <div>
                                      <p className="text-sm font-medium">{result.name}</p>
                                      <p className="text-xs text-muted-foreground">Course</p>
                                    </div>
                                  </div>
                                  <Checkbox />
                                </div>
                              ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Permissions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="view" checked />
                          <label htmlFor="view" className="text-sm">
                            View
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="download" />
                          <label htmlFor="download" className="text-sm">
                            Download
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="edit" />
                          <label htmlFor="edit" className="text-sm">
                            Edit
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="share" />
                          <label htmlFor="share" className="text-sm">
                            Share
                          </label>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddAccessRule}>Add</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-4 p-3 bg-muted text-sm font-medium">
                <div className="col-span-4">Name</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-4">Permissions</div>
                <div className="col-span-2">Added</div>
              </div>
              <div className="divide-y">
                {filteredRules.length > 0 ? (
                  filteredRules.map((rule) => (
                    <div key={rule.id} className="grid grid-cols-12 gap-4 p-3 items-center text-sm">
                      <div className="col-span-4 flex items-center gap-2">
                        {rule.type === "user" && (
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={rule.entity.avatar || "/placeholder.svg"} alt={rule.entity.name} />
                            <AvatarFallback>{rule.entity.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        {rule.type === "group" && <Users className="h-6 w-6 p-1 bg-muted rounded-full" />}
                        {rule.type === "course" && <BookOpen className="h-6 w-6 p-1 bg-muted rounded-full" />}
                        <span>{rule.entity.name}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          {rule.entity.type}
                        </span>
                      </div>
                      <div className="col-span-4 flex gap-2">
                        <button
                          className={`p-1 rounded-sm ${rule.permissions.view ? "bg-primary/10 text-primary" : "bg-muted"}`}
                          onClick={() => handleTogglePermission(rule.id, "view")}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className={`p-1 rounded-sm ${rule.permissions.download ? "bg-primary/10 text-primary" : "bg-muted"}`}
                          onClick={() => handleTogglePermission(rule.id, "download")}
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          className={`p-1 rounded-sm ${rule.permissions.edit ? "bg-primary/10 text-primary" : "bg-muted"}`}
                          onClick={() => handleTogglePermission(rule.id, "edit")}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className={`p-1 rounded-sm ${rule.permissions.share ? "bg-primary/10 text-primary" : "bg-muted"}`}
                          onClick={() => handleTogglePermission(rule.id, "share")}
                          title="Share"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{formatDate(rule.addedAt)}</span>
                        {isOwner && (
                          <button
                            className="p-1 rounded-sm hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleRemoveAccessRule(rule.id)}
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No matching access rules found.</div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Public Access</h3>
                  <p className="text-sm text-muted-foreground">Make this material visible to anyone with the link</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Require Login</h3>
                  <p className="text-sm text-muted-foreground">Users must be logged in to access this material</p>
                </div>
                <Switch checked={requiresLogin} onCheckedChange={setRequiresLogin} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Allow Comments</h3>
                  <p className="text-sm text-muted-foreground">Let users comment on this material</p>
                </div>
                <Switch checked={allowComments} onCheckedChange={setAllowComments} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="link">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Sharing Link</h3>
                <div className="flex">
                  <Input readOnly value={`https://gwconnect.edu/materials/${materialId}`} className="rounded-r-none" />
                  <Button
                    variant="outline"
                    className="rounded-l-none"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://gwconnect.edu/materials/${materialId}`)
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Embed Code</h3>
                <div className="flex">
                  <Input
                    readOnly
                    value={`<iframe src="https://gwconnect.edu/materials/${materialId}/embed" width="100%" height="600" frameborder="0"></iframe>`}
                    className="rounded-r-none"
                  />
                  <Button
                    variant="outline"
                    className="rounded-l-none"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `<iframe src="https://gwconnect.edu/materials/${materialId}/embed" width="100%" height="600" frameborder="0"></iframe>`,
                      )
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
