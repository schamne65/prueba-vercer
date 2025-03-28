"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Calendar, Flag } from "lucide-react"
import type { Task } from "@/components/task-dashboard"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  // Helper function to get priority color
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50"
      case "medium":
        return "text-amber-500 bg-amber-50"
      case "low":
        return "text-green-500 bg-green-50"
      default:
        return "text-slate-500 bg-slate-50"
    }
  }

  // Helper function to get status color
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (tasks.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <div>
          <p className="text-slate-500">No hay tareas para mostrar</p>
          <p className="text-sm text-slate-400">Agrega una nueva tarea para comenzar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <Card key={task.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-4">
              <Badge className={getStatusColor(task.status)}>
                {task.status === "pending" && "Pendiente"}
                {task.status === "in-progress" && "En Progreso"}
                {task.status === "completed" && "Completada"}
              </Badge>
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}
              >
                <Flag className="h-3 w-3" />
                {task.priority === "low" && "Baja"}
                {task.priority === "medium" && "Media"}
                {task.priority === "high" && "Alta"}
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-slate-800">{task.title}</h3>
              <p className="mb-4 text-sm text-slate-600">{task.description}</p>
              <div className="flex items-center text-xs text-slate-500">
                <Calendar className="mr-1 h-3 w-3" />
                <span>Vence: {formatDate(task.dueDate)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-slate-50 p-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)}>
              <Edit className="mr-1 h-4 w-4" />
              Editar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Eliminar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

