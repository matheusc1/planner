import { LucideX, LucideTag, LucideCalendar } from "lucide-react";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal
}: CreateActivityModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
            <button onClick={closeCreateActivityModal}>
              <LucideX className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <LucideTag className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
              type="text"
              name="title"
              autoComplete="off"
              placeholder="Qual a atividade?"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <LucideCalendar className="size-5 text-zinc-400" />
              <input
                className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
                type="datetime-local"
                name="occurs_at"
                autoComplete="off"
                placeholder="Data e horário da atividade"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-lime-300 text-lime-900 rounded-lg px-5 h-12 font-medium flex items-center justify-center gap-2 hover:bg-lime-400">
            Salvar atividade
          </button>
        </form>
      </div>
    </div>
  )
}