"use client";
import WorkSpacesTemplate from "@/componets/templates/WorkSpacesTemplate";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const [isVerified, setIsVerified] = useState(false);

  const isEmailVerified = useSelector(
    (state: RootState) => state.isEmailVerified
  );

  useEffect(() => {
    setIsVerified(isEmailVerified);
  }, [isEmailVerified]);

  return (
    <main>
      <WorkSpacesTemplate isVerified={isVerified} />
    </main>
  );
};

export default page;
