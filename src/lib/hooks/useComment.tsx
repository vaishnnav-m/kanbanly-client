import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastMessage } from "./useToastMessage";
import { ApiResponse } from "../api/common.types";
import { CommentCreationPayload } from "../api/comment/comment.types";
import { postComment } from "../api/comment";

export const usePostComment = () => {
  const toast = useToastMessage();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, CommentCreationPayload>({
    mutationFn: postComment,
    mutationKey: ["postComment"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getComments"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Can't post comment",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
