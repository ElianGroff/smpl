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
          markdown={selectedNote.content}
          onChange={handleAutoSaving}
          onBlur={handleBlur}
          plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
          contentEditableClassName="
            text-editor max-w-none text-base 
            
            supermicro:text-[10px] supermicro:font-light prose-li:supermicro:leading-snug
            
            prose prose-invert prose-p:my-0 prose-p:leading-normal prose-headings:my-2 prose-blockquote:my-1 prose-ul:my-0 prose-li:my-0 prose-code:px-1  prose-code:bg-zinc-800 prose-code:font-code prose-code:text-zinc-400 prose-code:before:content-[''] prose-code:after:content-['']" 
        />
      </div>
    )
  }
 

  //tutorial added these:
  //prose prose-invert prose-p:my-3 prose-p:leading-normal prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-gray-900 prose-code:bg-slate-400 prose-code:before:content-[''] prose-code:after:content-['']" 