"use client";
import WorkSpacesTemplate from "@/componets/templates/WorkSpacesTemplate";
import { useLogout } from "@/lib/hooks/useAuth";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const [isVerified, setIsVerified] = useState(false);

  const isEmailVerified = useSelector(
    (state: RootState) => state.isEmailVerified
  );
  const { mutate: logout } = useLogout();

  useEffect(() => {
    setIsVerified(isEmailVerified);
  }, [isEmailVerified]);

  function handleLogout() {
    logout();
  }

  return (
    <main>
      <WorkSpacesTemplate isVerified={isVerified} handleLogout={handleLogout} />
    </main>
  );
};

export default page;
