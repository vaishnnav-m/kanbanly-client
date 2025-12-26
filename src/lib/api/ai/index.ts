import api from "../axios";
import { AIChatPayload } from "./ai.types";

export const chatAi = async ({
  workspaceId,
  question,
  prevMessages,
  projectId,
}: AIChatPayload) => {
  const result = await api.post(`/ai/${workspaceId}/chat`, {
    projectId,
    question,
    prevMessages,
  });
  return result.data;
};
