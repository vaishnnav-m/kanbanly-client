import api from "../axios";
import { ChatCreationPayload } from "./chat.types";

export const createChat = async (payload: ChatCreationPayload) => {
  const response = await api.post(`/workspace/${payload.workspaceId}/chats`, {
    memberId: payload.memberId,
  });
  return response.data;
};

export const getChats = async (workspaceId: string) => {
  const response = await api.get(`/workspace/${workspaceId}/chats`);
  return response.data;
};

export const getOneChat = async (workspaceId: string, chatId: string) => {
  const response = await api.get(`/workspace/${workspaceId}/chats/${chatId}`);
  return response.data;
};
