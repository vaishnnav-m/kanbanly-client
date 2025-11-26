import api from "../axios";
import { CommentCreationPayload } from "./comment.types";

export const postComment = async (data: CommentCreationPayload) => {
  const result = await api.post(
    `/workspace/${data.workspaceId}/projects/${data.projectId}/tasks/${data.taskId}/comments`,
    { content: data.content }
  );
  return result.data;
};
