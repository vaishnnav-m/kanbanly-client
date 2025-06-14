"use client";
import { getStorageItem } from "@/lib/utils";
import { setCredentials } from "@/store/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function InitAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = getStorageItem("isAuthenticated") === "true";
    const userData = getStorageItem("user");

    if (isAuthenticated && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch(setCredentials({isAuthenticated,user}));
      } catch (error) {
        console.log("failed to parse userData");
      }
    }
  });

  return null;
}

export default InitAuth;
