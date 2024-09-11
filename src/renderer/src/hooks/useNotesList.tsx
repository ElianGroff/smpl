import { notesAtom, selectedNoteIndexAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'

//^STINKMARK: coulda added more

export const useNotesList = () => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)
  }

  return {
    notes,
    selectedNoteIndex,
    handleNoteSelect
  }
}
