"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold } from "lucide-react"


const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex space-x-1 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active text-white bg-red-500 px-2 py-1 rounded-sm" : "text-white px-2 py-1 hover:bg-red-200 rounded-sm"}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active text-white bg-red-500 px-2 py-1 rounded-sm" : "text-white px-2 py-1 hover:bg-red-200 rounded-sm"}
      >
        <Bold className="h-4 w-4" />
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button> */}
    </div>
  );
};

const RichTextEditor = (props:any) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="border rounded-md overflow-hidden" {...props}>
      <div className="bg-foreground px-3 py-2">
        <MenuBar editor={editor} />
      </div>
      <div className="">
        <EditorContent className="focus:outline-none p-1" editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
