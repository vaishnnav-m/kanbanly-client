"use client";
import EmailFailureTemplate from "@/components/templates/auth/EmailFailureTemplate";
import VerifyingEmailLoader from "@/components/templates/auth/VerifyingEmailTemplate";
import { useVerifyEmail } from "@/lib/hooks/useAuth";
import { RootState } from "@/store";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const VerifyEmailPage = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/workspaces");
    }
  }, [isAuthenticated, router]);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // verify email hook
  const {
    mutate: verifyEmail,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useVerifyEmail();

  useEffect(() => {
    if (token && !isLoading && !isSuccess && !isError) {
      verifyEmail({ token });
    }
  }, [token, verifyEmail]);

  if (isLoading) {
    return <VerifyingEmailLoader />;
  }

  if (isError) {
    const errorMessage = error?.message || "An unknown error occurred.";
    return <EmailFailureTemplate errorMessage={errorMessage} />;
  }

  if (!token) {
    return (
      <EmailFailureTemplate
        handleResendEmail={async () => {}}
        errorMessage="The verification link is missing or invalid. Please check your link or request a new one."
      />
    );
  }
};

export default VerifyEmailPage;
