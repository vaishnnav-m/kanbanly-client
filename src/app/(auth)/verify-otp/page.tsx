"use client";
import OTPSendingLoader from "@/componets/templates/OtpSendingTemplate";
import VerifyOtpTemplate from "@/componets/templates/VerifyOtpTemplate";
import { useSearchParams } from "next/navigation";
import React from "react";

const OtpPage = () => {
  const params = useSearchParams();
  console.log(params.get("email"));

  let isLoading = true;

  function sendOtp() {}
  function submitOtp({ otpCode }: { otpCode: string }) {
    console.log(otpCode);
  }
  function resendOtp() {}

  return (
    <main>
      {isLoading ? (
        <OTPSendingLoader />
      ) : (
        <VerifyOtpTemplate
          handleOtp={submitOtp}
          handleResendOTP={resendOtp}
          isSubmitLoading={false}
          isResendLoading={false}
          errorMessage="hello"
        />
      )}
    </main>
  );
};

export default OtpPage;
