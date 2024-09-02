import { notesMock } from "@/store/mocks";
import { NoteInfo } from "@shared/models";
import { atom, useSetAtom } from "jotai";

export const notesAtom = atom<NoteInfo[]>(notesMock)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtom = atom((get) => {
    const notes = get(notesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)

    if (selectedNoteIndex === null) return null

    const selectedNote = notes[selectedNoteIndex]

    return {
        ...selectedNote,
        content: `hello from ${selectedNoteIndex}`
    }
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
    const notes = get(notesAtom)

    const title = `new note ${notes.length + 1}`

    const newNote: NoteInfo = {
        title,
        lastEditTime: new Date().getTime(),
    }

    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

    set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)
    
    if (!selectedNote) return

    const selectedNoteIndex = get(selectedNoteIndexAtom)
    console.log('index',selectedNoteIndex)

    set(notesAtom, notes.filter((note) => note.title !== selectedNote.title))

    // If there's no note make the tips/helper note
    if (notes.length === 1) {
        const createEmptyNote = useSetAtom(createEmptyNoteAtom) //! uh invalid hook call. bruh i hate this shit imma go to sleep
        createEmptyNote()
        console.log('create empty note')
        notes[0].title = 'help note :)'
        set(selectedNoteIndexAtom, 0)
    } else {
        if (selectedNoteIndex === null || selectedNoteIndex === 0) set(selectedNoteIndexAtom, 0) 
        else set(selectedNoteIndexAtom, selectedNoteIndex - 1)
    }
})