import { LucideArrowRight, LucideCalendar, LucideMapPin } from "lucide-react"

export function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">

        <div className="flex flex-col items-center space-y-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        
        <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center shadow-shape gap-3">
          <div className="flex items-center gap-2 flex-1">
            <LucideMapPin className="size-5 text-zinc-400" />
            <input className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" type="text" placeholder="Para onde você vai?" />
          </div>

          <div className="flex items-center gap-2">
            <LucideCalendar className="size-5 text-zinc-400" />
            <input className="bg-transparent text-lg placeholder-zinc-400 outline-none w-40" type="text" placeholder="Quando?" />
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          <button className="bg-lime-300 text-lime-900 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
            Continuar
            <LucideArrowRight className="size-5" />
          </button>
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>
    </div>
  )
}