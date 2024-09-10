import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { LucideCalendar, LucideMapPin, LucideSettings2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { formatDate } from '../../utils/formatDate'
import { ChangeDestinationAndDateModal } from './change-destination-and-date-modal'

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

  const [
    isChangeDestinationAndDateModalOpen,
    setIsChangeDestinationAndDateModalOpen,
  ] = useState(false)

  function openChangeDestinationAndDateModal() {
    setIsChangeDestinationAndDateModalOpen(true)
  }

  function closeChangeDestinationAndDateModal() {
    setIsChangeDestinationAndDateModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip ? formatDate(trip.starts_at, trip.ends_at) : null

  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex items-center gap-2">
        <LucideMapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <LucideCalendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <Button onClick={openChangeDestinationAndDateModal} variant="secondary">
          Alterar local/data
          <LucideSettings2 className="size-5" />
        </Button>
      </div>

      {isChangeDestinationAndDateModalOpen && (
        <ChangeDestinationAndDateModal
          closeChangeDestinationAndDateModal={
            closeChangeDestinationAndDateModal
          }
          destination={trip?.destination}
          trip_ends_at={trip?.ends_at}
          trip_start_at={trip?.starts_at}
        />
      )}
    </div>
  )
}
