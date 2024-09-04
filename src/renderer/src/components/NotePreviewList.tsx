//?import { tipsPreviewListAtom } from "@renderer";
import { useSetAtom } from "jotai";
import { isEmpty } from 'lodash';
import { ComponentProps, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { useNotesList } from "@/hooks/useNotesList";
import { createEmptyNoteAtom, deleteNoteAtom, selectedNoteIndexAtom } from "@/store";
import { NotePreview } from "./NotePreview";
import { Hint } from "./SimpleComponents";

export type NotePreviewListProps = ComponentProps<'ul'> & {
    onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
    const {notes , selectedNoteIndex, handleNoteSelect} = useNotesList({onSelect})
    //?const [listScreenOn, setListScreenOn] = atom(tipsPreviewListAtom)
    const setSelectedNoteIndex = useSetAtom(selectedNoteIndexAtom)
    const createEmptyNote = useSetAtom(createEmptyNoteAtom)
    const deleteNote = useSetAtom(deleteNoteAtom)
    
    if (!notes) return null

    useEffect(() => { 
        

        const list = document.getElementById('note-preview-list')
        let notesLength = notes.length

        if (list && selectedNoteIndex !== null) {
            list.scrollTo(0, 60 * selectedNoteIndex)
        }

        const handleKeyPress = (e: KeyboardEvent) => {
            
            console.log(e.key, notesLength)
            
            if (e.key === 'w') {
                e.preventDefault()
                setSelectedNoteIndex((prevIndex:number | null) => {                    
                    if ( !(prevIndex === null || !list) && prevIndex > 0) {
                        list.scrollTop = list.scrollTop - 60

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
                    if (prevIndex === null || !list ) return 0

                    // If selected note is below the bottom of the list
                    if (prevIndex < notesLength - 1) {
                        //&console.log(list.scrollTop, list.scrollHeight)
                        list.scrollTop = list.scrollTop + 60
                        return prevIndex + 1
                    } else { // Else reset to top of list 
                        list.scrollTo(0,0)
                        return 0
                    } 
                })
            } else if (e.key === 'd') {
                e.preventDefault()
                deleteNote()
                notesLength--
                console.log('index:',selectedNoteIndex)
                if (selectedNoteIndex !== null && list) {
                    list.scrollTop = list.scrollTop - 60
                } 
            //?} else if (e.key === 'a') {
                //?e.preventDefault()
                //?createEmptyNote()
            }
            
        }

    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
        window.removeEventListener('keydown', handleKeyPress);
    };
          
    }, [])

    if (isEmpty(notes)) {
        return (
            <Hint> press alt + w to create note </Hint>
        )
    } else {
        return (
            <ul id="note-preview-list" className={twMerge('overflow-y-scroll overflow-x-hidden h-screen w-screen', className)} {...props}> 
                {notes.map((note, index) => 
                    <NotePreview key={note.lastEditTime + Math.random()} 
                    isActive={index === selectedNoteIndex}
                    onClick={handleNoteSelect(index)}
                    {...note}/>
                )}
                <div className="h-[90%]"/>
            </ul>
        )
    }
}

//todo  bg-transparent