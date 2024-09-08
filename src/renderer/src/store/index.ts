import { NoteContent, NoteInfo } from "@shared/models";
import { countWords } from "@shared/utils";
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

    if (selectedNoteIndex === null || !notes || notes.length === 0) return null

    //&console.warn('selectedNoteIndex', selectedNoteIndex, !notes, 'notes', notes)
    const selectedNote = notes[selectedNoteIndex]

    const noteContent = await window.context.readNote(selectedNote.title)

    return {
        ...selectedNote,
        content: noteContent
    }
})

export const selectedNoteAtom = unwrap(
    selectedNoteAtomAsync,
    (prev) =>
      prev ?? {
        title: '',
        content: '',
        lastEditTime: Date.now(),
        wordCount: 0
      }
  )

export const createEmptyNoteAtom = atom(null, async (get, set) => {
    const notes = get(notesAtom)

    if (!notes) return

    let title = `note ${notes.length + 1}`

    while (notes.some((note) => note.title === title)) { 
        title += ' copy'
    }

    const newNote: NoteInfo = {
        title,
        lastEditTime: new Date().getTime(),
        wordCount: 0
    }

    const results = await window.context.createNote(title)

    if (!results) return

    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

    set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, (get, set) => {
    //&console.warn('from deletE: notes')
    
    const notes = get(notesAtom)

    //&console.warn('from deletE: notes', notes)
    
    const selectedNote = get(selectedNoteAtom)
    
    //&console.warn('from deletE: selectedNote', selectedNote, 'notes', notes)

    if (!selectedNote || !notes) return

    const selectedNoteIndex = get(selectedNoteIndexAtom)

    window.context.deleteNote(selectedNote.title)
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

    set(
        notesAtom,
        notes.map((note) => {
          // this is the note that we want to update
          if (note.title === selectedNote.title) {
            return {
              ...note,
              lastEditTime: Date.now(),
              wordCount: countWords(newContent)
            }
          }
    
          return note
        })
      )
    })