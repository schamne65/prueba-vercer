"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import { PlusCircle, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { TaskForm2 } from "@/app/dashboard/create/page"




// Task type definition
export type Task = {
 
  id: string
  title: string
  description: string
  dueDate: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  
 
}


// Sample initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Completar informe mensual",
    description: "Preparar el informe de ventas para la reunión del lunes",
    dueDate: "2023-12-15",
    priority: "high",
    status: "pending",
  },
  {
    id: "2",
    title: "Actualizar sitio web",
    description: "Actualizar contenido y optimizar imágenes",
    dueDate: "2023-12-20",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Revisar presupuesto",
    description: "Analizar gastos del último trimestre",
    dueDate: "2023-12-10",
    priority: "low",
    status: "completed",
  },
]

export function TaskDashboard() {
  
  const [tasks, setTasks] = useState<Task[]>(initialTasks)// esta linea trae el array task con las tareas predefinidas
  const [isAddingTask, setIsAddingTask] = useState(false) // por si se esta agregando una tarea
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const router = useRouter()

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
    }
    setTasks([...tasks, task])
    setIsAddingTask(false)
  }

  const handleEditTask = (updatedTask: Task | Omit<Task, "id">) => {
    if ("id" in updatedTask) {
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
      setEditingTask(null)
    }
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleLogout = () => {
    router.push("/")
  }
 
  return (


    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">TaskMaster</h1>
            <p className="text-slate-600">Gestiona tus tareas de forma eficiente</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>

        {isAddingTask || editingTask ? (
          <Card>
            <CardHeader>
              <CardTitle>{editingTask ? "Editar Tarea" : "Nueva Tarea"}</CardTitle>
              <CardDescription>
                {editingTask
                  ? "Actualiza los detalles de la tarea"
                  : "Completa el formulario para agregar una nueva tarea"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskForm2
               
              
                
              />
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6 flex justify-between">
              <h2 className="text-2xl font-semibold text-slate-800">Mis Tareas</h2>
              <Button onClick={() => setIsAddingTask(true)} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Nueva Tarea 1
              </Button>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="pending">Pendientes</TabsTrigger>
                <TabsTrigger value="in-progress">En Progreso</TabsTrigger>
                <TabsTrigger value="completed">Completadas</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                <TaskList
                  tasks={tasks.filter((task) => task.status === "pending")}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              </TabsContent>

              <TabsContent value="in-progress" className="space-y-4">
                <TaskList
                  tasks={tasks.filter((task) => task.status === "in-progress")}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <TaskList
                  tasks={tasks.filter((task) => task.status === "completed")}
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}

