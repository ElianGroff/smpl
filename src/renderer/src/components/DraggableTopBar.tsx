import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
//?import { useAtom } from "jotai"

export const DraggableTopBar = ({ children, className, ...props }: ComponentProps<'main'>) => {
    return <header id="draggable-header" className={twMerge('absolute top-0 h-3 pointer-events-none z-50 inset-0 left-0', className)} {...props} >
        {children}
    </header>
}
