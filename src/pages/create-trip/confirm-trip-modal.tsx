import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LucideMail, LucideUser, LucideX } from 'lucide-react'
import { FormEvent } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '../../components/button'
import { formatDateRange } from '../../utils/formatDate'

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
  eventStartAndEndDates,
}: ConfirmTripModalProps) {
  const tripDate = eventStartAndEndDates
    ? formatDateRange(eventStartAndEndDates)
    : ''

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button onClick={closeConfirmTripModal}>
              <LucideX className="size-5 text-zinc-400" />
            </button>
          </div>

          <p data-testid="confirm-trip-text" className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">{destination}</span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">{tripDate}</span>{' '}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <LucideUser className="size-5 text-zinc-400" />
            <input
              onChange={(event) => setOwnerName(event.target.value)}
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <LucideMail className="size-5 text-zinc-400" />
            <input
              onChange={(event) => setOwnerEmail(event.target.value)}
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
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
