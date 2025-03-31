'use client';

import { useActionState } from "react";
import { createPrueba, State } from "@/app/lib/action";

export default function FormularioPatron() {
  // Estado inicial con `message` como string y `errors` como objeto vacío
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(createPrueba, initialState);

  return (
    <div>
      <h2>Agregar Patrón</h2>
      <form action={formAction}>
      <input type="text" name="id" placeholder="id" required />
        <input type="text" name="nombre" placeholder="Nombre" required />
        <input type="text" name="apellido" placeholder="Apellido" required />
        <input type="text" name="edad" placeholder="Edad" required />
        <button type="submit">Guardar</button>
      </form>
      {state.message && <p>{state.message}</p>}
    </div>
  );
}
