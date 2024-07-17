import { LucideMapPin, LucideCalendar, LucideSettings2 } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { setDefaultOptions } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { ChangeDestinationAndDateModal } from "./change-destination-and-date-modal"
import { formatDate } from "../../utils/formatDate"

setDefaultOptions({ locale: ptBR })

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
} 

export function DestinationAndDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  const [isChangeDestinationAndDateModalOpen, setIsChangeDestinationAndDateModalOpen] = useState(false)

  function openChangeDestinationAndDateModal() {
    setIsChangeDestinationAndDateModalOpen(true)
  }

  function closeChangeDestinationAndDateModal() {
    setIsChangeDestinationAndDateModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip
    ? formatDate(trip.starts_at, trip.ends_at) 
    : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LucideMapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <LucideCalendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button onClick={openChangeDestinationAndDateModal} variant="secondary">
          Alterar local/data
          <LucideSettings2 className="size-5" />
        </Button>
      </div>

      {isChangeDestinationAndDateModalOpen && (
        <ChangeDestinationAndDateModal
          closeChangeDestinationAndDateModal={closeChangeDestinationAndDateModal}
          destination={trip?.destination}
          trip_ends_at={trip?.ends_at}
          trip_start_at={trip?.starts_at}
        />
      )}
    </div>
  )
}