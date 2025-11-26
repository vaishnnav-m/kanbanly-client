import { JSONContent } from "@tiptap/react";
import { BaseApiParams } from "../common.types";
import { workspaceRoles } from "@/types/roles.enum";

export interface CommentResponse {
  commentId: string;
  author: {
    userId: string;
    name: string;
    role: workspaceRoles;
    profile?: string;
  };
  taskId: string;
  content: JSONContent;
  createdAt: string;
  updatedAt?: string;
}

export type CommentCreationPayload = Omit<BaseApiParams, "filters"> & {
  taskId: string;
  content: JSONContent;
};

export type CommentFetchingPayload = Omit<BaseApiParams, "filters"> & {
  taskId: string;
  page?: number;
};
