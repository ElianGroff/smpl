import { selectedNoteAtom } from "@renderer/store";
import { NoteInfo } from "@shared/models";
import { cn } from '@shared/utils';
import { useAtomValue } from "jotai";
import { ComponentProps } from "react";


///!!!! MOVE TO UTILS!!!!!!!!!!!!!!!!!!!!!
export const formatRelativeDateTimeFromMs = function(ms: number): string {
    const locale = window.context.locale
    const date = new Date(ms);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
  
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    const diffDays = Math.floor((diffMs % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
  
    const relativeTimeParts: string[] = [];
  
    if (diffWeeks > 0) {
        relativeTimeParts.push(new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffWeeks, 'week'));
    }
    if (diffDays > 0) {
        relativeTimeParts.push(new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-diffDays, 'day'));
    }
    if (relativeTimeParts.length === 0) {
        relativeTimeParts.push('now');
    }
  
    let timeString = new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(date);
  
    timeString = timeString.replace(/AM|PM/i, (match) => match.toLowerCase());
  
    return `${relativeTimeParts.join(', ')}, at ${timeString}`;
  }
///!!!! MOVE TO UTILS!!!!!!!!!!!!!!!!!!!!!




export type NotePreviewProps = NoteInfo & {
    isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
    title,
    lastEditTime,
    wordCount,
    isActive,
    className,
    ...props
}:NotePreviewProps) => {
    return <div className={cn(
        'cursor-pointer text-nowrap my-3 w-screen font-light tracking-[.01em]',
        {
            'font-bold tracking-normal': isActive,
            'hover:font-normal hover:tracking-normal': !isActive
        },
        className
    )} {...props}>
        {title} 
    </div>
}

export const NoteDetails = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    
    if (selectedNote === null) return null

    const date = formatRelativeDateTimeFromMs(selectedNote.lastEditTime)
    const words = selectedNote.wordCount.toLocaleString(window.context.locale)

    return <span className="text-right z-50 text-nowrap font-light right-0 bottom-0 fixed mr-3 mb-2" >
        {`${words} words`} <br/> {`edited ${date}`} 
    </span>
}  

