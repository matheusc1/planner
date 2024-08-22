import { LucideX, LucideMapPin, LucideCalendar } from "lucide-react"
import { Button } from "../../components/button"
import { useState, type FormEvent } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { formatDate, formatDateRange } from "../../utils/formatDate"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

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
  trip_ends_at
}: ChangeDestinationAndDateModalProps) {
  const { tripId } = useParams()

  const [newDestination, setNewDestination] = useState('')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

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
      ends_at: eventStartAndEndDates.to
    })

    window.document.location.reload()
  }

  const displayedDate = eventStartAndEndDates ? formatDateRange(eventStartAndEndDates) : 'Quando?'
  const modalDescriptionDate = trip_start_at && trip_ends_at ? formatDate(trip_start_at, trip_ends_at) : null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local/data</h2>
            <button onClick={closeChangeDestinationAndDateModal}>
              <LucideX className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Sua viagem está atualmente marcada para{' '}
            <span className="text-zinc-100 font-semibold">{destination}</span> nas datas de{' '}
            <span className="text-zinc-100 font-semibold">{modalDescriptionDate}</span>. Selecione o novo local e data abaixo.
          </p>
        </div>

        <form onSubmit={changeDestinationAndDate} className="space-y-3">
          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <LucideMapPin className="size-5 text-zinc-400" />
            <input
              onChange={(event) => setNewDestination(event.target.value)}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              type="text"
              autoComplete="off"
              placeholder="Para onde você vai?"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <button onClick={openDatePicker} className="flex items-center gap-2 text-left flex-1">
              <LucideCalendar className="size-5 text-zinc-400" />
              <span
               className={`text-lg w-56 ${displayedDate === 'Quando?' ? 'text-zinc-400' : 'text-zinc-50'}`}
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button data-testid="close-date-picker" onClick={closeDatePicker}>
                  <LucideX className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker classNames={{
              day: "h-9 w-9 p-0 text-zinc-50 hover:rounded-xl hover:text-zinc-900",
              day_range_start: "rounded-xl",
              day_range_end: "rounded-xl",
              day_selected: "rounded-xl bg-zinc-600 text-zinc-50 focus:bg-zinc-600",
              day_today: "rounded-xl bg-zinc-100 text-zinc-900",
              day_disabled: "text-zinc-500 opacity-50",
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