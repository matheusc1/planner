import { LucideX, LucideMail } from "lucide-react"
import { Button } from "../../components/button"
import type { FormEvent } from "react"
import { api } from "../../lib/axios"
import { useParams } from "react-router-dom"

interface InviteNewGuestModalProps {
  closeInviteNewGuestModal: () => void
}

export function InviteNewGuestModal({ closeInviteNewGuestModal }: InviteNewGuestModalProps) {
  const { tripId } = useParams()

  async function InviteNewGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get('email')?.toString()

    await api.post(`/trips/${tripId}/invites`, {
      email,
    })

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Adicionar convidados</h2>
            <button onClick={closeInviteNewGuestModal}>
              <LucideX className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na viagem.
          </p>
        </div>

        <form onSubmit={InviteNewGuest} className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <LucideMail className="size-5 text-zinc-400" />
              <input
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Digite o e-mail do convidado"
              />
            </div>
          </div>

          <Button size="full" variant="primary" type="submit">
            Convidar
          </Button>
        </form>
      </div>
    </div>
  )
}