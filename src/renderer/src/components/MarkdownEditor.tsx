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
      <MDXEditor
        ref={editorRef}
        key={selectedNote.title}
        markdown={selectedNote.content}
        onChange={handleAutoSaving}
        onBlur={handleBlur}
        plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
        contentEditableClassName="outline-none min-h-screen text-white max-w-none text-lg px-3 selection:bg-gray-800 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      />
    )
  }
  