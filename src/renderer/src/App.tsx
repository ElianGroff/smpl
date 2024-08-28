import { useState } from 'react'

import { Content, DraggableHeader, InfoScreen, List, RootLayout } from '@/components'

const App = () => {
  const [isDragging, setDragging] = useState(false)

  return (
    <>
      <DraggableHeader onMouseEnter={() => {console.log('hover');setDragging(true)}} onMouseLeave={() => {setDragging(false)}}/> 
      <InfoScreen className='border-4 bg-white border-red-500' trigger={isDragging}/>
      <RootLayout>
        <Content/>
        <List/>
      </RootLayout>
    </>
  )
}

export default App

//note1 at 3k words, 2am three weeks ago