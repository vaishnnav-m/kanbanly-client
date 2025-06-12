"use client";
import SignupSuccessTemplate from "@/componets/templates/SignupSuccessTemplate";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function page() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/workspaces");
    }
  }, [isAuthenticated, router]);
  
  return (
    <main>
      <SignupSuccessTemplate />
    </main>
  );
}

export default page;
