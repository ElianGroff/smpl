import { twMerge } from "tailwind-merge";


export const InfoScreen = ({ className, trigger, color='bg-red-500' }) => {
    return (trigger) ? (
        <div id='draggable-screen' className={twMerge('h-screen fixed top-0 inset-0 screen items-center z-50 justify-center' , className)}>
            <p className = 'text-center text-gray-500 text-3xl padding-10 padding-10' style={{lineHeight: '1.8', zIndex:999}}>
                exit <span className="control"> double-tap or esc </span> <br/>
                 full screen <span className="control"> drag to top </span> <br/>
                 notes/list toggle<span className="control"> ctrl </span> <br/>
                 note up <span className="control"> ctrl + w </span> <br/>
                 note down <span className="control"> ctrl + s </span> <br/>
                 note create <span className="control"> ctrl + space </span> <br/>
                 note delete <span className="control"> ctrl + d </span> <br/>
                 note restore <span className="control"> ctrl + a </span>
            </p>
        </div>
    ) : null;
}