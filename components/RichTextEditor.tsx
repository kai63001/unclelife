"use client";

import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Smile,
  Underline as UnderlineIcon,
} from "lucide-react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useCallback, useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MenuBar = ({ editor, setLink, minHeight=100 }: any) => {
  const { theme } = useTheme();
  if (!editor) {
    return null;
  }

  const renderTheme = (): Theme => {
    if (theme === "dark") {
      return Theme.DARK;
    }
    if (theme === "light") {
      return Theme.LIGHT;
    }
    return Theme.AUTO;
  };

  const addEmoji = (event: any) => {
    const emoji = event.emoji
    editor?.chain().focus().insertContent(emoji).run();
  };

  return (
    <div className="flex space-x-1 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-secondary border p-1 rounded-sm",
          editor.isActive("bold")
            ? "bg-secondary text-primary"
            : "hover:bg-secondary hover:bg-opacity-10 hover:text-primary duration-75"
        )}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-secondary border p-1 rounded-sm",
          editor.isActive("italic")
            ? "bg-secondary text-primary"
            : "hover:bg-secondary hover:bg-opacity-10 hover:text-primary duration-75"
        )}
      >
        <Italic className="h-4 w-4" />
      </button>
      {/* underline */}
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={cn(
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-secondary border p-1 rounded-sm",
          editor.isActive("underline")
            ? "bg-secondary text-primary"
            : "hover:bg-secondary hover:bg-opacity-10 hover:text-primary duration-75"
        )}
      >
        <UnderlineIcon className="h-4 w-4" />
      </button>
      {/* link */}
      <button
        onClick={setLink}
        disabled={!editor.can().chain().focus().setLink().run()}
        className={cn(
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-secondary border p-1 rounded-sm",
          false
            ? "bg-secondary text-primary"
            : "hover:bg-secondary hover:bg-opacity-10 hover:text-primary duration-75"
        )}
      >
        <LinkIcon className="h-4 w-4" />
      </button>

      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-secondary border p-1 rounded-sm",
              editor.isActive("underline")
                ? "bg-secondary text-primary"
                : "hover:bg-secondary hover:bg-opacity-10 hover:text-primary duration-75"
            )}
          >
            <Smile className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className={"ml-10 w-11/12"}>
          <EmojiPicker onEmojiClick={addEmoji} theme={renderTheme()} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const RichTextEditor = (props: any) => {
  const editor: any = useEditor({
    onUpdate: ({ editor }: any) => {
      if (props.onChange) props.onChange(editor.getHTML());
    },
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-500 hover:underline cursor-pointer",
        },
      }),
    ],
    content: props.content || "",
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.commands.setContent(props.content || "");
  }, [props.content, editor]);

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-foreground px-3 py-2">
        <MenuBar editor={editor} setLink={setLink} />
      </div>
      <div className="">
        <EditorContent
          className="focus:outline-none p-1 h-full"
          style={{ minHeight: props.minHeight || 100 }}
          editor={editor}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
