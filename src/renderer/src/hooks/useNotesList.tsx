import { notesAtom, selectedNoteIndexAtom } from "@/store"
import { useAtom, useAtomValue } from "jotai"

export const useNotesList = ({onSelect}: {onSelect?: () => void}) => {
    const notes = useAtomValue(notesAtom)

    const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

    const handleNoteSelect = (index:number) => async() => {
        setSelectedNoteIndex(index)

        const list = document.getElementById('note-preview-list')

        if (list) {
            console.log(60 * index)
            //list.scrollTo(0, 60 * index)
        }

        if (onSelect) {
            onSelect()
        }
    }

    return {
        notes, 
        selectedNoteIndex, 
        handleNoteSelect
    }

}