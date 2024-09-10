import {
  LucideCheckCircle2,
  LucideCircleDashed,
  LucideUserCog,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { InviteNewGuestModal } from './invite-new-guest-modal'

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])

  const [isInviteNewGuestModalOpen, setIsInviteNewGuestModalOpen] =
    useState(false)

  function openInviteNewGuestModal() {
    setIsInviteNewGuestModalOpen(true)
  }

  function closeInviteNewGuestModal() {
    setIsInviteNewGuestModalOpen(false)
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block truncate text-sm text-zinc-400">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <LucideCheckCircle2 className="size-5 shrink-0 text-lime-300" />
            ) : (
              <LucideCircleDashed className="size-5 shrink-0 text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      <Button onClick={openInviteNewGuestModal} variant="secondary" size="full">
        <LucideUserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isInviteNewGuestModalOpen && (
        <InviteNewGuestModal
          closeInviteNewGuestModal={closeInviteNewGuestModal}
        />
      )}
    </div>
  )
}
