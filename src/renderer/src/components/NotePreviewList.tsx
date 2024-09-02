//?import { tipsPreviewListAtom } from "@renderer";
import { useAtom, useSetAtom } from "jotai";
import { ComponentProps, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { useNotesList } from "@/hooks/useNotesList";
import { createEmptyNoteAtom, deleteNoteAtom, selectedNoteIndexAtom } from "@/store";
import { NotePreview } from "./NotePreview";

export type NotePreviewListProps = ComponentProps<'ul'> & {
    onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
    const {notes , selectedNoteIndex, handleNoteSelect} = useNotesList({onSelect})
    //?const [listScreenOn, setListScreenOn] = atom(tipsPreviewListAtom)
    const [selectedNoteIndex2, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)
    const createEmptyNote = useSetAtom(createEmptyNoteAtom)
    const deleteNote = useSetAtom(deleteNoteAtom)

    useEffect(() => { 
        //todo THIS WHOLE THING is shitty asf: remove listeners on unmount
        const list = document.getElementById('note-preview-list')

        if (list && selectedNoteIndex !== null) {
            list.scrollTo(0, 60 * selectedNoteIndex)
        }

        const handleKeyPress = (e: KeyboardEvent) => {
            if (selectedNoteIndex == null) return
            
            //setSelectedNoteIndex(2)

            console.log(e.key, selectedNoteIndex)
            
            if (e.key === 'w') {
                e.preventDefault()
                setSelectedNoteIndex((prevIndex:number | null) => {
                    if (prevIndex === null) return 0
                    
                    if (list && selectedNoteIndex !== null) {
                        list.scrollTop = list.scrollTop - 60
                    }

                    if (prevIndex > 0) return prevIndex - 1
                    else {
                        createEmptyNote()
                        return 0
                    }  
                })
            } else if (e.key === 's') {
                e.preventDefault()
                setSelectedNoteIndex((prevIndex:number | null) => {
                    if (prevIndex === null) return 0
                    
                    if (prevIndex < notes.length - 1) {
                        if (list && selectedNoteIndex !== null) {
                            console.log(list.scrollTop, list.scrollHeight)
                            list.scrollTop = list.scrollTop + 60
                        }
                        
                        return prevIndex + 1
                    }
                    else return notes.length - 1
                })
            } else if (e.key === 'd') {
                e.preventDefault()
                deleteNote()
            } else if (e.key === 'a') {
                e.preventDefault()
                createEmptyNote()
            }
            
        }

    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
        window.removeEventListener('keydown', handleKeyPress);
    };
          
    }, [])

    if (notes.length === 0) {
        return ( //todo This No Notes thing should be a component so i can add it on first startart/behind the content component
            <span className={twMerge('content-center bg-black text-center', className)} {...props} >
                 alt + w <span className="second-text"> to form a slip </span>
            </span>
        )
    } else {
        return (
            <ul id='note-preview-list'className={twMerge('overflow-y-scroll overflow-x-hidden h-screen mx-3', className)} {...props}> 
                {notes.map((note, index) => 
                    <NotePreview key={note.title} 
                    isActive={index === selectedNoteIndex}
                    onClick={handleNoteSelect(index)}
                    {...note}/>
                )}
                <div className="h-[90svh]"/>
            </ul>
        )
    }
}

//todo  bg-transparent