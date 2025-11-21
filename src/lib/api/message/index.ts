import api from "../axios";

export const getChatMessages = async (workspaceId: string, chatId: string) => {
  const response = await api.get(
    `/workspace/${workspaceId}/chats/${chatId}/messages`
  );
  return response.data;
};
