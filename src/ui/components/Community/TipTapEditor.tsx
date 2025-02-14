import { EditorContent } from '@tiptap/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered } from 'lucide-react';

const TiptapEditor = () => {

    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p></p>',
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="border rounded-md p-3">
        {/* Toolbar */}
            <div className='w-full h-12 overflow-x-auto'>

            
            <div className="flex space-x-2 mb-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 border rounded ${
                        editor.isActive('bold') ? 'bg-gray-200' : ''
                    }`}
                >
                    <Bold size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 border rounded ${
                        editor.isActive('italic') ? 'bg-gray-200' : ''
                    }`}
                >
                    <Italic size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 border rounded ${
                        editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''
                    }`}
                >
                    <Heading1 />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 border rounded ${
                        editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
                    }`}
                >
                    <Heading2 />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 border rounded ${
                        editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''
                    }`}
                >
                    <Heading3 />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 border rounded ${
                        editor.isActive('bulletList') ? 'bg-gray-200' : ''
                    }`}
                >
                    <List />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 border rounded ${
                        editor.isActive('orderedList') ? 'bg-gray-200' : ''
                    }`}
                >
                    <ListOrdered />
                </button>
            </div>
            </div>
            <EditorContent editor={editor}  />
        </div>
    );
};

export default TiptapEditor;
