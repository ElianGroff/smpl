import { cn, formatRelativeDateTimeFromMs } from '@renderer/utils';
import { NoteInfo } from "@shared/models";
import { ComponentProps } from "react";

export type NotePreviewProps = NoteInfo & {
    isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
    title,
    lastEditTime,
    isActive,
    className,
    ...props
}:NotePreviewProps) => {
    const date = formatRelativeDateTimeFromMs(lastEditTime)

    return <div className={cn(
        'hover-delay-container cursor-pointer text-nowrap my-3 w-screen font-light tracking-[.01em]',
        {
            'font-bold tracking-normal': isActive,
            'hover:font-normal hover:tracking-normal': !isActive
        },
        className
    )}
    {...props}
    >
        {title}
        <span className="hover-delay font-thin font-font2 hover:font-thin text-nowrap text-xl right-0 bottom-0 align-bottom fixed mr-3 mb-2" >
            {'Last saved ' + date + ' with 6699k words.'} 
        </span>
    </div>
}