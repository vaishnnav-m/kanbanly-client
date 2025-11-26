import { JSONContent } from "@tiptap/react";
import { BaseApiParams } from "../common.types";

export interface CommentResponse {
  commentId: string;
  author: string;
  taskId: string;
  content: JSONContent;
}

export type CommentCreationPayload = Omit<BaseApiParams, "filters"> & {
  taskId: string;
  content: JSONContent;
};
