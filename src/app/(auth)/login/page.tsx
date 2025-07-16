"use client";
import LoginTemplate from "@/components/templates/auth/LoginTemplate";
import { LoginPayload } from "@/lib/api/auth/auth.types";
import { useGoogleAuth, useLogin } from "@/lib/hooks/useAuth";
import { RootState } from "@/store";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const { mutate: loginUser, isPending, error } = useLogin();
  const { mutate: googleAuth } = useGoogleAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const token = tokenResponse.access_token;
      googleAuth({ token });
    },
  });

  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/workspaces");
    }
  }, [isAuthenticated, router]);

  const handleLogin = (values: LoginPayload) => {
    loginUser(values);
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <main>
      <LoginTemplate
        handleGoogleLogin={handleGoogleLogin}
        handleLogin={handleLogin}
        isLoading={isPending}
        errorMessage={error?.message}
      />
    </main>
  );
};

export default LoginPage;
