import {
  Content,
  DraggableTopBar,
  Hint,
  MarkdownEditor,
  NoteDetails,
  NotePreviewList,
  NoteTitle
} from '@/components'

import { notesAtom, selectedNoteIndexAtom } from '@/store'
import { useAtomValue } from 'jotai'
import { isEmpty } from 'lodash'
import { useEffect, useRef, useState } from 'react'

//?export const tipsPanelOnAtom = atom<boolean>(false)
//?export const notePreviewListAtom = atom<boolean>(false)

const App = () => {
  const [notePreviewListOn, setNotePreviewListOn] = useState(false)
  const [detailsOn, setDetailsOn] = useState(false)
  
  const selectedNoteIndex = useAtomValue(selectedNoteIndexAtom)
  const notes = useAtomValue(notesAtom)

  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  function handleKeyDown(e:KeyboardEvent) {
    if (e.altKey) {
      const noteTitle = document.getElementById('note-title')

      noteTitle?.blur()

      setNotePreviewListOn(true)
    } else if (e.key === 'Escape') {
      window.close()
    } 
    
    if (e.key === 'a') {
      setDetailsOn(true)
    } else if (e.key === 't') {
      window.context.toggleAlwaysOnTop() 
    }
  }

  function handleKeyUp(e:KeyboardEvent) {
    if (e.code === 'AltLeft') {
      setNotePreviewListOn(false)
    } 
    if (e.key == 'a') {
      setDetailsOn(false)
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
      {detailsOn && notePreviewListOn && <NoteDetails/>}
      {(selectedNoteIndex === null || isEmpty(notes)) && !notePreviewListOn && <Hint>
        press <span className='first-text'>alt</span> to view notes
      </Hint>}
      {selectedNoteIndex !== null && <Content className='mx-4 fixed' ref={contentContainerRef}> 
        <NoteTitle className='text-4xl mt-4 z-30'/>
        <MarkdownEditor/>
      </Content>}
      {notePreviewListOn && <NotePreviewList onSelect={resetScroll} className='mx-4 text-4xl bg-black/60 z-2 top-1 fixed'/>}
    </>
  )
}

export default App
