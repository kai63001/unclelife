"use client";

import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Baseline,
  Bold,
  Heading1,
  Heading2,
  Italic,
  Link as LinkIcon,
  Smile,
  Underline as UnderlineIcon,
} from "lucide-react";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import { useCallback, useEffect, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/app/redux/hook";
import HardBreak from "@tiptap/extension-hard-break";

const MenuBar = ({ editor, setLink, minHeight = 100 }: any) => {
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
    const emoji = event.emoji;
    editor?.chain().focus().insertContent(emoji).run();
  };

  return (
    <div className="flex space-x-1 flex-wrap justify-between">
      <div className="flex space-x-1 flex-wrap">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={cn(
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-secondary border p-1 rounded-sm",
            editor.isActive("heading", { level: 1 })
              ? "bg-secondary text-primary"
              : "hover:bg-secondary hover:bg-opacity-10 hover:text-primary duration-75"
          )}
        >
          <Heading1 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={cn(
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-secondary border p-1 rounded-sm",
            editor.isActive("heading", { level: 2 })
              ? "bg-secondary text-primary"
              : "hover:bg-secondary hover:bg-opacity-10 hover:text-primary duration-75"
          )}
        >
          <Heading2 className="h-4 w-4" />
        </button>
      </div>
      <div className="flex space-x-1 flex-wrap">
        <button
          type="button"
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
          type="button"
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
          type="button"
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
          type="button"
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
      </div>

      <div className="flex space-x-1 flex-wrap">
        <Label className="relative">
          <div
            className={cn(
              "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-secondary border p-1 rounded-sm",
              false
                ? "bg-secondary text-primary"
                : "hover:bg-secondary hover:bg-opacity-10 hover:text-primary duration-75"
            )}
          >
            <Baseline
              className="h-4 w-4"
              style={{
                color: editor.getAttributes("textStyle").color,
              }}
            />
          </div>
          <input
            type="color"
            id="colorPicker"
            className="h-0 w-0 opacity-0 absolute"
            onInput={(event: any) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
            value={editor.getAttributes("textStyle").color}
            data-testid="setColor"
          />
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
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
    </div>
  );
};

const RichTextEditor = (props: any) => {
  const { form } = useAppSelector((state) => state.formReducer);
  const [checkTextUpdate, setCheckTextUpdate] = useState(false);
  const editor: any = useEditor({
    editorProps: {
      attributes: {
        class: "prose prose-xs focus:outline-none max-w-[34ch]",
      },
    },
    onUpdate: ({ editor }: any) => {
      if (props.onChange) props.onChange(editor.getHTML());
    },
    extensions: [
      StarterKit as any,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-500 hover:underline cursor-pointer",
        },
      }),
      Heading.configure({
        levels: [1, 2],
        // add class to heading
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      HardBreak
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

    if (!checkTextUpdate && props.content) {
      editor.commands.setContent(props.content || "");
      setCheckTextUpdate(true);
    }
  }, [props.content, editor, checkTextUpdate]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!props.disabled);
  }, [editor, props.disabled]);

  return (
    <div className="border rounded-md overflow-hidden w-full">
      <div className="bg-foreground px-3 py-2">
        <MenuBar editor={editor} setLink={setLink} />
      </div>
      <div className="w-full">
        <EditorContent
          className="focus:outline-none p-1 h-full"
          style={{
            backgroundColor: form?.pro?.customizations?.light?.enableBackgroundColor
              ? form?.pro?.customizations?.light?.backgroundColor
              : undefined,
            minHeight: props.minHeight || 100,
          }}
          editor={editor}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
