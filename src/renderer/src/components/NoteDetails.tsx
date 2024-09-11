import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

const formatRelativeDateTimeFromMs = function (ms: number): string {
  //^STINKMARK: should be in a web-side utils file
  const locale = window.context.locale
  const date = new Date(ms)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))
  const diffDays = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24))

  const relativeTimeParts: string[] = []

  if (diffWeeks > 0) {
    relativeTimeParts.push(
      new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffWeeks, 'week')
    )
  }
  if (diffDays > 0) {
    relativeTimeParts.push(
      new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffDays, 'day')
    )
  }
  if (relativeTimeParts.length === 0) {
    relativeTimeParts.push('today')
  }

  let timeString = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date)

  timeString = timeString.replace(/AM|PM/i, (match) => match.toLowerCase())

  return `${relativeTimeParts.join(', ')} at ${timeString}`
}

export const NoteDetails = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)

  if (selectedNote === null) return null

  const date = formatRelativeDateTimeFromMs(selectedNote.lastEditTime)
  const words = selectedNote.wordCount.toLocaleString(window.context.locale)

  return (
    <span className="z-50 font-light bottom-1 right-2 fixed text-right second-text micro:text-[8px] supermicro:text-[0px]">
      edited {words} {`word${selectedNote.wordCount === 1 ? '' : 's'}`} {date}.
    </span>
  )
}
