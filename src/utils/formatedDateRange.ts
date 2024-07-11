import { format } from "date-fns"
import { DateRange } from "react-day-picker"

export function formatedDateRange(dates: DateRange | undefined) {
  if (!dates || !dates.from || !dates.to) {
    return
  }

  const formattedFrom = format(dates.from, "d' de 'LLLL")
  const formattedTo = format(dates.to, "d' de 'LLLL' de 'yyyy")
  return `${formattedFrom} até ${formattedTo}`
}