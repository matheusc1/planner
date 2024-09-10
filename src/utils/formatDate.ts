import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

export function formatDateRange(dateRange: DateRange) {
  if (!dateRange || !dateRange.from || !dateRange.to) {
    return
  }

  const fromDate = format(dateRange.from, "d' de 'LLL")
  const toDate = format(dateRange.to, "d' de 'LLL")

  return `${fromDate} até ${toDate}`
}

export function formatDate(start: string, end: string) {
  if (!start || !end) {
    return
  }

  const fromDate = format(start, "d' de 'LLL")
  const toDate = format(end, "d' de 'LLL")

  return `${fromDate} até ${toDate}`
}
