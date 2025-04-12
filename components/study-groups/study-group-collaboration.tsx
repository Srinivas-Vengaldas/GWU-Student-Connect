"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckSquare, Clock, Edit, Plus, Save, Square, Trash } from "lucide-react"

interface StudyGroupCollaborationProps {
  groupId: string
}

export function StudyGroupCollaboration({ groupId }: StudyGroupCollaborationProps) {
  const [activeTab, setActiveTab] = useState("tasks")
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Complete practice problems 1-10",
      completed: true,
      assignedTo: {
        id: "1",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      dueDate: "Tomorrow",
    },
    {
      id: "2",
      title: "Review integration by parts",
      completed: false,
      assignedTo: {
        id: "2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      dueDate: "Friday",
    },
    {
      id: "3",
      title: "Create study guide for midterm",
      completed: false,
      assignedTo: {
        id: "3",
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      dueDate: "Next Monday",
    },
    {
      id: "4",
      title: "Solve problem set for Chapter 7",
      completed: false,
      assignedTo: {
        id: "4",
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      dueDate: "Wednesday",
    },
  ])
  const [newTask, setNewTask] = useState("")
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editedTaskTitle, setEditedTaskTitle] = useState("")

  // Kanban board columns
  const todoTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: String(tasks.length + 1),
        title: newTask,
        completed: false,
        assignedTo: {
          id: "1",
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        dueDate: "Not set",
      }
      setTasks([...tasks, newTaskObj])
      setNewTask("")
    }
  }

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      setEditingTask(taskId)
      setEditedTaskTitle(task.title)
    }
  }

  const handleSaveEdit = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, title: editedTaskTitle } : task)))
    setEditingTask(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Collaboration Tools</CardTitle>
        <CardDescription>Work together on tasks and projects</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="tasks">Task List</TabsTrigger>
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask()
                  }
                }}
              />
              <Button onClick={handleAddTask} className="bg-[#0033A0] hover:bg-[#002180]">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)}
                      id={`task-${task.id}`}
                    />
                    {editingTask === task.id ? (
                      <Input
                        value={editedTaskTitle}
                        onChange={(e) => setEditedTaskTitle(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                    ) : (
                      <Label
                        htmlFor={`task-${task.id}`}
                        className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}
                      >
                        {task.title}
                      </Label>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                        <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-500">{task.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {editingTask === task.id ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleSaveEdit(task.id)}>
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditTask(task.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-4 text-gray-500">No tasks yet. Add your first task above.</div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="kanban" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <Square className="h-4 w-4" />
                  <span>To Do ({todoTasks.length})</span>
                </h3>
                {todoTasks.map((task) => (
                  <div key={task.id} className="rounded-lg border p-3 bg-white">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{task.title}</h4>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleToggleTask(task.id)}>
                        <CheckSquare className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                          <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{task.assignedTo.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {todoTasks.length === 0 && (
                  <div className="rounded-lg border border-dashed p-4 text-center text-gray-500">No tasks to do</div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-sm flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-green-500" />
                  <span>Completed ({completedTasks.length})</span>
                </h3>
                {completedTasks.map((task) => (
                  <div key={task.id} className="rounded-lg border p-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium line-through text-gray-500">{task.title}</h4>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleToggleTask(task.id)}>
                        <Square className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                          <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{task.assignedTo.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {completedTasks.length === 0 && (
                  <div className="rounded-lg border border-dashed p-4 text-center text-gray-500">
                    No completed tasks
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="whiteboard" className="pt-4">
            <div className="rounded-lg border p-4 text-center">
              <h3 className="text-lg font-medium mb-2">Collaborative Whiteboard</h3>
              <p className="text-gray-500 mb-4">A shared space for brainstorming and visual collaboration.</p>
              <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed flex items-center justify-center">
                <p className="text-gray-500">Whiteboard functionality would be implemented here</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
