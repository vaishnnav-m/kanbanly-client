import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import {
  ChatCreationPayload,
  ChatListingItem,
  ChatResponse,
} from "../api/chat/chat.types";
import { createChat, getChats, getOneChat } from "../api/chat";

export const useCreateChat = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, ChatCreationPayload>({
    mutationFn: createChat,
    mutationKey: ["createChat"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getChats"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Chat Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetChats = (workspaceId: string) => {
  return useQuery<ApiResponse<ChatListingItem[]>, Error>({
    queryKey: ["getChats"],
    queryFn: () => getChats(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useGetOneChat = (workspaceId: string, chatId: string) => {
  return useQuery<ApiResponse<ChatResponse>, Error>({
    queryKey: ["getOneChat"],
    queryFn: () => getOneChat(workspaceId, chatId),
    enabled: !!workspaceId && !!chatId,
  });
};
