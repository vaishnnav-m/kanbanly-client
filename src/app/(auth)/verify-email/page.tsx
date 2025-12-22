"use client";
import CustomLoader from "@/components/organisms/user/CustomLoader";
import EmailFailureTemplate from "@/components/templates/auth/EmailFailureTemplate";
import { useVerifyEmail } from "@/lib/hooks/useAuth";
import { RootState } from "@/store";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { SuspenseLoader } from "@/components/organisms/SuspenseLoader";

const VerifyEmailContent = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
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
  }, [token, verifyEmail, isError, isLoading, isSuccess]);

  if (isLoading) {
    return <CustomLoader span="Please Wait" title="Verifying Email" />;
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

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;
