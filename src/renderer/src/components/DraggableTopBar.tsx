import { ComponentProps, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
//?import { useAtom } from "jotai"

export const DraggableTopBar = ({ children, className, ...props }: ComponentProps<'main'>) => {
    const [tipsPanelOn, setTipsPanelOn] = useState(false)

    useEffect(() => {
        
        function handleMouseMove(e:MouseEvent) {
            console.log(e.clientY)
            if (e.clientY <= 20) {
                setTipsPanelOn(true)
            } else {
                setTipsPanelOn(false)
            }
        }
        
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }

    }, [])
    
    return <header className={twMerge(' relative group h-8 hover:bg-red-500', className)} {...props} >
        {children}
        stuyff
        <span id="draggable-header" className="absolute top-0 inset-0 bg-purple-400 left-0" >
            aefaef
            {tipsPanelOn && 'test2'}
        </span>
    </header>
}
