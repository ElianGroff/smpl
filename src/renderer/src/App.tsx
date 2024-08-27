import { Content, DraggableInfoScreen, RootLayout, Sidebar } from '@/components'

const App = () => {
  return (
    <>
      <DraggableInfoScreen/>
      <RootLayout>
        <Content >Content</Content>
        <Sidebar className='border-l border-l-white'>note1 at 3k words, 2am three weeks ago</Sidebar>
      </RootLayout>
    </>
  )
}

export default App
