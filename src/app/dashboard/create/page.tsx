"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useActionState } from "react";
import {  createTarea , TaskState} from "@/app/lib/action";




export function TaskForm2() {
    const initialState: TaskState = { message: "", errors: {} }; 

  const [state, formAction] = useActionState(createTarea, initialState);



  return (
    <form  action={formAction} className="space-y-4">
        <h2>nicolas</h2>
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          name="title"
       
          placeholder="Título de la tarea"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
        
          placeholder="Describe la tarea"
          rows={3}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Fecha de vencimiento</Label>
          <Input id="dueDate" name="dueDate" type="date"  required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
         {/* <Select
           
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Seleccionar prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baja</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
            </SelectContent>
          </Select>*/}
          <select name="priority" id="" className= "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2">
            <option value="baja">baja</option>
            <option value="media"> media</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
       {/*  <Select >
            <SelectTrigger id="status">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="in-progress">En Progreso</SelectItem>
              <SelectItem value="completed">Completada</SelectItem>
            </SelectContent>
          </Select>*/}
        </div>
        <select name="status" id="" className= "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2">
            <option value="baja">pendiente</option>
            <option value="media"> realizando</option>
          </select>
      </div>

      <div className="flex justify-end gap-2 pt-4">
      <Button type="submit">Tarea Nueva</Button>
      </div>
    </form>
  )
}

