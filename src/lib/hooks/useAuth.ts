"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  LoginPayload,
  LoginResponseData,
  SignupPayload,
} from "../api/auth/auth.types";
import {
  adminLogout,
  adminLogin,
  googleAuth,
  logout,
  resendEmail,
  signup,
  userLogin,
  verifyMagicLink,
  forgotPassword,
  resetPassword,
} from "../api/auth";
import { useToastMessage } from "./useToastMessage";
import { useDispatch } from "react-redux";
import {
  logoutAdmin,
  logoutUser,
  setCredentials,
} from "@/store/slices/authSlice";
import { setStorageItem } from "../utils";
import { ApiResponse } from "../api/common.types";
import { AxiosError } from "axios";

export const useSignup = () => {
  const router = useRouter();
  const toast = useToastMessage();

  return useMutation<
    ApiResponse<{
      firstName: string;
      lastName: string;
      email: string;
    }>,
    AxiosError<{ message: string }>,
    SignupPayload
  >({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: () => {
      router.push("/signup-success");
    },
    onError: (error: AxiosError<{ message: string }>) => {
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
  const toast = useToastMessage();
  const dispatch = useDispatch();

  return useMutation<
    ApiResponse<LoginResponseData>,
    AxiosError<{ message: string }>,
    LoginPayload
  >({
    mutationKey: ["login"],
    mutationFn: userLogin,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Welcome back, Commander!",
        description:
          "You've successfully logged in. The project battlefield is ready for action.",
        duration: 6000,
      });

      setStorageItem("isAuthenticated", "true");
      if (response.data?.profile) {
        setStorageItem("profile", response.data?.profile);
      }
      if (response.data?.userId) {
        setStorageItem("userId", response.data?.userId);
      }

      dispatch(
        setCredentials({
          userId: response.data?.userId,
          profile: response.data?.profile,
          isAuthenticated: true,
        })
      );

      router.replace("/workspaces");
    },
    onError: (error: AxiosError<{ message: string }>) => {
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

export const useGoogleAuth = () => {
  const toast = useToastMessage();
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation<
    ApiResponse<LoginResponseData>,
    AxiosError<{ message: string }>,
    { token: string }
  >({
    mutationKey: ["googleAuth"],
    mutationFn: googleAuth,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Welcome aboard!",
        description:
          "You're all set. Dive in and get started — your workspace awaits.",
        duration: 6000,
      });

      setStorageItem("isAuthenticated", "true");
      if (response.data?.profile) {
        setStorageItem("profile", response.data?.profile);
      }
      if (response.data?.userId) {
        setStorageItem("userId", response.data?.userId);
      }

      dispatch(
        setCredentials({
          userId: response.data?.userId,
          profile: response.data?.profile,
          isAuthenticated: true,
        })
      );

      router.replace("/workspaces");
    },
    onError: (error: AxiosError<{ message: string }>) => {
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

  return useMutation<
    ApiResponse<LoginResponseData>,
    AxiosError<{ message: string }>,
    { token: string }
  >({
    mutationKey: ["verify-magiclink"],
    mutationFn: verifyMagicLink,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Email Verification, Complete",
        description: response.message,
        duration: 6000,
      });

      setStorageItem("isAuthenticated", "true");
      if (response.data?.profile) {
        setStorageItem("profile", response.data?.profile);
      }
      if (response.data?.userId) {
        setStorageItem("userId", response.data?.userId);
      }

      dispatch(
        setCredentials({
          userId: response.data?.userId,
          profile: response.data?.profile,
          isAuthenticated: true,
        })
      );

      router.replace("/workspaces");
    },
    onError: (error: AxiosError<{ message: string }>) => {
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

export const useResendEmail = () => {
  const toast = useToastMessage();

  return useMutation<ApiResponse, Error, { email: string }>({
    mutationKey: ["resend-email"],
    mutationFn: resendEmail,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Successfully send the link",
        description: response.message,
        duration: 6000,
      });
    },
  });
};

export const useForgotPassword = () => {
  const toast = useToastMessage();
  const router = useRouter();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    { email: string }
  >({
    mutationKey: ["forgot-password"],
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      router.push("/login");
      toast.showSuccess({
        title: "Successfully send the link",
        description: response.message,
        duration: 6000,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Error in Reseting Password",
        description: errorMessage,
        duration: 6000,
      });
    },
  });
};

export const useResetPassword = () => {
  const toast = useToastMessage();
  const router = useRouter();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    { password: string; token: string }
  >({
    mutationKey: ["reset-password"],
    mutationFn: resetPassword,
    onSuccess: (response) => {
      router.push("/login");
      toast.showSuccess({
        title: "Successfully reseted the password",
        description: response.message,
        duration: 6000,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      const errorMessage = error?.response?.data?.message || "Unexpected Error";
      toast.showError({
        title: "Error in Reseting Password",
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

  return useMutation<ApiResponse, AxiosError<{ message: string }>>({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear();
      dispatch(logoutUser());
      router.replace("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
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

export const useAdminLogin = () => {
  const router = useRouter();
  const toast = useToastMessage();
  const dispatch = useDispatch();

  return useMutation<
    ApiResponse<LoginResponseData>,
    AxiosError<{ message: string }>,
    LoginPayload
  >({
    mutationKey: ["adminLogin"],
    mutationFn: adminLogin,
    onSuccess: (response) => {
      toast.showSuccess({
        title: "Welcome back",
        description: "You've successfully logged in.",
        duration: 6000,
      });

      setStorageItem("isAdminAuthenticated", "true");
      if (response.data?.profile) {
        setStorageItem("profile", response.data?.profile);
      }
      if (response.data?.userId) {
        setStorageItem("userId", response.data?.userId);
      }

      dispatch(
        setCredentials({
          userId: response.data?.userId,
          profile: response.data?.profile,
          isAdminAuthenticated: true,
        })
      );

      router.replace("/admin/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
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

export const useAdminLogout = () => {
  const router = useRouter();
  const toast = useToastMessage();
  const dispatch = useDispatch();

  return useMutation<ApiResponse, AxiosError<{ message: string }>>({
    mutationKey: ["logout"],
    mutationFn: adminLogout,
    onSuccess: () => {
      dispatch(logoutAdmin());
      router.replace("/admin/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
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
