import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEpic, getAllEpics } from "../api/epic";
import { ApiResponse } from "../api/common.types";
import { CreateEpicPayload, IEpic } from "../api/epic/epic.types";
import { useToastMessage } from "./useToastMessage";
import { AxiosError } from "axios";

// hook to add a new epic
export const useAddEpic = () => {
  const queryClient = useQueryClient();
  const toast = useToastMessage();

  return useMutation<ApiResponse, Error, CreateEpicPayload>({
    mutationKey: ["addEpic"],
    mutationFn: addEpic,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Success fully deleted",
        description: response.message,
        duration: 6000,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllEpics"] });
    },
    onError: (error: unknown) => {
      let errorMessage = "Unexpected Error";
      if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.message;
      }
      toast.showError({
        title: "Epic creation failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useGetAllEpics = (workspaceId: string, projectId: string) => {
  return useQuery<ApiResponse<IEpic[]>, Error>({
    queryKey: ["getAllEpics", workspaceId],
    queryFn: () => getAllEpics(workspaceId, projectId),
    enabled: !!workspaceId || !!projectId,
  });
};
