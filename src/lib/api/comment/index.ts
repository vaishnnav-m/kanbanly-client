import api from "../axios";
import {
  CommentCreationPayload,
  CommentFetchingPayload,
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
