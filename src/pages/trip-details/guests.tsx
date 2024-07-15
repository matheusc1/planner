import { LucideCheckCircle2, LucideCircleDashed, LucideUserCog } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { InviteNewGuestModal } from "./invite-new-guest-modal"

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])

  const [isInviteNewGuestModalOpen, setIsInviteNewGuestModalOpen] = useState(false)

  function openInviteNewGuestModal() {
    setIsInviteNewGuestModalOpen(true)
  }

  function closeInviteNewGuestModal() {
    setIsInviteNewGuestModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div key={participant.id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <LucideCheckCircle2 className="text-lime-300 size-5 shrink-0" />
            ) : (
              <LucideCircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Button onClick={openInviteNewGuestModal} variant="secondary" size="full">
        <LucideUserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isInviteNewGuestModalOpen && (
        <InviteNewGuestModal closeInviteNewGuestModal={closeInviteNewGuestModal} />
      )}
    </div>
  )
}