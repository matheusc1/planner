import { LucideLink2, LucideTag, LucideX } from 'lucide-react'
import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'

interface RegisterNewLinkModalProps {
  closeRegisterNewLinkModal: () => void
}

export function RegisterNewLinkModal({
  closeRegisterNewLinkModal,
}: RegisterNewLinkModalProps) {
  const { tripId } = useParams()

  async function RegisterNewLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    })

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button onClick={closeRegisterNewLinkModal}>
              <LucideX className="size-5 text-zinc-400" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={RegisterNewLink} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <LucideTag className="size-5 text-zinc-400" />
            <input
              className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              type="text"
              name="title"
              autoComplete="off"
              placeholder="Título do link"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <LucideLink2 className="size-5 text-zinc-400" />
              <input
                className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                type="string"
                name="url"
                autoComplete="off"
                placeholder="URL"
              />
            </div>
          </div>

          <Button size="full" variant="primary" type="submit">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  )
}
