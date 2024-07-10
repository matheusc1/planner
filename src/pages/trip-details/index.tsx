import {
  LucideCalendar,
  LucideCircleCheck,
  LucideCircleDashed,
  LucideLink2,
  LucideMapPin,
  LucidePlus,
  LucideSettings2,
  LucideTag,
  LucideUserCog,
  LucideX
} from "lucide-react"
import { useState } from "react"

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideMapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">Florianópolis, Brasil</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <LucideCalendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">17 a 23 de Agosto</span>
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
            Alterar local/data
            <LucideSettings2 className="size-5" />
          </button>
        </div>
      </div>

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button onClick={openCreateActivityModal} className="bg-lime-300 text-lime-900 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <LucidePlus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <div className="space-y-8">
            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-zinc-300 text-xl font-semibold">Dia 17</span>
                <span className="text-zinc-500 text-xs">Sábado</span>
              </div>
              <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
            </div>

            <div className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-zinc-300 text-xl font-semibold">Dia 18</span>
                <span className="text-zinc-500 text-xs">Domingo</span>
              </div>

              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <LucideCircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Academia em grupo</span>
                  <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <LucideCircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">Almoço</span>
                  <span className="text-zinc-400 text-sm ml-auto">12:00h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 space-y-6">
          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                  <a href="#" className="block text-xs text-zinc-400 hover:text-zinc-200 truncate">
                    https://www.airbnb.com.br/rooms/1047000112354648336
                  </a>
                </div>
                <LucideLink2 className="text-zinc-400 size-5 shrink-0" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Regras da casa</span>
                  <a href="#" className="block text-xs text-zinc-400 hover:text-zinc-200 truncate">
                    https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
                  </a>
                </div>
                <LucideLink2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            </div>

            <button className="bg-zinc-800 text-zinc-200 w-full rounded-lg px-5 h-11 font-medium flex items-center justify-center gap-2 hover:bg-zinc-700">
              <LucidePlus className="size-5" />
              Cadastrar novo link
            </button>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Jessica White</span>
                  <span className="block text-sm text-zinc-400 truncate">
                    jessica.white44@yahoo.com
                  </span>
                </div>
                <LucideCircleDashed className="text-zinc-400 size-5 shrink-0" />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Dr. Rita Pacocha</span>
                  <span className="block text-sm text-zinc-400 truncate">
                    lacy.stiedemann@gmail.com
                  </span>
                </div>
                <LucideCircleDashed className="text-zinc-400 size-5 shrink-0" />
              </div>
            </div>

            <button className="bg-zinc-800 text-zinc-200 w-full rounded-lg px-5 h-11 font-medium flex items-center justify-center gap-2 hover:bg-zinc-700">
              <LucideUserCog className="size-5" />
              Gerenciar convidados
            </button>
          </div>
        </div>
      </main>

      {isCreateActivityModalOpen && (
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
      )}
    </div>
  )
}