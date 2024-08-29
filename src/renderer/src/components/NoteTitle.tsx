import { selectedNoteAtom } from "@/store";
import { formatRelativeDateTimeFromMs } from "@renderer/utils";
import { useAtomValue } from "jotai";
//?import { NotePreviewProps } from "./NotePreview";

export const NoteTitle = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    
    if (!selectedNote) return null
    
    const date = formatRelativeDateTimeFromMs(selectedNote.lastEditTime)

    //const editableSpan = document.getElementById('editable');


    //todo: for changin the title (and not allowing it to be empty)
    /*
    // Ensure the element is not empty on focus out (blur event)
    editableSpan?addEventListener('blur', () => {
        if (editableSpantextContent.trim() === '') {
            editableSpan.textContent = 'This is some editable text.'; // Restore default text if empty
        }
    });

    // Prevent the element from being emptied by user key actions
    editableSpan.addEventListener('input', () => {
        if (editableSpan.textContent.trim() === '') {
            editableSpan.textContent = 'This is some editable text.'; // Restore default text if empty
            // Move the cursor to the end of the text
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStart(editableSpan.childNodes[0], editableSpan.textContent.length);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });*/


    return <div className='px-3 text-3xl transition-colors py-1 duration-75 text-nowrap ' 
    >
        <p className="second-text fade-out" >
            <span id='editable' contentEditable="true" className="first-text underline">{selectedNote.title}</span>
            {' last saved ' + date + ', with 6699 words'}
        </p>
    </div>

}