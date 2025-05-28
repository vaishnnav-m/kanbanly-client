"use client"
import SignupTemplate from "@/componets/templates/SignupTemplate";
import React from "react";

const page = () => {
  const handleSignup = (values: Record<string, string>) => {
    console.log(values);
  };
  return (
    <main>
      <SignupTemplate handleSignup={handleSignup} />
    </main>
  );
};

export default page;
