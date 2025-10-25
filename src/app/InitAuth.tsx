"use client";
import { useGetUserSubscription } from "@/lib/hooks/useSubscription";
import { getStorageItem } from "@/lib/utils";
import { setCredentials } from "@/store/slices/authSlice";
import { setSubscription } from "@/store/slices/subscriptionSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function InitApp() {
  const dispatch = useDispatch();
  const isAuthenticated = getStorageItem("isAuthenticated") === "true";
  const profile = getStorageItem("profile");
  const { data: subscription } = useGetUserSubscription({
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      try {
        dispatch(
          setCredentials({ isAuthenticated, ...(profile && { profile }) })
        );
        if (subscription?.data) {
          const subscriptionData = {
            planName: subscription.data.planName,
            currentPeriodEnd: subscription.data.currentPeriodEnd,
            limits: subscription.data.limits,
          };

          dispatch(setSubscription(subscriptionData));
        }
      } catch (error) {
        console.log("failed to parse userData", error);
      }
    }
  }, [subscription, isAuthenticated, dispatch, profile]);

  return null;
}

export default InitApp;
