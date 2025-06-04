"use client";
import OTPSendingLoader from "@/componets/templates/OtpSendingTemplate";
import VerifyOtpTemplate from "@/componets/templates/VerifyOtpTemplate";
import { useSendOtp, useVerifyOtp } from "@/lib/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const OtpPage = () => {
  const { mutate: sendOtp, isPending: isLoading } = useSendOtp();
  const { mutate: verifyOtp, isPending } = useVerifyOtp();

  useEffect(() => {
    sendOtp();
  }, []);

  function submitOtp({ otpCode }: { otpCode: string }) {
    verifyOtp({ otp: otpCode });
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
