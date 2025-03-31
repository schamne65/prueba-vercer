
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function pruebaChe() {
	const data = await sql 
`
    SELECT nombre, apellido, edad FROM prueba
  `;
	return data;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await pruebaChe());
  } catch (error) {
    
  	return Response.json({ error }, { status: 500 });
  }
}

