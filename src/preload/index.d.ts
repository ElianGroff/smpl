import { CreateNote, DeleteNote, GetNotes, ReadNote, RenameNote, WriteNote } from "@shared/types"

declare global {
  interface Window {
    //electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
      renameNote: RenameNote
      toggleAlwaysOnTop: () => void
    }
  }
}
