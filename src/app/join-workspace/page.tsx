"use client";
import CustomLoader from "@/components/organisms/user/CustomLoader";
import InvitationFailureTemplate from "@/components/templates/workspace/InvitationFailureTemplate";
import { useVerifyInvitation } from "@/lib/hooks/useWorkspace";
import { AxiosError } from "axios";
import {  useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    mutate: verifyInvitation,
    isPending: isLoading,
    isSuccess,
    isError,
    error,
  } = useVerifyInvitation();

  useEffect(() => {
    if (token && !isLoading && !isSuccess && !isError) {
      verifyInvitation({ token });
    }
  }, [token, verifyInvitation]);

  if (isLoading) {
    return <CustomLoader title="Verifying Request" span="Please Wait" />;
  }

  if (isError) {
    const errorMessage =
      (error as AxiosError<{ success: boolean; message: string }>)?.response
        ?.data.message || "An unknown error occurred.";
        
    return <InvitationFailureTemplate errorMessage={errorMessage} />;
  }

  if (!token) {
    return (
      <InvitationFailureTemplate errorMessage="The invitation link is missing or invalid. Please check your link or request a new one." />
    );
  }
}

export default page;
