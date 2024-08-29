//?import { tipsPreviewListAtom } from "@renderer";
import { useAtom } from "jotai";
import { ComponentProps, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { useNotesList } from "@/hooks/useNotesList";
import { selectedNoteIndexAtom } from "@/store";
import { NotePreview } from "./NotePreview";

export type notePreviewListProps = ComponentProps<'ul'> & {
    onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: notePreviewListProps) => {
    const {notes , selectedNoteIndex, handleNoteSelect} = useNotesList({onSelect})
    //?const [listScreenOn, setListScreenOn] = atom(tipsPreviewListAtom)
    const [selectedNoteIndex2, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

    useEffect(() => { 
        //todo THIS WHOLE THING is shitty asf: remove listeners on unmount

        const handleKeyPress = (e: KeyboardEvent) => {
            if (selectedNoteIndex == null) return
            
            //setSelectedNoteIndex(2)

            console.log(e.key, selectedNoteIndex)
            if (e.key === 'w') {    
                if (selectedNoteIndex > 0) {
                    setSelectedNoteIndex(selectedNoteIndex - 1)
                } else {
                    console.log('new note') //todo CREATE new NOTe
                }
            } else if (e.key === 's' && selectedNoteIndex < notes.length - 1) {
                setSelectedNoteIndex(selectedNoteIndex + 1)
            } else if (e.key === 'd') {
                console.log('delete note')
            } else if (e.key === 'a') {
                console.log('restore note')
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
        return (
            <span className={twMerge('content-center', className)} {...props} >
                 alt + space <span className="second-text"> to form a slip </span>
            </span>
        )
    } else {
        return (
            <ul className={twMerge('bg-transparent m-3', className)} {...props}> 
                {notes.map((note, index) => 
                    <NotePreview key={note.title} 
                    isActive={index === selectedNoteIndex}
                    onClick={handleNoteSelect(index)}
                    {...note}/>
                )}
            </ul>
        )
    }
}

//todo  bg-transparent