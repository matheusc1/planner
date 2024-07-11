import { LucideX, LucideUser, LucideMail } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { DateRange } from "react-day-picker"
import { setDefaultOptions, format } from "date-fns"
import { ptBR } from "date-fns/locale"

setDefaultOptions({ locale: ptBR })

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  destination: string
  eventStartAndEndDates: DateRange | undefined
} 

export function ConfirmTripModal({
  closeConfirmTripModal,
  setOwnerName,
  setOwnerEmail,
  createTrip,
  destination,
  eventStartAndEndDates
}: ConfirmTripModalProps) {
  function formatedDateRange(dates: DateRange | undefined) {
    if (!dates || !dates.from || !dates.to) {
      return
    }
  
    const formattedFrom = format(dates.from, "d' de 'LLLL")
    const formattedTo = format(dates.to, "d' de 'LLLL' de 'yyyy")
    return `${formattedFrom} a ${formattedTo}`
  }

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
            Para concluir a criação da viagem para{' '}
            <span className="text-zinc-100 font-semibold">{destination}</span>{' '}
            nas datas de <span className="text-zinc-100 font-semibold">
              {formatedDateRange(eventStartAndEndDates)}
              </span> preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <LucideUser className="size-5 text-zinc-400" />
            <input
              onChange={event => setOwnerName(event.target.value)}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <LucideMail className="size-5 text-zinc-400" />
            <input
              onChange={event => setOwnerEmail(event.target.value)}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Seu e-mail pessoal"
            />
          </div>

          <Button variant="primary" type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}