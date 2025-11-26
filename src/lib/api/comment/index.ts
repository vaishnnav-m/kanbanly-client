import api from "../axios";
import {
  CommentCreationPayload,
  CommentDeletionPayload,
  CommentFetchingPayload,
  CommentUpdationPayload,
} from "./comment.types";

export const postComment = async (payload: CommentCreationPayload) => {
  const result = await api.post(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/tasks/${payload.taskId}/comments`,
    { content: payload.content }
  );
  return result.data;
};

export const getComments = async (payload: CommentFetchingPayload) => {
  const result = await api.get(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/tasks/${payload.taskId}/comments?page=${payload.page}`
  );
  return result.data;
};

export const updateComment = async (payload: CommentUpdationPayload) => {
  const result = await api.put(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/tasks/${payload.taskId}/comments/${payload.commentId}`,
    { content: payload.content }
  );
  return result.data;
};

export const deleteComment = async (payload: CommentDeletionPayload) => {
  const result = await api.delete(
    `/workspace/${payload.workspaceId}/projects/${payload.projectId}/tasks/${payload.taskId}/comments/${payload.commentId}`
  );
  return result.data;
};
