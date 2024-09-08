//?import { tipsPreviewListAtom } from "@renderer";
import { useSetAtom } from "jotai";
import { isEmpty } from 'lodash';
import { ComponentProps, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { useNotesList } from "@/hooks/useNotesList";
import { createEmptyNoteAtom, deleteNoteAtom, selectedNoteIndexAtom } from "@/store";
import { NotePreview } from "./NotePreview";
import { Hint } from "./SimpleComponents";

const NOTE_PREVIEW_HEIGHT = 44 //! FIX

export type NotePreviewListProps = ComponentProps<'ul'> & {
    resetScroll?: () => void
}

export const NotePreviewList = ({ resetScroll, className, ...props }: NotePreviewListProps) => {
    const {notes , selectedNoteIndex, handleNoteSelect} = useNotesList()
    const setSelectedNoteIndex = useSetAtom(selectedNoteIndexAtom)
    const createEmptyNote = useSetAtom(createEmptyNoteAtom)
    const deleteNote = useSetAtom(deleteNoteAtom)
    
    if (!notes) return null


    function scrollIntoViewOne(index:number) {
        const list = document.getElementById('note-preview-list')
        if (!list) return    
        const items = list?.getElementsByTagName('div') //!handle better
        if (!items) return

        items[index].scrollIntoView({ block: 'nearest', inline: 'start' })
    }

    useEffect(() => {         
        
        if (resetScroll) resetScroll()

        const list = document.getElementById('note-preview-list')

        let notesLength = notes.length

        if (list && selectedNoteIndex !== null) {
            list.scrollTo(0, NOTE_PREVIEW_HEIGHT * selectedNoteIndex)
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            
            //console.log(e.key, notesLength) //! get live notes length
            
            if (e.key === 'w') {
                e.preventDefault()
                setSelectedNoteIndex((prevIndex:number | null) => {                    
                    if ( !(prevIndex === null || !list) && prevIndex > 0) {
                        scrollIntoViewOne(prevIndex - 1)
                        return prevIndex - 1
                    } else {
                        createEmptyNote()
                        notesLength++
                        return 0
                    }  
                })
            } else if (e.key === 's') {
                e.preventDefault() 
                setSelectedNoteIndex((prevIndex:number | null) => {
                    if (prevIndex === null || !list ) return prevIndex

                    // If selected note is at the bottom of the list
                    if (prevIndex < notesLength - 1) {
                        //&console.log(list.scrollTop, list.scrollHeight)
                        scrollIntoViewOne(prevIndex + 1)
                        
                        return prevIndex + 1
                    } else { // Else reset to top of list 
                        return prevIndex
                    } 
                })
            } else if (e.key === 'd') {
                e.preventDefault()
                deleteNote()
                notesLength--
                console.log('index:',selectedNoteIndex)
                if (selectedNoteIndex !== null && list) {
                    list.scrollTop = list.scrollTop - NOTE_PREVIEW_HEIGHT
                } 
            } 
        }
        
    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
          
    }, [])

    if (isEmpty(notes)) {
        return (
            <Hint> press <span className='first-text'> alt + w </span> to create note </Hint>
        )
    } else {
        return (
            <>
                <div className="h-14 bg-color fixed top-0 inset-0 "/>
                <div className="fixed inset-0 backdrop-blur-sm bg-zinc-900/60"/>
                <ul id="note-preview-list" className={twMerge(`overflow-y-scroll overflow-x-hidden`, className)} {...props}>
                    {notes.map((note, index) => <NotePreview key={note.lastEditTime + Math.random()}
                        isActive={index === selectedNoteIndex}
                        onClick={handleNoteSelect(index)}
                        {...note} />
                    )}
                    <div className={`h-[calc(100%-44px)]`} />
                </ul>
            </>
        )
    }
}

//todo  bg-transparent     NOTE_PREVIEW_HEIGHT * notes.length  Math.floor(NOTE_PREVIEW_HEIGHT * notes.length)

