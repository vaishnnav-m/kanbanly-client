import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../api/common.types";
import { getChatMessages } from "../api/message";
import { MessageResponse } from "../api/message/message.types";

export const useGetChatMessages = (workspaceId: string, chatId: string) => {
  return useQuery<ApiResponse<MessageResponse[]>>({
    queryKey: ["getMessages"],
    queryFn: () => getChatMessages(workspaceId, chatId),
  });
};
