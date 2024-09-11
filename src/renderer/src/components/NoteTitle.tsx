import { notesAtom, selectedNoteAtom, selectedNoteIndexAtom } from '@/store'
import { isValidFileName } from '@shared/utils'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export const NoteTitle = ({ className }) => {
  const setSelectedNoteIndex = useSetAtom(selectedNoteIndexAtom) //^STINKMARK: should make a UseNoteTitle hook def def
  const selectedNote = useAtomValue(selectedNoteAtom)
  const [notes, setNotes] = useAtom(notesAtom)

  useEffect(() => {
    const title = document.getElementById('note-title')
    if (!title || !('value' in title)) return

    title.value = selectedNote?.title || ''
    title.scrollTop = 0
  }, [selectedNote])

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    //&console.warn("HANDLING ChANGE")
    let newTitle = event.target.value

    if (selectedNote === null || selectedNote.title === newTitle || !notes) return

    const selectedIndex = notes.findIndex((note) => note.title === selectedNote.title)

    //&console.log(selectedIndex)
    if (selectedIndex === -1) return

    while (notes.findIndex((note) => note.title === newTitle) !== -1) {
      newTitle += ' copy'
    }

    if (!isValidFileName(newTitle)) {
      event.target.value = selectedNote.title
      console.error('Invalid filename:', newTitle)
      return
    }

    event.target.value = newTitle
    await window.context.renameNote(selectedNote.title, newTitle)

    const newNote = {
      ...selectedNote,
      lastEditTime: new Date().getTime(),
      title: newTitle
    }

    const updatedNotes = [
      ...notes.slice(0, selectedIndex),
      newNote,
      ...notes.slice(selectedIndex + 1)
    ]

    updatedNotes.sort((a, b) => b.lastEditTime - a.lastEditTime)
    const sortedIndex = updatedNotes.findIndex((note) => note.title === newTitle)
    setNotes(updatedNotes)
    setSelectedNoteIndex(sortedIndex)
  }

  return (
    <input
      type="text"
      id="note-title"
      onBlur={handleChange}
      spellCheck="false"
      className={twMerge(className, 'font-bold w-full right-0 !leading-[1.3] text-editor bg-color')}
    ></input>
  )
}
