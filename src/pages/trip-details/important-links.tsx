import { LucideLink2, LucidePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { RegisterNewLinkModal } from './register-new-link-modal'

interface Link {
  title: string
  url: string
}

export function ImportantLinks() {
  const { tripId } = useParams()

  const [links, setLinks] = useState<Link[]>([])

  const [isRegisterNewLinkModalOpen, setIsRegisterNewLinkModalOpen] =
    useState(false)

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links))
  }, [tripId])

  function openRegisterNewLinkModal() {
    setIsRegisterNewLinkModalOpen(true)
  }

  function closeRegisterNewLinkModal() {
    setIsRegisterNewLinkModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>

      <div className="space-y-5">
        {links &&
          links.map((link) => (
            <div
              key={link.url}
              className="flex items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  className="block truncate text-xs text-zinc-400 hover:text-zinc-200"
                  rel="noreferrer"
                >
                  {link.url}
                </a>
              </div>
              <LucideLink2 className="size-5 shrink-0 text-zinc-400" />
            </div>
          ))}
      </div>

      <Button
        onClick={openRegisterNewLinkModal}
        variant="secondary"
        size="full"
      >
        <LucidePlus className="size-5" />
        Cadastrar novo link
      </Button>

      {isRegisterNewLinkModalOpen && (
        <RegisterNewLinkModal
          closeRegisterNewLinkModal={closeRegisterNewLinkModal}
        />
      )}
    </div>
  )
}
