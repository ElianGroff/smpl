import { NoteContent, NoteInfo } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

const loadNotes = async () => {
    const notes = await window.context.getNotes()

    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNoteAtomAsync = atom( async (get) => {
    const notes = get(notesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)

    if (selectedNoteIndex === null || !notes) return null

    const selectedNote = notes[selectedNoteIndex]

    const noteContent = await window.context.readNote(selectedNote.title)

    return {
        ...selectedNote,
        content: noteContent
    }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? {
    title: '',
    lastEditTime: Date.now(),
    content: '',
})

export const createEmptyNoteAtom = atom(null, (get, set) => {
    const notes = get(notesAtom)

    if (!notes) return

    let title = `new note ${notes.length + 1}`

    while (notes.some((note) => note.title === title)) { 
        title += ' copy'
    }

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
    
    if (!selectedNote || !notes) return

    const selectedNoteIndex = get(selectedNoteIndexAtom)
    console.log('index',selectedNoteIndex)

    set(notesAtom, notes.filter((note) => note.title !== selectedNote.title))

    // If there's no notes left set to null
    if (notes.length === 1) set(selectedNoteIndexAtom, null)
    // If selected note is the first note, set it to new first note
    else if(selectedNoteIndex === null || selectedNoteIndex === 0) set(selectedNoteIndexAtom, 0) 
    // else set it to note above
    else set(selectedNoteIndexAtom, selectedNoteIndex - 1)
})

export const saveNoteAtom = atom(null, async (get, set, newContent:NoteContent) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote || !notes) return

    await window.context.writeNote(selectedNote.title, newContent)

    set(notesAtom, notes.map((note) => note.title === selectedNote.title ? {
        ...note,
        lastEditTime: Date.now(),
        content: newContent
    } : note))
})