import { LucideUserRoundPlus, LucideArrowRight } from "lucide-react"
import { Button } from "../../../components/button"

interface InviteGuestsStepProps {
  openGuestsModal: () => void
  emailsToInvite: string[]
  openConfirmTripModal: () => void
}

export function InviteGuestsStep({
  openGuestsModal,
  emailsToInvite,
  openConfirmTripModal
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 p-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1 text-left">
        <LucideUserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-lg text-zinc-400 flex-1">Quem estará na viagem?</span>
        )}
      </button>

      <Button variant="primary" onClick={openConfirmTripModal}>
        Confirmar viagem
        <LucideArrowRight className="size-5" />
      </Button>
    </div>
  )
}