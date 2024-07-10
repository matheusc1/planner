import { LucideMapPin, LucideCalendar, LucideSettings2, LucideArrowRight } from "lucide-react"

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput
}: DestinationAndDateStepProps) {
  return (
    <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <LucideMapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          type="text"
          placeholder="Para onde você vai?"
        />
      </div>

      <div className="flex items-center gap-2">
        <LucideCalendar className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none w-40"
          type="text"
          placeholder="Quando?"
        />
      </div>

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <button
          onClick={closeGuestsInput}
          className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
        >
          Alterar local/data
          <LucideSettings2 className="size-5" />
        </button>
      ) : (
        <button
          onClick={openGuestsInput}
          className="bg-lime-300 text-lime-900 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
        >
          Continuar
          <LucideArrowRight className="size-5" />
        </button>
      )}
    </div>
  )
}