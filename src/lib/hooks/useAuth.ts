import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  LoginPayload,
  LoginResponseData,
  SignupPayload,
  User,
} from "../api/auth/auth.types";
import { signup, userLogin } from "../api/auth";
import { useToastMessage } from "./useToastMessage";

export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToastMessage();

  return useMutation<ApiResponse<{ email: string }>, Error, SignupPayload>({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (response) => {
      console.log("Signup Successfull", response);
      router.push("/workspaces");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Error in Login",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToastMessage();

  return useMutation<ApiResponse<LoginResponseData>, Error, LoginPayload>({
    mutationKey: ["login"],
    mutationFn: userLogin,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Welcome back, Commander!",
        description:
          "You've successfully logged in. The project battlefield is ready for action.",
        duration: 6000,
      });
      router.push("/workspaces");
    },
    onError: (error: any) => {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Error in Login",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};
