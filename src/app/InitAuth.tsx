"use client";
import { getStorageItem } from "@/lib/utils";
import { setCredentials } from "@/store/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function InitAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = getStorageItem("isAuthenticated") === "true";

    if (isAuthenticated) {
      try {
        dispatch(setCredentials({ isAuthenticated }));
      } catch (error) {
        console.log("failed to parse userData");
      }
    }
  });

  return null;
}

export default InitAuth;
