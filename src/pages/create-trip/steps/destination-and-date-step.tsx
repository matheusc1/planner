import 'react-day-picker/dist/style.css'

import {
  LucideArrowRight,
  LucideCalendar,
  LucideMapPin,
  LucideSettings2,
  LucideX,
} from 'lucide-react'
import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'

import { Button } from '../../../components/button'
import { formatDateRange } from '../../../utils/formatDate'

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
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates
    ? formatDateRange(eventStartAndEndDates)
    : 'Quando?'

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 p-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <LucideMapPin className="size-5 text-zinc-400" />
        <input
          onChange={(event) => setDestination(event.target.value)}
          disabled={isGuestsInputOpen}
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          type="text"
          placeholder="Para onde você vai?"
        />
      </div>

      <button
        data-testid="date-button"
        onClick={openDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left"
      >
        <LucideCalendar className="size-5 text-zinc-400" />
        <span className="w-56 text-lg text-zinc-400">{displayedDate}</span>
      </button>

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
                day: `h-9 w-9 p-0 text-zinc-50 hover:rounded-xl hover:text-zinc-900`,
                day_range_start: `rounded-xl`,
                day_range_end: `rounded-xl`,
                day_selected: `rounded-xl bg-zinc-600 text-zinc-50 focus:bg-zinc-600`,
                day_today: `rounded-xl bg-zinc-100 text-zinc-900`,
                day_disabled: `text-zinc-500 opacity-50`,
              }}
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className="h-6 w-px bg-zinc-800" />

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
