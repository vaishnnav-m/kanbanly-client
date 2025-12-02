"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./ToastProvider";
import { ToastContainer } from "@/components/atoms/toaster";
import { useToastMessage } from "@/lib/hooks/useToastMessage";
import { setToastMessageInstance } from "@/lib/api/axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { appConfig } from "@/lib/config";
import InitApp from "@/app/InitAuth";
import { SocketProvider } from "@/contexts/SocketContext";

interface IProps {
  children: React.ReactNode;
}

function ToastSetupWrapper({ children }: IProps) {
  const toast = useToastMessage();

  useEffect(() => {
    setToastMessageInstance(toast);
  }, [toast]);

  return <>{children}</>;
}

import { NotificationProvider } from "./NotificationProvider";
import { NotificationContainer } from "@/components/molecules/NotificationContainer";

export function Providers({ children }: IProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={appConfig.googleAuth.oauthClientId}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <ToastProvider>
            <ToastContainer />
            <ToastSetupWrapper>
              <ReduxProvider store={store}>
                <InitApp />
                <NotificationProvider>
                  <NotificationContainer />
                  <SocketProvider>{children}</SocketProvider>
                </NotificationProvider>
              </ReduxProvider>
            </ToastSetupWrapper>
          </ToastProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
