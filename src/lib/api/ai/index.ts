import api from "../axios";
import { AIChatPayload } from "./ai.types";

export const chatAi = async ({
  workspaceId,
  question,
  prevMessages,
}: AIChatPayload) => {
  const result = await api.post(`/ai/${workspaceId}/chat`, {
    question,
    prevMessages,
  });
  return result.data;
};
