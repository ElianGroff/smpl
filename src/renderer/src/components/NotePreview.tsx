import { NoteInfo } from '@shared/models'
import { cn } from '@shared/utils'
import { ComponentProps } from 'react'

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
}: NotePreviewProps) => {
  return (
    <div
      className={cn(
        'cursor-pointer text-nowrap pt-2 font-light tracking-[.01em]',
        {
          'font-bold tracking-normal': isActive,
          'hover:font-normal hover:tracking-normal': !isActive
        },
        className
      )}
      {...props}
    >
      {title}
    </div>
  )
}
