import {
  Content,
  ContentFade,
  DraggableTopBar,
  Hint,
  MarkdownEditor,
  NotePreviewList,
  NoteTitle
} from '@/components'

import { notesAtom, selectedNoteIndexAtom } from '@/store'
import { atom, useAtom, useAtomValue } from 'jotai'
import { isEmpty } from 'lodash'
import { useEffect, useRef } from 'react'

//?export const tipsPanelOnAtom = atom<boolean>(false)
export const notePreviewListAtom = atom<boolean>(false)

const App = () => {
  const [notePreviewListOn, setNotePreviewListOn] = useAtom(notePreviewListAtom)
  const selectedNoteIndex = useAtomValue(selectedNoteIndexAtom)
  const notes = useAtomValue(notesAtom)

  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  function handleKeyDown(e:KeyboardEvent) {
    if (e.altKey) {
      const noteTitle = document.getElementById('note-title')

      if (noteTitle) {
          noteTitle.blur()
      }

      setNotePreviewListOn(true)
    } 
    
    if (e.key === 'Escape') {
      window.close()
    }
  }

  function handleKeyUp(e:KeyboardEvent) {
    if (e.code === 'AltLeft') {
      setNotePreviewListOn(false)
    } 
  }

  useEffect(() => {

    // Sets up event listeners 
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Cleans up the event listeners on umount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }

    }, [])

  return (
    <>
      <DraggableTopBar className='h-4'/>
      {(selectedNoteIndex === null || isEmpty(notes)) && !notePreviewListOn && <Hint>
        press alt to view notes
      </Hint>}
      {selectedNoteIndex !== null && <Content className='left-3px fixed' ref={contentContainerRef}> 
        <NoteTitle className='text-5xl mx-2 mt-1 z-30'/>
        <MarkdownEditor/>
      </Content>}
      {notePreviewListOn && <NotePreviewList onSelect={resetScroll} className='mx-2 text-5xl bg-black z-2 top-0 fixed'/>}
      <ContentFade/>
    </>
  )
}

export default App
