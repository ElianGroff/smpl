import { Content, DraggableTopBar, MarkdownEditer, NotePreviewList, RootLayout, TipPanel } from '@/components'
import { atom, useAtom } from 'jotai'
import { useEffect, useRef } from 'react'

export const tipsPanelOnAtom = atom<boolean>(false)
export const tipsPreviewListAtom = atom<boolean>(false)

const App = () => {
  const [tipsPanelOn, setTipsPanelOn] = useAtom(tipsPanelOnAtom)
  const [tipsPreviewListOn, setTipsPreviewListOn] = useAtom(tipsPreviewListAtom)

  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  //todo remove these events when unmounted - export them to other script
  useEffect(() => {
    window.addEventListener('mousemove', (e:MouseEvent) => {
      //! todo console.log(e.clientY) SHINK THE TOPBAR SPACE
      if (e.clientY <= 20) {
        setTipsPanelOn(true)
      } else {
        setTipsPanelOn(false)
      }
    })

    window.addEventListener('keydown', (e:KeyboardEvent) => { //todo THIS WHOLE THING is shitty asf
      if (e.altKey) {
        setTipsPreviewListOn(true)
      } 
      
      if (e.key === 'Escape') {
        window.close()
      }
    })

    window.addEventListener('keyup', (e:KeyboardEvent) => {
      if (e.code === 'AltLeft') {
        setTipsPreviewListOn(false)
      } 
      
    })


    }, [])

  return (
    <>
      <DraggableTopBar/>
      <RootLayout >
        {tipsPanelOn && <TipPanel/>}
        <Content ref={contentContainerRef}>
          <MarkdownEditer />  
        </Content>
        {(tipsPreviewListOn && !tipsPanelOn) && <NotePreviewList onSelect={resetScroll} className='h-screen w-screen text-6xl'/>}
      </RootLayout>
    </>
  )
}

export default App

//note1 at 3k words, edited 2am three weeks ago