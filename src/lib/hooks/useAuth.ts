"use client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  LoginPayload,
  LoginResponseData,
  OtpResponseData,
  SignupPayload,
} from "../api/auth/auth.types";
import {
  logout,
  sendOtp,
  signup,
  userLogin,
  verifyMagicLink,
} from "../api/auth";
import { useToastMessage } from "./useToastMessage";
import { useDispatch } from "react-redux";
import { logoutUser, setCredentials } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToastMessage();
  const dispatch = useDispatch();

  return useMutation<
    ApiResponse<{
      firstName: string;
      lastName: string;
      isEmailVerified: boolean;
      email: string;
    }>,
    Error,
    SignupPayload
  >({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (response) => {
      router.push("/signup-success");
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
  const dispatch = useDispatch();

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

      if (!response.data) return;

      const { isEmailVerified, ...user } = response?.data;

      localStorage.setItem("isEmailVerified", isEmailVerified.toString());
      localStorage.setItem("isAuthenticated", "true");

      dispatch(
        setCredentials({
          isEmailVerified,
          isAuthenticated: true,
          user,
        })
      );

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

export const useSendOtp = () => {
  const toast = useToastMessage();

  return useMutation<ApiResponse<OtpResponseData>, Error>({
    mutationKey: ["send-otp"],
    mutationFn: sendOtp,
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

export const useVerifyEmail = () => {
  const router = useRouter();
  const toast = useToastMessage();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  return useMutation<ApiResponse, Error, { token: string }>({
    mutationKey: ["verify-magiclink"],
    mutationFn: verifyMagicLink,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Email Verification, Complete",
        description: response.message,
        duration: 6000,
      });

      localStorage.setItem("isEmailVerified", "true");
      localStorage.setItem("isAuthenticated", "true");

      dispatch(
        setCredentials({
          isEmailVerified: true,
          isAuthenticated: true,
          user: user ? user : undefined,
        })
      );
    },
    onError: (error: any) => {
      console.log("Email verification failed:", error);
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Verification failed",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const toast = useToastMessage();
  const dispatch = useDispatch();

  return useMutation<ApiResponse<OtpResponseData>, Error>({
    mutationKey: ["send-otp"],
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear();
      dispatch(logoutUser());
      router.replace("/login");
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
