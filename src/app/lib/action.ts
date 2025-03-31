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
