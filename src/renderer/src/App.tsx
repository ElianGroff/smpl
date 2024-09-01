import { Content, DraggableTopBar, MarkdownEditer, NotePreviewList } from '@/components'
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
      <DraggableTopBar className='border-2 border-green-500'/>
      <Content ref={contentContainerRef}> 
        <MarkdownEditer />
      </Content>
      {notePreviewListOn && <NotePreviewList onSelect={resetScroll} className='w-screen text-5xl'/>}
    </>
  )
}

export default App

//note1 at 3k words, edited 2am three weeks ago