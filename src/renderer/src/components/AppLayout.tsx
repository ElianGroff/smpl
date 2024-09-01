import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
    return (
      <main className={twMerge('flex flex-row', className)} {...props}>
        {children}
      </main>
    )
  }

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
    ({ children, className, ...props }, ref) => (
      <div ref={ref} className={twMerge('screen flex-1 overflow-auto', className)} {...props}>
        {children}
      </div>
    )
  )


Content.displayName = 'Content'