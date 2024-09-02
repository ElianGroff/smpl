import { selectedNoteAtom } from "@/store";
import { useAtomValue } from "jotai";
//?import { NotePreviewProps } from "./NotePreview";

export const NoteTitle = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    
    if (!selectedNote) return null
    
    //const title:HTMLInputElement | null = document.getElementById('note-title');
    //title?.value = selectedNote.title

    function handleChange(e: any) {
        
    }

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


    return <input 
        type="text" 
        id='note-title' 
        value={selectedNote.title} 
        onChange={handleChange} 
        spellCheck="false" 
        className="mt-1 mx-3 text-5xl font-bold caret-transparent text-editor w-full">
    </input>
}