import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800">TaskMaster</h1>
          <p className="mt-2 text-slate-600">Gestiona tus tareas de forma eficiente</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

