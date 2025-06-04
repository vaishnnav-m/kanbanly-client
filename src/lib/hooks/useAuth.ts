"use client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  LoginPayload,
  LoginResponseData,
  OtpResponseData,
  SignupPayload,
  User,
} from "../api/auth/auth.types";
import { sendOtp, signup, userLogin, verifyOtp } from "../api/auth";
import { useToastMessage } from "./useToastMessage";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

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
      console.log("Signup Successfull", response);
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

export const useVerifyOtp = () => {
  const router = useRouter();
  const toast = useToastMessage();
  const dispatch = useDispatch();

  return useMutation<ApiResponse<OtpResponseData>, Error, { otp: string }>({
    mutationKey: ["send-otp"],
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Otp Verification, Complete",
        description: response.message,
        duration: 6000,
      });

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
