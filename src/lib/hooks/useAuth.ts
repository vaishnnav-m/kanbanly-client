import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, SignupPayload, User } from "../api/auth/auth.types";
import { signup } from "../api/auth";

export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<{ email: string }>, Error, SignupPayload>({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (response) => {
      console.log("Signup Successfull", response);
      router.push(`/verify-otp?email=vaishnnav0@gmail.com`);
    },
    onError: (error) => {
      console.log("Signup failed (network/server error):", error);
    },
  });
};
