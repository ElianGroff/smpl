import { headingsPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, quotePlugin } from '@mdxeditor/editor'
import { useMarkdownEditor } from '@renderer/hooks/useMarkdownEditor'

export const MarkdownEditer = () => {
    const { selectedNote } = useMarkdownEditor()

    if (!selectedNote) return null

    //! NEED TITLE PLACEMENT & CHECK
    //~ get first line of content
    //~ if it has no # heading
        //~ make fist line a heading and change name to it
    //~ else if it has a # heading
        //~ if heading name doesnt match title
            //~ change title to heading name

    //~ also: make sure there is at least 20 lines
    
    return (
        <MDXEditor 
            key={selectedNote.title}
            markdown={'# ' + selectedNote.title + '\n' + selectedNote.content }
            plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
            contentEditableClassName= "outline-none mid-h-screen max-w-none text-lg px-3 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
        />
    )
}   