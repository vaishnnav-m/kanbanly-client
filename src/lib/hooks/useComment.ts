import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import {
  CommentCreationPayload,
  CommentDeletionPayload,
  CommentFetchingPayload,
  CommentResponse,
  CommentUpdationPayload,
} from "../api/comment/comment.types";
import {
  deleteComment,
  getComments,
  postComment,
  updateComment,
} from "../api/comment";
import { AxiosError } from "axios";

export const usePostComment = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<{ message: string }>, CommentCreationPayload>({
    mutationFn: postComment,
    mutationKey: ["postComment"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getComments"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Can't post comment",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetComments = (payload: CommentFetchingPayload) => {
  return useQuery<ApiResponse<CommentResponse[]>, Error>({
    queryKey: [
      "getComments",
      payload.page,
      payload.taskId,
      payload.projectId,
      payload.workspaceId,
    ],
    queryFn: () => getComments(payload),
  });
};

export const useUpdateComment = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<{ message: string }>, CommentUpdationPayload>({
    mutationFn: updateComment,
    mutationKey: ["updateComment"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getComments"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Can't update comment",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useDeleteComment = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError<{ message: string }>, CommentDeletionPayload>({
    mutationFn: deleteComment,
    mutationKey: ["deleteComment"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getComments"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Can't delete comment",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
