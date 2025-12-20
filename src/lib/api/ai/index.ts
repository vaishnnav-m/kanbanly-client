import api from "../axios";
import { AIChatPayload } from "./ai.types";

export const chatAi = async ({ workspaceId, question }: AIChatPayload) => {
  const result = await api.post(`/ai/${workspaceId}/chat`, { question });
  return result.data;
};
