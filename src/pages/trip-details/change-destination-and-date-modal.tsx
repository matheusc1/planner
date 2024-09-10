import 'react-day-picker/dist/style.css'

import { LucideCalendar, LucideMapPin, LucideX } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { formatDate, formatDateRange } from '../../utils/formatDate'

interface ChangeDestinationAndDateModalProps {
  closeChangeDestinationAndDateModal: () => void
  destination: string | undefined
  trip_start_at: string | undefined
  trip_ends_at: string | undefined
}

export function ChangeDestinationAndDateModal({
  closeChangeDestinationAndDateModal,
  destination,
  trip_start_at,
  trip_ends_at,
}: ChangeDestinationAndDateModalProps) {
  const { tripId } = useParams()

  const [newDestination, setNewDestination] = useState('')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  async function changeDestinationAndDate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newDestination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    await api.put(`/trips/${tripId}`, {
      destination: newDestination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
    })

    window.document.location.reload()
  }

  const displayedDate = eventStartAndEndDates
    ? formatDateRange(eventStartAndEndDates)
    : 'Quando?'
  const modalDescriptionDate =
    trip_start_at && trip_ends_at
      ? formatDate(trip_start_at, trip_ends_at)
      : null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local/data</h2>
            <button onClick={closeChangeDestinationAndDateModal}>
              <LucideX className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Sua viagem está atualmente marcada para{' '}
            <span className="font-semibold text-zinc-100">{destination}</span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">
              {modalDescriptionDate}.
            </span>{' '}
            Selecione o novo local e data abaixo.
          </p>
        </div>

        <form onSubmit={changeDestinationAndDate} className="space-y-3">
          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <LucideMapPin className="size-5 text-zinc-400" />
            <input
              onChange={(event) => setNewDestination(event.target.value)}
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              type="text"
              autoComplete="off"
              placeholder="Para onde você vai?"
            />
          </div>

          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <button
              onClick={openDatePicker}
              className="flex flex-1 items-center gap-2 text-left"
            >
              <LucideCalendar className="size-5 text-zinc-400" />
              <span
                className={`w-56 text-lg ${displayedDate === 'Quando?' ? 'text-zinc-400' : 'text-zinc-50'}`}
              >
                {displayedDate}
              </span>
            </button>
          </div>

          <Button size="full" variant="primary" type="submit">
            Confirmar alteração
          </Button>
        </form>
      </div>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button
                  data-testid="close-date-picker"
                  onClick={closeDatePicker}
                >
                  <LucideX className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker
              classNames={{
                day: 'h-9 w-9 p-0 text-zinc-50 hover:rounded-xl hover:text-zinc-900',
                day_range_start: 'rounded-xl',
                day_range_end: 'rounded-xl',
                day_selected:
                  'rounded-xl bg-zinc-600 text-zinc-50 focus:bg-zinc-600',
                day_today: 'rounded-xl bg-zinc-100 text-zinc-900',
                day_disabled: 'text-zinc-500 opacity-50',
              }}
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}
    </div>
  )
}
