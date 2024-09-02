import { Content, DraggableTopBar, MarkdownEditer, NotePreviewList, NoteTitle } from '@/components'
import { atom, useAtom } from 'jotai'
import { useEffect, useRef } from 'react'

//?export const tipsPanelOnAtom = atom<boolean>(false)
export const notePreviewListAtom = atom<boolean>(false)

const App = () => {
  const [notePreviewListOn, setNotePreviewListOn] = useAtom(notePreviewListAtom)

  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  useEffect(() => {

    function handleKeyDown(e:KeyboardEvent) {
      if (e.altKey) {
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

    // Sets event listeners for previewing the note list
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)


    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }

    }, [])

  return (
    <>
      <DraggableTopBar/>
      {notePreviewListOn && <NotePreviewList onSelect={resetScroll} className='w-screen text-5xl'/>}
      <Content className='ph' ref={contentContainerRef}> 
        <NoteTitle/>
        <MarkdownEditer/>
      </Content>
      <div className="fixed top-0 left-0 h-full w-full fade-out pointer-events-none"></div>
    </>
  )
}

export default App

//note1 at 3k words, edited 2am three weeks ago