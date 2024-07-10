import { LucideLink2, LucidePlus } from "lucide-react"

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a href="#" className="block text-xs text-zinc-400 hover:text-zinc-200 truncate">
              https://www.airbnb.com.br/rooms/1047000112354648336
            </a>
          </div>
          <LucideLink2 className="text-zinc-400 size-5 shrink-0" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Regras da casa</span>
            <a href="#" className="block text-xs text-zinc-400 hover:text-zinc-200 truncate">
              https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
            </a>
          </div>
          <LucideLink2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <button className="bg-zinc-800 text-zinc-200 w-full rounded-lg px-5 h-11 font-medium flex items-center justify-center gap-2 hover:bg-zinc-700">
        <LucidePlus className="size-5" />
        Cadastrar novo link
      </button>
    </div>
  )
}