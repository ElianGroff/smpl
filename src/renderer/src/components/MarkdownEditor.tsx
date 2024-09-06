import { useMarkdownEditor } from '@/hooks/useMarkdownEditor'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
  
  export const MarkdownEditor = () => {
    const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()
  
    if (!selectedNote) return null
  
    return (
      <div className='h-[calc(100%-70px)] cursor-text' onClick={() => editorRef.current?.focus()}>
        <MDXEditor
          ref={editorRef}
          key={selectedNote.title}
          markdown={selectedNote.content + '\n'.repeat(5)}
          onChange={handleAutoSaving}
          onBlur={handleBlur}
          plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
          contentEditableClassName="
            font-font2 font-normal text-editor text-white max-w-none text-base -mt-2
            
            prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-gray-900 prose-code:bg-slate-400 prose-code:before:content-[''] prose-code:after:content-['']" 
        />
      </div>
    )
  }
 