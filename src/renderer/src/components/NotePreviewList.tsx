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
                e.preventDefault();
                setSelectedNoteIndex((prevIndex:number | null) => {
                    if (prevIndex === null) return 0;
                    if (prevIndex > 0) return prevIndex - 1; 
                    else return notes.length -1 //! should create new note not return null
                }
                );
            } else if (e.key === 's') {
                e.preventDefault();
                setSelectedNoteIndex((prevIndex:number | null) => {
                    if (prevIndex === null) return 0;
                    if (prevIndex < notes.length - 1) return prevIndex + 1; 
                    else return 0
            }   );
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
            <span className={twMerge('content-center text-center', className)} {...props} >
                 alt + space <span className="second-text"> to form a slip </span>
            </span>
        )
    } else {
        return (
            <ul className={twMerge('overflow-y-scroll mx-3', className)} {...props}> 
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