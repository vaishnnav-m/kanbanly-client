import { useMutation } from "@tanstack/react-query";
import { ApiResponse, User } from "../api/auth/auth.types";
import { fetchAllUsers } from "../api/admin";

export const useGetUsers = (options?: {
  onSuccess?: (response: ApiResponse<User[]>) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation<ApiResponse<User[]>, Error>({
    mutationKey: ["fetchAllUsers"],
    mutationFn: fetchAllUsers,
    ...options,
  });
};
