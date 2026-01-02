import { useMutation, useQuery } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import {
  ChatCreationPayload,
  ChatListingItem,
  ChatResponse,
} from "../api/chat/chat.types";
import { createChat, getChats, getOneChat } from "../api/chat";
import { AxiosError } from "axios";

export const useCreateChat = (options?: {
  onSuccess?: (
    response: ApiResponse<{ chatId: string }>,
    variables: ChatCreationPayload
  ) => void;
}) => {
  const toast = useToastMessage();

  return useMutation<ApiResponse<{ chatId: string }>, AxiosError<{ message: string }>, ChatCreationPayload>({
    mutationFn: createChat,
    mutationKey: ["createChat"],
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Chat Creation Failed",
        description: errorMessage,
        duration: 6000,
      });
    },
    ...options,
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
