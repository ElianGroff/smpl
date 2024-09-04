import { notesAtom, selectedNoteAtom, selectedNoteIndexAtom } from "@/store"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"
import { twMerge } from "tailwind-merge"
//?import { NotePreviewProps } from "./NotePreview";

export const NoteTitle = ({ className }) => {
    const setSelectedNoteIndex = useSetAtom(selectedNoteIndexAtom)
    const selectedNote = useAtomValue(selectedNoteAtom)
    const [notes, setNotes] = useAtom(notesAtom)
        
    if (!selectedNote || !notes) return null
    
    //todo: have the value set to it but it can change
    //const title:HTMLInputElement | null = document.getElementById('note-title');
    //title?.value = selectedNote.title

    function handleChange(e: any) {
        let newTitle = e.target.value

        if (selectedNote === null || selectedNote.title === newTitle || !notes) return 

        const selectedIndex = notes.findIndex((note) => note.title === selectedNote.title)
    
        while (notes.findIndex((note) => note.title === newTitle) !== -1) {
            newTitle += ' copy'
        }

        e.target.value = newTitle
        //todo window.context.changeName(newTitle)


        const newNote = {
            ...selectedNote,
            lastEditTime: new Date().getTime(),
            title: newTitle
        }        

        notes.splice(selectedIndex, 1, newNote)
        
        notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
        const sortedIndex = notes.findIndex((note) => note.title === newTitle)
        setSelectedNoteIndex(sortedIndex)
    }

    useEffect(() => {
        const title = document.getElementById('note-title')
        if (!title || !('value' in title)) return
        title.value = selectedNote.title
    }, [selectedNote])

    return <input 
        type="text" 
        id='note-title' 
        onBlur={handleChange} 
        spellCheck="false" 
        className={twMerge(className, "font-bold caret-transparent text-editor z-0 w-full")}>
    </input>
}