import { useMarkdownEditor } from '@/hooks/useMarkdownEditor'
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
//!import { addedLines } from '@shared/constants'
  
  export const MarkdownEditor = () => {
    const { editorRef, selectedNote, handleAutoSaving, handleBlur } = useMarkdownEditor()
  
    if (!selectedNote) return null
  
    return (
      <>
        <MDXEditor
          ref={editorRef}
          key={selectedNote.title}
          markdown={selectedNote.content + '\n'.repeat(5)}
          onChange={handleAutoSaving}
          onBlur={handleBlur}
          plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
          contentEditableClassName="!outline-none min-h-[90%] font-font1 font-medium text-white max-w-none text-lg selection:bg-gray-600 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-gray-900 prose-code:bg-slate-400 prose-code:before:content-[''] prose-code:after:content-['']" 
        />
        <div className='inset-0 h-[60%] cursor-text' onClick={() => editorRef.current?.focus()}/>
      </>
    )
  }
  