import { LucideX, LucideAtSign, LucidePlus } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"

interface InviteGuestsModalProps {
  closeGuestsModal: () => void
  emailsToInvite: string[]
  removeEmailFromInvites: (email: string) => void
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
}

export function InviteGuestsModal({ 
  closeGuestsModal,
  emailsToInvite,
  removeEmailFromInvites,
  addNewEmailToInvite
}: InviteGuestsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={closeGuestsModal}>
              <LucideX className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map(email => (
            <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
              <span className="text-zinc-300">{email}</span>
              <button onClick={() => removeEmailFromInvites(email)} type="button">
                <LucideX className="size-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <div className="px-2 flex flex-1 items-center gap-2">
            <LucideAtSign className="size-5 text-zinc-400" />
            <input
              className="bg-transparent text-md placeholder-zinc-400 outline-none flex-1"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Digite o e-mail do convidado"
            />
          </div>

          <Button type="submit" variant="primary">
            Convidar
            <LucidePlus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}