"use client";
import LoginTemplate from "@/componets/templates/LoginTemplate";
import { LoginPayload } from "@/lib/api/auth/auth.types";
import { useLogin } from "@/lib/hooks/useAuth";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const { mutate: loginUser, isPending, error } = useLogin();

  // const router = useRouter();

  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.isAuthenticated
  // );

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.replace("/workspaces");
  //   }
  // }, [isAuthenticated, router]);

  const handleSignup = (values: LoginPayload) => {
    loginUser(values);
  };
  return (
    <main>
      <LoginTemplate
        handleSignup={handleSignup}
        isLoading={isPending}
        errorMessage={error?.message}
      />
    </main>
  );
};

export default LoginPage;
