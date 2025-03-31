

import {pruebaChe } from "@/app/query/route";

export default async function PruebaPage() {

 const prueba = await pruebaChe();
console.log(prueba);

  return (
    <div>
      <h1>Lista de Prueba</h1>
      <ul>
        {prueba.map((item)=>(
          <li key={item.id}>
              {item.nombre} {item.apellido} {item.edad}
          </li>
          
        ))}
      
      </ul>
    </div>
  );
}
