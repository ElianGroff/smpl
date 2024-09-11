import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

//! NO LONGER USED COMPONENT

export const TipPanel = ({ children, className, ...props }: ComponentProps<'div'>) => {
  //todo add changing color: color='bg-red-500'
  return (
    <div
      className={twMerge(
        'flex font-light h-screen w-screen items-center z-50 justify-center',
        className
      )}
      {...props}
    >
      <p
        className="text-center text-2xl padding-10 padding-10"
        style={{ lineHeight: '1.8', zIndex: 999 }}
        //! TIPS ARE NO LONGER VALID
      >
        <span className="second-text"> exit </span> esc or right-click/close <br />
        <span className="second-text">maximize </span> drag to top or double-click <br />
        <span className="second-text">minimize </span> drag or double-click <br />
        <span className="second-text">slips-list toggle</span> alt <br />
        <span className="second-text">up slip</span> alt + w <br />
        <span className="second-text">down slip</span> alt + s <br />
        <span className="second-text">form slip</span> alt + d <br />
        <span className="second-text">destroy slip</span> alt + x <br />
        <span className="second-text">restore slip</span> alt + a <br />
        {children}
      </p>
    </div>
  )
}
