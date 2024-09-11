//?import { tipsPreviewListAtom } from "@renderer";
import { useSetAtom } from 'jotai'
import { isEmpty } from 'lodash'
import { ComponentProps, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { useNotesList } from '@/hooks/useNotesList'
import { createEmptyNoteAtom, deleteNoteAtom, selectedNoteIndexAtom } from '@/store'
import { NotePreview } from './NotePreview'
import { Hint } from './SimpleComponents'

const NOTE_PREVIEW_HEIGHT = 44 //^STINKMARK: HARD CODED?!!! but idk how to to get the pixelhight without like a bunch of js functions

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList() //^STINKMARK: i think all these atoms and things should be handling in the hook
  const setSelectedNoteIndex = useSetAtom(selectedNoteIndexAtom)
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const deleteNote = useSetAtom(deleteNoteAtom)

  if (!notes) return null

  function scrollIntoView(index: number) {
    const list = document.getElementById('note-preview-list')
    if (!list) return
    const items = list?.getElementsByTagName('div') //^STINKMARK: handle better ??? idk
    if (!items) return

    items[index].scrollIntoView({ block: 'nearest', inline: 'start' })
  }

  useEffect(() => {
    const list = document.getElementById('note-preview-list')
    let notesLength = notes.length //^STINKMARK: this is bad practie, you should just get the live length this is a bug HUGELY fixed

    // Sets the scroll level to the selected note
    if (list && selectedNoteIndex !== null) {
      list.scrollTo(0, NOTE_PREVIEW_HEIGHT * selectedNoteIndex)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') {
        e.preventDefault()
        setSelectedNoteIndex((prevIndex: number | null) => {
          if (!(prevIndex === null || !list) && prevIndex > 0) {
            // If selected note is not at the top of the list
            scrollIntoView(prevIndex - 1) //^STINKMARK: should return then scroll into view. scrollIntoView should fire after every w/s/etc placed, no dupe code
            return prevIndex - 1
          } else {
            createEmptyNote()
            notesLength++
            return 0
          }
        })
      } else if (e.key === 's') {
        e.preventDefault()
        setSelectedNoteIndex((prevIndex: number | null) => {
          if (prevIndex === null || !list) return prevIndex

          // If selected note is at the bottom of the list
          if (prevIndex < notesLength - 1) {
            //&console.log(list.scrollTop, list.scrollHeight)
            scrollIntoView(prevIndex + 1)

            return prevIndex + 1
          } else {
            // Else reset to top of list
            return prevIndex
          }
        })
      } else if (e.key === 'd') {
        e.preventDefault()
        deleteNote()
        notesLength--
        //&console.log('Index:', selectedNoteIndex)
        //^STINKMARK: scrollIntoView(selectedNoteIndex ?? index or somethin) maybe focusNote should be fired from delete note?? idk there is some way to do this idk what yet
      }
    }

    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (isEmpty(notes)) {
    return (
      <Hint>
        {' '}
        press <span className="first-text"> alt + w </span> to create note{' '}
      </Hint>
    )
  } else {
    return (
      <>
        <div
          // This div hides the titlebar from blur and creating a undesired neon effect
          //^STINKMARK: can be done better??
          className="h-14 bg-color fixed top-0 inset-0 "
        />
        <div
          // This div generates the blur across the full screen
          className="fixed inset-0 backdrop-blur-sm bg-zinc-900/60"
        />
        <ul
          id="note-preview-list"
          className={twMerge(`overflow-y-scroll overflow-x-hidden`, className)}
          {...props}
        >
          {notes.map((note, index) => (
            <NotePreview
              key={note.lastEditTime + Math.random()}
              isActive={index === selectedNoteIndex}
              onClick={handleNoteSelect(index)}
              {...note}
            />
          ))}
          <div
            // This div allows scrolling below the last note preview
            className={`h-[calc(100%-44px)]`}
          />
        </ul>
      </>
    )
  }
}
