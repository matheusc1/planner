import { LucideMapPin, LucideCalendar, LucideSettings2, LucideArrowRight, LucideX } from "lucide-react"
import { Button } from "../../../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { format } from 'date-fns'
import "react-day-picker/dist/style.css"

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL")) 
    : 'Quando?'

  return (
    <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <LucideMapPin className="size-5 text-zinc-400" />
        <input
          onChange={event => setDestination(event.target.value)}
          disabled={isGuestsInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          placeholder="Para onde você vai?"
        />
      </div>

      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left">
        <LucideCalendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-56">
          {displayedDate}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeDatePicker}>
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

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Alterar local/data
          <LucideSettings2 className="size-5" />
        </Button>
      ) : (
        <Button variant="primary" onClick={openGuestsInput}>
          Continuar
          <LucideArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}