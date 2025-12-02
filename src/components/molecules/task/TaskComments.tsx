"use client";
import { useState, useEffect } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/atoms/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import {
  Send,
  X,
  MoreVertical,
  Trash2,
  Edit as EditIcon,
  MessageSquare,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { RootState } from "@/store";
import { suggestion } from "@/lib/suggestion";
import { CommentToolBarButtons } from "./CommentToolBarButtons";
import { CommentResponse } from "@/lib/api/comment/comment.types";
import { ConfirmationModal } from "@/components/organisms/admin/ConfirmationModal";

const CommentViewer = ({ content }: { content: JSONContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
      }),
    ],
    content: content,
    editable: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none text-sm text-foreground/90 leading-relaxed break-words focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content) {
      // Check if content has actually changed to avoid unnecessary updates
      if (JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) return null;

  return <EditorContent editor={editor} />;
};

interface TaskCommentsProps {
  taskId: string;
  comments: CommentResponse[];
  onSubmit: (content: JSONContent, taskId: string) => void;
  onUpdate: (content: JSONContent, taskId: string, commentId: string) => void;
  onDelete: (taskId: string, commentId: string) => void;
  placeholder?: string;
}

export const TaskComments = ({
  taskId,
  comments,
  onSubmit,
  onDelete,
  onUpdate,
  placeholder = "Add a comment...",
}: TaskCommentsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [hasContent, setHasContent] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deletingComment, setDeletingComment] = useState("");
  const userProfile = useSelector((state: RootState) => state.auth.profile);
  const currentUserId = useSelector((state: RootState) => state.auth.userId);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[120px] p-3",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setHasContent(!editor.isEmpty);
    },
  });

  const editEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Edit comment...",
      }),
      Link.configure({
        openOnClick: false,
      }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: suggestion,
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[80px] p-3",
      },
    },
    immediatelyRender: false,
  });

  const handleSubmit = async () => {
    if (!editor || editor.isEmpty) return;

    const jsonContent = editor.getJSON();

    setIsSubmitting(true);
    try {
      await onSubmit(jsonContent, taskId);
      editor.commands.clearContent();
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    editor?.commands.clearContent();
  };

  const handleEditStart = (comment: CommentResponse) => {
    setEditingCommentId(comment.commentId);
    editEditor?.commands.setContent(comment.content);
  };

  const handleEditSave = async (commentId: string) => {
    if (!editEditor || editEditor.isEmpty) return;

    const jsonContent = editEditor.getJSON();

    onUpdate(jsonContent, taskId, commentId);
    setEditingCommentId(null);
    editEditor.commands.clearContent();
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    editEditor?.commands.clearContent();
  };

  const setLink = (editorInstance: typeof editor) => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editorInstance?.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor || !editEditor) return null;

  return (
    <div className="w-full relative flex flex-col">
      {/* Comments List */}
      <div className="flex-1 space-y-6 px-6 pb-4">
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.commentId}
                className="group flex items-start gap-3"
              >
                <Avatar className="w-8 h-8 mt-1 border border-border shadow-sm">
                  <AvatarImage src={userProfile} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="relative rounded-xl border border-border/60 bg-card/50 p-4 shadow-sm transition-all duration-200 hover:border-border hover:shadow-md hover:bg-accent/5">
                    {editingCommentId === comment.commentId ? (
                      <div className="space-y-3">
                        <div className="border border-border rounded-lg overflow-hidden bg-background ring-2 ring-ring/10 shadow-inner">
                          <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
                            <CommentToolBarButtons
                              editorInstance={editEditor}
                              disabled={isSubmitting}
                              setLink={setLink}
                            />
                          </div>
                          <EditorContent editor={editEditor} />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleEditCancel}
                            className="h-8 px-3 hover:bg-destructive/10 hover:text-destructive"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleEditSave(comment.commentId)}
                            className="h-8 px-4"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground space-x-2">
                              <span>{comment.author.name}</span>
                              <span className="py-1 px-2 rounded-lg text-sm font-normal bg-gray-500/30">
                                {comment.author.role}
                              </span>
                            </span>
                            <span className="text-xs text-muted-foreground/80">
                              {formatDistanceToNow(
                                new Date(
                                  comment?.updatedAt !== comment.createdAt
                                    ? comment.updatedAt
                                    : comment.createdAt
                                ),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </span>
                            {comment?.updatedAt !== comment.createdAt && (
                              <span className="text-xs text-muted-foreground/60 italic">
                                (edited)
                              </span>
                            )}
                          </div>

                          {comment.author.userId === currentUserId && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 data-[state=open]:opacity-100 -mr-1 -mt-1"
                                >
                                  <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-32">
                                <DropdownMenuItem
                                  onClick={() => handleEditStart(comment)}
                                  className="gap-2 text-xs"
                                >
                                  <EditIcon className="w-3.5 h-3.5" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setDeletingComment(comment.commentId);
                                    setIsConfirmationOpen(true);
                                  }}
                                  className="gap-2 text-xs text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        <CommentViewer content={comment.content} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg bg-muted/10">
            <div className="bg-muted/30 p-3 rounded-full mb-3">
              <MessageSquare className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              No comments yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Start the conversation by adding a comment below.
            </p>
          </div>
        )}
      </div>

      {/* Sticky Comment Editor */}
      <div className="sticky bottom-0 z-10 bg-background pt-4 pb-1 mt-4 border-t border-border/50 backdrop-blur-sm support-backdrop-blur:bg-background/80">
        <div className="flex items-start gap-4 px-6">
          <Avatar className="w-9 h-9 hidden sm:block">
            <AvatarImage src={userProfile} />
            <AvatarFallback className="text-xs">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="border border-border rounded-lg overflow-hidden bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring transition-all">
              <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
                <CommentToolBarButtons
                  editorInstance={editor}
                  disabled={isSubmitting}
                  setLink={setLink}
                />
              </div>
              <EditorContent editor={editor} />
            </div>

            <div className="flex items-center justify-end gap-2">
              {hasContent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="h-8 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5 mr-1.5" />
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !hasContent}
                size="sm"
                className="h-8 px-4 font-medium"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => {
          if (deletingComment) {
            onDelete(taskId, deletingComment);
          }
          setDeletingComment("");
          setIsConfirmationOpen(false);
          close();
        }}
        title="Are you sure you want to remove this epic ?"
        description="This action cannot be undone. The epic will be permanently deleted from the project."
        cancelText="Cancel"
        confirmText="Delete Epic"
      />
    </div>
  );
};
