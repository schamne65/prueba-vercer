'use server'

import postgres from "postgres"

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export type State = {
  errors: { nombre?: string[]; apellido?: string[]; edad?: string[] };
  message: string;  // Siempre un string
}

export async function createPrueba(
  prevState: State,  // Recibe el estado
  formData: FormData  // Recibe los datos del formulario
){
  try {
    const id = formData.get("id") as string;
    const nombre = formData.get("nombre") as string;
    const apellido = formData.get("apellido") as string;
    const edad = formData.get("edad") as string;
   
    await sql`
      INSERT INTO prueba (id, nombre, apellido, edad) 
      VALUES (${id},${nombre}, ${apellido}, ${edad})
    `;

    return { message: "Registro creado con éxito", errors: {} };
  } catch (error) {
    console.log(error, formData.get("nombre"), formData.get("apellido"), formData.get("edad"));
    return { message: "Error en la base de datos: no se pudo crear", errors: {} };
  }
}



export async function pruebaChe() {
  const data = await sql 
`
    SELECT nombre, apellido, edad FROM prueba
  `;
  return data;
}


export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
};
export type TaskState = {
  errors: Partial<Record<keyof Task, string[]>>;  // ✅ Siempre un objeto
  message: string;
};



export async function createTarea(
  prevState: TaskState,
  formData: FormData
) {
  try {
   
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as string;
    const status = formData.get("status") as string;

    // Insertar en la base de datos
    await sql`
      INSERT INTO tareas (titulo, description, fechaVencimiento, prioridad, estado) 
      VALUES (${title}, ${description}, ${dueDate}, ${priority}, ${status})
    `;

    return { message: "Tarea creada con éxito", errors: {} };
  } catch (error) {
    console.log(error);
    return { message: "Error en la base de datos: no se pudo crear la tarea", errors: {} };
  }
}
