import { LucideX, LucideUser, LucideMail } from "lucide-react"
import { FormEvent } from "react"

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
} 

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
            <button onClick={closeConfirmTripModal}>
              <LucideX className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <LucideUser className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <LucideMail className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Seu e-mail pessoal"
            />
          </div>

          <button type="submit" className="w-full bg-lime-300 text-lime-900 rounded-lg px-5 h-12 font-medium flex items-center justify-center gap-2 hover:bg-lime-400">
            Confirmar criação da viagem
          </button>
        </form>
      </div>
    </div>
  )
}