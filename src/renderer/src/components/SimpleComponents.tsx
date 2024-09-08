import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const DraggableTopBar = ({ children, className, ...props }: ComponentProps<'header'>) => {
  return <header id="draggable-header" className={twMerge('fixed top-0 pointer-events-none z-50 inset-0 left-0', className)} {...props} >
      {children}
  </header>
}

export const Hint = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return <div className={twMerge("font-light second-text text-3xl mx-2 fixed top-1/2 left-0 right-0 text-center text-nowrap sm:text-lg micro:text-[10px] supermicro:text-[0px] -translate-y-1/2", className)} {...props}>
    {children}
  </div>
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'main'>>(
    ({ children, className, ...props }, ref) => (
      <main ref={ref} className={twMerge('overflow-y-scroll overflow-x-hidden h-screen', className) } {...props}>
        {children}
      </main>
    )
  )

Content.displayName = 'Content'

export const ContentFade = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-full fade-out pointer-events-none"></div>
  )
}
