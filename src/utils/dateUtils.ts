import { format, formatISO, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'

export function toDate(date: string | Date): Date {
    return typeof date === 'string' ? parseISO(date) : date
}

export function formatDate(date: string | Date): string {
    return format(toDate(date), 'd. MMMM yyyy', { locale: nb })
}

export function formatDateShorthand(date: string | Date): string {
    return format(toDate(date), 'ddMMyy', { locale: nb })
}

export function toDateString(date: Date): string {
    return formatISO(date, { representation: 'date' })
}
