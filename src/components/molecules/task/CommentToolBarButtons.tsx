"use client";
import { Button } from "@/components/atoms/button";
import {
  Bold,
  Code,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Quote,
} from "lucide-react";
import { Editor } from "@tiptap/react";

export const CommentToolBarButtons = ({
  editorInstance,
  disabled = false,
  setLink,
}: {
  editorInstance: Editor;
  disabled?: boolean;
  setLink: (editorInstance: Editor) => void;
}) => {
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => editorInstance?.chain().focus().toggleBold().run()}
        data-active={editorInstance?.isActive("bold")}
        disabled={disabled}
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => editorInstance?.chain().focus().toggleItalic().run()}
        data-active={editorInstance?.isActive("italic")}
        disabled={disabled}
      >
        <Italic className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => editorInstance?.chain().focus().toggleCode().run()}
        data-active={editorInstance?.isActive("code")}
        disabled={disabled}
      >
        <Code className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => editorInstance?.chain().focus().toggleBulletList().run()}
        data-active={editorInstance?.isActive("bulletList")}
        disabled={disabled}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() =>
          editorInstance?.chain().focus().toggleOrderedList().run()
        }
        data-active={editorInstance?.isActive("orderedList")}
        disabled={disabled}
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => editorInstance?.chain().focus().toggleBlockquote().run()}
        data-active={editorInstance?.isActive("blockquote")}
        disabled={disabled}
      >
        <Quote className="w-4 h-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => setLink(editorInstance)}
        data-active={editorInstance?.isActive("link")}
        disabled={disabled}
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </>
  );
};
